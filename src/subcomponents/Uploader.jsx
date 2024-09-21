// Uploader.js
import React from "react";
import ImageUploading from "react-images-uploading";
import uploadFile from "../database/uploadImage";
import "../styles/Uploader.css";

const Uploader = () => {
  const [images, setImages] = React.useState([]);
  const [uploadedUrls, setUploadedUrls] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const maxNumber = 69;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const uploadImages = async () => {
    setUploading(true);
    const urls = [];
    for (const image of images) {
      if (!image.file) continue;
      try {
        const downloadURL = await uploadFile(image.file);
        urls.push(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    setUploadedUrls((prevUrls) => [...prevUrls, ...urls]);
    setUploading(false);
  };

  return (
    <div className="uploader-container">
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
              className="upload-btn"
              style={
                isDragging ? { backgroundColor: "#e8dfe3" } : null
              }
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drag Images Here
            </button>
            {images.length > 0 && (
              <button className="remove-btn" onClick={onImageRemoveAll}>
                Remove All Images
              </button>
            )}
            {images.length > 0 && (
              <button
                className="upload-btn"
                onClick={uploadImages}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Images"}
              </button>
            )}
            <div className="image-preview">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" />
                  <div className="image-item__btn-wrapper">
                    <button
                      className="update-btn"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>

      {uploadedUrls.length > 0 && (
        <div className="uploaded-urls">
          <h3>Uploaded Images</h3>
          <ul>
            {uploadedUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  View Image {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Uploader;
