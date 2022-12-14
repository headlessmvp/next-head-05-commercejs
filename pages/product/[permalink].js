import { useState, useEffect, useContext } from "react"
import { RadioGroup } from "@headlessui/react"
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline"
import { Layout } from "../../components/Layout"

// Constant
import { GET_SANITY_DATA } from "../../constants/sanity"

// Sanity Client
import { client } from "../../lib/client"

// Commerce Js
import commerce from "../../lib/commerce"

// Utils
import { mapImageResources } from "../../lib/cloudinary"
import { cloudinaryUrl } from "../../utils"

// Context
import { ProductContext } from "../../context/ProductContext"

// Link
import Link from "next/link"

const policies = [
  {
    name: "International delivery",
    icon: GlobeAmericasIcon,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Example({ sanity, product, variant_groups, variants }) {
  const { setSanityData, setCart } = useContext(ProductContext)

  const [selectedColor, setSelectedColor] = useState()
  const [selectedSize, setSelectedSize] = useState()
  const [showSizes, setShowSizes] = useState([])
  const [images, setImages] = useState()
  const [error, setError] = useState("")
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])

  // Functions
  const addToCart = async () => {
    if (selectedColor && selectedSize) {
      let variant_to_order_id = ""
      variants?.map((variant) => {
        let count = 0

        Object.keys(variant?.options)?.map((option) => {
          if (
            variant?.options[option] === selectedColor?.id ||
            variant?.options[option] === selectedSize?.id
          ) {
            count += 1
          }
        })

        if (count === 2) {
          variant_to_order_id = variant?.id
        }
      })

      if (variant_to_order_id !== "") {
        try {
          let cart = await commerce.cart.add(
            product?.id,
            product?.quantity,
            variant_to_order_id
          )
          if (cart) {
            setCart(cart)
          }
        } catch (error) {
          setError(error?.message)
        }
      }
    } else {
      setError("Please select Color & Sizes Both !")
    }
  }

  useEffect(() => {
    setSanityData(sanity)
  }, [])

  useEffect(() => {
    if (variant_groups?.length > 0) {
      variant_groups.map((variant) => {
        if (variant?.name === "Color") {
          setColors(variant?.options)
        } else if (variant?.name === "Size") {
          setSizes(variant?.options)
        }
      })
    }
  }, variant_groups)

  useEffect(() => {}, [variants])

  useEffect(() => {
    if (product?.sku) {
      ;(async function run() {
        const results = await fetch("/api/search", {
          method: "POST",
          body: JSON.stringify({
            expression: `context.reference:${product?.sku}`,
            with_field: "context",
            max_results: 4,
          }),
        }).then((resp) => resp.json())
        let { resources } = results
        const imgs = mapImageResources(resources)
        setImages(imgs)
      })()
    }
  }, [product])

  return (
    <Layout>
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">
                {product?.name}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                {" "}
                {product?.price?.formatted_with_symbol}
              </p>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              {images && images[0] && (
                <img
                  src={cloudinaryUrl(images[0].title)}
                  alt={images[0].title}
                  className="lg:col-span-2 lg:row-span-2 rounded-lg"
                />
              )}
              {images && images[1] && (
                <img
                  src={cloudinaryUrl(images[1].title)}
                  alt={images[1].title}
                  className="hidden lg:block rounded-lg"
                />
              )}
              {images && images[3] && (
                <img
                  src={cloudinaryUrl(images[3].title)}
                  alt={images[3].title}
                  className="hidden lg:block rounded-lg"
                />
              )}
              {/* {product.images.map((image) => (
                <img
                  key={image.id}
                  src={image.imageSrc}
                  alt={image.imageAlt}
                  className={classNames(
                    image.primary
                      ? "lg:col-span-2 lg:row-span-2"
                      : "hidden lg:block",
                    "rounded-lg"
                  )}
                />
              ))} */}
            </div>
          </div>

          <div className="mt-8 lg:col-span-5">
            <div>
              {/* Color picker */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Color</h2>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {colors?.map((color) => (
                      <RadioGroup.Option
                        key={color.id}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.id
                              ? "cursor-pointer focus:outline-none"
                              : "opacity-25 cursor-not-allowed",
                            active
                              ? "ring-2 ring-offset-2 ring-indigo-500"
                              : "",
                            checked
                              ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                              : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                            "border rounded-md py-3 px-2 flex items-center justify-center text-xs sm:flex-1"
                          )
                        }
                        disabled={!color.id}
                      >
                        <RadioGroup.Label as="span">
                          {color.name}
                        </RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Size picker */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a size{" "}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
                    {sizes?.map((size) => (
                      <RadioGroup.Option
                        key={size.id}
                        value={size}
                        className={({ active, checked }) =>
                          classNames(
                            size.id
                              ? "cursor-pointer focus:outline-none"
                              : "opacity-25 cursor-not-allowed",
                            active
                              ? "ring-2 ring-offset-2 ring-indigo-500"
                              : "",
                            checked
                              ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                              : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                            "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                          )
                        }
                        disabled={!size.id}
                      >
                        <RadioGroup.Label as="span">
                          {size.name}
                        </RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={addToCart}
              >
                Add to cart
              </button>
              {error !== "" && (
                <div className="text-red-500 my-2 block text-center">
                  {error}
                </div>
              )}
            </div>

            {/* Product details */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>

              <div
                className="prose prose-sm mt-4 text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: product?.description,
                }}
              />
            </div>

            {/* Policies */}
            <section aria-labelledby="policies-heading" className="mt-10">
              <h2 id="policies-heading" className="sr-only">
                Our Policies
              </h2>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {policies.map((policy) => (
                  <div
                    key={policy.name}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                  >
                    <dt>
                      <policy.icon
                        className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        {policy.name}
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      {policy.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

        {/* Related products */}
        <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
          <h2
            id="related-heading"
            className="text-lg font-medium text-gray-900"
          >
            You may also like
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {product?.related_products?.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct?.permalink}`}
              >
                <div className="group relative cursor-pointer">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={relatedProduct?.image?.url}
                      alt={relatedProduct?.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={relatedProduct.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {relatedProduct?.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {/* {relatedProduct.color} */}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {relatedProduct?.price?.formatted_with_symbol}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  // Get Product Data
  const { permalink } = params

  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  })
  // Get Product Data

  // Get Variant Groups
  let variant_groups = []

  const headers = {
    "X-Authorization": process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY,
    Accept: "application/json",
    "Content-Type": "application/json",
  }

  const url = new URL(
    `https://api.chec.io/v1/products/${product.id}/variant_groups`
  )

  const resp = await fetch(url, {
    method: "GET",
    headers: headers,
  })

  variant_groups = await resp.json()
  // Get Variant Groups

  // Get Variants
  let variants = []
  const res = await commerce.products.getVariants(product?.id)
  if (res?.data) {
    variants = res?.data
  }
  // Get Variants

  // Get Sanity Data
  const heads = await client.fetch(GET_SANITY_DATA)

  let filtered = {}

  if (heads.length > 0) {
    filtered = heads.filter(
      (head) => head.id === process.env.NEXT_PUBLIC_HEAD_ID
    )
  }
  // Get Sanity Data

  return {
    props: {
      sanity: filtered[0],
      product,
      variant_groups: variant_groups?.data,
      variants,
    },
  }
}
