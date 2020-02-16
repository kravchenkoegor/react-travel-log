import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ entry }) => {
  const {
    _id,
    comments,
    // description,
    // image,
    latitude,
    longitude,
    // rating,
    title,
    visitDate
  } = entry;

  const handleZoomFocus = () => {
    document.dispatchEvent(
      new CustomEvent('viewOnMap', { detail: { latitude, longitude } })
    );
  };

  return (
    <div className="card mb-2">
      {/* {image && (
        <img
          src={image}
          className="card-img-top"
          alt={description}
          width="40"
          height="40"
        />
      )} */}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{comments}</p>
        <p className="card-text">{visitDate}</p>
        <Link to={`/${_id}`} className="btn btn-primary">
          More
        </Link>
        <button className="btn btn-info ml-3" onClick={handleZoomFocus}>
          View on map
        </button>
      </div>
    </div>
  );
};

export default List;
