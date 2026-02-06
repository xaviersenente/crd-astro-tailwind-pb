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
