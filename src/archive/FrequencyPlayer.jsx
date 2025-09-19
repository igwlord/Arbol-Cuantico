import React from 'react'
import { getAudioFile } from '../utils/audioFiles.js'

const FrequencyPlayer = ({ hz, label, sefirotId = null, onPlayStart = null, onPlayStop = null }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const audioRef = React.useRef(null);
  const [toastMessage, setToastMessage] = React.useState('');
  
  const showToast = React.useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const stop = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    
    if (sefirotId) {
      const event = new CustomEvent('sefirotAudioChange', {
        detail: { sefirotId, isPlaying: false, hz, label }
      });
      window.dispatchEvent(event);
    }
    
    if (onPlayStop) {
      onPlayStop();
    }
  }, [sefirotId, hz, label, onPlayStop]);

  const play = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const audioFile = getAudioFile(hz);
      if (!audioFile) {
        setIsLoading(false);
        return;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
        audioRef.current = null;
      }
      audioRef.current = new Audio();
      const handleCanPlay = () => { setIsLoading(false) };
      const handleLoadStart = () => { setIsLoading(true) };
      const handleError = () => {
        setIsLoading(false);
        setIsPlaying(false);
      };
      const handleEnded = () => {
        setIsPlaying(false);
        if (sefirotId) {
          const event = new CustomEvent('sefirotAudioChange', {
            detail: { sefirotId, isPlaying: false, hz, label }
          });
          window.dispatchEvent(event);
        }
        if (onPlayStop) { onPlayStop() }
      };
      audioRef.current.addEventListener('loadstart', handleLoadStart);
      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
      audioRef.current.preload = 'auto';
      audioRef.current.loop = true;
      audioRef.current.volume = 0.7;
      audioRef.current.src = audioFile;
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Audio loading timeout')), 10000);
        audioRef.current.addEventListener('canplaythrough', () => { clearTimeout(timeout); resolve() }, { once: true });
        audioRef.current.addEventListener('error', () => { clearTimeout(timeout); reject(audioRef.current.error) }, { once: true });
        audioRef.current.load();
      });
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) { await playPromise }
      setIsPlaying(true);
      setIsLoading(false);
      if (onPlayStart) { onPlayStart() }
      if (sefirotId) {
        const event = new CustomEvent('sefirotAudioChange', { detail: { sefirotId, isPlaying: true, hz, label } });
        window.dispatchEvent(event);
      }
    } catch (error) {
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [hz, label, sefirotId, onPlayStart]);

  const togglePlay = React.useCallback(async () => {
    if (isPlaying) {
      stop();
    } else {
      try { await play() } catch (error) {
        if (audioRef.current) { audioRef.current.remove(); audioRef.current = null }
        await play();
      }
    }
  }, [isPlaying, stop, play]);
  
  React.useEffect(() => () => {
    stop();
    if (audioRef.current) {
      audioRef.current.removeEventListener('loadstart', () => {});
      audioRef.current.removeEventListener('canplay', () => {});
      audioRef.current.removeEventListener('ended', () => {});
      audioRef.current.removeEventListener('error', () => {});
      audioRef.current = null;
    }
  }, [stop]);

  return null
}

export default FrequencyPlayer
