const Modal = ({ buttonAction, children, closeModal, handleSubmit, showModal  }) => {


  
    return showModal ? (

         (
            <div
              className="modal-backdrop"
              onClick={() => {
                // close modal when outside of modal is clicked
                closeModal();
              }}
            >
              <div
                className="modal-content"
                onClick={e => {
                  // do not close modal if anything inside modal content is clicked
                  e.stopPropagation();
                }}
              >
                {children}
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleSubmit}>{buttonAction}</button>
              </div>
            </div>
          ) 
    
    ) : null;
  }
  
  export default Modal;