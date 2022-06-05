import React from "react";
import styles from "./styles.module.css";

type Props = {
  url: string;
  setUrl: Function;
};
function UrlInput({ url, setUrl }: Props) {
  const onSubmit = (e: { preventDefault: () => void }) => {
    let urlChar = "/";
    e.preventDefault();
    if (!url) {
      return;
    } else if (url[url.length - 1] === "/") {
      urlChar = "";
    }
    localStorage.setItem("currentUrl", url + urlChar + "wp-json/wp/v2/");
    window.location.reload();
  };

  return (
    <form onSubmit={onSubmit} className={styles.inputContainer}>
      <label>Enter your wordpress site url (E.g https://iamafoodblog.com/)</label>
      <input autoFocus type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button type="submit">Set</button>
    </form>
  );
}

export default UrlInput;
