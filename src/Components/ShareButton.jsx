import './ShareButton.css';

export default function ShareButton({ text = "Check out this awesome coding visualizer!", className = "" }) {
  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href;
    const shareText = `${text}\n${currentUrl}`;
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button 
      className={`whatsapp-share-btn ${className}`}
      onClick={handleWhatsAppShare}
      aria-label="Share on WhatsApp"
    >
      📱 Share on WhatsApp
    </button>
  );
}

