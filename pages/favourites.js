import { Fragment, useState, useEffect, useContext } from "react"

// Headless UI
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react"

// Context
import { ProductContext } from "../context/ProductContext"

// Commerce Js
import commerce from "../lib/commerce"

// Icons
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

import { Layout } from "../components/Layout"

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Favourites({ favourites }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { setAllData, allData, setSubCategories } = useContext(ProductContext)
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {}, [favourites])
  console.log(favourites)
  // useEffect(() => {
  //   setAllData(data)
  // }, [])

  // useEffect(() => {
  //   let subCatTemp = []
  //   data?.categories?.map((category) => {
  //     category?.subCategories?.map((sub) => subCatTemp.push(sub))
  //   })
  //   setSubCategories(subCatTemp)
  // }, [allData])

  // useEffect(() => {
  //   if (allData?.favourites?.length > 0) {
  //     setProducts(allData?.favourites)
  //   }
  // }, [allData?.favourites])

  // useEffect(() => {
  //   let tempColors = []
  //   if (allData?.favourites) {
  //     console.log("MAP")
  //     allData?.favourites?.map((product) => {
  //       tempColors.push(...product?.colors)
  //     })

  //     const arrayUniqueByKey = [
  //       ...new Map(tempColors.map((item) => [item["name"], item])).values(),
  //     ]

  //     let colorsWithCheck = []
  //     arrayUniqueByKey?.map((item) =>
  //       colorsWithCheck.push({ ...item, checked: false })
  //     )
  //     setColors(colorsWithCheck)
  //   }
  // }, [allData?.favourites])

  // useEffect(() => {
  //   let tempSizes = []
  //   if (allData?.favourites) {
  //     allData?.favourites?.map((product) => {
  //       tempSizes.push(...product?.sizes)
  //     })

  //     const arrayUniqueByKey = [
  //       ...new Map(tempSizes.map((item) => [item["name"], item])).values(),
  //     ]

  //     let sizesWithCheck = []
  //     arrayUniqueByKey?.map((item) =>
  //       sizesWithCheck.push({ ...item, checked: false })
  //     )
  //     setSizes(sizesWithCheck)
  //   }
  // }, [allData?.favourites])

  // useEffect(() => {
  //   if (selectedColors?.length > 0) {
  //     let tempProducts = []
  //     products?.map((product) => {
  //       product?.colors?.map((color) => {
  //         let filteredColor = selectedColors?.filter(
  //           (item) => item.name === color?.name
  //         )
  //         // console.log("FILTERED: COLOR: ", filteredColor, product)
  //         if (filteredColor[0]?.name) {
  //           if (tempProducts?.length > 0) {
  //             let filteredProduct = tempProducts?.filter(
  //               (item) => item.name === product?.name
  //             )
  //             if (filteredProduct[0]?.name) {
  //             } else {
  //               tempProducts.push(product)
  //             }
  //           } else {
  //             tempProducts.push(product)
  //           }
  //         }
  //       })
  //     })

  //     setFilteredProducts(tempProducts)
  //   } else {
  //     setFilteredProducts(products)
  //   }
  // }, [selectedColors])

  // useEffect(() => {
  //   if (selectedSizes?.length > 0) {
  //     let tempProducts = []
  //     products?.map((product) => {
  //       product?.sizes?.map((size) => {
  //         let filteredSize = selectedSizes?.filter(
  //           (item) => item.name === size?.name
  //         )
  //         if (filteredSize[0]?.name) {
  //           if (tempProducts?.length > 0) {
  //             let filteredProduct = tempProducts?.filter(
  //               (item) => item.name === product?.name
  //             )
  //             if (filteredProduct[0]?.name) {
  //             } else {
  //               tempProducts.push(product)
  //             }
  //           } else {
  //             tempProducts.push(product)
  //           }
  //         }
  //       })
  //     })

  //     setFilteredProducts(tempProducts)
  //   } else {
  //     setFilteredProducts(products)
  //   }
  // }, [selectedSizes])

  // useEffect(() => {
  //   if (colors) {
  //     let filtered = colors?.filter((item) => item?.checked)
  //     setSelectedColors(filtered)
  //   }
  // }, [colors])

  // useEffect(() => {
  //   if (sizes) {
  //     let filtered = sizes?.filter((item) => item?.checked)
  //     setSelectedSizes(filtered)
  //   }
  // }, [sizes])

  return (
    <Layout>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {/* Colors */}
                    {colors && colors?.length && (
                      <Disclosure
                        as="div"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  Colors
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {colors?.map((color) => (
                                  <div
                                    key={color.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${color.name}`}
                                      name={`${color.name}[]`}
                                      defaultValue={color.name}
                                      type="checkbox"
                                      defaultChecked={color.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${color.name}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {color.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}

                    {/* Sizes */}
                    {sizes && sizes?.length && (
                      <Disclosure
                        as="div"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  Sizes
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {sizes?.map(({ name, checked }) => (
                                  <div key={name} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${name}`}
                                      name={`${name}[]`}
                                      defaultValue={name}
                                      type="checkbox"
                                      defaultChecked={checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${name}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Favourites
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

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
              {/* Filters */}
              <form className="hidden lg:block">
                {/* Colors */}
                {colors && colors?.length && (
                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Colors
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {colors?.map((color, index) => (
                              <div
                                key={color.code}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${color.name}`}
                                  name={`${color.name}[]`}
                                  type="checkbox"
                                  value={color?.checked}
                                  onChange={() => {
                                    let filtered = colors?.filter(
                                      (item) => item.name === color.name
                                    )

                                    let changed = {
                                      ...filtered[0],
                                      checked: !filtered[0].checked,
                                    }

                                    let others = colors?.filter(
                                      (item) => item.name !== color.name
                                    )

                                    setColors([changed, ...others])
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${color.name}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {color.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}

                {/* Sizes */}
                {sizes && sizes?.length && (
                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Sizes
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {sizes?.map(({ name, checked }) => (
                              <div key={name} className="flex items-center">
                                <input
                                  id={`filter-${name}`}
                                  name={`${name}[]`}
                                  type="checkbox"
                                  value={checked}
                                  onChange={() => {
                                    let filtered = sizes?.filter(
                                      (item) => item.name === name
                                    )

                                    let changed = {
                                      ...filtered[0],
                                      checked: !filtered[0].checked,
                                    }

                                    let others = sizes?.filter(
                                      (item) => item.name !== name
                                    )

                                    setSizes([changed, ...others])
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${name}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}
              </form>

              {/* Product grid */}
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8">
                {favourites &&
                  favourites?.map((product) => (
                    <Link
                      key={product.sku}
                      href={`/product/${product?.permalink}`}
                    >
                      <div className="group text-sm cursor-pointer">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <img
                            src={product?.image?.url}
                            alt={product?.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <h3 className="mt-4 font-medium text-gray-900">
                          {product.name}
                        </h3>
                        {/* <p className="italic text-gray-500">
                            {product.caption}
                          </p> */}
                        <p className="mt-2 font-medium text-gray-900">
                          {product?.price?.formatted_with_symbol}
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
  let products = []

  try {
    const { data } = await commerce.products.list({
      category_slug: ["favourites"],
    })

    if (data) {
      products = data
    }
  } catch (error) {
    products = []
  }

  return {
    props: {
      favourites: products,
    },
  }
}
