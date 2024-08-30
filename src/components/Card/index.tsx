import Image from "next/image";

type CardProps = {
    id: string
    image: string
}

const Card = ({ id, image }:CardProps) => {
    return (
        <button id={id} className="transition-all duration-500 basis-1/6  mx-8 my-2 border-2 border-orange-800 p-4 bg-slate-500">
            <div className="opacity-[100%]">
                <Image src={image} alt="Card" />
            </div>
        </button>
    )
};

export default Card
