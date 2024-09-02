type newGameBtnProps = {
    newRound: () => void
}

const NewGameBtn = ({ newRound }:newGameBtnProps) => {
    return (
        <button data-testid="new-game-btn" onClick={newRound} className="shadow-2xl text-2xl text-orange-800 border-2 border-orange-800 py-2 px-8 rounded transition bg-slate-700 hover:bg-slate-500 hover:text-black">
            New Game
        </button>
    )
};

export default NewGameBtn
