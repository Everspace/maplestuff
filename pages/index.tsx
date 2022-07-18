import TileGrid from "TileGrid"
import type { NextPage } from "next"
import Head from "next/head"
import Layout from "page/Layout"
import { LinkCard } from "LinkCard"

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Maplestuff</title>
        <meta
          name="description"
          content="A handy set of things for a Mushroom game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome</h1>
        <TileGrid columns={3}>
          <LinkCard to="/legion" title="Legion">
            Track what you have leveled, and still need to!
          </LinkCard>
          <LinkCard to="/linkskills" title="Link Skills">
            A list of all the Link Skills and Legion Effects
          </LinkCard>
        </TileGrid>
      </main>

      <footer></footer>
    </Layout>
  )
}

export default Home
