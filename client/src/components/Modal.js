import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ style, coords }) => {
  const [latitude, longitude] = coords;

  return (
    <div className="modal" role="dialog" style={style}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Are you sure you want to add an entry?
            </h5>
            <button type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger">
              No
            </button>
            <Link
              to={`/add/?lat=${latitude}&long=${longitude}`}
              className="btn btn-success"
            >
              Yes, I am
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
