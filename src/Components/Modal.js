import React from 'react';
import { Modal, Fade, Button } from '@mui/material';

const modalContainerStyle = {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '80%',
};

const titleStyle = {
    marginBottom: '16px',
    textAlign: 'center',
};

const CustomModal = ({ isOpen, onClose, children, title }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            closeAfterTransition
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Fade in={isOpen}>
                <div style={modalContainerStyle} className="modal-container">
                    <div className="modal-paper">
                        <h2 id="modal-title" style={titleStyle}>{title}</h2>
                        <p id="modal-description">{children}</p>
                        <Button onClick={onClose} variant="contained" color="primary">
                            Close
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};
export default CustomModal;
