/**
 * Formatter Intl.DateTimeFormat singleton pour éviter de recréer l'objet à chaque appel
 */
const formatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
  timeZone: "Europe/Paris",
});

/**
 * Formate une date en français avec heure
 * @param {string|Date} dateString - Date à formater
 * @returns {string} Date formatée
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return formatter.format(date);
}

/**
 * Génère un slug URL-friendly à partir d'une chaîne de caractères
 * Gère les caractères accentués français (é, è, ê, à, ç, etc.)
 * @param {string} text - Texte à transformer en slug
 * @returns {string} Slug normalisé (ex: "Concert de Noël" → "concert-de-noel")
 */
export function slugify(text) {
  return text
    .normalize("NFD") // décompose les accents (é → e + ◌́)
    .replace(/[\u0300-\u036f]/g, "") // supprime les diacritiques
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // tout caractère non alphanumérique → tiret
    .replace(/(^-|-$)+/g, ""); // supprime les tirets en début/fin
}

/**
 * Attribue un slug unique à chaque élément d'une collection
 * En cas de doublons, ajoute un suffixe numérique (-2, -3, etc.)
 * @param {Array<Object>} items - Tableau d'objets avec une propriété `title`
 * @returns {Array<Object>} Les mêmes objets enrichis d'une propriété `slug`
 */
export function slugifyCollection(items) {
  const slugCount = {};

  return items.map((item) => {
    const base = slugify(item.title);
    slugCount[base] = (slugCount[base] || 0) + 1;
    const slug = slugCount[base] === 1 ? base : `${base}-${slugCount[base]}`;
    return { ...item, slug };
  });
}
