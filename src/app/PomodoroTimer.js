"use client";
import React, { useState, useEffect } from "react";
import "./SocialIcons.css";

const PomodoroTimer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");
  const [customSeconds, setCustomSeconds] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alarmAudio, setAlarmAudio] = useState(null);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      showTimerAlert();
      playAlarmSound();
    }

    return () => {
      clearInterval(interval);
      stopAlarmSound();
    };
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setTime(1500); // Reset to 25 minutes
    setIsActive(false);
    setIsAlertVisible(false);
  };

  const handleCustomMinutesChange = (event) => {
    const value = event.target.value.trim();
    setCustomMinutes(value === "" ? "" : parseInt(value, 10));
    setErrorMessage("");
  };

  const handleCustomSecondsChange = (event) => {
    const value = event.target.value.trim();
    setCustomSeconds(value === "" ? "" : parseInt(value, 10));
    setErrorMessage("");
  };

  const setCustomTimer = () => {
    const minutes = parseInt(customMinutes, 10);
    const seconds = parseInt(customSeconds, 10);

    if (isNaN(minutes) && isNaN(seconds)) {
      setErrorMessage("Please enter valid minutes or seconds");
    } else {
      const totalSeconds =
        (isNaN(minutes) ? 0 : minutes * 60) + (isNaN(seconds) ? 0 : seconds);
      setTime(totalSeconds);
      setCustomMinutes("");
      setCustomSeconds("");
      setIsActive(false);
      setErrorMessage("");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const playAlarmSound = () => {
    const audio = new Audio("alarm.mp3");
    audio.loop = true;
    audio.play();
    setAlarmAudio(audio);
  };

  const stopAlarmSound = () => {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }
  };

  const showTimerAlert = () => {
    setIsAlertVisible(true);
  };

  const closeTimerAlert = () => {
    alarmAudio.pause();
    setIsAlertVisible(false);
  };

  const setTimerDuration = (durationInSeconds) => {
    setTime(durationInSeconds);
    setIsActive(false);
  };

  return (
    <div className="text-lg mt-4">
      <div className="text-2xl mb-2 justify-center flex">Pomodoro Timer</div>
      <div className="text-center text-4xl font-bold mb-4">
        {formatTime(time)}
      </div>
      <div className="flex justify-center flex-wrap ">
        <button
          onClick={startTimer}
          disabled={isActive}
          className="bg-green-500 text-white px-6 py-2 rounded-lg mr-2 mb-2 w-24 hover:bg-green-700 transition-colors duration-300"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={!isActive}
          className="bg-red-500 text-white px-6 py-2 rounded-lg mr-2 mb-2 w-24 hover:bg-red-700 transition-colors duration-300"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-2 mb-2 w-24 hover:bg-orange-400 transition-colors duration-300"
        >
          Reset
        </button>
      </div>
      <div className="flex justify-center flex-wrap ">
        <button
          onClick={() => setTimerDuration(300)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 mb-2 w-24 hover:bg-green-600 transition-colors duration-300"
        >
          5 min
        </button>
        <button
          onClick={() => setTimerDuration(1500)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 mb-2 w-24 hover:bg-green-600 transition-colors duration-300"
        >
          25 min
        </button>
        <button
          onClick={() => setTimerDuration(2400)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 mb-2 w-24 hover:bg-green-600 transition-colors duration-300"
        >
          40 min
        </button>
      </div>
      <div className="bg-black rounded-lg ">
        <div className=" flex  flex-wrap justify-center ">
          <input
            type="number"
            value={customMinutes}
            restrictedPattern="[0-9]"
            onChange={handleCustomMinutesChange}
            placeholder="min"
            className="border text-black border-gray-300 text-center rounded-lg px-2 py-2 w-24 mr-2 mb-2 "
          />
          <input
            type="number"
            value={customSeconds}
            onChange={handleCustomSecondsChange}
            placeholder="sec"
            className="border text-black border-gray-300 text-center rounded-lg px-2 py-2 w-24 mr-2 mb-2"
          />
          <button
            onClick={setCustomTimer}
            className="bg-blue-500 text-white rounded-lg px-6 py-2 w-24 mr-2 mb-2 hover:bg-orange-400 transition-colors duration-300"
          >
            Set
          </button>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
      {isAlertVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-80 rounded-lg p-8 text-center">
            <h2 className="text-2xl text-red-600 mb-4">Time is up!</h2>
            <button
              onClick={closeTimerAlert}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg  hover:bg-green-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
