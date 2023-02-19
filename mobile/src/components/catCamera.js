import React, { useRef, useState } from 'react';
import '../assets/styles/layout.css';
import PictureButton from './pictureButton';
import { img2rgbArray, inference } from '../helpers/processImage';


const CatCamera = () => {
  const SENT_RES = -1.0;
  const canvasRef = useRef(null);
  const [img, setImg] = useState(null);
  const [ans, setAns] = useState({banner: '', res: SENT_RES });

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
          banner: Math.round(res) ? "it is a cat" : "it's not a cat",
          res: Math.abs(parseFloat(res).toFixed(6))
        }
      }));
    }
  };

  return (
     <div className='z-0 bg-[#472EE0] static h-screen w-screen flex flex-col'>
       <div className='bg-sphere-grad opacity-[.75] absolute w-full h-1/2 rounded-br-full'></div>
       <div className='z-10 w-full h-4/6 text-white flex justify-center items-center'>
         <canvas hidden ref={canvasRef}/>
         { img ?
           <img
             style={{ width: 300, height: 300 }}
             className='rounded-full m-6 top-3 shadow-2xl'
             src={img}
           />
           :
           <div className='text-7xl font-bold text-center m-6 top-3'>
             is it a cat or not?
           </div>
         }
       </div>
       <div className='z-10 w-full h-1/6 text-white flex flex-col justify-center items-center'>
         <h1 className='text-5xl'>{ans.banner}</h1>
         <h5>{ans.res != SENT_RES && `(${ans.res})`}</h5>
       </div>
       <div className='z-10 w-full h-1/6 flex justify-center items-center'>
         <PictureButton getPicture={getPicture} />
       </div>
    </div>
  );
};

export default CatCamera;
