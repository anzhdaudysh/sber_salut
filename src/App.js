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
import Workout from './components/Workout';


// function Workout(props) {
//   return (
//     <div className={`sets ${props.isActive ? 'active' : ''}`} 
//     onClick={props.onClick}>
//       <div className='titleClock'>
//         <h3 className="title">{props.title}</h3>
//         <IconClock className='icon'/>
//       </div>
//       <ul>
//         <li className='set'>{props.set1}</li>
//         <li className='set'>{props.set2}</li>
//         <li className='set'>{props.set3}</li>
//         <li className='set'>{props.set4}</li>
//         <li className='set'>{props.set5}</li>
//       </ul>
//     </div>
//   )
// }


export default function App() { 
  const [timeLeft, setTimeLeft] = useState(10 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [activeWorkoutIndex, setActiveWorkoutIndex] = useState(null);
  const [breakTime, setBreakTime] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseTimeLeft, setExerciseTimeLeft] = useState(2 * 60);


  const getState = () => {
    return {
      item_selector: {
        items: [
          { number: 1, id: 'workout_1', title: 'Workout 1', subtitle: '10 minutes' },
          { number: 2, id: 'workout_2', title: 'Workout 2', subtitle: '10 minutes' },
          { number: 3, id: 'workout_3', title: 'Workout 3', subtitle: '10 minutes' },
          { number: 4, id: 'workout_4', title: 'Workout 4', subtitle: '10 minutes' },
        ],
      },
    };
  };


  const initializeAssistant = () => {
    if (process.env.NODE_ENV === 'development') {
      return createSmartappDebugger({
        token: process.env.REACT_APP_TOKEN ?? '',
        initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
        getState,
      });
    }
    return createAssistant({ getState });
  };


  useEffect(() => {
    const assistant = initializeAssistant();
  
    assistant.on('data', ({ action }) => {
      handleAssistantAction(action);
    });
  }, []);
  

  const handleAssistantAction = (action) => {
    if (!action || !action.type) {
      console.log('Invalid action:', action);
      return;
    }
  
    switch (action.type) {
      case 'pause':
        if (isRunning) handleButtonClick();
        break;
      case 'resume':
        if (!isRunning) handleButtonClick();
        break;
      case 'rest':
        handleBreakClick();
        break;
      case 'finish':
        handleResetClick();
        break;
      case 'start':
        if (action.id !== undefined) handleWorkoutClick(action.id);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };
  

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (breakTime) {
        setTimeLeft(10 * 60); 
        setBreakTime(false); 
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, breakTime]);

  useEffect(() => {
    let exerciseTimer;
    if (isRunning && exerciseTimeLeft > 0) {
      exerciseTimer = setInterval(() => {
        setExerciseTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (exerciseTimeLeft === 0) {
      if (currentExercise < 4) {
        setCurrentExercise(prev => prev + 1);
        setExerciseTimeLeft(2 * 60);
      } else {
        setIsRunning(false);
      }
    }
    return () => clearInterval(exerciseTimer);
  }, [isRunning, exerciseTimeLeft, currentExercise]);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleButtonClick = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };
  

  const handleWorkoutClick = (index) => {
    if (activeWorkout === index) {
      setIsRunning(!isRunning);
      if (isRunning) {
        setActiveWorkout(null);
      }
    } else {
      setActiveWorkoutIndex(index);
      setActiveWorkout(index);
      setExerciseTimeLeft(2 * 60); 
      setCurrentExercise(0); 
      setIsRunning(true);
    }
  };


  const handleResetClick = () => {
    setTimeLeft(10 * 60);  
    setIsRunning(false);
    setActiveWorkout(null);
    setActiveWorkoutIndex(null);
    setCurrentExercise(0);
    setExerciseTimeLeft(2 * 60);
  };
  const handleBreakClick = () => {
    setTimeLeft(1 * 60); 
    setIsRunning(true);
    setBreakTime(true); 
  };


  return (
  <div className='wrapper'>
    <div className='bigContainer'>
      <div className='containers'>
        <div className='container'>
        {types.map((type, index) => (
          <Workout 
            key={index}
            title={type.title}
            set1={type.set1}
            set2={type.set2}
            set3={type.set3}
            set4={type.set4}
            set5={type.set5}
            isActive={index === activeWorkoutIndex}
            onClick={() => handleWorkoutClick(index)}
            currentExercise={activeWorkoutIndex === index ? currentExercise : -1}
            exerciseTimeLeft={exerciseTimeLeft}
          />
        ))}
        </div>
      </div>
    </div>  
    <div className='bigContainer'>
        <div className='btns'>
          <h1 className='timer'>{formatTime(timeLeft)}</h1>
          
          <Button className='btn pause' text="Пауза" size="m" view="primary" onClick={handleButtonClick}>
          {isRunning ? 'Пауза' : 'Продолжить'}
          </Button>
          <Button className='btn finish' text="Завершить тренировку" size="m" view="primary" onClick={handleResetClick}  />        
          <Button className='btn rest' text="Перерыв" size="m" view="primary" onClick={handleBreakClick}/>          
        </div>
      </div>
    </div>

    
  )}

