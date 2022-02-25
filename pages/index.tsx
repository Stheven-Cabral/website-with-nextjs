import Head from "next/head";
import React from "react";
// import * as prismic from "@prismicio/client";
import { RichText, RichTextBlock } from "prismic-reactjs";
import Button from "../components/Button";

const Prismic = require("@prismicio/client");

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

interface homeProps {
  page: {
    data: {
      title: RichTextBlock[];
      navigate_to_page: Object[];
    };
  };
}

function Home({ page }: homeProps) {
  const { title, navigate_to_page: navigateToPage } = page.data;

  return (
    <div>
      <Head>
        <title>Stheven Cabral Welcome Page</title>
      </Head>

      <main className="welcome-page">
        <h1 className="welcome-page__title">{RichText.asText(title)}</h1>
        <div className="welcome-page__buttons-wrapper">
          {navigateToPage.map((nav, index) => {
            return <Button text={nav} key={index} />;
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // API endpoint for the Prismic CMS repository.
  const endpoint = Prismic.getEndpoint("stheven-cabral-website");

  // Client used to fetch CMS content.
  const client = Prismic.createClient(endpoint);

  // Page document for our homepage from the CMS.
  const page = await client.getByUID("portfolio", "welcome");

  // Pass the homepage as prop to our page.
  console.log(page.data.title);
  return {
    props: { page },
  };
}

export default Home;
