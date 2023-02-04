import onnx

# output path
OUT_PATH = "./models/model.onnx"

# Load the ONNX model
model: onnx.ModelProto = onnx.load(OUT_PATH)

# Check that the model is well formed
onnx.checker.check_model(model)

# Print a human readable representation of the graph
print(onnx.helper.printable_graph(model.graph))
