import Head from "next/head";
// import styles from "../styles/Home.module.css";
import React from "react";
import * as prismic from "@prismicio/client";
import { RichText, RichTextBlock } from "prismic-reactjs";

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

interface homeProps {
  page: {
    data: {
      title: RichTextBlock[];
    };
  };
}

function Home({ page }: homeProps) {
  return (
    <div>
      <Head>
        <title>Stheven Cabral Welcome Page</title>
      </Head>

      <main>
        <h1>{RichText.asText(page.data.title)}</h1>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // API endpoint for the Prismic CMS repository.
  const endpoint = prismic.getEndpoint("stheven-cabral-website");

  // Client used to fetch CMS content.
  const client = prismic.createClient(endpoint);

  // Page document for our homepage from the CMS.
  const page = await client.getByUID("portfolio", "welcome");

  // Pass the homepage as prop to our page.
  console.log(page.data.title);
  return {
    props: { page },
  };
}

export default Home;
