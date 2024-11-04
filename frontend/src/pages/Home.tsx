import { Button } from "../components/Button"

function Home() {
   return (
      <div className="bg-[#abc8f1] p-5">
         <p className="text-black text-center font-bold">Token with the highest buy volume in 60 minute wins</p>
         <div className="bg-[#5a7eaf] mt-2 pb-3">
            <h4 className="text-center pt-3 mb-2 font-bold text-2xl">Battle Arena</h4>
            <div className="flex items-center flex-col md:flex-row gap-2 p-3">
               <div className="flex items-center flex-col">
                  <input />
                  <img src="/logo.png" alt="contd_one" className="w-32" />
                  <div className="text-center">
                     <p>Moist</p>
                     <p>91 wins</p>
                  </div>
               </div>
               <div className="w-28">
                  <img src="/vs.png" alt="vs img" />
               </div>
               <div className="flex items-center flex-col">
                  <input />
                  <img src="/logo.png" alt="contd_two" className="w-32" />
                  <div className="text-center">
                     <p>Welsh</p>
                     <p>87 wins</p>
                  </div>
               </div>
            </div>
            <Button className="bg-[#7da0ca] px-3 py-2 rounded-2xl block mx-auto font-bold">Create Battle</Button>
         </div>
      </div>
   )
}

export default Home
