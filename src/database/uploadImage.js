import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Initialize Firebase Storage
const storage = getStorage();

/**
 * Uploads an image to Firebase Storage.
 * @param {File} file - The image file to upload.
 * @param {string} path - The path in Firebase Storage where the image will be stored.
 * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded image.
 */
async function uploadImage(file, path) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef); // Return the download URL
}
