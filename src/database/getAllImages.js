// Import the initialized Firebase app and necessary functions
import app from "../firebaseConfig";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Initialize Firebase Storage with the app instance
const storage = getStorage(app);

/**
 * Fetches download URLs for all images in a specific Firebase Storage folder.
 * @param {string} folderPath - The path to the folder in Firebase Storage.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of download URLs.
 */
export async function fetchAllImageUrls(folderPath) {
  const folderRef = ref(storage, folderPath);
  const list = await listAll(folderRef);
  const urlPromises = list.items.map((itemRef) => getDownloadURL(itemRef));
  return Promise.all(urlPromises); // Return all download URLs
}
