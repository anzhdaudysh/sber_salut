import React from 'react';
import { IconClock } from '@salutejs/plasma-icons';

interface WorkoutProps {

    title: string;
    set1: string;
    set2: string;
    set3: string;
    set4: string;
    set5: string;
    isActive: boolean;
    onClick: () => void;
    currentExercise: number;
    exerciseTimeLeft: number;
}

const Workout: React.FC<WorkoutProps> = ({ title, set1, set2, set3, set4, set5, isActive, onClick, currentExercise, exerciseTimeLeft }) => {
    const exercises = [set1, set2, set3, set4, set5];

    return (
    <div className={`sets ${isActive ? 'active' : ''}`} onClick={onClick}>
        <div className='titleClock'>
        <h3 className="title">{title}</h3>
        {isActive && <h3 className='exercise-timer'>{formatTime(exerciseTimeLeft)}</h3>}
        <IconClock className='icon'/>
    </div>
    <ul>
        {exercises.map((exercise, index) => (
        <li key={index} className='set' style={{ fontWeight: isActive && currentExercise === index ? 'bold' : '300' }}>
        {exercise}
        </li>
        ))}
    </ul>
    </div>
);
};




    //     <div className={`workout ${isActive ? 'active' : ''}`} onClick={onClick}>
    //     <h2>{title}</h2>
    //     {isActive && <h3 className='exercise-timer'>{formatTime(exerciseTimeLeft)}</h3>}
    //     <ul>
    //         {exercises.map((exercise, index) => (
    //         <li key={index} style={{ fontWeight: isActive && currentExercise === index ? 'bold' : '300' }}>
    //             {exercise}
    //         </li>
    //         ))}
    //     </ul>
    //     </div>
    // );
    // };

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default Workout;
