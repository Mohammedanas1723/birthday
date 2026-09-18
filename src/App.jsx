import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  // =========================
  // STATES
  // =========================

  const [showGift, setShowGift] = useState(true);
  const [giftOpening, setGiftOpening] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [videoFinished, setVideoFinished] = useState(false);

  // =========================
  // REFS
  // =========================

  const messageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // =========================
  // BIRTHDAY MESSAGE
  // =========================

  const birthdayText =
    "Happy Birthday to the best brother ever! ❤️🎂 Thank you for always being there for me, supporting me, and making life more fun. May you always stay happy, healthy, and successful. Wishing you a beautiful year filled with lots of happiness and amazing memories. 🥳💙";

  // =========================
  // TYPEWRITER EFFECT
  // =========================

  useEffect(() => {
    if (!showMessage) {
      setTypedText("");
      return;
    }

    let index = 0;

    const typing = setInterval(() => {
      index++;

      setTypedText(
        birthdayText.slice(0, index)
      );

      // Message finished typing
      if (index >= birthdayText.length) {
        clearInterval(typing);

        // Wait 2 seconds and scroll to video
        setTimeout(() => {
          const videoSection =
            document.getElementById("memory-video");

          if (!videoSection) {
            console.log(
              "Video section not found"
            );
            return;
          }

          console.log(
            "Scrolling to video..."
          );

          videoSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Stop background music
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }

          // Try to start video
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current
                .play()
                .then(() => {
                  console.log(
                    "Video started playing"
                  );
                })
                .catch((error) => {
                  console.log(
                    "Video autoplay blocked:",
                    error
                  );
                });
            }
          }, 1000);
        }, 2000);
      }
    }, 50);

    return () => {
      clearInterval(typing);
    };
  }, [showMessage]);

  // =========================
  // OPEN GIFT
  // =========================

  const handleGift = () => {
    if (giftOpening) return;

    setGiftOpening(true);

    // Gift animation
    setTimeout(() => {
      setShowGift(false);

      // Countdown 3
      setCountdown(3);

      // Countdown 2
      setTimeout(() => {
        setCountdown(2);
      }, 1000);

      // Countdown 1
      setTimeout(() => {
        setCountdown(1);
      }, 2000);

      // Surprise text
      setTimeout(() => {
        setCountdown("🎊 SURPRISE! 🎊");
      }, 3000);

      // Show surprise
      setTimeout(() => {
        setCountdown(null);
        setShowSurprise(true);

        // Start birthday music
        if (audioRef.current) {
          audioRef.current.currentTime = 0;

          audioRef.current
            .play()
            .catch(() => {
              console.log(
                "Music requires user interaction."
              );
            });
        }

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
    }, 1000);
  };

  // =========================
  // START AGAIN
  // =========================

  const handleStartAgain = () => {
    // Stop music
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Stop video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    // Reset everything
    setShowGift(true);
    setGiftOpening(false);
    setShowSurprise(false);
    setCountdown(null);
    setShowMessage(false);
    setTypedText("");
    setVideoFinished(false);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
  // JSX
  // =========================

  return (
    <div className="birthday-container music-background">

      {/* =========================
          BACKGROUND MUSIC
      ========================= */}

      <audio ref={audioRef} loop>
        <source
          src="/audio.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* =========================
          GIFT SCREEN
      ========================= */}

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
            There is a special birthday surprise
            waiting for you...
          </p>

          {/* Gift */}
          <div
            className={`gift-box ${
              giftOpening
                ? "gift-opening"
                : ""
            }`}
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
            disabled={giftOpening}
          >
            {giftOpening
              ? "✨ Opening..."
              : "✨ Open Surprise ✨"}
          </button>

        </div>
      )}

      {/* =========================
          COUNTDOWN
      ========================= */}

      {!showGift &&
        !showSurprise &&
        countdown && (
          <div className="countdown-screen">

            <div className="countdown">
              {countdown}
            </div>

            <p>
              Get ready... 🎉
            </p>

          </div>
        )}

      {/* =========================
          SURPRISE SCREEN
      ========================= */}

      {showSurprise && (
        <>

          {/* Confetti */}
          <div className="confetti">
            {confetti.map(
              (item, index) => (
                <span key={index}>
                  {item}
                </span>
              )
            )}
          </div>

          {/* Balloons */}
          <div className="balloons">
            {balloons.map(
              (balloon, index) => (
                <span key={index}>
                  {balloon}
                </span>
              )
            )}
          </div>

          {/* Main Heading */}
          <h1>
            🎊 SURPRISE! 🎊
          </h1>

          {/* Birthday Photo */}
          <img
            className="birthday-boy"
            src="/photos/pic2.jpeg"
            alt="Birthday Boy"
          />

          {/* Cake */}
          <div className="cake">
            🎂
          </div>

          {/* Birthday Heading */}
          <h2>
            Happy Birthday Anna! 🥳
          </h2>

          <p>
            May your day be filled with
            happiness, laughter, and lots
            of amazing memories! ❤️
          </p>

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
                  Once again...
                  Happy Birthday! 🎉🎂
                </h3>

              </div>
            )}

          </section>

          {/* =========================
              MEMORY VIDEO
          ========================= */}

          <section
            id="memory-video"
            className="memories"
          >

            <h2>
              🎬 Our Memories
            </h2>

            <div className="memory-video">

              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"

                // Stop background music
                // when video starts
                onPlay={() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}

                // Show Enjoy Your Day
                // when video ends
                onEnded={() => {
                  console.log(
                    "VIDEO FINISHED!"
                  );

                  setVideoFinished(true);
                }}
              >

                <source
                  src="/memories.mp4"
                  type="video/mp4"
                />

                Your browser does not
                support the video tag.

              </video>

            </div>

            {/* =========================
                ENJOY YOUR DAY MESSAGE
            ========================= */}

            {videoFinished && (
              <div className="enjoy-message">

                <h2>
                  🎉 Enjoy Your Day! 🎂❤️
                </h2>

                <p>
                  Keep smiling, keep shining,
                  and make lots of beautiful
                  memories! 🥳💙
                </p>

              </div>
            )}

          </section>

          {/* =========================
              START AGAIN
          ========================= */}

          <button
            className="start-again-btn"
            onClick={handleStartAgain}
          >
            🔄 Start Again
          </button>

        </>
      )}

    </div>
  );
}

export default App;