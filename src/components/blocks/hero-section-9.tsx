"use client"

import * as React from "react"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Menu, X, Compass, DollarSign, Wallet, TrendingUp } from 'lucide-react'
import { AuroraFlowBackground } from '@/components/ui/aurora-background'

const menuItems = [
    { name: 'Features', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'About', href: '#' },
]

export const HeroSection = () => {
    const [menuState, setMenuState] = React.useState(false)
    return (
        <div>
            <header>
                <nav
                    data-state={menuState && 'active'}
                    className="group fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent">
                    <div className="m-auto max-w-5xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2">
                                    <Logo />
                                </Link>

                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                                <div className="lg:pr-4">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                                    <Link href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
                                        <span>Login</span>
                                    </Link>
                                    <Link href="#" className={buttonVariants({ size: "sm" })}>
                                        <span>Sign Up</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(150,80%,40%,.08)_0,hsla(150,80%,40%,.02)_50%,hsla(150,80%,40%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(150,80%,40%,.06)_0,hsla(150,80%,40%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-87.5 absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(150,80%,40%,.04)_0,hsla(150,80%,40%,.02)_80%,transparent_100%)]" />
                </div>

                <section className="relative overflow-hidden bg-transparent">
                    <AuroraFlowBackground />
                    <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl text-emerald-600 dark:text-emerald-400">Cash Compass</h1>
                            <p className="mx-auto my-8 max-w-2xl text-xl text-muted-foreground">Your trusted Egyptian financial advisor. Navigate your finances with confidence, track expenses, and discover the best investment opportunities tailored for you.</p>

                            <Link href="#" className={buttonVariants({ size: "lg", className: "bg-emerald-600 hover:bg-emerald-700 text-white" })}>
                                <span className="btn-label">Start Your Journey</span>
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto -mt-16 max-w-7xl [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
                        <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_50%,transparent_100%)] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
                            <div className="[transform:rotateX(20deg);]">
                                <div className="lg:h-[44rem] relative skew-x-[.36rad]">
                                    <img
                                        className="rounded-[--radius] z-[2] relative border dark:hidden object-cover w-full h-full shadow-2xl shadow-emerald-500/20"
                                        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2880&auto=format&fit=crop"
                                        alt="Financial Dashboard Light"
                                        width={2880}
                                        height={2074}
                                    />
                                    <img
                                        className="rounded-[--radius] z-[2] relative hidden border dark:block object-cover w-full h-full shadow-2xl shadow-emerald-900/50"
                                        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2880&auto=format&fit=crop"
                                        alt="Financial Dashboard Dark"
                                        width={2880}
                                        height={2074}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-background relative z-10 py-16">
                    <div className="m-auto max-w-5xl px-6">
                        <h2 className="text-center text-lg font-medium text-muted-foreground">Trusted by top financial institutions in Egypt and worldwide.</h2>
                        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
                            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                                <DollarSign className="size-6" />
                                <span className="font-semibold text-lg">CIB Bank</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                                <Wallet className="size-6" />
                                <span className="font-semibold text-lg">NBE</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                                <TrendingUp className="size-6" />
                                <span className="font-semibold text-lg">EFG Hermes</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                                <DollarSign className="size-6" />
                                <span className="font-semibold text-lg">Banque Misr</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Compass className="size-6" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                CashCompass
            </span>
        </div>
    )
}
