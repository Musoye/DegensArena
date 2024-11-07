import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./Button"
import useStacksAuth from "../hooks/useStacks"
import { truncateAddress } from "../utils/truncate"

export default function Navbar() {
   const [isOpen, setIsOpen] = useState(false)
   const { userData, signin, signout } = useStacksAuth()

   return (
      <>
         <header className="relative w-full bg-[#a7bfe6] text-black">
            <nav className="max-w-7xl mx-auto px-2 md:px-4 xl:px-0 flex items-center justify-between">
               <div className="flex items-center gap-2 md:gap-4">
                  <img src="/logo.png" className="block w-16" />
                  <div className="flex items-center gap-0 md:gap-1">
                     <h1 className="font-bold">STONE</h1>
                     <img src="/logo.png" className="w-16" />
                     <h2 className="font-bold">The King of the Arena</h2>
                  </div>
               </div>
               <>
                  {isOpen ? (
                     <X size={30} className="text-[#19467e] md:hidden" onClick={() => setIsOpen(false)} />
                  ) : (
                     <Menu className="text-[#19467e] md:hidden" size={30} onClick={() => setIsOpen(true)} />
                  )}
                  <ul className="hidden md:flex md:items-center md:gap-4">
                     <li className="text-[#19467e] text-lg font-medium">
                        <Link to="/degens-king">Degens King</Link>
                     </li>
                     <li className="text-[#19467e] text-lg font-medium">
                        <Link to="/king-makers">King Makers</Link>
                     </li>
                  </ul>
                  {isOpen && <SideBar signin={signin} />}
                  {userData ? (
                     <Button
                        className="hidden md:block hover:bg-[#7da0ca] bg-[#98afd4] focus-visible:bg-[#98afd4] text-white font-semibold rounded-2xl py-1 px-4 transition-all"
                        onClick={() => signout()}
                     >
                        {truncateAddress(userData?.profile?.stxAddress.testnet)}
                     </Button>
                  ) : (
                     <Button
                        className="hidden md:block hover:bg-[#7da0ca] bg-[#98afd4] focus-visible:bg-[#98afd4] text-white font-semibold rounded-2xl py-1 px-4 transition-all"
                        onClick={() => signin()}
                     >
                        Sign in
                     </Button>
                  )}
               </>
            </nav>
         </header>
         <div className="w-full mt-2 bg-[#a7bfe6] text-black">
            <p className="max-w-7xl text-center px-2 md:px-4 text-base font-bold py-2 bg-[#a7bfe6] text-black">
               Make your favorite token the king by creating battles and defeating the reigning King for a chance to
               share in the $100 STX King Makers reward.
            </p>
         </div>
      </>
   )
}

function SideBar({ signin }: { signin: () => void }) {
   return (
      <div className="md:hidden absolute top-[64px] left-0 w-full bg-[#bad4fd]">
         <div className="flex flex-col items-start gap-1 mt-4">
            <Link
               to="/degens-king"
               className="bg-[#a7bfe6] hover:bg-[#98afd4] focus-visible:bg-[#98afd4] text-[#19467e] font-semibold px-4 w-full py-2 transition-all"
            >
               Degens King
            </Link>
            <Link
               to="/king-makers"
               className="bg-[#a7bfe6] hover:bg-[#98afd4] focus-visible:bg-[#98afd4] text-[#19467e] font-semibold px-4 w-full py-2 transition-all"
            >
               King Makers
            </Link>
            <Button
               className="block mx-4 my-2 hover:bg-[#7da0ca] bg-[#98afd4] focus-visible:bg-[#98afd4] text-white font-semibold rounded-2xl py-1 px-4 transition-all"
               onClick={() => signin()}
            >
               Sign in
            </Button>
         </div>
      </div>
   )
}
