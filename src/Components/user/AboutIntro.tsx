export const AboutIntro= ()=>{
    return (
        <div className="container flex flex-col gap-6">
            <div className="flex flex-row">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-semibold">About</h1>
                    <p>This is a personal project created with ReactJS, Typescript, and TailwindCSS with Supabase as its data storage. This application let's the user to order and pay through online.</p>
                    <h2 className="text-3xl font-semibold">How to use:</h2>
                        <ul className="ml-4">
                            <li>- Clicking on add to cart would put your selected item to the cart. (you can see it at the top)</li>
                            <li>- If you are done shopping then you would need to go to the cart page and checkout and pay through online.</li>
                        </ul>
                </div>
                <img src='https://imgs.search.brave.com/w5lvkZpFT-dwKmxch3hL1Z4nA4c-Gh2bqO_NqSh7zQo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9waWNqdW1iby1w/cmVtaXVtLWFic3Ry/YWN0LWltYWdlcy5q/cGc_dz0xMDI0JnF1/YWxpdHk9NTA' className="w-100 h-100 rounded-md p-4 bg-foreground/20"/>
            </div>

            <h1 className="text-center text-4xl font-semibold">Language / Backend / Tools&Libraries Used</h1>
            <div className="grid grid-cols-3 items-center justify-center px-12 py-2 bg-foreground/20 rounded-md">
                <div className="flex flex-col items-center mb-auto">
                    <h1 className="font-semibold text-lg">Language</h1>
                    <ul className="flex flex-col">
                        <li>- Typescript</li>
                        <li>- Javascript</li>
                        <li>- HTML</li>
                    </ul>
                </div>
                <div className="flex flex-col items-center border-x border-foreground/50 mb-auto">
                    <h1 className="font-semibold text-lg">Backend</h1>
                </div>
                <div className="flex flex-col items-center mb-auto">
                    <h1 className="font-semibold text-lg">Tools&Libraries</h1>
                </div>
            </div>

            
        </div>
    )
}