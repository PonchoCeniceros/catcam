import React from 'react';
import { Camera, CameraResultType } from "@capacitor/camera";


const PictureButton = ({getPicture}) => {  
  const takePicture = async () => {
    const rawImage = await Camera.getPhoto({
      quality: 100,
      width: 64,
      height: 64,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    getPicture(rawImage.webPath);
  };

  return (
    <button
      onClick={takePicture}
      className="bg-[#FF0099] w-10/12 rounded-3xl text-white text-3xl text-center p-3"
    >
      take a picture
    </button>
  );
};

export default PictureButton;
