import torch

class Cat_CNN(torch.nn.Module):
    def __init__(self):
        super(Cat_CNN, self).__init__()
        self.conv1 = torch.nn.Conv2d(3, 16, kernel_size=(3, 3), padding=1)
        self.relu1 = torch.nn.ReLU()
        self.pool1 = torch.nn.MaxPool2d(kernel_size=(2, 2))
        self.conv2 = torch.nn.Conv2d(16, 32, kernel_size=(3, 3), padding=1)
        self.relu2 = torch.nn.ReLU()
        self.pool2 = torch.nn.MaxPool2d(kernel_size=(2, 2)) 
        self.flatt = torch.nn.Flatten()
        self.line1 = torch.nn.Linear(16*16*32, 90)
        self.relu3 = torch.nn.ReLU()
        self.line2 = torch.nn.Linear(90, 1)
        self.sigm1 = torch.nn.Sigmoid()
        
    def forward(self, x):
        a0 = self.conv1(x)
        b0 = self.relu1(a0)
        c0 = self.pool1(b0)
        a1 = self.conv2(c0)
        b1 = self.relu2(a1)
        c1 = self.pool2(b1)
        u  = self.flatt(c1)
        z0 = self.line1(u)
        y0 = self.relu3(z0)
        z1 = self.line2(y0)
        y  = self.sigm1(z1)
        return y
