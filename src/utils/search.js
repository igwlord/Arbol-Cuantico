// Text normalization and simple search scoring utilities for the Diccionario

export function normalizeText(str) {
  if (!str) return ''
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, ' ') // keep alnum and spaces
    .replace(/\s+/g, ' ')
    .trim()
}

export function tokenize(query) {
  return normalizeText(query).split(' ').filter(Boolean)
}

// Returns array of { item, score }
export function searchTerms(items, query) {
  const tokens = tokenize(query)
  if (!tokens.length) return items.map(item => ({ item, score: 0 }))

  return items
    .map(item => {
      const fields = {
        termino: normalizeText(item.termino),
        definicion: normalizeText(item.definicion),
        tags: normalizeText((item.tags || []).join(' ')),
        keywords: normalizeText((item.keywords || []).join(' ')),
        categoria: normalizeText(item.categoria || ''),
      }
      let score = 0
      let allPresent = true
      for (const t of tokens) {
        const inTerm = fields.termino.includes(t)
        const inDef = fields.definicion.includes(t)
        const inTags = fields.tags.includes(t)
        const inKw = fields.keywords.includes(t)
        const inCat = fields.categoria.includes(t)
        if (!(inTerm || inDef || inTags || inKw || inCat)) {
          allPresent = false
          break
        }
        // weight by field relevance
        if (inTerm) score += 3
        if (inTags || inKw) score += 2
        if (inCat) score += 1
        if (inDef) score += 1
      }
      return { item, score: allPresent ? score : -1 }
    })
    .filter(r => r.score >= 0)
    .sort((a, b) => (b.score - a.score) || a.item.termino.localeCompare(b.item.termino))
}
