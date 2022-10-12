import React from 'react'

// Next
import Link from 'next/link'

// Context
import { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext'
import { useState } from 'react'
import { useEffect } from 'react'

export const Category = () => {

    const { filteredCategories } = useContext(ProductContext)




    return (
        <section aria-labelledby="category-heading" className="bg-gray-50">
            <div className="mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Shop by Category
                    </h2>
                    <Link href="/categories" >
                        <span className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block cursor-pointer">Browse all categories
                            <span aria-hidden="true"> &rarr;</span></span>
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                    {filteredCategories && filteredCategories[0] && <Link href={`/category/${filteredCategories[0]?.slug}`}><div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                        <img
                            src={filteredCategories[0]?.assets[0]?.url}
                            alt={filteredCategories[0]?.name}
                            className="object-cover object-center group-hover:opacity-75"
                        />
                        <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                        <div className="flex items-end p-6">
                            <div>
                                <h3 className="font-semibold text-white">
                                    <a href="#">
                                        <span className="absolute inset-0" />
                                        {filteredCategories[0]?.name}
                                    </a>
                                </h3>
                                <p aria-hidden="true" className="mt-1 text-sm text-white">
                                    Shop now
                                </p>
                            </div>
                        </div>
                    </div></Link>}

                    {filteredCategories && filteredCategories[1] && <Link href={`/category/${filteredCategories[1]?.slug}`}><div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                        <img
                            src={filteredCategories[1]?.assets[0]?.url}
                            alt={filteredCategories[1]?.name}
                            className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                        />
                        <div
                            aria-hidden="true"
                            className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                        />
                        <div className="flex items-end p-6 sm:absolute sm:inset-0">
                            <div>
                                <h3 className="font-semibold text-white">
                                    <a href="#">
                                        <span className="absolute inset-0" />
                                        {filteredCategories[1]?.name}
                                    </a>
                                </h3>
                                <p aria-hidden="true" className="mt-1 text-sm text-white">
                                    Shop now
                                </p>
                            </div>
                        </div>
                    </div></Link>}


                    {filteredCategories && filteredCategories[2] && <Link href={`/category/${filteredCategories[2]?.slug}`}><div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                        <img
                            src={filteredCategories[2]?.assets[0]?.url}
                            alt={filteredCategories[2]?.name}
                            className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                        />
                        <div
                            aria-hidden="true"
                            className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                        />
                        <div className="flex items-end p-6 sm:absolute sm:inset-0">
                            <div>
                                <h3 className="font-semibold text-white">
                                    <a href="#">
                                        <span className="absolute inset-0" />
                                        {filteredCategories[2]?.name}
                                    </a>
                                </h3>
                                <p aria-hidden="true" className="mt-1 text-sm text-white">
                                    Shop now
                                </p>
                            </div>
                        </div>
                    </div></Link>}


                </div>

                <div className="mt-6 sm:hidden">
                    <Link href="/categories" >
                        <span className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">Browse all categories
                            <span aria-hidden="true"> &rarr;</span></span>
                    </Link>
                </div>
            </div>
        </section>)
}
