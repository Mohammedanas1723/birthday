
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [showGift, setShowGift] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [typedText, setTypedText] = useState("");

  const messageRef = useRef(null);
  const audioRef = useRef(null);

  // =========================
  // BIRTHDAY MESSAGE
  // =========================

  const birthdayText =
    "Wishing you a very Happy Birthday! 🎂🥳 May this new year of your life bring you lots of happiness, success, laughter, and unforgettable memories. Keep smiling, keep shining, and always be the amazing person you are! ❤️";


  // =========================
  // TYPING EFFECT
  // =========================

  useEffect(() => {
    if (!showMessage) {
      setTypedText("");
      return;
    }

    let index = 0;

    const typing = setInterval(() => {
      setTypedText(birthdayText.slice(0, index));
      index++;

      if (index > birthdayText.length) {
        clearInterval(typing);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [showMessage]);


  // =========================
  // OPEN GIFT
  // =========================

  const handleGift = () => {
    setShowGift(false);

    // Start countdown
    setCountdown(3);

    setTimeout(() => {
      setCountdown(2);
    }, 1000);

    setTimeout(() => {
      setCountdown(1);
    }, 2000);

    setTimeout(() => {
      setCountdown("🎊 SURPRISE! 🎊");
    }, 3000);

    // Show surprise page
    setTimeout(() => {
      setCountdown(null);
      setShowSurprise(true);

      // Start music
      audioRef.current?.play();

      // Show message after 5 seconds
      setTimeout(() => {
        setShowMessage(true);

        // Scroll to message
        setTimeout(() => {
          messageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      }, 5000);
    }, 4000);
  };


  // =========================
  // BALLOONS
  // =========================

  const balloons = [
    "🎈",
    "🎈",
    "🎈",
    "🎈",
    "🎈",
  ];


  // =========================
  // CONFETTI
  // =========================

  const confetti = [
    "🎉",
    "✨",
    "🎊",
    "💖",
    "⭐",
    "🎉",
    "✨",
    "🎊",
  ];


  // =========================
  // MEMORIES
  // =========================

  const memories = [
    "/photos/pic1.jpeg",
    "/photos/pic2.jpeg",
    "/photos/pic3.jpeg",
  ];


  return (
    <div className="birthday-container music-background">

      {/* =========================
          MUSIC
      ========================= */}

      <audio ref={audioRef} loop>
        <source src="/audio.mp3" type="audio/mpeg" />
      </audio>


      {/* =================================================
          GIFT SCREEN
      ================================================= */}

      {showGift && (
        <div className="gift-screen">

          <div className="front-balloons">
            <span>🎈</span>
            <span>🎈</span>
            <span>🎈</span>
            <span>🎈</span>
            <span>🎈</span>
            <span>🎈</span>
          </div>


          <h1>
            🎉 Someone has a surprise for you! 🎉
          </h1>


          <p>
            There is a special birthday surprise waiting for you...
          </p>


          {/* Gift */}

          <div
            className="gift-box"
            onClick={handleGift}
          >
            <div className="gift-lid">
              🎁
            </div>

            <div className="gift-body">
              🎀
            </div>
          </div>


          <h2>
            🎁 Open Your Gift
          </h2>


          <button
            className="surprise-btn"
            onClick={handleGift}
          >
            ✨ Open Surprise ✨
          </button>

        </div>
      )}


      {/* =================================================
          COUNTDOWN
      ================================================= */}

      {!showGift && !showSurprise && countdown && (
        <div className="countdown-screen">

          <div className="countdown">
            {countdown}
          </div>

          <p>
            Get ready... 🎉
          </p>

        </div>
      )}


      {/* =================================================
          SURPRISE PAGE
      ================================================= */}

      {showSurprise && (
        <>

          {/* =========================
              CONFETTI
          ========================= */}

          <div className="confetti">

            {confetti.map((item, index) => (
              <span key={index}>
                {item}
              </span>
            ))}

          </div>


          {/* =========================
              BALLOONS
          ========================= */}

          <div className="balloons">

            {balloons.map((balloon, index) => (
              <span key={index}>
                {balloon}
              </span>
            ))}

          </div>


          {/* =========================
              SURPRISE HEADING
          ========================= */}

          <h1>
            🎊 SURPRISE! 🎊
          </h1>


          {/* =========================
              PHOTO
          ========================= */}

          <div className="photo-container">

            <div className="floating-hearts">
              <span>❤️</span>
              <span>💖</span>
              <span>💕</span>
              <span>💗</span>
              <span>❤️</span>
              <span>💖</span>
            </div>


            <img
              className="birthday-boy"
              src="/photos/pic2.jpeg"
              alt="Birthday Boy"
            />

          </div>


          {/* =========================
              CAKE
          ========================= */}

          <div className="cake">
            🎂
          </div>


          <h2>
            Happy Birthday Guru! 🥳
          </h2>


          <p>
            May your day be filled with happiness,
            laughter, and lots of amazing memories! ❤️
          </p>


          {/* =========================
              MEMORIES
          ========================= */}

          <section className="memories">

            <h2>
              📸 Our Memories
            </h2>


            <div className="gallery">

              {memories.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Memory ${index + 1}`}
                />
              ))}

            </div>

          </section>


          {/* =========================
              SPECIAL MESSAGE
          ========================= */}

          <section
            ref={messageRef}
            className="message-section"
          >

            <h2>
              💌 A Special Message
            </h2>


            {showMessage && (
              <div className="birthday-message">

                <h3>
                  Dear Brother ❤️
                </h3>


                <p className="typing-message">

                  {typedText}

                  <span className="cursor">
                    |
                  </span>

                </p>


                <h3>
                  Once again... Happy Birthday! 🎉🎂
                </h3>


                <button
                  onClick={() => setShowMessage(false)}
                >
                  🔒 Hide Message
                </button>

              </div>
            )}

          </section>


          {/* =========================
              GO BACK
          ========================= */}

          <button
            onClick={() => {

              setShowGift(true);
              setShowSurprise(false);
              setShowMessage(false);
              setCountdown(null);
              setTypedText("");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

            }}
          >
            🔙 Start Again
          </button>

        </>
      )}

    </div>
  );
}

export default App;

