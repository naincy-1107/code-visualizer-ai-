import './Pricing.css';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section className="pricing">
      <h2 className="pricing-title">Pricing Plans</h2>
      <p className="pricing-subtitle">Choose a plan that fits your learning journey.</p>
      
      <div className="pricing-grid">
        <div className="pricing-card">
          <h3 className="pricing-card-title">Free</h3>
          <p className="pricing-card-text">Access to basic algorithm visualizations.</p>
          <p className="pricing-card-price">$0</p>
          <button className="btn-primary" onClick={() => navigate('/visualizer')}>Get Started</button>
        </div>
        
        <div className="pricing-card">
          <h3 className="pricing-card-title">Pro</h3>
          <p className="pricing-card-text">Advanced visualizations + quizzes.</p>
          <p className="pricing-card-price">$9/mo</p>
          <button className="btn-primary" onClick={() => alert('Subscription flow coming soon!')}>Subscribe</button>
        </div>

        <div className="pricing-card">
          <h3 className="pricing-card-title">Enterprise</h3>
          <p className="pricing-card-text">For teams, classrooms, and companies.</p>
          <p className="pricing-card-price">Custom</p>
          <button className="btn-primary" onClick={() => alert('We will contact you soon!')}>Contact Us</button>
        </div>
      </div>
    </section>
  );
}