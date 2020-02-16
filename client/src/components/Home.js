import React from 'react';
import Map from './Map';
import List from './List';

const Home = ({ logEntries, handleZoomFocus }) => {
  return (
    <React.Fragment>
      <div className="map shadow mb-3">
        <Map logEntries={logEntries} />
      </div>
      <div
        className="container"
        style={{
          height: 'calc(100vh - 312px)',
          overflowY: 'auto'
        }}
      >
        <div className="row">
          <div className="col-12">
            <div className="list py-1">
              {logEntries &&
                logEntries.map(entry => (
                  <List
                    key={entry._id}
                    entry={entry}
                    handleZoomFocus={handleZoomFocus}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
