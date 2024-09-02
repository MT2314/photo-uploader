// firebaseService.js
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebaseConfig"; // Import the initialized Firebase app

const db = getFirestore(app);

/**
 * Fetches all documents from a specific Firestore collection.
 * @param {string} collectionName - The name of the collection to fetch documents from.
 * @returns {Promise<Array>} A promise that resolves to an array of documents.
 */
export async function fetchCollectionData(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const dataList = [];
  querySnapshot.forEach((doc) => {
    dataList.push(doc.data());
  });
  return dataList;
}
