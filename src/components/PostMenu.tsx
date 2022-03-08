import React from "react";
import styles from "./styles.module.css";

type Props = {
  categories: any;
  currentCategory: number | null;
  setCurrentCategory: React.Dispatch<React.SetStateAction<number | null>>;
};
function PostMenu({ categories, setCurrentCategory, currentCategory }: Props) {
  return (
    <div className={styles.menuContainer}>
      {categories &&
        categories.map((category: any) => {
          const uncategory = category.name === "Uncategorized";
          return (
            <span
              key={category.id}
              style={currentCategory === category.id ? { borderBottom: "1px solid orange" } : {}}
              onClick={() => setCurrentCategory(category.id)}
              className={styles.menuName}
            >
              {uncategory ? "All" : category.name}
            </span>
          );
        })}
    </div>
  );
}

export default PostMenu;
