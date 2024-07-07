<<<<<<< HEAD
// components/Popup.tsx

import React from "react";
=======
import React, { useState } from "react";
>>>>>>> 9337bca8eee42b3788a416cfea6c2d5b49672355

interface PopupProps {
  date: string;
  letterType: string;
  onClose: () => void;
<<<<<<< HEAD
  onApprove: () => void;
  onDisapprove: () => void;
=======
  onDisapprove: () => void;
  reason: string;
  setReason: (reason: string) => void;
>>>>>>> 9337bca8eee42b3788a416cfea6c2d5b49672355
}

const Popup: React.FC<PopupProps> = ({
  date,
  letterType,
  onClose,
<<<<<<< HEAD
  onApprove,
  onDisapprove,
}) => {
=======
  onDisapprove,
  reason,
  setReason,
}) => {
  const handleDisapprove = () => {
    onDisapprove();
  };

>>>>>>> 9337bca8eee42b3788a416cfea6c2d5b49672355
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
<<<<<<< HEAD
    maxWidth: "400px", // Adjust width as needed
=======
    maxWidth: "400px",
>>>>>>> 9337bca8eee42b3788a416cfea6c2d5b49672355
    width: "100%",
    textAlign: "center",
  };

  const buttonContainerStyle: React.CSSProperties = {
    marginTop: "20px",
  };

<<<<<<< HEAD
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

=======
>>>>>>> 9337bca8eee42b3788a416cfea6c2d5b49672355
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

<<<<<<< HEAD
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
=======
  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    boxSizing: "border-box",
  };

  return (
    <div style={popupStyle}>
      <h2>Review Request</h2>
      <p>Date: {date}</p>
      <p>Letter Type: {letterType}</p>
      <textarea
        style={textareaStyle}
        placeholder="Reason for disapproval"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <div style={buttonContainerStyle}>
        <button style={disapproveButtonStyle} onClick={handleDisapprove}>
          Submit
>>>>>>> 9337bca8eee42b3788a416cfea6c2d5b49672355
        </button>
        <button style={closeButtonStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
