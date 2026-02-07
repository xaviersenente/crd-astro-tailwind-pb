// Importation de la bibliothèque PocketBase
import PocketBase from "pocketbase";

// Définition de l'URL de l'instance PocketBase
const POCKETBASE_URL =
  import.meta.env?.PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";

// Création de l'instance PocketBase avec l'URL définie plus haut
const pb = new PocketBase(POCKETBASE_URL);

// Exportation de l'instance PocketBase pour l'utiliser dans d'autres fichiers
export { pb };

// Fonction pour récupérer tous les contenus de la collection spécifiée
// Utilise la méthode `getFullList` de PocketBase qui renvoie tous les éléments de la collection
export async function getCollection(collection) {
  try {
    // Tentative de récupération de la liste complète des événements de la collection donnée
    return await pb.collection(collection).getFullList();
  } catch (error) {
    // Si une erreur survient, elle est loguée dans la console
    console.error("Erreur lors de la récupération des contenus :", error);
    // Retourne un tableau vide en cas d'échec
    return [];
  }
}

/**
 * Récupère tous les événements à venir (sans pagination)
 * @param {string} collection - Nom de la collection (défaut: "event")
 * @returns {Promise<Array>} Liste de tous les événements à venir ou tableau vide
 */
export async function getUpcomingEvents(collection = "event") {
  try {
    // Crée un objet Date représentant la date d'aujourd'hui
    const today = new Date();
    // Réinitialise l'heure à 00:00:00 (pour ne pas inclure d'événements passés)
    today.setHours(0, 0, 0, 0);

    // Récupère les événements de la collection spécifiée, en les filtrant par date
    // Le filtre assure que seuls les événements à partir d'aujourd'hui sont renvoyés
    // Le tri est effectué par date croissante
    const items = await pb.collection(collection).getFullList({
      filter: `date >= "${today.toISOString()}"`, // Filtre basé sur la date actuelle
      sort: "+date", // Tri croissant des événements par date
    });
    // Retourne les événements récupérés
    return items;
  } catch (error) {
    // Si une erreur survient lors de la récupération des événements, elle est loguée dans la console
    console.error(
      "Erreur lors de la récupération des événements à venir :",
      error,
    );
    return [];
  }
}

/**
 * Récupère les prochains événements à venir (limité à un nombre spécifique)
 * @param {number} limit - Nombre d'événements à récupérer (défaut: 3)
 * @param {string} collection - Nom de la collection (défaut: "event")
 * @returns {Promise<Array>} Liste des prochains événements ou tableau vide
 */
export async function getNextEvents(limit = 3, collection = "event") {
  try {
    // Crée un objet Date représentant la date d'aujourd'hui
    const today = new Date();
    // Réinitialise l'heure à 00:00:00 (pour ne pas inclure d'événements passés)
    today.setHours(0, 0, 0, 0);

    // Récupère les événements de la collection spécifiée, en les filtrant par date
    // et en limitant le nombre de résultats
    const items = await pb.collection(collection).getList(1, limit, {
      filter: `date >= "${today.toISOString()}"`, // Filtre basé sur la date actuelle
      sort: "+date", // Tri croissant des événements par date
    });
    // Retourne les événements récupérés
    return items.items;
  } catch (error) {
    // Si une erreur survient lors de la récupération des événements, elle est loguée dans la console
    console.error(
      "Erreur lors de la récupération des prochains événements :",
      error,
    );
    return [];
  }
}

/**
 * Récupère un élément spécifique par son ID
 * @param {string} id - Identifiant de l'élément
 * @param {string} collection - Nom de la collection
 * @returns {Promise<Object|null>} L'élément trouvé ou null en cas d'erreur
 */
export async function getOneById(id, collection) {
  try {
    // Récupère un seul item à partir de son ID dans la collection spécifiée
    const item = await pb.collection(collection).getOne(id);
    // Retourne l'événement récupéré
    return item;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'élément "${id}" de la collection "${collection}" :`,
      error,
    );
    return null;
  }
}

// Test de la fonction getOneById
// Récupère un événement spécifique avec l'ID "4tvlzgedjmy6skf" depuis la collection "event"
try {
  const records = await getOneById("4tvlzgedjmy6skf", "event");
  // Affiche les données récupérées dans la console
  console.log(records);
} catch (e) {
  // En cas d'erreur, affiche l'erreur dans la console
  console.error(e);
}
