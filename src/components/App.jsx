import { useState } from "react";

function App() {
  // State management
  const [password, setIsPassword] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    charNum: 10,
    upperCase: true,
    lowerCase: false,
    numbers: false,
    symbols: false,
  });

  // Handle chenge in the form data
  const handleChecked = (e) => {
    if (e.target.type === "range") {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const { name, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  // variabels for changing the fill of the range input.
  const min = 0;
  const max = 20;
  const percentage = ((formData.charNum - min) / (max - min)) * 100;
  // Available chars for password

  const allCharacters = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  // Handle generation of the password
  const handleGeneration = (e) => {
    e.preventDefault();

    let passwordCharacters = "";

    for (const [key, value] of Object.entries(formData)) {
      if (key === "charNum") continue;
      else if (value === true) passwordCharacters += allCharacters[key];
    }

    let generatedPassword = randomGeneration(
      passwordCharacters,
      formData.charNum,
    );

    setIsPassword(generatedPassword);
  };

  // Generation of the random password

  const randomGeneration = (chars, length) => {
    let arrayOfChars = chars.split("");
    let generated = "";

    for (let i = 0; i < length; i++) {
      generated +=
        arrayOfChars[Math.floor(Math.random() * arrayOfChars.length)];
    }

    return generated;
  };

  // SVG ICONS
  const copyIcon = (
    <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
      <path
        className="fill-green-200 group-hover:fill-white"
        d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
      />
    </svg>
  );
  const checkedMark = (
    <svg
      className="option-svg"
      width="14"
      height="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="#18171F"
        strokeWidth="3"
        fill="none"
        d="M1 5.607 4.393 9l8-8"
      />
    </svg>
  );

  return (
    <main className="mx-auto items-center justify-center w-[91.46%] max-w-135">
      <h1 className="preset-4 md:preset-2 text-grey-600 text-center mb-4 md:mb-8">
        Password Generator
      </h1>
      <section className="bg-grey-800 p-4 md:px-8 flex items-center justify-between mb-3 md:mb-6">
        <input
          className="preset-2 md:preset-1 placeholder:text-grey-700 text-grey-200 w-[70%] "
          type="text"
          name="password"
          id="password"
          placeholder="P4$5W0rD!"
          disabled
          value={password}
        />
        <div className="flex flex-row-reverse gap-2 items-center">
          <button className="group cursor-pointer">{copyIcon}</button>
          <p className="preset-4 md:preset-3 text-green-200 invisible opacity-0">
            COPIED
          </p>
        </div>
      </section>
      <form
        action="#"
        className="bg-grey-800 p-4 md:px-8 md:py-6 flex items-center justify-between flex-col gap-8"
      >
        <div className="w-full flex items-center justify-between flex-col">
          <p className="preset-4 md:preset-3 text-grey-200 flex items-center justify-between w-full mb-6 md:mb-8.75">
            Character Length <span className="value">{formData.charNum}</span>
          </p>
          <input
            type="range"
            name="charNum"
            id="charNum"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseEnter={() => setIsDragging(true)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            style={{
              background: `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${percentage}%, #18171f ${percentage}%, #18171f 100%)`,
            }}
            className={`range ${isDragging ? "[&::-webkit-slider-thumb]:bg-grey-850 [&::-webkit-slider-thumb]:border-green-200 [&::-moz-range-thumb]:bg-grey-850 [&::-moz-range-thumb]:border-green-200" : "[&::-webkit-slider-thumb]:bg-white  [&::-webkit-slider-thumb]:border-transparent [&::-moz-range-thumb]:bg-white  [&::-moz-range-thumb]:border-transparent"}`}
            min="0"
            max="20"
            value={formData.charNum}
            onChange={handleChecked}
            step="1"
          />
        </div>

        <div className="self-start flex flex-col gap-4">
          <label className="option-label" htmlFor="upperCase">
            <input
              type="checkbox"
              name="upperCase"
              id="upperCase"
              className="option-input peer"
              checked={formData.upperCase}
              onChange={handleChecked}
            />
            Include Uppercase Letters
            {checkedMark}
          </label>

          <label className="option-label" htmlFor="lowerCase">
            <input
              className="option-input peer"
              type="checkbox"
              name="lowerCase"
              id="lowerCase"
              checked={formData.lowerCase}
              onChange={handleChecked}
            />
            Include Lowercase Letters
            {checkedMark}
          </label>

          <label className="option-label" htmlFor="numbers">
            <input
              className="option-input peer"
              type="checkbox"
              name="numbers"
              id="numbers"
              checked={formData.numbers}
              onChange={handleChecked}
            />
            Include Numbers
            {checkedMark}
          </label>

          <label className="option-label" htmlFor="symbols">
            <input
              className="option-input peer"
              type="checkbox"
              name="symbols"
              id="symbols"
              checked={formData.symbols}
              onChange={handleChecked}
            />
            Include Symbols
            {checkedMark}
          </label>
        </div>

        <div className="w-full px-4 md:px-8 py-3.5 md:py-6 bg-grey-850 flex items-center justify-between">
          <p className="preset-4 md:preset-3 text-grey-600">STRENGTH</p>
          <div className="flex items-center gap-2">
            <span className="general-strength"></span>
            <span className="general-strength"></span>
            <span className="general-strength"></span>
            <span className="general-strength"></span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full group flex items-center justify-center gap-4 md:gap-6 bg-green-200 preset-4 md:preset-3 text-grey-800 py-4 md:py-6 hover:bg-transparent hover:text-green-200 hover:ring-2 hover:ring-inset hover:ring-green-200 cursor-pointer"
          onClick={handleGeneration}
        >
          GENERATE
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-grey-800 group-hover:fill-green-200"
              d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
            />
          </svg>
        </button>
      </form>
    </main>
  );
}

export default App;
