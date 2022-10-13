import React from "react"

// Icons
import { Squares2X2Icon } from "@heroicons/react/20/solid"

// Commerce Js
import commerce from "../lib/commerce"

// Next
import Link from "next/link"

// Components
import { Layout } from "../components/Layout"

const CategoriesPage = ({ categories }) => {
  return (
    <Layout>
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Categories
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Product grid */}
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:col-span-4 lg:gap-x-8">
                {categories?.map((category) => (
                  <Link
                    key={category.name}
                    href={`/category/${category?.slug}`}
                  >
                    <div className="group text-sm cursor-pointer">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img
                          src={category?.assets[0]?.url}
                          alt={category?.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-4 font-medium text-gray-900">
                        {category?.name}
                      </h3>
                      <p className="italic text-gray-500">
                        {category?.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data: categories } = await commerce.categories.list()

  return {
    props: {
      categories,
    },
  }
}

export default CategoriesPage
