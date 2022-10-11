import { useContext, useEffect } from "react"

// Context
import { ProductContext } from "../context/ProductContext"

// Sanity
import { client } from "../lib/client"

// Commerce Js
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

export default function Home({ data, sanity }) {
  const { setAllData, allData, setSubCategories, setSanityData, sanityData } =
    useContext(ProductContext)

  useEffect(() => {
    setAllData(data)
    setSanityData(sanity)
  }, [])

  useEffect(() => {
    let subCatTemp = []
    // data?.categories?.map((category) => {
    //   category?.subCategories?.map((sub) => subCatTemp.push(sub))
    // })
    // setSubCategories(subCatTemp)
  }, [allData])

  console.log("PRODUCTS: ", data, sanityData)
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero section */}
        <Hero />
      </div>

      {/* Category section */}
      <Category />

      {/* Featured section */}
      <Featured />

      {/* Favorites section */}
      {/* <Favourites /> */}

      {/* CTA section */}
      <CTA />
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
