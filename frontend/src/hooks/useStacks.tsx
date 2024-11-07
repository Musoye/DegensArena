import { useEffect, useState } from "react"
import { userSession } from "../userSession"
import { disconnect, UserData, authenticate } from "@stacks/connect"

export default function useStacksAuth() {
   const [userData, setUserData] = useState<UserData>()

   const appDetails = {
      name: "Degens Arena",
      icon: window.location.origin + "/logo.png",
   }

   useEffect(() => {
      if (userSession.isSignInPending()) {
         userSession.handlePendingSignIn().then((userData) => {
            setUserData(userData)
         })
      } else if (userSession.isUserSignedIn()) {
         setUserData(userSession.loadUserData())
      }
   }, [])

   const signin = async () => {
      await authenticate({
         appDetails,
         userSession,
         onFinish() {
            window.location.reload()
         },
         onCancel() {
            console.log("Oops!! Cancelled signin")
         },
         sendToSignIn: true,
      })
   }

   const signout = () => {
      disconnect()
      setUserData(undefined)
   }

   return { signin, signout, userData }
}
