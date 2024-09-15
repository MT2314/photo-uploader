import { useState } from "react";
import PropTypes from "prop-types";
import { Button as StyledButton } from "@mantine/core";

export default function Button({ label, setActiveComponent }) {
  const [isHovered, setIsHovered] = useState(0);

  const buttonStyle = {
    backgroundColor: isHovered ? "#e6a79e" : "#f7c5c1", // Change background on hover
    color: isHovered ? "#fff" : "#2d2d2d", // Change text color on hover
    border: "2px solid #e6a79e", // Slightly darker blush pink border
    borderRadius: "10px", // Softer rounded corners
    padding: "14px 28px", // Extra padding for more space
    fontSize: "16px", // Keeps the text size readable
    fontFamily: "'Cursive', sans-serif", // Elegant cursive font to match the wedding theme
    cursor: "pointer", // Pointer cursor to indicate it's clickable
    transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition for both background and color
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for added depth
    lineHeight: "1.5", // Better text spacing
    display: "inline-block", // Ensures button is inline but with proper size
    minHeight: "50px", // Set a minimum height to prevent cut off
    boxSizing: "border-box", // Ensures padding and border are included in the size
  };

  return (
    <StyledButton
      style={buttonStyle}
      onClick={() => setActiveComponent()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </StyledButton>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};
