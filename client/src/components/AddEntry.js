import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createEntry } from '../api';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AddEntry = () => {
  const query = useQuery();
  const latitude = query.get('lat');
  const longitude = query.get('long');

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const onSubmit = async data => {
    try {
      setLoading(true);

      if (!latitude && !longitude) {
        await createEntry(data);
      } else {
        await createEntry({
          ...data,
          latitude,
          longitude
        });
      }

      history.push('/');
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            ref={register}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            name="description"
            rows={2}
            ref={register}
          />
        </div>
        {!latitude && !longitude ? (
          <div className="form-row mb-3">
            <div className="col">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                className="form-control"
                name="latitude"
                ref={register}
              />
            </div>
            <div className="col">
              <label htmlFor="latitude">Longitude</label>
              <input
                type="text"
                className="form-control"
                name="longitude"
                ref={register}
              />
            </div>
          </div>
        ) : null}

        {/* <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            ref={register}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="visitDate">Visit Date</label>
          <input
            type="date"
            className="form-control"
            name="visitDate"
            required
            ref={register}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          Add Entry
        </button>
      </form>

      <Link to="/" className="btn btn-success mt-4 d-block">
        Back
      </Link>
    </div>
  );
};

export default AddEntry;
