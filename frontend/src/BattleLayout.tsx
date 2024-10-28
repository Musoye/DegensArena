import Navbar from "./components/Navbar"

export default function BattleLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Navbar />
         <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
            {children}
            <div>asdfsdf</div>
         </div>
      </>
   )
}
