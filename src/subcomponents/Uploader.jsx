// Uploader.js
import React from "react";
import ImageUploading from "react-images-uploading";
import uploadFile from "../database/uploadImage";
import "../styles/Uploader.css";

const Uploader = () => {
  const [images, setImages] = React.useState([]);
  const [uploadedUrls, setUploadedUrls] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // Set images locally
    setImages(imageList);

    // Upload images to Firebase Storage
    imageList.forEach(async (image) => {
      if (!image.file) return; // Skip if the image doesn't have a file (e.g., previously uploaded images)

      try {
        const downloadURL = await uploadFile(image.file); // Use the service function
        setUploadedUrls((prevState) => [...prevState, downloadURL]); // Save the download URL
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    });
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "jpeg", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      <div className="uploaded-urls">
        <h3>Uploaded Images</h3>
        <ul>
          {uploadedUrls.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Uploader;
