import { userSession } from "./userSession"

export function getProvider() {
   if (!userSession.isUserSignedIn()) return

   const profile = userSession.loadUserData().profile
   const providerKey = profile.walletProvider
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const globalContext = window as any
   const provider = globalContext[providerKey]
   const address = profile.stxAddress.mainnet
   if (address.startsWith("SM")) {
      return globalContext.AsignaProvider
   }
   if (providerKey === "leather") {
      return globalContext.LeatherProvider
   }

   if (!providerKey) {
      return (
         globalContext.XverseProviders.StacksProvider || globalContext.XverseProvider || globalContext.StacksProvider
      )
   }

   return provider
}
