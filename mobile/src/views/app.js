import React, { useState } from 'react';
import CatCamera from '../components/catCamera';
import Instructions from '../components/instructions';

const App = () => {
  const [instructionsAreFinished, setInstructionsStatus] = useState(false);

  const finishInstructions = () => {
    setInstructionsStatus(prev => true);
  };

  return (
    <Instructions finish={finishInstructions}>
      <div
        style={{transition: "0.3s"}}
        className={!instructionsAreFinished ? 'blur-lg' : ''}
      >
        <CatCamera />
      </div>
    </Instructions>
  );
};

export default App;
