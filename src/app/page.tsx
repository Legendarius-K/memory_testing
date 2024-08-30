'use client'

import Image from "next/image";
import { shuffleArray } from "@/utils/functions";
import Guitar from "@/../public/guitar.svg"
import Cow from "@/../public/cow.svg"
import Pineapple from "@/../public/pineapple.svg"
import Car from "@/../public/car.svg"
import Flower from "@/../public/flower.svg"
import Cabin from "@/../public/cabin.svg"
import Card from "@/components/Card";
import { use, useEffect, useState } from "react";
import NewGameBtn from "@/components/NewGameBtn";

// type CardsArrayProps = {
//     id: string
//     image: string
// }

export default function Home() {
    const generateDeck = () => {

        const cards: string[] = [
            Guitar,
            Cow,
            Pineapple,
            Car,
            Flower,
            Cabin
        ]

        const allCards = [...cards, ...cards]
        const scrambledCards = shuffleArray(allCards);
        return scrambledCards;
    }
    const [cards, setCards] = useState<string[]>(generateDeck())
    const [flipped, setFlipped] = useState<number[]>([])
    const [solved, setSolved] = useState<number[]>([])
    const [moves, setMoves] = useState<number>(0)
    const [highscore, setHighscore] = useState<number>(0)
    const [win, setWin] = useState<boolean>(false)

    useEffect(() => {
        const checkForMatch = () => {
            const [first, second] = flipped;

            if (cards[first] === cards[second]) {
                setSolved([...solved, ...flipped]);
            }
            setFlipped([])
        }

        if (flipped.length === 2) {
            setTimeout(() => {
                checkForMatch()
            }, 1000)
        }

        console.log(solved.length);
    }, [cards, flipped, solved])

    const handleClick = (index: number) => {
        if (!flipped.includes(index) && flipped.length < 2) {
            setFlipped([...flipped, index])
        }
        if (solved.length < 11)
            setMoves(moves + 1)
    }

    const newRound = () => {
        setSolved([])
        setMoves(0)
        setCards(generateDeck())
        setFlipped([])
        setWin(false)
    }

    useEffect(() => {
        if (solved.length === 12) {
            setWin(true)
        }
    }, [solved])
    useEffect(() => {
        console.log("win?" + win);
    }, [win])

    useEffect(() => {
        const currentHighscore = localStorage.getItem('highscore');
        // if(currentHighscore)
        // localStorage.setItem('highscore', '0');
        setHighscore(parseInt(currentHighscore ?? '0', 10)); // Use nullish coalescing to provide a default value


    }, []);

    useEffect(() => {
        if (win === true) {
            if (highscore.toString() === '0') {
                setHighscore(moves)
                localStorage.setItem('highscore', moves.toString())
            } else if (moves < highscore) {
                setHighscore(moves)
                localStorage.setItem('highscore', moves.toString())
            }
        }
    }, [win])

    return (
        <main className="flex flex-col items-center">
            <section className="grid grid-cols-4 w-full max-w-[1000px] max-h-screen gap-4 my-8">
                {cards.map((card, index) => {
                    return <button disabled={solved.includes(index) || flipped.includes(index) || flipped.length === 2 && true}
                        onClick={() => handleClick(index)}
                        key={index}
                        className={`h-44 w-44 text-8xl font-thin flex justify-center items-center cursor-pointer transform bg-slate-500 hover:bg-slate-600 p-4  border-2 border-orange-800 transition-transform duration-300 ${flipped.includes(index) || solved.includes(index) ? "rotate-180" : ''}`}>
                        {flipped.includes(index) || solved.includes(index) ? (
                            <Image className="rotate-180" src={card} alt="Card" />
                        ) : (
                            '?'
                        )}
                    </button>
                })}
            </section>
            <section className="m-4 bg-slate-500 border-2 border-orange-800 p-10 w-full max-w-[1000px] flex justify-evenly items-center">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-2xl">Moves:</h2>
                    <p className={`text-3xl text-orange-900 ${solved.length === 12 && 'text-green-600 text-5xl'}`}>{moves}</p>
                </div>
                <NewGameBtn newRound={newRound} />
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-2xl">Highscore:</h2>
                    <p className={`text-3xl text-green-600`}>{highscore}</p>
                </div>
            </section>
        </main>
    );
}
