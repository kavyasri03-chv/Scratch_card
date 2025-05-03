import React, { useRef, useState } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import emailjs from '@emailjs/browser';
import './ScratchCardPage.css';

const ScratchCardPage = () => {
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  const prizes = Array(70).fill(50).concat([75, 100, 125, 150, 175, 200]);

  const handleScratchComplete = () => {
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setPrize(randomPrize);
    setRevealed(true);

    setTimeout(() => {
      setShowForm(true);
    }, 2500);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
    .sendForm(
        'service_c7dnmef',
        'template_wv1chel',
        formRef.current,
        'XI4wBVr1j49mEuJhS'
      )
      .then(() => {
        alert('Form submitted successfully!');
      })
      .catch((error) => {
        alert('Failed to send message:', error.text);
      });
  };

  return (
    <div className="scratch-container">
      <div className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="heading">Tasty & Spicy</h1>
      </div>

      {!showForm && (
        <div className="scratch-card-center">
          <div className="scratch-card-wrapper">
            <ScratchCard
              width={300}
              height={300}
              image="/images/qr.png"
              finishPercent={40}
              onComplete={handleScratchComplete}
              brushSize={20}
            >
              <div className="scratch-content-layer">
                {revealed && (
                  <div className="reveal-amount">
                    <h2>🎉 You won ₹{prize}</h2>
                  </div>
                )}
              </div>
            </ScratchCard>
          </div>
        </div>
      )}

      {showForm && (
        <form ref={formRef} onSubmit={sendEmail} className="winner-form">
          <h3 className="form-heading">Claim Your Prize 🎁</h3>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="tel" name="mobile" placeholder="Mobile Number" required />
          <input type="tel" name="whatsapp" placeholder="WhatsApp Number" required />
          <input type="email" name="email" placeholder="Email ID" required />
          <input type="hidden" name="prize" value={prize} />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ScratchCardPage;
