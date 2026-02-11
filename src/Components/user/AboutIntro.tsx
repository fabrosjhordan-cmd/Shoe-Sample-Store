import { FaNodeJs, FaReact } from "react-icons/fa"
import { IoLogoHtml5 } from "react-icons/io"
import { RiSupabaseLine, RiTailwindCssFill } from "react-icons/ri"
import { SiRedux, SiTypescript } from "react-icons/si"

const techStack = [
    {label: 'Typescript', icon: <SiTypescript size={40}/>},
    {label: 'HTML', icon: <IoLogoHtml5 size={40}/>},
    {label: 'Redux', icon: <SiRedux size={40}/>},
    {label: 'ReactJS', icon: <FaReact size={40}/>},
    {label: 'NodeJS', icon: <FaNodeJs size={40}/>},
    {label: 'Supabase / PostgreSQL', icon: <RiSupabaseLine size={40}/>},
    {label: 'Tailwind CSS', icon: <RiTailwindCssFill size={40}/>},
]

export const AboutIntro= ()=>{
    return (
        <div className="container flex flex-col gap-6">
            <div className="flex flex-row">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-semibold">About</h1>
                    <div className="flex flex-col gap-4">
                        <p>This is a personal project created with ReactJS, Typescript, and TailwindCSS with Supabase as its data storage. This application let's the user to order and pay through online.</p>
                        <p>Sample Store is an online ordering website for your cool kicks we offer you different kinds of shoe brands. We offer you just the best of the shoe throughout the market.</p>
                        <p><span className="font-bold text-red-400">Disclaimer: </span>I do not own any of these shoes nor plan on selling any of it, the displayed products are only for showing how the list would be viewed. I also do not plan to monetarily gain here and just want to showcase my skills on creating a program.</p>
                    </div>
                    
                </div>
                <div className="w-140 h-70">
                <img src='/hero_section.png' className="w-full h-full rounded-md p-4 bg-foreground/20"/>
                </div>
            </div>

            <h1 className="text-center text-4xl font-semibold">Language / Backend / Tools&Libraries Used</h1>
            <div className="container flex flex-wrap justify-between px-24 py-4 bg-foreground/10 rounded-md h-full">
               {techStack.map((items, index)=>(
                <div key={index} className="flex flex-col text-center items-center justify-center gap-2">
                    <div className="p-4 rounded-full bg-background/60">
                        {items.icon}
                    </div>
                    <h1 className="text-xl text-foreground/65 mb-auto">{items.label}</h1>
                </div>
               ))}
            </div>
            <h2 className="text-3xl font-semibold">How to use:</h2>
            <ul className="ml-4">
                <li>- Clicking on add to cart would put your selected item to the cart. (you can see it at the top)</li>
                <li>- If you are done shopping then you would need to go to the cart page and checkout and pay through online.</li>
            </ul>
        </div>
    )
}