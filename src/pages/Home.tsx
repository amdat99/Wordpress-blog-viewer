import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostContent from "../components/PostContent";
import PostMenu from "../components/PostMenu";
import UrlInput from "../components/UrlInput";
import useFetchData from "../hooks/useFetchData";
import styles from "./home.module.css";

type Props = {
  setCurrentPost: Function;
};

function Home({ setCurrentPost }: Props) {
  const navigate = useNavigate();
  let currentUrl: string | null = localStorage.getItem("currentUrl");
  const [categoryMap, setCategoryMap] = useState({});
  const [url, setUrl] = useState("");
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const uncategorized = currentCategory && currentCategory !== 1;
  const {
    data: posts,
    fetchData: fetchPosts,
    isFetching: fetchingPosts,
  } = useFetchData(
    {
      type: "get",
      route: uncategorized ? `posts?_embed&categories=${currentCategory}` : "posts?_embed",
    },
    uncategorized ? "posts" : "posts" + currentCategory
  );
  const {
    data: categories,
    fetchData: fetchCategories,
    isFetching: fetchingCategories,
  } = useFetchData({ type: "get", route: "categories" }, "categories");

  useEffect(() => {
    if (currentUrl) {
      fetchCategories();
    }
  }, [currentUrl]);

  useEffect(() => {
    if (currentUrl) {
      fetchPosts();
    }
  }, [currentCategory]);

  useEffect(() => {
    if (categories) {
      categories.map((category: any) => {
        setCategoryMap((prevState) => ({
          ...prevState,
          [category.id]: category.name,
        }));
      });
    }
  }, [categories]);

  return (
    <div className="app">
      <h1>View posts from a wordpress site</h1>
      {!posts && !currentUrl && <UrlInput url={url} setUrl={setUrl} />}
      <div className={styles.header}>
        {categories && <PostMenu categories={categories} setCurrentCategory={setCurrentCategory} currentCategory={currentCategory} />}
      </div>
      {fetchingPosts && <h3>loading...</h3>}
      <div className={styles.imagesContainer}>
        {posts &&
          !fetchingPosts &&
          posts.map((post: any) => (
            <PostContent
              title={post?.title?.rendered}
              embedData={post._embedded["wp:featuredmedia"]}
              categoryMap={categoryMap}
              content={post.content?.rendered}
              categories={post.categories}
              navigate={navigate}
              setCurrentPost={setCurrentPost}
              key={post.id}
              id={post.id}
            />
          ))}
        {posts && !posts?.length && !fetchingPosts && <h3>No posts found</h3>}
      </div>
    </div>
  );
}

export default Home;
