import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAlgorithmByName, visualizeAlgorithm, fetchAlgorithms } from '../services/api';
import Flowchart from '../components/Flowchart';
import './Visualizer.css';

export default function Visualizer() {
  const [searchParams] = useSearchParams();
  const algoName = searchParams.get('algo');
  
  const [algorithmData, setAlgorithmData] = useState(null);
  const [visualizationData, setVisualizationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const [isVisualizing, setIsVisualizing] = useState(false);

  useEffect(() => {
    if (algoName) {
      loadAlgorithmData();
    }
  }, [algoName]);

  const loadAlgorithmData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading algorithm data for:', algoName);
      
      // Try to find algorithm by name from the list
      const algorithms = await fetchAlgorithms();
      console.log('Fetched algorithms:', algorithms);
      
      const foundAlgo = algorithms.find(algo => 
        algo.name.toLowerCase() === algoName.toLowerCase()
      );
      
      console.log('Found algorithm:', foundAlgo);
      
      if (foundAlgo) {
        setAlgorithmData(foundAlgo);
        // Set default input based on algorithm type
        if (foundAlgo.category === 'sorting') {
          setInput('[5, 2, 8, 1, 9, 3]');
        } else if (foundAlgo.category === 'searching') {
          setInput('5');
        }
      } else {
        console.warn('Algorithm not found in backend, using fallback');
        // If not found in backend, create a mock object
        setAlgorithmData({
          name: algoName,
          category: 'general',
          description: 'Algorithm visualization'
        });
      }
    } catch (err) {
      console.error('Failed to load algorithm:', err);
      setError('Failed to load algorithm data. Please check that the backend is running.');
      // Still set basic data for visualization
      setAlgorithmData({
        name: algoName,
        category: 'general'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVisualize = async () => {
    if (!algoName || !input.trim()) {
      setError('Please provide input for visualization');
      return;
    }

    try {
      setIsVisualizing(true);
      setError(null);
      const result = await visualizeAlgorithm(algoName, input);
      setVisualizationData(result);
    } catch (err) {
      console.error('Failed to visualize:', err);
      setError('Failed to generate visualization. Please try again.');
    } finally {
      setIsVisualizing(false);
    }
  };

  return (
    <section className="visualizer">
      <h2 className="visualizer-title">Algorithm Visualizer</h2>
      
      {loading && (
        <p className="visualizer-subtitle">Loading algorithm data...</p>
      )}

      {algoName ? (
        <>
          <p className="visualizer-subtitle">
            You are now visualizing: <strong className="accent">{algoName}</strong>
          </p>
          
          {algorithmData && (
            <div className="algorithm-info">
              <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#111827' }}>
                Algorithm Details
              </h3>
              <p><strong>Category:</strong> {algorithmData.category || 'General'}</p>
              {algorithmData.description && (
                <p><strong>Description:</strong> {algorithmData.description}</p>
              )}
              {algorithmData.complexity && (
                <div className="complexity-info">
                  <p><strong>Time Complexity:</strong> <code style={{ color: '#4f46e5' }}>{algorithmData.complexity.time}</code></p>
                  <p><strong>Space Complexity:</strong> <code style={{ color: '#4f46e5' }}>{algorithmData.complexity.space}</code></p>
                </div>
              )}
            </div>
          )}

          <div className="input-section">
            <label htmlFor="input-field">
              <strong>Input:</strong>
            </label>
            <input
              id="input-field"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input (e.g., [5, 2, 8, 1, 9, 3] for sorting)"
              className="input-field"
            />
            <button 
              onClick={handleVisualize} 
              disabled={isVisualizing || !input.trim()}
              className="visualize-button"
            >
              {isVisualizing ? 'Visualizing...' : 'Visualize'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {visualizationData && (
            <>
              <div className="visualization-result">
                <h3>Visualization Result</h3>
                <div className="visualization-content">
                  <pre>{JSON.stringify(visualizationData, null, 2)}</pre>
                  {visualizationData.data && visualizationData.data.steps && (
                    <div className="steps-container">
                      <h4>Execution Steps:</h4>
                      <ul>
                        {visualizationData.data.steps.map((step, index) => (
                          <li key={index}>{JSON.stringify(step)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Flowchart Section */}
              {visualizationData.data && visualizationData.data.flowchart && (
                <Flowchart 
                  flowchartData={visualizationData.data.flowchart}
                  algorithmName={algoName}
                />
              )}
            </>
          )}
        </>
      ) : (
        <p className="visualizer-subtitle">
          This is where you can interactively visualize algorithms. Select one from the homepage to get started!
        </p>
      )}

      <div className="visualizer-box">
        {!visualizationData && (
          <span className="visualizer-placeholder">
            🔮 Enter input and click "Visualize" to see the algorithm execution steps.
          </span>
        )}
      </div>
    </section>
  );
}