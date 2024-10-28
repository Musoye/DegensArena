import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import BattleLayout from "./BattleLayout"

export const router = createBrowserRouter([
   {
      path: "/",
      element: (
         <>
            <BattleLayout>
               <Home />
            </BattleLayout>
         </>
      ),
   },
   {
      path: "/upcoming",
      element: (
         <>
            {/* <Navbar />
            <Upcoming /> */}
         </>
      ),
   },
   {
      path: "/create-battle",
      element: (
         <>
            {/* <Navbar />
            <CreateBattle /> */}
         </>
      ),
   },
   {
      path: "/pre-battle/:id",
      element: (
         <>
            {/* <Navbar />
            <PreBattle /> */}
         </>
      ),
   },
   {
      path: "/battle/:id",
      element: (
         <>
            {/* <Navbar />
            <LiveBattle /> */}
         </>
      ),
   },
   {
      path: "/winner/:id",
      element: (
         <>
            {/* <Navbar />
            <Winner /> */}
         </>
      ),
   },
])
