import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";
import ShareButton from "./ShareButton";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  
  // This function adds styles to the active link
  const getNavLinkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="nav-header">
      <Link to="/" className="brand">
        Code<span className="brand-accent">Learn</span>
      </Link>
      <nav className="nav">
        <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
        <NavLink to="/visualizer" className={getNavLinkClass}>Visualizer</NavLink>
        <NavLink to="/pricing" className={getNavLinkClass}>Pricing</NavLink>
      </nav>
      <div className="actions">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        <ShareButton className="share-btn-nav" />
        <button className="login-btn" onClick={() => alert('Login coming soon!')}>Log in</button>
        <Link 
          to="/visualizer" 
          className="cta-btn"
        >
          Let's try
        </Link>
      </div>
    </header>
  );
}