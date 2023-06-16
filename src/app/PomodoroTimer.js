"use client";
import React, { useState, useEffect } from "react";

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

  return (
    <div className="text-lg mt-4">
      <div className="text-2xl mb-2 justify-center flex">Pomodoro Sayacı</div>
      <div className="bg-black rounded-lg p-4">
        <div className="text-center text-4xl font-bold mb-4">
          {formatTime(time)}
        </div>
        <div className="flex justify-center flex-wrap ">
          <button
            onClick={startTimer}
            disabled={isActive}
            className="bg-green-500 text-white px-6 py-2 rounded-lg mr-2 mb-2"
          >
            Başlat
          </button>
          <button
            onClick={stopTimer}
            disabled={!isActive}
            className="bg-red-500 text-white px-6 py-2 rounded-lg mr-2 mb-2"
          >
            Duraklat
          </button>
          <button
            onClick={resetTimer}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-2"
          >
            Sıfırla
          </button>
        </div>
        <div className="mt-4 flex gap-4  flex-wrap justify-center items-center ">
          <input
            type="number"
            value={customMinutes}
            restrictedPattern="[0-9]"
            onChange={handleCustomMinutesChange}
            placeholder="Dakika giriniz"
            className="border text-black border-gray-300 rounded-lg p-auto px-2 py-1 mr-2"
          />
          <input
            type="number"
            value={customSeconds}
            onChange={handleCustomSecondsChange}
            placeholder="Saniye giriniz"
            className="border text-black border-gray-300 rounded-lg p-auto px-2 py-1 mr-2"
          />
          <button
            onClick={setCustomTimer}
            className="bg-blue-500 text-white px-4 py-1  rounded-lg ml-2"
          >
            Ayarla
          </button>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
      {isAlertVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="bg-black bg-transparent rounded-lg p-8 text-center">
            <h2 className="text-2xl text-red-600 mb-4">Süre Doldu!</h2>
            <button
              onClick={closeTimerAlert}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
