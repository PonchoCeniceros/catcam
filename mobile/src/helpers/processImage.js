
import * as ort from 'onnxruntime-web';

const img2rgbArray = (buff) => {
  const MAX_PIXEL_VAL = 255;
  const [chnlR, chnlG, chnlB] = new Array(new Array(), new Array(), new Array());
  for (let idx = 0; idx < buff.length; idx += 4) {
    chnlB.push(buff[idx + 2]/MAX_PIXEL_VAL);
    chnlG.push(buff[idx + 1]/MAX_PIXEL_VAL);
    chnlR.push(buff[idx]/MAX_PIXEL_VAL);
  }
  const tmp = (chnlB.concat(chnlG)).concat(chnlR);
  return Float32Array.from(tmp);
};

const inference = async (image) => {
  try {
    const session = await ort.InferenceSession.create('model.onnx');
    const tensor  = new ort.Tensor('float32', image, [1, 3, 64, 64]);
    const feeds   = { in: tensor };
    const results = await session.run(feeds);
    return results.out.data;

  } catch(error) {
    console.log(`ort error: ${error}`);
  }
};

export { img2rgbArray, inference };
