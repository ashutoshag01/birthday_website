import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memoryMessages = [
  "Can't believe it was the start of our journey",
  "Our famous girl, super start",
  "Any call to Nature and she is ready to go",
  "Your devotion never ceases to amaze me",
  "I don't know what you guys are laughing on but it's really cherishable",
  "Your passion for dance is contagious",
  "I always looks at this picture and gets inspired how amazing you are",
  "One who can create a group wherever she goes",
  "You look so beautiful in every dress",
  "You are as chirpy as a bird",
  "One who always likes to pose",
  "Our first coffee date, I remember you were showing me your travel list",
  "When we used to video calls initially",
  "You look stunning in every dress, but this one holds a special place in my heart",
  "Always ready for a picture and you are able to make it perfect",
  "How can one not get lost in your eyes",
  "In that moment I never wanted to let you go",
  "One who never fails to make me laugh",
  "Always clicking picture and turning them in a masterpiece",
  "My comfort place, I promise to always hold it like this",
  "Dadu is best so was the card you made"
];

const placeholderImages = Array.from({ length: 21 }, (_, i) => `/images/Photo${i}.jpg`);

const stars = Array.from({ length: 21 }, (_, i) => ({
  id: i,
  x: Math.random() * 90 + 5,
  y: Math.random() * 85 + 5,
  memory: `Memory ${i + 1}`,
  description: memoryMessages[i % memoryMessages.length],
  image: placeholderImages[i],
}));

export default function InteractiveUniverse() {
  const [selectedStar, setSelectedStar] = useState(null);
  const [started, setStarted] = useState(false);
  const [imageInput, setImageInput] = useState("");

  const handleImageSave = () => {
    if (selectedStar) {
      selectedStar.image = imageInput;
      setSelectedStar({ ...selectedStar });
      setImageInput("");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundImage: 'url(https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <audio autoPlay loop>
        <source src="https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {!started && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white z-30">
          <div className="w-32 h-32 rounded-full bg-white mb-6 overflow-hidden">
            <img
              src="/images/Profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Happy Birthday, Meri Jaan</h2>
          <p className="text-center max-w-md mb-6 px-4">
            I've created a little universe filled with memories and moments just for you. Click below to explore the stars.
          </p>
          <button
            className="px-6 py-2 bg-white text-black rounded-full font-semibold"
            onClick={() => setStarted(true)}
          >
            Begin the Journey
          </button>
        </div>
      )}

      {started && (
        <>
          <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold z-10">
            Sonal's Universe
          </h1>
          <div className="absolute inset-0">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute w-3 h-3 rounded-full bg-white cursor-pointer"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: star.id * 0.01 }}
                onClick={() => setSelectedStar(star)}
              />
            ))}
          </div>

          <AnimatePresence>
            {selectedStar && (
              <motion.div
                className="absolute left-1/2 top-1/2 bg-white rounded-2xl p-6 text-black w-80 z-20 shadow-2xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <h2 className="text-xl font-bold mb-2">{selectedStar.memory}</h2>
                <p className="text-sm mb-2">{selectedStar.description}</p>

                {selectedStar.image && (
                  <img
                    src={selectedStar.image}
                    alt="Memory"
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <button
                  className="w-full px-4 py-2 bg-black text-white rounded"
                  onClick={() => setSelectedStar(null)}
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
