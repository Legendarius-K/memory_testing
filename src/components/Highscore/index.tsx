import { SetStateAction, useState } from "react";

type HighscoreProps = {
    updateNewHighscore: (toggle: boolean) => void
}

const Highscore = ({ updateNewHighscore }:HighscoreProps) => {
    const [name , setName] = useState<string>('')

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setName(e.target.value)
        console.log(name);
    }

    const handleClick = () => {
        localStorage.setItem("name", name)
        updateNewHighscore(false)
    }

    return (
        <div data-testid="highscore-popup" className="bg-slate-200 p-10 fixed top-[50%] -translate-y-1/2 flex flex-col items-center shadow-2xl">
            <h2 className="text-3xl mb-4">New Highscore!</h2>
            {/* <label htmlFor="name">Enter name</label> */}
            <input onChange={handleChange} className="mb-4" data-testid="input" placeholder="Enter your name ..." id="name" maxLength="15" required/>
            <button data-testid="highscore-button" onClick={handleClick} className="bg-slate-400 w-36 py-1 hover:bg-slate-500 transition-all">Done</button>
        </div>
    )
};

export default Highscore
