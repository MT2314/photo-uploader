// firebaseStorageService.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebaseConfig"; // Import your Firebase app instance

const storage = getStorage(app);

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param {File} file - The file to upload.
 * @param {string} folderPath - The folder path where the file will be stored.
 * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded file.
 */
async function uploadFile(file, folderPath = "images") {
  const storageRef = ref(storage, `${folderPath}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

export default uploadFile;