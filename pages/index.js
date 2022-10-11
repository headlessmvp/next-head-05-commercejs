import { useContext, useEffect } from "react"

// Context
import { ProductContext } from "../context/ProductContext"

// Sanity
import commerce from "../lib/commerce"

// Components
import { Hero } from "../components/sections/Hero"
import { Category } from "../components/sections/Category"
import { Featured } from "../components/sections/Featured"
import { Favourites } from "../components/sections/Favourites"
import { CTA } from "../components/sections/CTA"
import { Layout } from "../components/Layout"
import ProductList from "../components/ProductList"
import Link from "next/link"
import CategoryList from "../components/CategoryList"

export default function Home({ data }) {
  const { setAllData, allData, setSubCategories } = useContext(ProductContext)

  useEffect(() => {
    setAllData(data)
  }, [])

  useEffect(() => {
    let subCatTemp = []
    // data?.categories?.map((category) => {
    //   category?.subCategories?.map((sub) => subCatTemp.push(sub))
    // })
    // setSubCategories(subCatTemp)
  }, [allData])

  console.log("PRODUCTS: ", data)
  return (
    <Layout>
      <h2>Hello</h2>
      {/* <h1 className="text-xl mb-4 font-bold">{merchant.business_name}</h1>

      <h3 className="text-lg mb-2 font-semibold underline">
        <Link href="/categories">
          <a>Categories</a>
        </Link>
      </h3>

      <CategoryList categories={categories} />

      <h3 className="text-lg my-2 font-semibold underline">
        <Link href="/products">
          <a>Products</a>
        </Link>
      </h3>

      <ProductList products={products} /> */}
    </Layout>
  )
}

export async function getStaticProps() {
  const merchant = await commerce.merchants.about()
  const { data: categories } = await commerce.categories.list()
  const { data: products } = await commerce.products.list()
  let data = { merchant, categories, products }

  return {
    props: {
      data,
    },
  }
}
