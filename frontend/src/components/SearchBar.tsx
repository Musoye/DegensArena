import { Search } from "lucide-react"

export default function SearchBar() {
   return (
      <div className="w-full flex items-center gap-2 sticky top-0 bg-[#abc8f1]">
         <input type="search" placeholder="Enter token name" name="search" className="rounded-full py-2 px-4 w-full" />
         <button className="bg-[#7da0ca] p-2 rounded-full">
            <Search />
         </button>
      </div>
   )
}
