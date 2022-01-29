import React from "react";
import { RichText } from "prismic-reactjs";

export default function Button({ text }: any): JSX.Element {
  return <button>{RichText.asText(text.page_name)}</button>;
}
