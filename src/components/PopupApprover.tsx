// components/Popup.tsx

import React from "react";

interface PopupProps {
  date: string;
  letterType: string;
  onClose: () => void;
  onApprove: () => void;
  onDisapprove: () => void;
}

const Popup: React.FC<PopupProps> = ({
  date,
  letterType,
  onClose,
  onApprove,
  onDisapprove,
}) => {
  const popupStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    maxWidth: "400px", // Adjust width as needed
    width: "100%",
    textAlign: "center",
  };

  const buttonContainerStyle: React.CSSProperties = {
    marginTop: "20px",
  };

  const approveButtonStyle: React.CSSProperties = {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    marginRight: "10px",
    cursor: "pointer",
  };

  const disapproveButtonStyle: React.CSSProperties = {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    marginRight: "10px",
    cursor: "pointer",
  };

  const closeButtonStyle: React.CSSProperties = {
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={popupStyle}>
      <h2>Popup</h2>
      <p>Date: {date}</p>
      <p>Letter Type: {letterType}</p>
      <div style={buttonContainerStyle}>
        <button style={approveButtonStyle} onClick={onApprove}>
          Approve
        </button>
        <button style={disapproveButtonStyle} onClick={onDisapprove}>
          Disapprove
        </button>
        <button style={closeButtonStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
