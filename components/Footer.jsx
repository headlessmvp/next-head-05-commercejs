import Link from "next/link"
import React, { useContext, useEffect } from "react"

// Context
import { ProductContext } from "../context/ProductContext"

const footerNavigation = {

    company: [
        { name: "Who we are", href: "/company" },
        { name: "Sustainability", href: "/company" },
        { name: "Press", href: "/company" },
        { name: "Careers", href: "/company" },

    ],
    account: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy", href: "/privacy" },
    ],

}

export const Footer = () => {
    const { categories, sanityData } = useContext(ProductContext)

    useEffect(() => { }, categories)

    return (
        <footer aria-labelledby="footer-heading" className="bg-white">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                        <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Shop</h3>
                                <ul role="list" className="mt-6 space-y-6">
                                    {categories?.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <Link
                                                href={`/category/${item.slug}`}
                                                className="text-gray-500 hover:text-gray-600"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Company</h3>
                                <ul role="list" className="mt-6 space-y-6">
                                    {footerNavigation.company.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <a
                                                href={item.href}
                                                className="text-gray-500 hover:text-gray-600"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Policies</h3>
                                <ul role="list" className="mt-6 space-y-6">
                                    {footerNavigation.account.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <a
                                                href={item.href}
                                                className="text-gray-500 hover:text-gray-600"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                                <ul role="list" className="mt-6 space-y-6">
                                    {sanityData?.socials?.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <a
                                                href={item.url}
                                                className="text-gray-500 hover:text-gray-600"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 md:mt-16 xl:mt-0">
                        <h3 className="text-sm font-medium text-gray-900">
                            Sign up for our newsletter
                        </h3>
                        <p className="mt-6 text-sm text-gray-500">
                            The latest deals and savings, sent to your inbox weekly.
                        </p>
                        <form className="mt-2 flex sm:max-w-md">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                type="text"
                                autoComplete="email"
                                required
                                className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-indigo-500 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <div className="ml-4 flex-shrink-0">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 py-10">
                    <p className="text-sm text-gray-500">
                        Copyright &copy; 2021 Your Company, Inc.
                    </p>
                </div>
            </div>
        </footer>
    )
}
