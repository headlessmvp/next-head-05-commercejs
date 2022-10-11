import React from "react"

// pages/categories.js
import commerce from "../lib/commerce"
import CategoryList from "../components/CategoryList"

const CategoriesPage = ({ categories }) => {
  return (
    <React.Fragment>
      <h1>Categories</h1>

      <CategoryList categories={categories} />
    </React.Fragment>
  )
}

export async function getStaticProps() {
  const { data: categories } = await commerce.categories.list()

  return {
    props: {
      categories,
    },
  }
}

export default CategoriesPage
