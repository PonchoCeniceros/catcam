from typing import Any
from colorama import Fore
import torch

def foo(x: torch.Tensor, y: torch.Tensor) -> torch.Tensor:
    return 2 * x + y

if __name__ == "__main__":
    MAG = Fore.LIGHTMAGENTA_EX
    YEL = Fore.LIGHTYELLOW_EX
    CYA = Fore.LIGHTCYAN_EX
    RST = Fore.RESET

    # Run `foo` with the provided inputs and record the tensor operations
    traced_foo: Any = torch.jit.trace(foo, (torch.rand(3), torch.rand(3)))

    # `traced_foo` can now be run with the TorchScript interpreter or saved
    # and loaded in a Python-free environment
    print(f"\nGraph\n{YEL}{traced_foo.graph}{RST}")

    print(f"""\nCode\n{CYA}def foo(x: torch.Tensor, y: torch.Tensor) -> torch.Tensor:
        return 2 * x + y
    {RST}""")
        
    print(f"\nScript\n{MAG}{traced_foo.code}{RST}")
