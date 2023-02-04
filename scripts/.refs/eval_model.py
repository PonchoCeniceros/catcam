import cv2
import numpy as np
import numpy.typing as npt
import onnxruntime as ort

def get_img(IMG_PATH: str) -> npt.NDArray:
    raw_img: npt.ArrayLike = cv2.imread(IMG_PATH, cv2.IMREAD_COLOR)/255
    res_img: npt.ArrayLike = cv2.resize(raw_img, (64, 64), interpolation=cv2.INTER_AREA)
    arr_img: npt.ArrayLike = np.asarray(res_img).astype(np.float32)
    img: npt.NDArray = np.moveaxis(arr_img, -1, 0)[None, :]
    return img

if __name__ == "__main__":
    MDL_PATH = "./models/model.onnx"
    ort_session: ort.InferenceSession = ort.InferenceSession(MDL_PATH)

    for item in ["0", "1", "2", "3", "4", "5", "6", "7", "9"]:
        img: npt.NDArray = get_img(IMG_PATH=f"./imgs/{item}.png")
        outputs: list = ort_session.run(
            None,
            {"in": img},
        )
        print(f"{item}.png: {outputs[0][0][0]}")
