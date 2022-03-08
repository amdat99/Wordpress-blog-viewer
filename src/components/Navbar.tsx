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
        <img width={180} src="https://reasondigital.com/wp-content/uploads/2020/08/rd-test-3.png" />
      </div>
      <div onClick={() => setShowMenu(true)} className={styles.menuIcon}>
        <img src="https://img.icons8.com/ios-glyphs/30/000000/menu--v1.png" />
      </div>
      {showMenu && (
        <div className={styles.menu}>
          <div style={{ margin: "90px" }}>
            <div className={styles.pointer} onClick={() => setShowMenu(false)}>
              x
            </div>
            <div className={styles.pointer} onClick={() => onNavigate("/")}>
              Home
            </div>
            <div className={styles.pointer} onClick={() => onNavigate("/posts")}>
              Posts
            </div>
            <div className={styles.pointer} onClick={() => setChangeUrl(!changeUrl)}>
              Change url
            </div>
            {changeUrl && (
              <div style={{ position: "absolute", top: "35%" }}>
                <UrlInput url={url} setUrl={setUrl} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
