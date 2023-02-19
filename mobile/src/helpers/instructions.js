const BASE_CLASS = "absolute w-[300vw] h-screen flex flex-row justify-center items-center"

const SHIFTS = {
  BEGIN: `${BASE_CLASS} -left-[0vw]`,
  NEXT: `${BASE_CLASS} -left-[100vw]`,
  END: `${BASE_CLASS} -left-[200vw]`,
  HIDDEN: `${BASE_CLASS} hidden`, 
}

export {BASE_CLASS, SHIFTS};
