import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import btnStyles from "../styles/Button.module.css";

const MessageModal = ( {message, handleClose, show } ) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button className={btnStyles.Btn} onClick={handleClose}>
          Close
        </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default MessageModal