import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} CodeLearn | Built with React
    </footer>
  );
}