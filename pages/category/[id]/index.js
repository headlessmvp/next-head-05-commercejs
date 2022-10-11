import { Fragment, useState, useContext, useEffect } from "react"

// Headless UI
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react"

// Heroicons
import { XMarkIcon } from "@heroicons/react/24/outline"
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid"

// Next
import Link from "next/link"
import { useRouter } from "next/router"

// Sanity Client
import { client } from "../../../lib/client"

// Commerce Js
import commerce from "../../../lib/commerce"

// Components
import { Layout } from "../../../components/Layout"

// Context
import { ProductContext } from "../../../context/ProductContext"

export default function Category({ data, sanity }) {
  const router = useRouter()

  const { setAllData, allData, setSubCategories, setSanityData, sanityData } =
    useContext(ProductContext)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [categoryData, setCategoryData] = useState({})

  useEffect(() => {
    setAllData(data)
    setSanityData(sanity)
  }, [])

  useEffect(() => {
    if (allData?.categories) {
      let filtered = allData?.categories?.filter(
        (item) => item.slug === router.query.id
      )
      setCategoryData(...filtered)
    }
  }, [allData])

  // console.log("CATEGORY: ", allData, categoryData)
  return (
    <Layout>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {categoryData && categoryData?.name && categoryData?.name}
          </h1>

          <div className="flex items-center">
            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Product grid */}
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:col-span-4 lg:gap-x-8">
              {categoryData &&
                categoryData?.children?.map((subCategory) => (
                  <Link
                    key={subCategory.slug}
                    href={`${categoryData?.slug}/${subCategory?.slug}`}
                  >
                    <div className="group text-sm cursor-pointer">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img
                          src={subCategory?.assets[0]?.url}
                          alt={subCategory?.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-4 font-medium text-gray-900">
                        {subCategory?.name}
                      </h3>
                      <p className="italic text-gray-500">
                        {" "}
                        {subCategory?.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export async function getServerSideProps() {
  const merchant = await commerce.merchants.about()
  const { data: categories } = await commerce.categories.list()
  const { data: products } = await commerce.products.list()
  let data = { merchant, categories, products }

  const query = `*[_type == "head"]{
    id,
    name,
    country,
    flag{
      'url': asset->url
    },
    headline,
    subHeading,
    'images': images[]->{
      name,
      'url': images.asset->url
    },
    url,
    bannerHeading,
    bannerText,
    saleText,
    bannerImage{
      'url': asset->url
    },
    
    
   
    
   
}`

  // Get Sanity Data
  const heads = await client.fetch(query)

  let filtered = {}

  if (heads.length > 0) {
    filtered = heads.filter(
      (head) => head.id === process.env.NEXT_PUBLIC_HEAD_ID
    )
  }

  return {
    props: {
      data,
      sanity: filtered[0],
    },
  }
}
