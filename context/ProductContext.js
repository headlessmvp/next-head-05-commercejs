import { createContext, useEffect, useState } from "react"

// Commerce Layer
import { getSalesChannelToken } from "@commercelayer/js-auth"
import commerce from "../lib/commerce"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])

  const [subCategories, setSubCategories] = useState([])
  const [allData, setAllData] = useState([])
  const [sanityData, setSanityData] = useState([])
  const [categories, setCategories] = useState([])
  const [merchant, setMerchant] = useState({})

  const [filteredCategories, setFilteredCategories] = useState([])

  const [cart, setCart] = useState([])
  const [token, setToken] = useState("")
  const [auth, setAuth] = useState(null)
  const compareSizes = [
    { name: "XXS" },
    { name: "XS" },
    { name: "S" },
    { name: "M" },
    { name: "L" },
    { name: "XL" },
    { name: "2XL" },
    { name: "3XL" },
  ]

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (id) => {
    const filtered = cart.filter((product) => product.reference !== id)
    setCart(filtered)
  }

  const getToken = async () => {
    const authResp = await getSalesChannelToken({
      clientId: process.env.NEXT_PUBLIC_CL_SALES_CHANNEL_CLIENT_ID,
      endpoint: process.env.NEXT_PUBLIC_CL_BASE_ENDPOINT,
      scope: process.env.NEXT_PUBLIC_CL_MARKET_SCOPE,
    })
    setAuth(authResp)

    if (authResp?.accessToken) {
      // console.log(
      //   "Access token got: ",
      //   authResp?.accessToken,
      //   "expired ? : ",
      //   authResp?.expired()
      // )
      setToken(authResp?.accessToken)
      localStorage.setItem("token", JSON.stringify(authResp?.accessToken))
    }
  }

  const getCart = async () => {
    const resp = await commerce.cart.retrieve()
    setCart(resp)
  }

  const getData = async () => {
    const merchant = await commerce.merchants.about()
    const { data: cats } = await commerce.categories.list()
    const { data: products } = await commerce.products.list()
    let temp = []
    if (cats) {
      cats?.map((category) => {
        if (
          category?.slug === "sale" ||
          category?.slug === "favourites" ||
          category?.slug === "collection"
        ) {
        } else {
          temp.push(category)
        }
      })

      setFilteredCategories(temp)
    }
    setMerchant(merchant)
    setCategories(cats)
    setAllData(products)
  }

  useEffect(() => {
    // console.log("Use effect context !")
    getData()
    getCart()

    if (auth === null) {
      getToken()
    } else if (auth?.expired()) {
      getToken()
    } else if (localStorage.getItem("token")) {
      // console.log("Token exists: ", localStorage.getItem("token"))
      setToken(JSON.parse(localStorage.getItem("token")))
    } else {
      console.log("Token not in localstorage, nor expired, nor present")
    }
  }, [])

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        allData,
        setAllData,
        token,
        subCategories,
        setSubCategories,
        compareSizes,
        sanityData,
        setSanityData,
        categories,
        setCategories,
        merchant,
        setMerchant,
        allProducts,
        setAllProducts,
        filteredCategories,
        setFilteredCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
