import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { createSmartappDebugger, createAssistant, InitialSettings } from "@salutejs/client";
import { Container } from '@salutejs/plasma-ui/components/Grid';
import { Button, TextArea } from '@salutejs/plasma-ui';
import { body1, text, background, gradient } from '@salutejs/plasma-tokens';
import { accent } from '@salutejs/plasma-tokens';
import { colorValues } from '@salutejs/plasma-tokens';
import { hints, types } from './data'
import { IconClock, clock } from '@salutejs/plasma-icons';


function Workout(props) {
  return (
    <div className={`sets ${props.isActive ? 'active' : ''}`} 
    onClick={props.onClick}>
      <div className='titleClock'>
        <h3 className="title">{props.title}</h3>
        <IconClock className='icon'/>
      </div>
      <ul>
        <li className='set'>{props.set1}</li>
        <li className='set'>{props.set2}</li>
        <li className='set'>{props.set3}</li>
        <li className='set'>{props.set4}</li>
        <li className='set'>{props.set5}</li>
      </ul>
    </div>
  )
}

function Pause(){
  return(
    <Button className='pause' text="Пауза" size="m" view="primary" />  
    )
}

function Continue(props){
  return(
  <Button className='resume' text="Продолжить" size="m" view="primary" />  
  )
}

export default function App() { 
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 30 минут в секундах
  const [isRunning, setIsRunning] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [breakTime, setBreakTime] = useState(false); // новое состояние

  const initializeAssistant = () => {
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        token: process.env.REACT_APP_TOKEN ?? "",
        initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
        getState
      });
    }
  
    return createAssistant();
  };

const assistant = createSmartappDebugger({
    token: process.env.REACT_APP_TOKEN ?? '',
    initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
    getState,
    enableRecord: true, // активируем функцию записи лога
    recordParams: {
      defaultActive: true, // включать запись при старте приложения (по-умолчанию = true)
    }
  });

  

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (breakTime) {
        setTimeLeft(30 * 60); // возвращаем таймер в исходное состояние
        setBreakTime(false); // выходим из режима перерыва
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, breakTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleButtonClick = () => {
    setIsRunning(!isRunning);
  };

  const handleWorkoutClick = (index) => {
    if (activeWorkout === index) {
      setIsRunning(!isRunning);
      if (isRunning) {
        setActiveWorkout(null);
      }
    } else {
      setActiveWorkout(index);
      setTimeLeft(10 * 60);  // Сброс таймера на 30 минут
      setIsRunning(true);
    }
  };


  const handleResetClick = () => {
    setTimeLeft(10 * 60);  
    setIsRunning(false);
    setActiveWorkout(null);
  };
  const handleBreakClick = () => {
    setTimeLeft(1 * 60); // устанавливаем таймер на 5 минут
    setIsRunning(true); // запускаем таймер
    setBreakTime(true); // входим в режим перерыва
  };


  return (
    <div className='wrapper'>
      <h1 className='timer'>{formatTime(timeLeft)}</h1>
      <div className='container'>
        <Workout onClick={() => handleWorkoutClick(0)} isActive={activeWorkout === 0} {...types[0]} />
        <Workout onClick={() => handleWorkoutClick(1)} isActive={activeWorkout === 1} {...types[1]} />
      </div>
      <div className='container'>
        <Workout onClick={() => handleWorkoutClick(2)} isActive={activeWorkout === 2} {...types[2]} />
        <Workout onClick={() => handleWorkoutClick(3)} isActive={activeWorkout === 3} {...types[3]} />
      </div>

      <div className='btns'>
      <Button className='btn pause' text="Пауза" size="m" view="primary" onClick={handleButtonClick}>
        {isRunning ? 'Пауза' : 'Продолжить'}
      </Button>
        <Button className='btn finish' text="Завершить тренировку" size="m" view="primary" onClick={handleResetClick}  />        
        <Button className='btn rest' text="Перерыв" size="m" view="primary" onClick={handleBreakClick}/>          
      </div>
    </div>
    
  )}

const train = document.querySelectorAll('container');
console.log(train);
