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
import { useEffect, useState } from "react";

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

    useEffect(() => {
        const checkForMatch = () => {
            const [first, second] = flipped;
    
            if(cards[first] === cards[second]) {
                setSolved([...solved, ...flipped]);
            }
            setFlipped([])
        }

        if(flipped.length === 2) {
            setTimeout(() => {
                checkForMatch()
            }, 1000)
        }
    }, [cards, flipped, solved])

    const handleClick = (index: number) => {
        if (!flipped.includes(index) && flipped.length < 2) {
            setFlipped([...flipped, index])
        }
    }

    return (
        <>
            <section className="grid grid-cols-4 w-full px-28">
                {cards.map((card, index) => {
                    return <div
                        onClick={() => handleClick(index)}
                        key={index}
                        className={`h-44 text-8xl font-thin flex justify-center items-center cursor-pointer transform bg-slate-600 p-4 m-8 border-2 border-orange-800 hover:bg-slate-500 transition-transform duration-300 ${flipped.includes(index) || solved.includes(index) ? "rotate-180" : ''}`}>
                        {flipped.includes(index) || solved.includes(index) ? (
                            <Image className="rotate-180" src={card} alt="Card" />
                        ) : (
                            '?'
                        )}
                    </div>
                })}
            </section>
            <section className="bg-slate-500 w-[50%] border-2 border-orange-800 p-10">
                hello
            </section>
        </>
    );
}
