import Link from 'next/link'
import React, { useContext } from 'react'

// Context
import { ProductContext } from '../../context/ProductContext'

// Commerce Layer
import {
    PricesContainer,
    Price,
    ItemContainer,
} from "@commercelayer/react-components"



export const Favourites = ({ favourites }) => {
    // console.log("FAV: ", favourites)

    return (
        <ItemContainer>

            <section aria-labelledby="favorites-heading">
                <div className="mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-baseline sm:justify-between">
                        <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                            Our Favorites
                        </h2>
                        <Link href="/favourites" >
                            <span className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block cursor-pointer"> Browse all favorites
                                <span aria-hidden="true"> &rarr;</span></span>

                        </Link>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">


                        {favourites && favourites[0] && <div key={favourites[0].sku} className="group relative cursor-pointer">
                            <div className="h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                                <img
                                    src={favourites[0]?.image?.url}
                                    alt={favourites[0]?.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                <Link href={`product/${favourites[0]?.permalink}`}>
                                    <span> <span className="absolute inset-0" />
                                        {favourites[0].name}</span>
                                </Link>
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{favourites[0]?.price?.formatted_with_symbol}</p>

                        </div>}

                        {favourites && favourites[1] && <div key={favourites[1].sku} className="group relative cursor-pointer">
                            <div className="h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                                <img
                                    src={favourites[1]?.image?.url}
                                    alt={favourites[1]?.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                <Link href={`product/${favourites[1]?.permalink}`}>
                                    <span> <span className="absolute inset-0" />
                                        {favourites[1].name}</span>
                                </Link>
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{favourites[1]?.price?.formatted_with_symbol}</p>

                        </div>}

                        {favourites && favourites[2] && <div key={favourites[2].sku} className="group relative cursor-pointer">
                            <div className="h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                                <img
                                    src={favourites[2]?.image?.url}
                                    alt={favourites[2]?.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                <Link href={`product/${favourites[2]?.permalink}`}>
                                    <span> <span className="absolute inset-0" />
                                        {favourites[2].name}</span>
                                </Link>
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{favourites[2]?.price?.formatted_with_symbol}</p>

                        </div>}



                    </div>

                    <div className="mt-6 sm:hidden">
                        <Link href="/favourites" >
                            <span className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">Browse all favorites
                                <span aria-hidden="true"> &rarr;</span></span>
                        </Link>
                    </div>
                </div>
            </section></ItemContainer>)
}
