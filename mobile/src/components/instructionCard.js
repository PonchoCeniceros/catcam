import React from 'react';

const InstructionCard = ({action, shift, banner, children}) => {

  const shifting = () => {
    action(shift);
  };

  return (
    <div className="bg-[#FF0099] w-1/3 h-[90vh] m-10 rounded-xl flex flex-col">
      <div className='w-full h-5/6 flex flex-col'>
        {children}
      </div>
      <div className='w-full h-1/6 flex justify-center items-center'>
        <button
          onClick={shifting}
          className="bg-[#472EE0] w-10/12 rounded-xl text-white text-md text-center font-bold p-3 m-8"
        >{banner}</button>
      </div>
    </div>
  );
};

export default InstructionCard;
