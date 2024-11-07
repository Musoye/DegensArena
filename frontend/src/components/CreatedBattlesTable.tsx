import SearchBar from "./SearchBar"

type KingMakers = {
   player: string
   wins: number
   winsToKing: number
}

const kingMakers: KingMakers[] = new Array(1).fill({ player: "velarvelar", wins: 93, winsToKing: 7 })

export default function CreatedBattlesTable() {
   return (
      <div className="bg-[#abc8f1] p-4 max-h-[525px] overflow-scroll">
         <SearchBar />
         <table className="bg-[#5b80b2] text-left mt-5">
            <thead>
               <tr>
                  <th>Player</th>
                  <th>Wins</th>
                  <th>Wins to King</th>
               </tr>
            </thead>
            <tbody>
               {kingMakers.map((kingMaker) => (
                  <tr key={kingMaker.wins}>
                     <td>{kingMaker.player}</td>
                     <td>{kingMaker.wins}</td>
                     <td>{kingMaker.winsToKing}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}
