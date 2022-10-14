export const GET_SANITY_DATA = `*[_type == "head"]{
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
    'socials': socials[]->{
      name,
      url
    }
}`
