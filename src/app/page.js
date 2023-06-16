import React from "react";
import PomodoroTimer from "./PomodoroTimer";
import Todo from "./Todo";
import SocialIcons from "./SocialIcons";

function HomePage() {
  return (
    <div>
      <Todo />
      <PomodoroTimer />
      <SocialIcons />
    </div>
  );
}

export default HomePage;
