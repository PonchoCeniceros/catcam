import React, { useRef, useState } from 'react';
import PictureButton from '../components/pictureButton';
import { img2rgbArray, inference } from '../helpers/processImage';
import '../assets/styles/layout.css';

const App = () => {
  const canvasRef = useRef(null);
  const [img, setImg] = useState(null);
  const [ans, setAns] = useState({banner: '', res: 0.0 });

  const getPicture = (imagePath) => {
    // setting image to display
    setImg(prev => imagePath)

    // draw image to inference
    let img = new Image();
    img.src = imagePath;
    img.onload = async () => {
      const canvas  = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, 64, 64);
      const buff = context.getImageData(0, 0, 64, 64);
      const data = img2rgbArray(buff.data);
      const res  = await inference(data);

      setAns(prev => ({
        ...prev,
        ...{
          banner: Math.round(res) ? "is a cat" : "isn't a cat",
          res: parseFloat(res).toFixed(6)
        }
      }));
    }
  };

  return (
    <div>
      <div className='bg-[#472EE0] static h-screen w-screen flex flex-col'>
        <div className='bg-sphere-grad z-0 opacity-[.75] absolute w-full h-1/2 rounded-br-full'></div>
        <div className='z-10 w-full h-1/2 text-white flex justify-center items-center'>
          <canvas hidden ref={canvasRef}/>
          { img && <img style={{ width: 256, height: 256 }} className='rounded-full m-6 top-3' src={img} />  }
        </div>
        <div className='z-10 w-full h-1/4 text-white flex flex-col justify-center items-center'>
          <h1 className='text-7xl'>{ans.banner}</h1>
          <h5>{ans.res != 0.0 && `(${ans.res})`}</h5>
        </div>
        <div className='z-10 w-full h-1/4 flex justify-center items-center'>
          <PictureButton getPicture={getPicture} />
        </div>
      </div>
    </div>
  );
};
export default App;
