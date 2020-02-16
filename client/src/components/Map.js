import React, { useState, useEffect, useCallback } from 'react';
import { YMaps, Placemark, Map, ZoomControl } from 'react-yandex-maps';
import Modal from './Modal';

const AppMap = ({ logEntries }) => {
  const [mapHeight, setMapHeight] = useState('');
  const [viewport, setViewport] = useState({
    width: '100vw',
    latitude: 56.9335521,
    longitude: 60.5000351
  });

  const [showModal, setShowModal] = useState(false);
  const [coords, setCoords] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);

  const changeViewPort = () => {
    const zoom = window.innerWidth < 768 ? 2.25 : 4.5;
    setViewport({
      ...viewport,
      zoom
    });
  };

  const changeMapHeight = () => {
    const mapHeight = window.innerWidth < 768 ? '240px' : '100vh';
    setMapHeight(mapHeight);
  };

  const resizeCallback = useCallback(() => {
    changeViewPort();
    changeMapHeight();
    // eslint-disable-next-line
  }, []);

  const handleZoomFocus = useCallback(
    e => {
      const { latitude, longitude } = e.detail;
      if (mapInstance) {
        mapInstance.setCenter([latitude, longitude], 8.9);
      }
    },
    [mapInstance]
  );

  useEffect(() => {
    resizeCallback();
    window.addEventListener('resize', resizeCallback);
    document.addEventListener('viewOnMap', e => handleZoomFocus(e));

    return () => {
      window.removeEventListener('resize', resizeCallback);
      document.removeEventListener('viewOnMap', e => handleZoomFocus(e));
    };
  }, [resizeCallback, mapInstance, handleZoomFocus]);

  return (
    <React.Fragment>
      <Modal
        style={{ display: showModal ? 'block' : 'none' }}
        coords={coords}
      />

      <YMaps>
        <Map
          defaultState={{
            center: [viewport.latitude, viewport.longitude],
            zoom: viewport.zoom
          }}
          height={mapHeight}
          width={viewport.width}
          instanceRef={inst => {
            setMapInstance(inst);

            if (inst && inst.events) {
              inst.events.add('click', e => {
                setCoords(e.get('coords'));
                setShowModal(true);
              });
            }
          }}
        >
          {logEntries &&
            logEntries.map(entry => {
              const {
                _id,
                comments,
                latitude,
                longitude,
                title,
                visitDate
              } = entry;

              return (
                <Placemark
                  key={_id}
                  geometry={[latitude, longitude]}
                  properties={{
                    balloonContentHeader: title,
                    balloonContentBody: `${
                      comments ? comments + '<br>' : ''
                    }${new Date(visitDate).toLocaleDateString()}`
                  }}
                  modules={['geoObject.addon.balloon']}
                />
              );
            })}
          <ZoomControl options={{ float: 'left' }} />
        </Map>
      </YMaps>
    </React.Fragment>
  );
};

export default AppMap;
