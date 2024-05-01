interface ButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({text, onClick}: ButtonProps)=>{
    return  <button onClick={onClick}
    className="m-4 w-auto rounded-md bg-black px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
    {text}
  </button>
}