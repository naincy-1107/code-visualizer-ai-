const API_BASE_URL = '/api'; // Using proxy from vite.config.js

// Fetch all algorithms
export const fetchAlgorithms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching algorithms:', error);
    throw error;
  }
};

// Fetch algorithm by ID
export const fetchAlgorithmById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching algorithm:', error);
    throw error;
  }
};

// Fetch algorithm by name
export const fetchAlgorithmByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms/name/${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching algorithm by name:', error);
    throw error;
  }
};

// Visualize algorithm execution
export const visualizeAlgorithm = async (algorithm, input) => {
  try {
    const response = await fetch(`${API_BASE_URL}/visualize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ algorithm, input }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error visualizing algorithm:', error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

