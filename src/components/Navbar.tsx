import React from "react";
import { useNavigate } from "react-router-dom";
import UrlInput from "./UrlInput";
import styles from "./styles.module.css";

function Navbar() {
  const [showMenu, setShowMenu] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [changeUrl, setChangeUrl] = React.useState(false);
  const navigate = useNavigate();
  const onNavigate = (path: string) => {
    navigate(path);
    setShowMenu(false);
  };
  return (
    <div className={styles.navBar}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <img
          width={110}
          height={100}
          src="data:image/png;base64,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"
        />
      </div>
      <div onClick={() => setShowMenu(true)} className={styles.menuIcon}>
        <img src="https://img.icons8.com/ios-glyphs/30/000000/menu--v1.png" />
      </div>
      {showMenu && (
        <div className={styles.menu}>
          <div style={{ margin: "90px" }}>
            <div className={styles.pointer} style={{ fontSize: "25px" }} onClick={() => setShowMenu(false)}>
              x
            </div>
            <div className={styles.pointer} onClick={() => onNavigate("/")}>
              Home
            </div>
            {/* <div className={styles.pointer} onClick={() => onNavigate("/posts")}>
              Posts
            </div> */}
            <div className={styles.pointer} onClick={() => setChangeUrl(!changeUrl)}>
              Change url
            </div>
          </div>
          {changeUrl && (
            <div style={{ position: "fixed", top: "22%", right: "-63%", width: "100%" }}>
              <UrlInput url={url} setUrl={setUrl} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
