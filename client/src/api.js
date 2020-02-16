const API_URL = 'http://localhost:1338';

export const listLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  const json = await response.json();

  return json;
};

export const createEntry = async entry => {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(entry)
  });
  const json = await response.json();

  return json;
};

export const listLogEntry = async id => {
  const response = await fetch(`${API_URL}/api/logs/${id}`);
  const json = await response.json();

  return json;
};
