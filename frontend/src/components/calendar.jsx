// var calendar=require('node-calendar');
// var cal = new calendar.Calendar(calendar.SUNDAY);
// var yearCalendar = cal.yeardayscalendar(2025);
import React, { useState, useEffect } from 'react';

const EventCalendar = () => {
  // State variables
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventMessage, setEventMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Calculate current month details
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const currentDay = today.getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // Format date to YYYY-MM-DD string for event keys
  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
    setIsAddingEvent(false);
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
    setIsAddingEvent(false);
  };

  // Select a day
  const selectDay = (day) => {
    if (day > 0 && day <= daysInMonth) {
      setSelectedDay(day);
      const dateKey = formatDateKey(new Date(year, month, day));
      setEventMessage(events[dateKey]?.message || '');
      setIsAddingEvent(true);
    }
  };

  // Add event for selected day
  const addEvent = () => {
    if (selectedDay && eventMessage.trim() !== '') {
      const eventDate = new Date(year, month, selectedDay);
      const dateKey = formatDateKey(eventDate);
      
      const updatedEvents = {
        ...events,
        [dateKey]: {
          message: eventMessage,
          notified: false
        }
      };
      
      setEvents(updatedEvents);
      
      // Show confirmation
      setNotifications([...notifications, {
        type: 'success',
        message: `Event added for ${monthNames[month]} ${selectedDay}, ${year}`
      }]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
      // Close event form
      setIsAddingEvent(false);
      setEventMessage('');
    }
  };

  // Cancel adding event
  const cancelAddEvent = () => {
    setIsAddingEvent(false);
    setEventMessage('');
  };

  // Check for events happening in the next 24 hours
  const checkNotifications = () => {
    const now = new Date();
    
    Object.keys(events).forEach(dateKey => {
      const [y, m, d] = dateKey.split('-').map(Number);
      const eventDate = new Date(y, m - 1, d);
      
      // Calculate time difference in hours
      const timeDiff = (eventDate - now) / (1000 * 60 * 60);
      
      // If event is between 23 and 25 hours away and not yet notified
      if (timeDiff > 23 && timeDiff <= 25 && !events[dateKey].notified) {
        const newNotification = {
          type: 'event',
          message: `Event tomorrow (${eventDate.toDateString()}): "${events[dateKey].message}"`
        };
        
        setNotifications([...notifications, newNotification]);
        
        // Mark as notified
        const updatedEvents = {...events};
        updatedEvents[dateKey].notified = true;
        setEvents(updatedEvents);
        
        setShowNotification(true);
      }
    });
  };

  // Effect to check notifications periodically
  useEffect(() => {
    const timer = setInterval(checkNotifications, 60000); // Check every minute
    return () => clearInterval(timer);
  }, [events, notifications]);

  // Generate calendar days
  const calendarDays = [];
  
  // Generate days of week header
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
    <div key={day} className="text-center font-medium text-gray-600 py-2">
      {day}
    </div>
  ));

  // Generate empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(
      <div 
        key={`empty-${i}`} 
        className="p-2 text-center text-gray-300"
      ></div>
    );
  }

  // Generate cells for all days in month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateKey = formatDateKey(new Date(year, month, i));
    const hasEvent = events[dateKey] ? true : false;
    const isSelected = selectedDay === i;
    const isToday = isCurrentMonth && currentDay === i;
    
    calendarDays.push(
      <div 
        key={`day-${i}`}
        className={`p-2 text-center cursor-pointer relative transition-all duration-200 rounded-full mx-1
          ${isToday ? 'bg-blue-100 text-blue-800 font-bold' : ''}
          ${isSelected ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-50'}
          ${hasEvent && !isSelected ? 'font-semibold' : ''}`}
        onClick={() => selectDay(i)}
      >
        <div className="relative inline-flex justify-center items-center w-8 h-8 rounded-full">
          {i}
          {hasEvent && (
            <span className={`absolute top-0 right-0 w-2 h-2 rounded-full 
              ${isSelected ? 'bg-white' : 'bg-red-500'}`}></span>
          )}
        </div>
      </div>
    );
  }

  // Get events for selected day
  const selectedDayEvents = selectedDay ? 
    events[formatDateKey(new Date(year, month, selectedDay))] : null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Calendar header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{monthNames[month]} {year}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={prevMonth} 
              className="p-2 rounded-full hover:bg-blue-400 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextMonth} 
              className="p-2 rounded-full hover:bg-blue-400 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {daysOfWeek}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 p-2">
        {calendarDays}
      </div>
      
      {/* Event display */}
      <div className="p-4 border-t border-gray-200">
        {selectedDay && !isAddingEvent && selectedDayEvents ? (
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Events on {monthNames[month]} {selectedDay}
            </h3>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-gray-700">{selectedDayEvents.message}</p>
            </div>
            <div className="mt-3 flex space-x-2">
              <button 
                onClick={() => setIsAddingEvent(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        ) : selectedDay && isAddingEvent ? (
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              {selectedDayEvents ? 'Edit event' : 'Add event'} for {monthNames[month]} {selectedDay}
            </h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
              rows="3"
              value={eventMessage}
              onChange={(e) => setEventMessage(e.target.value)}
              placeholder="Enter event details..."
            ></textarea>
            <div className="flex space-x-2">
              <button 
                onClick={addEvent}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Save Event
              </button>
              <button 
                onClick={cancelAddEvent}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">Select a day to add or view events</p>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center text-xs text-gray-500">
        <div className="flex items-center mr-4">
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
          <span>Event</span>
        </div>
        <div className="flex items-center mr-4">
          <span className="inline-block w-3 h-3 bg-blue-100 rounded-full mr-1"></span>
          <span>Today</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
          <span>Selected</span>
        </div>
      </div>
      
      {/* Notification popup */}
      {showNotification && notifications.length > 0 && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl
          ${notifications[notifications.length-1].type === 'success' ? 
            'bg-green-100 border-l-4 border-green-500' : 
            'bg-yellow-100 border-l-4 border-yellow-500'}`}>
          <div className="flex items-center">
            {notifications[notifications.length-1].type === 'success' ? (
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <p className="text-sm font-medium">
              {notifications[notifications.length-1].message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;