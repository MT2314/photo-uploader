import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Initialize Firebase Storage
const storage = getStorage();

/**
 * Fetches the download URL for an image stored in Firebase Storage.
 * @param {string} path - The path to the image in Firebase Storage.
 * @returns {Promise<string>} - A promise that resolves to the download URL of the image.
 */
async function fetchImageUrl(path) {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
}
