import React from "react";
import styles from "./styles.module.css";

type Props = {
  embedData: any;
  title: string;
  categoryMap: any;
  content: string;
  categories: string[];
  navigate: Function;
  setCurrentPost: Function;
  id: number;
};
function PostContent({ embedData, title, categoryMap, content, categories = [], navigate, setCurrentPost, id }: Props) {
  return (
    <div
      className={styles.imageContainer}
      onClick={() => {
        setCurrentPost({ title, content, image: embedData[0].source_url });
        navigate(`/post/${id}`);
      }}
    >
      {embedData && embedData.length && (
        <img className={styles.homeImage} width={460} height={330} src={embedData[0].source_url} alt="feature-image" />
      )}
      <span className={styles.imageTitle}>{title}</span>
      {categories.length &&
        categories.map((category: any) => (
          <span key={category} className={styles.imageCategory}>
            {categoryMap[category]}
          </span>
        ))}
    </div>
  );
}

export default PostContent;
