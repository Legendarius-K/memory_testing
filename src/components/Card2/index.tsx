type Card2Props = {
    updateFunction: (index: string) => void
    index: string
}

const Card2 = ({ updateFunction, index }:Card2Props) => {
    return (
        <div
            onClick={() => updateFunction(index)}
            key={index}
            className={`h-44 text-8xl font-thin flex justify-center items-center cursor-pointer transform bg-slate-600 p-4 m-8 border-2 border-orange-800 hover:bg-slate-500 transition-transform duration-300 ${flipped.includes(index) || solved.includes(index) ? "rotate-180" : ''}`}>
            {flipped.includes(index) || solved.includes(index) ? (
                <Image className="rotate-180" src={card} alt="Card" />
            ) : (
                '?'
            )}
        </div>
    )
};

export default Card2
