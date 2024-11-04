type Button = React.ButtonHTMLAttributes<HTMLButtonElement> & {
   children: React.ReactNode
   className?: string
}

export function Button({ children, className, ...props }: Button) {
   return (
      <button className={className} {...props}>
         {children}
      </button>
   )
}

export function SignInButton({ className }: { className: string }) {
   return (
      <Button
         className={`${className} hover:bg-[#7da0ca] bg-[#98afd4] focus-visible:bg-[#98afd4] text-white font-semibold rounded-2xl py-1 px-4 transition-all`}
      >
         Sign in
      </Button>
   )
}
