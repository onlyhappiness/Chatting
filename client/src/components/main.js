import React from 'react';

const Main = () => {
  return (
    <div className="contents">
      <div class="hello" id="hello">
          <h1 class="bow">Hello~</h1>
          <h2 class="nickname">Somebody</h2>
        </div>
        
        <div class="weather" id="weather">
          weather
        </div>
        
        <div class="time" id="time">
          <h2 class="clock" id="clock">00:00:00</h2>
        </div>
        
        <div class="calendar" id="calendar">Calendar</div>
        
        <div class="todo" id="todo">TodoList</div>
    </div>
  )
};

export default Main;