import { useState, useEffect } from 'react';
import { FaCogs, FaEye, FaKeyboard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchAlgorithms } from '../services/api';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [popularAlgorithms, setPopularAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAlgorithms = async () => {
      try {
        setLoading(true);
        const algorithms = await fetchAlgorithms();
        // Map backend algorithms to display names
        const algorithmNames = algorithms.map(algo => algo.name);
        setPopularAlgorithms(algorithmNames);
        setError(null);
      } catch (err) {
        console.error('Failed to load algorithms:', err);
        setError('Failed to load algorithms. Using default list.');
        // Fallback to default list
        setPopularAlgorithms([
          "Two Sum",
          "Dijkstra's Algorithm",
          "Merge Sort",
          "Binary Search",
          "Floyd Warshall",
          "Quick Sort",
          "DFS / BFS",
          "Palindrome Check",
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadAlgorithms();
  }, []);

  // Function to handle clicking an algorithm
  const handleAlgoClick = (algoName) => {
    // Navigate to the visualizer page with the algorithm name as a query parameter
    navigate(`/visualizer?algo=${encodeURIComponent(algoName)}`);
  };

  return (
    <main className="home">
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="blob blob-left" />
        <div className="blob blob-right" />
        <span className="beta-badge">
          🚀 Free Beta Access
        </span>

        {/* Title */}
        <h1 className="hero-title">
          Learn <span className="accent">Programming</span> Visually
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Describe any algorithm or coding problem and watch it come alive with visual charts, live variables, and step-by-step execution.
        </p>
         {/* This button now navigates on click */}
         <button 
           onClick={() => navigate('/visualizer')}
           className="hero-cta"
         >
           Let's try
         </button>

        {/* Hero Illustration */}
        <div className="hero-illustration">
         <img src="project.2.webp" alt="" />
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION (Unchanged) */}
      <section className="how-it-works">
        {/* ... (section content is unchanged) ... */}
      </section>

      {/* 3. POPULAR ALGORITHMS SECTION (Now interactive) */}
      <section className="popular-section">
        <h2 className="popular-title">Popular Algorithms</h2>
        <p className="popular-subtitle">
          Tap on one to generate a visual explanation.
        </p>

        <div className="popular-list">
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Loading algorithms...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', color: '#ff6b6b' }}>{error}</p>
          ) : (
            popularAlgorithms.map((algo) => (
              <button
                key={algo}
                onClick={() => handleAlgoClick(algo)}
                className="popular-item"
              >
                {algo}
              </button>
            ))
          )}
        </div>
      </section>
    </main>
  );
}