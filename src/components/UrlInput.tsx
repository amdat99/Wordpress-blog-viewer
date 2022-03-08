import React from "react";
import styles from "./styles.module.css";

type Props = {
  url: string;
  setUrl: Function;
};
function UrlInput({ url, setUrl }: Props) {
  return (
    <div className={styles.inputContainer}>
      <label>
        Enter the wordpress api url infollowing format: <br /> http://127.0.0.1:81/wordpress/wp-json/wp/v2/ <br />
        (url must end in /)
      </label>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button
        onClick={() => {
          localStorage.setItem("currentUrl", url);
          window.location.reload();
        }}
      >
        Set
      </button>
    </div>
  );
}

export default UrlInput;
