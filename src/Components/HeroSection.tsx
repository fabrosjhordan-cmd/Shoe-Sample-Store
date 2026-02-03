import type { HeroProps } from "../types"

export const HeroSection = ({isDarkMode} : HeroProps) =>{
    return (
        <section id='hero' className="relative min-h-screen flex justify-center items-center px-4">
            <div className="container flex flex-col gap-8 max-sm:text-center">
                <div className="flex flex-col gap-4">
                    <h1 className="opacity-0 text-6xl font-bold animate-fade-in"><span className="text-primary">Sample </span>Store</h1>
                    <p className="opacity-0 animate-fade-in-delay-1">With Sample Store we will provide you the footware that help you run towards your dreams</p>
                </div>
                <a href="#store" className="opacity-0 animate-fade-in-delay-2 text-center px-4 py-2 bg-primary rounded-full max-w-[30vh] hover:scale-103 hover:bg-primary/80 transition-all duration-300">Shop now</a>
            </div>
             {isDarkMode ? <img src='another-dark-shoes-weight-loss-svgrepo-com.svg' className="w-100 h-100 max-sm:hidden opacity-0 animate-fade-in"/> : <img src='shoes-weight-loss-svgrepo-com.svg' className="w-100 h-100 max-sm:hidden opacity-0 animate-fade-in "/>}
        </section>
    )
}