import CreatedBattlesTable from "./components/CreatedBattlesTable"
import Navbar from "./components/Navbar"

export default function BattleLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="">
         <Navbar />
         <div className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start justify-evenly gap-5 max-w-7xl mx-auto mt-5 md:mt-7">
            {children}
            <CreatedBattlesTable />
         </div>
      </div>
   )
}
