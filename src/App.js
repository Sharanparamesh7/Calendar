import React, { useState } from "react";
import "./App.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function App() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const generateCalendar = () => {
    const calendar = [];
    for (let i = 0; i < startDay; i++) {
      calendar.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(i);
    }
    return calendar;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const changeYear = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + offset);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    const eventName = prompt("Enter event name:");
    if (eventName) {
      const startTime = prompt("Enter start time (e.g., 10:00 AM):");
      const endTime = prompt("Enter end time (e.g., 11:00 AM):");
      const color = prompt("Enter a color (e.g., red, blue, green):", "blue");
      setEvents({
        ...events,
        [dateKey]: {
          name: eventName,
          time: `${startTime} - ${endTime}`,
          color: color || "blue",
        },
      });
    }
  };

  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const calendarDays = generateCalendar();

  return (
    <div className="app">
      <h1>React Calendar</h1>
      <div className="controls">
        <button onClick={() => changeYear(-1)}>⏪</button>
        <button onClick={() => changeMonth(-1)}>◀️</button>
        <span>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={() => changeMonth(1)}>▶️</button>
        <button onClick={() => changeYear(1)}>⏩</button>
      </div>

      <div className="calendar">
        {days.map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}

        {calendarDays.map((day, index) => {
          const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
          const event = events[dateKey];

          return (
            <div
              key={index}
              className={`day ${isToday(day) ? "today" : ""}`}
              onClick={() => day && handleDateClick(day)}
              style={{ backgroundColor: event ? event.color : undefined }}
            >
              {day}
              {event && (
                <div className="event">
                  <strong>{event.name}</strong><br />
                  <small>{event.time}</small>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
