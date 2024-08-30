import Image from "next/image";
import Logo from "@/../public/logo.png"

const Header = () => {
    return (
        <header className="bg-orange-800 font-light text-4xl h-16 relative flex justify-center items-center">
            <div className="absolute left-4">
                <Image src={Logo} alt="logo"/>
            </div>
            <h1>Memorista</h1>
        </header>
    )
};

export default Header
