import { useContext, useEffect, useState, Fragment } from "react"

// Headless UI
import { Dialog, Popover, Tab, Transition } from "@headlessui/react"

// Heroicons
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"

// Next
import Link from "next/link"

// Next
import Head from "next/head"

// Styles
import styles from "../styles/Home.module.css"

// Context
import { ProductContext } from "../context/ProductContext"

// Commerce Layer
import {
    CommerceLayer,
    OrderContainer,
    OrderStorage,
    LineItemsContainer,
    LineItemsCount,
    LineItem,
    LineItemImage,
    LineItemName, LineItemQuantity, LineItemAmount, LineItemRemoveLink, TotalAmount, CheckoutLink
} from "@commercelayer/react-components"

// Components
import { Footer } from "./Footer"

// Commerce
import commerce from "../lib/commerce"

const navigation = {
    categories: [
        {
            id: "women",
            name: "Women",
            featured: [
                {
                    name: "New Arrivals",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
                    imageAlt:
                        "Models sitting back to back, wearing Basic Tee in black and bone.",
                },
                {
                    name: "Basic Tees",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
                    imageAlt:
                        "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
                },
            ],
            sections: [
                {
                    id: "clothing",
                    name: "Clothing",
                    items: [
                        { name: "Tops", href: "#" },
                        { name: "Dresses", href: "#" },
                        { name: "Pants", href: "#" },
                        { name: "Denim", href: "#" },
                        { name: "Sweaters", href: "#" },
                        { name: "T-Shirts", href: "#" },
                        { name: "Jackets", href: "#" },
                        { name: "Activewear", href: "#" },
                        { name: "Browse All", href: "#" },
                    ],
                },
                {
                    id: "accessories",
                    name: "Accessories",
                    items: [
                        { name: "Watches", href: "#" },
                        { name: "Wallets", href: "#" },
                        { name: "Bags", href: "#" },
                        { name: "Sunglasses", href: "#" },
                        { name: "Hats", href: "#" },
                        { name: "Belts", href: "#" },
                    ],
                },
                {
                    id: "brands",
                    name: "Brands",
                    items: [
                        { name: "Full Nelson", href: "#" },
                        { name: "My Way", href: "#" },
                        { name: "Re-Arranged", href: "#" },
                        { name: "Counterfeit", href: "#" },
                        { name: "Significant Other", href: "#" },
                    ],
                },
            ],
        },
        {
            id: "men",
            name: "Men",
            featured: [
                {
                    name: "New Arrivals",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
                    imageAlt:
                        "Drawstring top with elastic loop closure and textured interior padding.",
                },
                {
                    name: "Artwork Tees",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
                    imageAlt:
                        "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
                },
            ],
            sections: [
                {
                    id: "clothing",
                    name: "Clothing",
                    items: [
                        { name: "Tops", href: "#" },
                        { name: "Pants", href: "#" },
                        { name: "Sweaters", href: "#" },
                        { name: "T-Shirts", href: "#" },
                        { name: "Jackets", href: "#" },
                        { name: "Activewear", href: "#" },
                        { name: "Browse All", href: "#" },
                    ],
                },
                {
                    id: "accessories",
                    name: "Accessories",
                    items: [
                        { name: "Watches", href: "#" },
                        { name: "Wallets", href: "#" },
                        { name: "Bags", href: "#" },
                        { name: "Sunglasses", href: "#" },
                        { name: "Hats", href: "#" },
                        { name: "Belts", href: "#" },
                    ],
                },
                {
                    id: "brands",
                    name: "Brands",
                    items: [
                        { name: "Re-Arranged", href: "#" },
                        { name: "Counterfeit", href: "#" },
                        { name: "Full Nelson", href: "#" },
                        { name: "My Way", href: "#" },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: "Company", href: "/company" },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export const Layout = ({ children }) => {
    const {
        token,
        allData,
        sanityData,
        categories,
        allProducts,
        filteredCategories,
        cart, setCart
    } = useContext(ProductContext)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")
    const [origin, setOrigin] = useState("http://localhost:3000")

    // Functions
    const removeFromCart = async (id) => {
        try {
            const resp = await commerce.cart.remove(id)
            if (resp) {
                setCart(resp)
            }
        } catch (error) {
            setError(error)
        }
    }

    const incrementQuantity = async (id, quantity) => {
        try {

            const resp = await commerce.cart.update(id, { quantity: quantity + 1 })
            setCart(resp)
        } catch (error) {
            setError(error)
        }
    }

    const decrementQuantity = async (id, quantity) => {
        try {
            if (quantity > 1) {
                const resp = await commerce.cart.update(id, { quantity: quantity - 1 })
                setCart(resp)
            }

        } catch (error) {
            setError(error)
        }
    }


    useEffect(() => {
        setOrigin(location.origin)
    }, [])

    useEffect(() => { }, categories)

    console.log("CART: ", cart)

    return (
        <CommerceLayer
            accessToken={token}
            endpoint={process.env.NEXT_PUBLIC_CL_BASE_ENDPOINT}
        >
            <OrderStorage persistKey="abc-002">
                <OrderContainer
                    attributes={{
                        cart_url: `${origin}`,
                        return_url: `${origin}`,
                        privacy_url: `${origin}`,
                    }}
                >                                                                    <LineItemsContainer>


                        <div className={styles.container}>
                            <Head>
                                <title>Head 01</title>
                                <meta
                                    name="description"
                                    content="Generated by create next app"
                                />
                                <link rel="icon" href="/favicon.ico" />
                            </Head>

                            <div className="bg-white">
                                {/* Mobile menu */}
                                <Transition.Root show={open} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="relative z-40 lg:hidden"
                                        onClose={setOpen}
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
                                                enterFrom="-translate-x-full"
                                                enterTo="translate-x-0"
                                                leave="transition ease-in-out duration-300 transform"
                                                leaveFrom="translate-x-0"
                                                leaveTo="-translate-x-full"
                                            >
                                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                                    <div className="flex px-4 pt-5 pb-2">
                                                        <button
                                                            type="button"
                                                            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close menu</span>
                                                            <XMarkIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>

                                                    {/* Links */}
                                                    <Tab.Group as="div" className="mt-2">
                                                        <div className="border-b border-gray-200">
                                                            <Tab.List className="-mb-px flex space-x-8 px-4">
                                                                {categories?.map((category) => (
                                                                    <Tab
                                                                        key={category.name}
                                                                        className={({ selected }) =>
                                                                            classNames(
                                                                                selected
                                                                                    ? "text-indigo-600 border-indigo-600"
                                                                                    : "text-gray-900 border-transparent",
                                                                                "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                                                                            )
                                                                        }
                                                                    >
                                                                        {category.name}
                                                                    </Tab>
                                                                ))}
                                                            </Tab.List>
                                                        </div>
                                                        <Tab.Panels as={Fragment}>
                                                            {categories?.map((category) => (
                                                                <Tab.Panel
                                                                    key={category.name}
                                                                    className="space-y-10 px-4 pt-10 pb-8"
                                                                >
                                                                    <div className="grid grid-cols-2 gap-x-4">
                                                                        {category?.children?.map((item) => (
                                                                            <div
                                                                                key={item.id}
                                                                                className="group relative text-sm"
                                                                            >
                                                                                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                    <img
                                                                                        src={item?.assets[0]?.url}
                                                                                        alt={item?.name}
                                                                                        className="object-cover object-center"
                                                                                    />
                                                                                </div>
                                                                                <Link
                                                                                    href={`/subCategories/${item.slug}`}
                                                                                >
                                                                                    <span className="mt-6 block font-medium text-gray-900"
                                                                                    >  <span
                                                                                            className="absolute inset-0 z-10"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        {item.name}</span>

                                                                                </Link>
                                                                                <p aria-hidden="true" className="mt-1">
                                                                                    Shop now
                                                                                </p>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                </Tab.Panel>
                                                            ))}
                                                        </Tab.Panels>
                                                    </Tab.Group>

                                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                                        {navigation.pages.map((page) => (
                                                            <div key={page.name} className="flow-root">
                                                                <Link
                                                                    href={page.href}
                                                                >
                                                                    <span className="-m-2 block p-2 font-medium text-gray-900"
                                                                    >                                                                    {page.name}
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                                        <div className="flow-root">
                                                            <Link href="/login">
                                                                <span className="-m-2 block p-2 font-medium text-gray-900">
                                                                    Sign in
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <div className="flow-root">
                                                            <Link href="/signup">
                                                                <span className="-m-2 block p-2 font-medium text-gray-900">
                                                                    Create account
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-gray-200 py-6 px-4">
                                                        <a href="#" className="-m-2 flex items-center p-2">
                                                            <img
                                                                src="https://tailwindui.com/img/flags/flag-canada.svg"
                                                                alt=""
                                                                className="block h-auto w-5 flex-shrink-0"
                                                            />
                                                            <span className="ml-3 block text-base font-medium text-gray-900">
                                                                {allData?.country}
                                                            </span>
                                                            <span className="sr-only">, change currency</span>
                                                        </a>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition.Root>

                                <header className="relative">
                                    {/* Top navigation */}
                                    <nav
                                        aria-label="Top"
                                        className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
                                    >
                                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                            <div className="flex h-16 items-center">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                                    onClick={() => setOpen(true)}
                                                >
                                                    <span className="sr-only">Open menu</span>
                                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                                </button>

                                                {/* Logo */}
                                                <div className="ml-4 flex lg:ml-0">
                                                    <Link href="/">
                                                        <img
                                                            className="h-8 w-auto cursor-pointer"
                                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                            alt=""
                                                        />
                                                    </Link>
                                                </div>

                                                {/* Flyout menus */}
                                                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-30">
                                                    <div className="flex h-full space-x-8 z-30">
                                                        {categories && filteredCategories[0] && <Popover key={filteredCategories[0].name} className="flex z-30">
                                                            {({ open }) => (
                                                                <>
                                                                    <div className="relative flex">
                                                                        <Popover.Button
                                                                            className={classNames(
                                                                                open
                                                                                    ? "border-indigo-600 text-indigo-600"
                                                                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                                                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                                                            )}
                                                                        >
                                                                            {filteredCategories[0].name}
                                                                        </Popover.Button>
                                                                    </div>

                                                                    <Transition
                                                                        as={Fragment}
                                                                        enter="transition ease-out duration-200"
                                                                        enterFrom="opacity-0"
                                                                        enterTo="opacity-100"
                                                                        leave="transition ease-in duration-150"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Popover.Panel className="absolute inset-x-0 top-full bg-white text-sm text-gray-500 z-30">

                                                                            <div
                                                                                className="absolute inset-0 top-1/2 bg-white shadow"
                                                                                aria-hidden="true"
                                                                            />
                                                                            <div
                                                                                className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                                                                aria-hidden="true"
                                                                            >
                                                                                <div
                                                                                    className={classNames(
                                                                                        open
                                                                                            ? "bg-gray-200"
                                                                                            : "bg-transparent",
                                                                                        "h-px w-full transition-colors duration-200 ease-out"
                                                                                    )}
                                                                                />
                                                                            </div>

                                                                            <div className="relative">
                                                                                <div className="mx-auto max-w-7xl px-8">
                                                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                                            {filteredCategories[0]?.children?.map(
                                                                                                (item) => (
                                                                                                    <div
                                                                                                        key={item?.id}
                                                                                                        className="group relative text-base sm:text-sm"
                                                                                                    >
                                                                                                        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                                            <img
                                                                                                                src={item?.assets[0]?.url}
                                                                                                                alt={item?.name}
                                                                                                                className="object-cover object-center"
                                                                                                            />
                                                                                                        </div>
                                                                                                        <Link
                                                                                                            href={`/subCategories/${item.slug}`}
                                                                                                        >
                                                                                                            <span className="mt-6 block font-medium text-gray-900"
                                                                                                            > <span
                                                                                                                    className="absolute inset-0 z-10"
                                                                                                                    aria-hidden="true"
                                                                                                                />
                                                                                                                {item?.name}</span>

                                                                                                        </Link>
                                                                                                        <p
                                                                                                            aria-hidden="true"
                                                                                                            className="mt-1"
                                                                                                        >
                                                                                                            Shop now
                                                                                                        </p>
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                                                            {filteredCategories[0]?.children?.map(
                                                                                                (subCategory) => {
                                                                                                    let products = []

                                                                                                    let filtered
                                                                                                    allProducts?.map((prod) => {
                                                                                                        filtered = prod?.categories?.filter(subCat => subCat?.id === subCategory?.id)
                                                                                                        if (filtered[0]) {
                                                                                                            products.push(prod)
                                                                                                        }
                                                                                                    })
                                                                                                    if (products?.length === 0) return null

                                                                                                    return (
                                                                                                        <div key={subCategory?.id}>
                                                                                                            <p
                                                                                                                id={`${subCategory.id}-heading`}
                                                                                                                className="font-medium text-gray-900"
                                                                                                            >
                                                                                                                {subCategory?.name}
                                                                                                            </p>
                                                                                                            <ul
                                                                                                                role="list"
                                                                                                                aria-labelledby={`${subCategory?.id}-heading`}
                                                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                                            >
                                                                                                                {products.map(
                                                                                                                    (item) => (
                                                                                                                        <li
                                                                                                                            key={item?.name}
                                                                                                                            className="flex"
                                                                                                                        >
                                                                                                                            <a
                                                                                                                                href={item?.reference}
                                                                                                                                className="hover:text-gray-800"
                                                                                                                            >
                                                                                                                                {item?.name}
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                    )
                                                                                                                )}
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    )
                                                                                                }
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Popover.Panel>
                                                                    </Transition>
                                                                </>
                                                            )}
                                                        </Popover>}

                                                        {categories && filteredCategories[1] && <Popover key={filteredCategories[1].name} className="flex z-30">
                                                            {({ open }) => (
                                                                <>
                                                                    <div className="relative flex">
                                                                        <Popover.Button
                                                                            className={classNames(
                                                                                open
                                                                                    ? "border-indigo-600 text-indigo-600"
                                                                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                                                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                                                            )}
                                                                        >
                                                                            {filteredCategories[1].name}
                                                                        </Popover.Button>
                                                                    </div>

                                                                    <Transition
                                                                        as={Fragment}
                                                                        enter="transition ease-out duration-200"
                                                                        enterFrom="opacity-0"
                                                                        enterTo="opacity-100"
                                                                        leave="transition ease-in duration-150"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Popover.Panel className="absolute inset-x-0 top-full bg-white text-sm text-gray-500 z-30">

                                                                            <div
                                                                                className="absolute inset-0 top-1/2 bg-white shadow"
                                                                                aria-hidden="true"
                                                                            />
                                                                            <div
                                                                                className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                                                                aria-hidden="true"
                                                                            >
                                                                                <div
                                                                                    className={classNames(
                                                                                        open
                                                                                            ? "bg-gray-200"
                                                                                            : "bg-transparent",
                                                                                        "h-px w-full transition-colors duration-200 ease-out"
                                                                                    )}
                                                                                />
                                                                            </div>

                                                                            <div className="relative">
                                                                                <div className="mx-auto max-w-7xl px-8">
                                                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                                            {filteredCategories[1]?.children?.map(
                                                                                                (item) => (
                                                                                                    <div
                                                                                                        key={item?.id}
                                                                                                        className="group relative text-base sm:text-sm"
                                                                                                    >
                                                                                                        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                                            <img
                                                                                                                src={item?.assets[0]?.url}
                                                                                                                alt={item?.name}
                                                                                                                className="object-cover object-center"
                                                                                                            />
                                                                                                        </div>
                                                                                                        <Link
                                                                                                            href={`/subCategories/${item.slug}`}
                                                                                                        >
                                                                                                            <span className="mt-6 block font-medium text-gray-900"
                                                                                                            > <span
                                                                                                                    className="absolute inset-0 z-10"
                                                                                                                    aria-hidden="true"
                                                                                                                />
                                                                                                                {item?.name}</span>

                                                                                                        </Link>
                                                                                                        <p
                                                                                                            aria-hidden="true"
                                                                                                            className="mt-1"
                                                                                                        >
                                                                                                            Shop now
                                                                                                        </p>
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                                                            {filteredCategories[1]?.children?.map(
                                                                                                (subCategory) => {
                                                                                                    let products = []

                                                                                                    let filtered
                                                                                                    allProducts?.map((prod) => {
                                                                                                        filtered = prod?.categories?.filter(subCat => subCat?.id === subCategory?.id)
                                                                                                        if (filtered[0]) {
                                                                                                            products.push(prod)
                                                                                                        }
                                                                                                    })
                                                                                                    if (products?.length === 0) return null

                                                                                                    return (
                                                                                                        <div key={subCategory?.id}>
                                                                                                            <p
                                                                                                                id={`${subCategory.id}-heading`}
                                                                                                                className="font-medium text-gray-900"
                                                                                                            >
                                                                                                                {subCategory?.name}
                                                                                                            </p>
                                                                                                            <ul
                                                                                                                role="list"
                                                                                                                aria-labelledby={`${subCategory?.id}-heading`}
                                                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                                            >
                                                                                                                {products.map(
                                                                                                                    (item) => (
                                                                                                                        <li
                                                                                                                            key={item?.name}
                                                                                                                            className="flex"
                                                                                                                        >
                                                                                                                            <a
                                                                                                                                href={item?.reference}
                                                                                                                                className="hover:text-gray-800"
                                                                                                                            >
                                                                                                                                {item?.name}
                                                                                                                            </a>
                                                                                                                        </li>
                                                                                                                    )
                                                                                                                )}
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    )
                                                                                                }
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Popover.Panel>
                                                                    </Transition>
                                                                </>
                                                            )}
                                                        </Popover>}



                                                        {navigation.pages.map((page) => (
                                                            <a
                                                                key={page.name}
                                                                href={page.href}
                                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                                            >
                                                                {page.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </Popover.Group>

                                                <div className="ml-auto flex items-center">

                                                    {/* Forms */}
                                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                                        <Link href="/login">
                                                            <span className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-800">
                                                                Sign in
                                                            </span>
                                                        </Link>

                                                        <span
                                                            className="h-6 w-px bg-gray-200"
                                                            aria-hidden="true"
                                                        />

                                                        <Link href="/login">
                                                            <span className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-800">
                                                                Create account
                                                            </span>
                                                        </Link>
                                                    </div>

                                                    {/* Country */}
                                                    <div className="hidden lg:ml-8 lg:flex">
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-gray-700 hover:text-gray-800"
                                                        >
                                                            {sanityData?.flag && sanityData?.flag?.url && (
                                                                <img
                                                                    src={sanityData?.flag?.url}
                                                                    alt="country"
                                                                    className="block h-auto w-5 flex-shrink-0"
                                                                />
                                                            )}

                                                            <span className="ml-3 block text-sm font-medium">
                                                                {sanityData?.country}
                                                            </span>
                                                            <span className="sr-only">, change currency</span>
                                                        </a>
                                                    </div>

                                                    {/* Search */}
                                                    <div className="flex lg:ml-6">
                                                        <a
                                                            href="#"
                                                            className="p-2 text-gray-400 hover:text-gray-500"
                                                        >
                                                            <span className="sr-only">Search</span>
                                                            <MagnifyingGlassIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </div>

                                                    {/* Shopping Cart */}
                                                    <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8 z-50">
                                                        <Popover.Button className="group -m-2 flex items-center p-2">
                                                            <ShoppingBagIcon
                                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart?.total_items}</span>
                                                            <span className="sr-only">items in cart, view bag</span>
                                                        </Popover.Button>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                                                                <h2 className="sr-only">Shopping Cart</h2>

                                                                <div className="mx-auto max-w-2xl px-4">

                                                                    <ul role="list" className="flex flex-col divide-y divide-gray-200">



                                                                        {cart && cart?.line_items?.map(item => (
                                                                            <div key={item?.id} className="flex items-center py-6">
                                                                                <img src={item?.image?.url} alt={item?.name} className="h-16 w-16 flex-none rounded-md border border-gray-200"
                                                                                    width={50} />
                                                                                <div className="ml-4 flex-auto">
                                                                                    <h3 className="font-medium text-gray-900">
                                                                                        {item?.name}
                                                                                    </h3>
                                                                                    <div className="flex items-center">
                                                                                        <button onClick={() => decrementQuantity(item?.id, item?.quantity)} className="border px-2">-</button>
                                                                                        <p className="block mx-2 mt-1 text-sm py-1">{item?.quantity}</p>
                                                                                        <button onClick={() => incrementQuantity(item?.id, item?.quantity)} className="border px-2">+</button>
                                                                                    </div>

                                                                                    <p>{item?.price?.formatted_with_symbol}</p>
                                                                                    {error !== "" && <p className="text-red-600">{error}</p>
                                                                                    }

                                                                                    <button onClick={() => removeFromCart(item?.id)} className='text-red-400 cursor-pointer text-xs block'>Remove</button>
                                                                                </div>
                                                                            </div>
                                                                        ))}




                                                                    </ul>


                                                                    <p className="text-base">Total: {cart?.subtotal?.formatted_with_symbol}</p>
                                                                    <a href={cart?.hosted_checkout_url} className="w-full rounded-md border border-transparent bg-indigo-600 mt-6 py-2 px-4 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 block"
                                                                    >Checkout</a>


                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </header>

                                <main>
                                    {children}
                                </main>

                                <Footer />
                            </div>

                        </div></LineItemsContainer>
                </OrderContainer>
            </OrderStorage>
        </CommerceLayer>
    )
}
