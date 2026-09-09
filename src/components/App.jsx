import { useState } from "react";

function App() {
  const [charNum, setCharNum] = useState(10);
  const [isDragging, setIsDragging] = useState(false);
  const min = 0;
  const max = 20;

  const percentage = ((charNum - min) / (max - min)) * 100;

  const handleCharNumChange = (e) => {
    setCharNum(Number(e.target.value));
  };

  const copyIcon = (
    <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
      <path
        className="fill-green-200 group-hover:fill-white"
        d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
      />
    </svg>
  );
  return (
    <main className="mx-auto items-center justify-center w-[91.46%] w-max-135">
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
        className="bg-grey-800 p-4 md:px-8 md:py-6 flex items-center justify-between flex-col"
      >
        <p className="preset-4 md:preset-3 text-grey-200 flex items-center justify-between w-full mb-6 md:mb-8.75">
          Character Length <span className="value">{charNum}</span>
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
          value={charNum}
          onChange={handleCharNumChange}
          step="1"
        />
      </form>
    </main>
  );
}

export default App;
