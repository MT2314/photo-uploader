import { useState } from "react";
import PropTypes from "prop-types";
import { Button as StyledButton } from "@mantine/core";

export default function Button({ label, setActiveComponent, disabled }) {
  const [isHovered, setIsHovered] = useState(0);

  const buttonStyle = {
    backgroundColor: disabled ? "#e6a79e" : isHovered ? "#FBD19C" : "#F69A6C", // Change background on hover
    color: disabled ? "#fff" : "#2A4906", // Change text color on hover
    outline: isHovered ? "3px solid #F69A6C" : "3px solid #e6a79e", // Slightly darker blush pink border
    borderRadius: "10px", // Softer rounded corners
    padding: "14px 28px", // Extra padding for more space
    fontSize: "16px", // Keeps the text size readable
    fontFamily: "'PT Serif', serif", // Elegant cursive font to match the wedding theme
    cursor: disabled ? "not-allowed" : "pointer", // Pointer cursor to indicate it's clickable
    transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition for both background and color
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for added depth
    lineHeight: "1.5", // Better text spacing
    display: "inline-block", // Ensures button is inline but with proper size
    minHeight: "50px", // Set a minimum height to prevent cut off
    boxSizing: "border-box", // Ensures padding and border are included in the size
    "&:disabled": {
      backgroundColor: "#F0D0CB", // Lighter shade of blush pink
      color: "#8B9F6F", // Muted green color
      cursor: "not-allowed",
      opacity: 0.7, // Reduce opacity to indicate disabled state
      outline: "3px solid #E6A79E", // Maintain the outline color
    },
  };

  return (
    <StyledButton
      disabled={disabled}
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
