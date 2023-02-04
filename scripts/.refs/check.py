import torch
from colorama import Fore

def check_torch() -> None:
    MAG = Fore.LIGHTMAGENTA_EX
    RED = Fore.LIGHTRED_EX
    RST = Fore.RESET
    print(f"{RED}Pytorch version: {MAG}{torch.__version__}{RST}")
    if torch.backends.mps.is_available() and torch.backends.mps.is_built():
        print(f"{MAG}The current {RED}Pytorch{MAG} installation was built with MPS activated{RST}")

if __name__ == "__main__":
    check_torch()
