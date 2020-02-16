import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { YMaps, Map, ZoomControl } from 'react-yandex-maps';
import { listLogEntry } from '../api';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Entry = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const { comments, image, latitude, longitude, title, visitDate } = entry;

  const getEntry = async () => {
    const logEntry = await listLogEntry(id);
    setEntry(logEntry);
  };

  useEffect(() => {
    getEntry();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="shadow mb-3">
        <YMaps>
          <Map
            defaultState={{
              center: [latitude, longitude],
              zoom: 8.9
            }}
            height={240}
            width={'100vw'}
          >
            <ZoomControl options={{ float: 'left' }} />
          </Map>
        </YMaps>
      </div>

      <div className="container py-3">
        <div className="row">
          <div className="col-12">
            <div className="card px-3 py-3">
              {image && (
                <img src={image} className="card-img-top" alt={title} />
              )}
              <div className="card-body">
                <h1>{title}</h1>
                {comments && <h2>{comments}</h2>}
                <p>{new Date(visitDate).toLocaleDateString()}</p>
              </div>
            </div>

            <Link to="/" className="btn btn-primary mt-3 d-block">
              Back
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Entry;
