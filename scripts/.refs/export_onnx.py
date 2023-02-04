import torch
from nn import Cat_CNN
from typing import Any

SHAPE = (1, 3, 64, 64)                         # your batch shape
IN_PATH  = "./models/model.pth"                # input path
OUT_PATH = "./models/model.onnx"               # output path

x: torch.Tensor = torch.randn(SHAPE)

with torch.no_grad():
    model_dict: Any = torch.load(IN_PATH)
    model: Cat_CNN  = Cat_CNN()

    model.load_state_dict(model_dict)
    model.cpu()                               # the converter works best on models stored on the CPU
    model.eval()  
    torch.onnx.export(model,                  # model being run
                      x,                      # model input (or a tuple for multiple inputs)
                      OUT_PATH,               # where to save the model (can be a file or file-like object)
                      export_params=True,     # store the trained parameter weights inside the model
                      opset_version=11,       # it's best to specify the opset version. At time of writing 11 was the latest release
                      input_names=["in"],     # 
                      output_names=["out"],
                      verbose=False)
