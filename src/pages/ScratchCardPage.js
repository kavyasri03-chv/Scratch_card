import React, { useRef, useState } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import emailjs from '@emailjs/browser';
import './ScratchCardPage.css';

const ScratchCardPage = () => {
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
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
        setShowPopup(true);
        formRef.current.reset();
        setTimeout(() => setShowPopup(false), 1000);
      })
      .catch((error) => {
        alert('Failed to send message:', error.text);
      });
  };

  return (
    <div className="scratch-container">
      <div className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="heading">KARAM SETTY'S</h1>
      </div>

      {!showForm && (
        <>
          
          <div className="scratch-card-center">
            <div className="scratch-card-wrapper">
              <ScratchCard
                width={300}
                height={300}
                image="/images/qr1.png"
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
          <p className="scratch-description">
            <p className="xx">Scratch & Win! </p><br />
            Try your luck with our scratch card! Unbelievable offers and discounts are just a scratch away. 
            Your fortunate deal awaits - give it a go!
          </p>
        </>
      )}

      {showForm && (
        <form ref={formRef} onSubmit={sendEmail} className="winner-form">
          <h3 className="form-heading">Claim Your Prize 🎁</h3>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="tel" name="mobile" placeholder="Mobile Number" required />
          <input type="text" name="distributor_name" placeholder="Distributor Name" required />
          <input type="hidden" name="prize" value={prize} />
          <button type="submit">Submit</button>
        </form>
      )}

      {showPopup && (
        <div className="popup-success">
          🎉 Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default ScratchCardPage;
