import Link from "next/link"
import React from "react"

// Components
import Category from "./Category"

const CategoryList = ({ categories }) => {
  if (!categories) return null

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link href={`/categories/${category.slug}`}>
            <a>
              <Category {...category} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
