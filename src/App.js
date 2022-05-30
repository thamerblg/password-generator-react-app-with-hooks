import React, { useState } from "react";
import "./App.css";
import { FaRegCopy } from "react-icons/fa";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [incUpperLettre, setIncUpperLettre] = useState(false);
  const [incLowerLettre, setIncLowerLettre] = useState(false);
  const [incNumber, setIncNumber] = useState(false);
  const [incSymbol, setIncSymbol] = useState(false);
  const [msgError, setMsgError] = useState(false);
  const [password, setPassword] = useState("");

  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const UpperLettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!#$%&()*+,-./:;<=>?@^[\\]^_`{|}~";

  let validChars = "";

  const handelClick = () => {
    if (incLowerLettre) {
      validChars += lowerLetters;
    }
    if (incUpperLettre) {
      validChars += UpperLettres;
    }
    if (incNumber) {
      validChars += numbers;
    }
    if (incSymbol) {
      validChars += symbols;
    }

    let generatedPassword = "";
    if (!incLowerLettre && !incUpperLettre && !incNumber && !incSymbol) {
      setMsgError(true);
      setTimeout(() => {
        setMsgError(false);
      }, 3000);
    } else {
      for (let i = 0; i < passwordLength; i++) {
        const index = Math.floor(Math.random() * validChars.length);
        generatedPassword += validChars[index];
      }
      setPassword(generatedPassword);
    }
  };

  return (
    <div className="container">
      <h1 className="text">
        Random Password Generator <br />
        With React
      </h1>
      <div className="input-data">
        <div className="settings">
          <div className="input-condition">
            <label>Length</label>
            <input
              type="number"
              id="length"
              value={passwordLength}
              min="4"
              max="16"
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div className="input-condition">
            <label>Include Uppercase Lettre</label>
            <input
              type="checkbox"
              value={false}
              onChange={() => setIncUpperLettre(!incUpperLettre)}
            />
          </div>
          <div className="input-condition">
            <label>Include Lowercase Lettre</label>
            <input
              type="checkbox"
              value={false}
              onChange={() => setIncLowerLettre(!incLowerLettre)}
            />
          </div>
          <div className="input-condition">
            <label>Include Numbers</label>
            <input
              type="checkbox"
              value={false}
              onChange={() => setIncNumber(!incNumber)}
            />
          </div>
          <div className="input-condition">
            <label>Include Symbols</label>
            <input
              type="checkbox"
              value={false}
              onChange={() => setIncSymbol(!incSymbol)}
            />
          </div>
          {msgError ? (
            <span>You must check one of this setting below</span>
          ) : null}
        </div>
        <button onClick={() => handelClick()}>Generate Password</button>

        <div className="display">
          <input type="text" value={password} readOnly />
          {password && (
            <span>
              <FaRegCopy
                onClick={() => {
                  navigator.clipboard.writeText(password);
                }}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
