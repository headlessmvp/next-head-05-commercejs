import { useContext, useEffect } from "react"

// Context
import { ProductContext } from "../context/ProductContext"

// Sanity
import { client } from "../lib/client"

// Constants
import { GET_SANITY_DATA } from "../constants/sanity"

// Commerce Js
import commerce from "../lib/commerce"

// Components
import { Hero } from "../components/sections/Hero"
import { Category } from "../components/sections/Category"
import { Featured } from "../components/sections/Featured"
import { Favourites } from "../components/sections/Favourites"
import { CTA } from "../components/sections/CTA"
import { Layout } from "../components/Layout"

export default function Home({ sanity, favourites }) {
  const { setSanityData } = useContext(ProductContext)

  useEffect(() => {
    setSanityData(sanity)
  }, [])

  return (
    <Layout>
      <div className="relative overflow-hidden">
        <Hero />
      </div>

      <Category />
      <Featured />
      <Favourites favourites={favourites} />
      <CTA />
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

  // Get Sanity Data
  const heads = await client.fetch(GET_SANITY_DATA)

  let filtered = {}

  if (heads.length > 0) {
    filtered = heads.filter(
      (head) => head.id === process.env.NEXT_PUBLIC_HEAD_ID
    )
  }

  return {
    props: {
      sanity: filtered[0],
      favourites: products,
    },
  }
}
