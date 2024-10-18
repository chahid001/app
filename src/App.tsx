// src/App.tsx

import React, { useState } from 'react';
import './App.css';
import Confetti from 'react-confetti';

import Agdal from './assets/agdal.jpg';
import hay from './assets/hay_ryad.jpg';
import panda from './assets/panda.jpg';
import oh from './assets/ohmybun.jpg';
import vi from './assets/view.jpg';
import capa from './assets/capa.jpg';
import little from './assets/little.jpg';
import darnaji from './assets/darnaji.jpg';
import darfawakih from './assets/darfawakih.jpg';


const App: React.FC = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Birthday message
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(true);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Selections
  const [selectedPlace, setSelectedPlace] = useState<'Agdal 🌌' | 'Hay Ryad 🌃' | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Receipt state
  const [receiptGenerated, setReceiptGenerated] = useState(false);

  // Predefined login credentials
  const predefinedUsername = 'hubby';
  const predefinedPassword = 'malak';

  // Handles login
  const handleLogin = (username: string, password: string) => {
    if (username === predefinedUsername && password === predefinedPassword) {
      setIsLoggedIn(true);
      setShowBirthdayMessage(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  // Handles Select Date button click
  const handleSelectDate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowBirthdayMessage(false); // Proceed to date selection
    }, 2000); // 2 seconds loading
  };

  // Handles Receipt Generation
  const handleGenerateReceipt = () => {
    setReceiptGenerated(true);
  };

  // Handles Reset
  const handleReset = () => {
    setSelectedPlace(null);
    setSelectedRestaurant(null);
    setSelectedCoffee(null);
    setSelectedColor(null);
    setReceiptGenerated(false);
  };

  // Data
  const places = [
    { name: 'Agdal 🌌', img: Agdal },
    { name: 'Hay Ryad 🌃', img: hay },
  ];

  // Restaurants by place
  const restaurantsByPlace: { [key in 'Agdal 🌌' | 'Hay Ryad 🌃' ]: { name: string; img: string }[] } = {
    'Agdal 🌌': [
      { name: 'Dar AL Fawakih 🍉', img: darfawakih },
      { name: 'Cappani 🍝🇮🇹', img: capa },
      { name: 'Dar Naji 🥘🇲🇦', img: darnaji },
    ],
    'Hay Ryad 🌃': [
      { name: 'Oh My Bun 🍔', img: oh },
      { name: 'Panda Sushi 🍣🍜', img: panda },
      { name: 'View Hotel 🥂🌃', img: vi },
      { name: 'Little Mamma 🍝🇮🇹', img: little },
    ],
  };

  // Coffee shops by place

  const colors = ['Pink 🌸', 'Green 🌱', 'Red 🌹'];

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <h1>🔐 Login</h1>
        <input type="text" placeholder="Username" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button
          onClick={() =>
            handleLogin(
              (document.getElementById('username') as HTMLInputElement).value,
              (document.getElementById('password') as HTMLInputElement).value
            )
          }
        >
          Log In
        </button>
      </div>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="loading">
        <div className="hearts-animation">❤️💖💖 D9i9a w ana m3ak ✨💖❤️</div>
      </div>
    );
  }

  // Receipt Page
  if (receiptGenerated) {
    return (
      <div className="receipt">
        <h2>✨ A7sen date fl 3alam ✨</h2>
        <p><strong>Place:</strong> {selectedPlace} 🌿🌠</p>
        <p><strong>Restaurant:</strong> {selectedRestaurant} 🌌 </p>
        <p><strong>Color:</strong> {selectedColor} 💐</p>
        <p> 💞 Habby birthday Huby 💕</p>
        <button onClick={() => window.print()}>🖨️ Print Receipt</button>
        <button onClick={handleReset}>🔄 Start Over</button>
      </div>
    );
  }

  // Birthday Message
  if (showBirthdayMessage) {
    return (
      <div className="birthday-message">
        <Confetti />
        <h1>🎂 Happy Birthday! 🎉</h1>
        <p>Happy birthday lhubby dart 22 ans, I love u 💞, Kanbghik 💕, Je t'aime 💖</p>
        <button onClick={handleSelectDate}>🌠 Yala Khtari 🌉</button>
      </div>
    );
  }

  // Date Selection and further steps
  return (
    <div className="date-selection">
      {!selectedPlace ? (
        <div>
          <h2>🗓️ Yalla! Khtari our dream date 🥰 (mora mnkhdem nchaalah😭😭)</h2>
          <div className="places-carousel">
            {places.map((place) => (
              <div
                key={place.name}
                className="place-card"
                onClick={() => setSelectedPlace(place.name as 'Agdal 🌌' | 'Hay Ryad 🌃')}
              >
                <img src={place.img} alt={place.name} className="place-image" />
                <p>{place.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : !selectedRestaurant ? (
        <div>
          <h2>🍽️ Fin Bghat Hubby 💫 naklo f {selectedPlace}!</h2>
          <div className="options-grid">
            {restaurantsByPlace[selectedPlace].map((restaurant) => (
              <div
                key={restaurant.name}
                className="option-card"
                onClick={() => setSelectedRestaurant(restaurant.name)}
              >
                <img src={restaurant.img} alt={restaurant.name} className="option-image" />
                <p>{restaurant.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : !selectedColor ? (
        <div>
          <h2>🎨 Khtari chi color 🦊!</h2>
          <div className="options-grid">
            {colors.map((color) => (
              <div
                key={color}
                className="option-card"
                onClick={() => setSelectedColor(color)}
              >
                <div className="color-box" style={{ backgroundColor: color.toLowerCase() }}></div>
                <p>{color}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Yalla ha huwa recu dialk 🌷!</h2>
          <button onClick={handleGenerateReceipt}>🧾 Generate Receipt</button>
        </div>
      )}
    </div>
  );
};

export default App;
