import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventMessage, setEventMessage] = useState('');
  const [events, setEvents] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDay = new Date(year, month, 1).getDay();

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/calendar/event/${year}/${String(month + 1).padStart(2, '0')}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const eventMap = {};
      response.data.forEach((event) => {
        eventMap[event.date] = {
          message: event.message,
          notified: false
        };
      });

      setEvents(eventMap);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async () => {
    if (selectedDay && eventMessage.trim() !== '') {
      const eventDate = new Date(year, month, selectedDay);
      const dateKey = formatDateKey(eventDate);
      const token = localStorage.getItem("token");

      try {
        await axios.post('http://localhost:8000/api/calendar/event', {
          date: dateKey,
          message: eventMessage
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const updatedEvents = {
          ...events,
          [dateKey]: {
            message: eventMessage,
            notified: false
          }
        };

        setEvents(updatedEvents);

        setNotifications([...notifications, {
          type: 'success',
          message: `Event added for ${monthNames[month]} ${selectedDay}, ${year}`
        }]);

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        setIsAddingEvent(false);
        setEventMessage('');
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [month, year]);

  const renderCalendar = () => {
    const calendar = [];
    let date = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          row.push(<td key={j}></td>);
        } else if (date > daysInMonth) {
          break;
        } else {
          const current = new Date(year, month, date);
          const isToday = current.toDateString() === today.toDateString();
          const dateKey = formatDateKey(current);
          const hasEvent = events[dateKey];

          row.push(
            <td
              key={j}
              className={`border p-2 cursor-pointer text-center rounded-md transition duration-200 ease-in-out 
                ${isToday ? 'bg-blue-200' : ''} 
                ${hasEvent ? 'bg-green-100' : ''}`}
              onClick={() => {
                setSelectedDay(date);
                setIsAddingEvent(true);
                setEventMessage(events[dateKey]?.message || '');
              }}
            >
              {date}
              {hasEvent && <div className="text-xs text-gray-600">{events[dateKey].message}</div>}
            </td>
          );
          date++;
        }
      }

      calendar.push(<tr key={i}>{row}</tr>);
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-blue-500 hover:underline">Prev</button>
        <h2 className="text-xl font-semibold">{monthNames[month]} {year}</h2>
        <button onClick={handleNextMonth} className="text-blue-500 hover:underline">Next</button>
      </div>

      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
              <th key={day} className="border p-2 bg-gray-100">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>

      {isAddingEvent && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            value={eventMessage}
            onChange={(e) => setEventMessage(e.target.value)}
            placeholder="Event message"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={addEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Event
          </button>
        </div>
      )}

      {showNotification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow-md transition">
          {notifications[notifications.length - 1]?.message}
        </div>
      )}
    </div>
  );
};

export default Calendar;
