//making a stop clock
import React,{useState,useEffect} from "react";

const CountdownTimer=()=>{
    const [hours,setHours]=useState(0);
    const [minutes,setMinutes]=useState(0);
    const [sec,setSec]=useState(0);
    const [isRunning,setIsRunning]=useState(false);
    const [isEditing,setIsEditing]=useState(true);;
    const [timeup,setTimeup]=useState(false);
    useEffect(()=>{
        let interval;
        if (isRunning&&!timeup) {
            interval=setInterval(()=>{
                if (sec>0) {
                    setSec(sec-1);
                }
                else if(minutes>0){
                    setMinutes(minutes-1);
                    setSec(59);
                }
                else if(hours>0){
                    setHours(hours-1);
                    setMinutes(59);
                    setSec(59);
                }
                else{
                    setIsRunning(false);
                    setTimeup(true);


                    //standard browser alert 
                    window.alert("Times's up");
                }
            },1000);
        }
        return()=>clearInterval(interval);
    },[isRunning,hours,minutes,sec,timeup]);
    //reset Timer
    const resetTimer=()=>{
        setHours(0);
        setMinutes(0);
        setSec(0);
        setTimeup(false);
        setIsEditing(true);
        setIsRunning(false);
    };
    //start or pause the timer

    const toggletimer=()=>{
        if (timeup) {
            resetTimer();
            return;
        }
        if (!isRunning&&(hours>0||minutes>0||sec>0)) {
            setIsEditing(false);
            setIsRunning(true);
        }else{
            setIsRunning(false);
        }
    }
    //time should show only two digit 
const formatTime=(digit)=>{
return digit<10?`0${digit}`:digit;
}

//input putting
const handelInput=(setter,val,max)=>{
    const numVal=parseInt(val,10);
    if (isNaN(numVal)) {
        setter(0);
    }else if (numVal>max) {
        setter(max);
    }
    else{
        setter(numVal);
    }
};
return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Countdown Timer</h1>
      
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400 mb-1">HOURS</span>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={hours}
                  onChange={(e) => handleInputChange(setHours, e.target.value, 99)}
                  className="w-24 h-20 bg-gray-800 text-center text-white text-7xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>
              <div className="text-7xl font-bold text-gray-400">:</div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400 mb-1">MINUTES</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => handleInputChange(setMinutes, e.target.value, 59)}
                  className="w-24 h-20 bg-gray-800 text-center text-white text-7xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>
              <div className="text-7xl font-bold text-gray-400">:</div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400 mb-1">SECONDS</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => handleInputChange(setSeconds, e.target.value, 59)}
                  className="w-24 h-20 bg-gray-800 text-center text-white text-7xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <div className="flex flex-col items-center mx-2">
                <span className="text-xs text-gray-400 mb-1">HOURS</span>
                <div className="text-8xl font-bold font-mono w-24 text-center">
                  {formatTime(hours)}
                </div>
              </div>
              <div className="text-8xl font-bold text-gray-600">:</div>
              <div className="flex flex-col items-center mx-2">
                <span className="text-xs text-gray-400 mb-1">MINUTES</span>
                <div className="text-8xl font-bold font-mono w-24 text-center">
                  {formatTime(minutes)}
                </div>
              </div>
              <div className="text-8xl font-bold text-gray-600">:</div>
              <div className="flex flex-col items-center mx-2">
                <span className="text-xs text-gray-400 mb-1">SECONDS</span>
                <div className="text-8xl font-bold font-mono w-24 text-center">
                  {formatTime(seconds)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex space-x-4">
        {!isRunning && (
          <button 
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-lg"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        )}
        
        <button 
          className="px-8 py-4 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors text-lg" 
          onClick={resetTimer}
        >
          Reset
        </button>
        
        <button 
          className={`px-8 py-4 rounded-lg font-bold transition-colors text-lg
            ${isRunning 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
            } 
            text-white`}
          onClick={toggleTimer}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );

}
export default CountdownTimer;
