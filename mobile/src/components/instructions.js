import React, { useState } from 'react';
import InstructionCard from './instructionCard';
import { SHIFTS } from '../helpers/instructions';
import step1 from '../assets/img/step1.png';
import step2 from '../assets/img/step2.png';

const Instructions = ({finish, children}) => {
  const [shift, setShift] = useState(SHIFTS.BEGIN);

  const shifting = (value) => {
    setShift(prev => value);
    if (value == SHIFTS.HIDDEN) finish();
  };

  return (
    <div className='relative overflow-hidden flex flex-row w-screen h-screen bg-[#472EE0] z-20'>
      {children}
      <div
        style={{transition: "0.5s"}}
        className={shift}
      >
        <InstructionCard action={shifting} shift={SHIFTS.NEXT} banner="next">
          <div className='w-full h-full flex justify-center items-center px-8'>
            <div className='text-5xl font-bold text-center text-white'>
              Welcome to Cat cam!
            </div>
          </div>
        </InstructionCard>
        <InstructionCard action={shifting} shift={SHIFTS.END} banner="next">
          <div className='w-full h-5/6 flex justify-center items-center p-8'>
            <img src={step1} width="130" height="330" />
          </div>
          <div className='w-full h-1/6 flex justify-center items-center px-8'>
            <div className='text-3xl font-bold text-center text-white'>
              take a picture with your camera...
            </div>
          </div>
        </InstructionCard>
        <InstructionCard action={shifting} shift={SHIFTS.HIDDEN} banner="go it">
          <div className='w-full h-1/3 flex justify-center items-center px-8'>
            <div className='text-3xl font-bold text-center text-white'>
              ...and discover if it is a cat or not!
            </div>
          </div>
          <div className='w-full h-2/3 flex justify-center items-center p-8'>
            <img src={step2} width="150" height="350" />
          </div>
        </InstructionCard>
      </div>
    </div>
  );
};

export default Instructions;
