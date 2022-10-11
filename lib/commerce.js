// lib/commerce.js
import CommerceSDK from "@chec/commerce.js"

const commerceJsClient = new CommerceSDK(
  process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY
)

export default commerceJsClient
