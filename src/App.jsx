// App.js
import React, { useEffect, useState } from "react";
import { fetchCollectionData } from "./database/getCollection"; // Import the fetch function
import { fetchAllImageUrls } from "./database/getAllImages";

function App() {
  const [users, setUsers] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Replace 'images/' with the actual folder path in your storage
    fetchAllImageUrls("gs://edward--nicole-wedding.appspot.com")
      .then((urls) => {
        console.log(urls);
        setImageUrls(urls); // Set the image URLs in the state
      })
      .catch(console.error); // Handle any errors
  }, []);

  useEffect(() => {
    // Fetch users using the utility function
    fetchCollectionData("users")
      .then((fetchedUsers) => {
        setUsers(fetchedUsers); // Update state with fetched users
      })
      .catch(console.error); // Handle any errors
  }, []);

  return (
    <div>
      <h1>My Images</h1>
      <ul>
        {imageUrls.map((url, index) => (
          <li key={index}>
            <img src={url} alt={`Image ${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
