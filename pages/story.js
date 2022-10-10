import React, { useEffect, useState } from "react"

// Components
import { Layout } from "../components/Layout"

// Sanity
import { client } from "../lib/client"

const Story = ({ data }) => {
  const [story, setStory] = useState({})

  useEffect(() => {
    setStory(data)
  }, [])

  return (
    <Layout>
      {" "}
      <div className="relative overflow-hidden bg-white py-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          <div
            className="relative mx-auto h-full max-w-prose text-lg"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-lg font-semibold text-indigo-600">
                Introducing
              </span>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {story?.bannerHeading && story?.bannerHeading}
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              {story?.bannerText && story?.bannerText}
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            {/* <p>
          Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong>{" "}
          sed <strong>eget risus enim</strong>. Mattis mauris semper sed amet
          vitae sed turpis id. Id dolor praesent donec est. Odio penatibus
          risus viverra tellus varius sit neque erat velit. Faucibus commodo
          massa rhoncus, volutpat. Dignissim sed eget risus enim.{" "}
          <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.
        </p>
        <ul role="list">
          <li>Quis elit egestas venenatis mattis dignissim.</li>
          <li>
            Cras cras lobortis vitae vivamus ultricies facilisis tempus.
          </li>
          <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
        </ul>
        <p>
          Quis semper vulputate aliquam venenatis egestas sagittis quisque
          orci. Donec commodo sit viverra aliquam porttitor ultrices gravida
          eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet,
          mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed
          elit interdum dignissim.
        </p>
        <h2>From beginner to expert in 30 days</h2>
        <p>
          Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
          in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
          mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
          tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
          Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
          diam.
        </p>
        <blockquote>
          <p>
            Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
            urna sed consectetur neque tristique pellentesque. Blandit amet,
            sed aenean erat arcu morbi.
          </p>
        </blockquote>
        <p>
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p> */}
            {story?.bannerImage && (
              <figure>
                <img
                  className="w-full rounded-lg"
                  src={story?.bannerImage?.url}
                  alt={story?.bannerHeading}
                  width={1310}
                  height={873}
                />
                <figcaption>{story?.bannerHeading}</figcaption>
              </figure>
            )}

            {/* <h2>Everything you need to get up and running</h2>
        <p>
          Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>.
          Amet, massa quam varius orci dapibus volutpat cras. In amet eu
          ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut
          viverra ridiculus non molestie. Gravida quis fringilla amet eget dui
          tempor dignissim. Facilisis auctor venenatis varius nunc, congue
          erat ac. Cras fermentum convallis quam.
        </p>
        <p>
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const query = `*[_type == "head"]{
    id,
      bannerHeading,
      bannerText,
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
      data: filtered[0],
    },
  }
}

export default Story
