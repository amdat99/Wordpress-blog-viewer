import React from "react";
import sanitizeHtml from "sanitize-html";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import styles from "./post.module.css";

type Props = {
  currentPost: any;
};
function Post({ currentPost = null }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = React.useState(currentPost);
  const id = params.id;

  const { data, fetchData, isFetching } = useFetchData({ type: "get", route: `posts/${id}?_embed` }, "post");
  React.useEffect(() => {
    //if current post passed ina s props set post or do req to get post data
    if (!currentPost) {
      id ? fetchData() : navigate("/");
    } else {
      setPost(currentPost);
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      setPost({
        title: data?.title?.rendered,
        content: data?.content?.rendered,
        image: data?._embedded["wp:featuredmedia"][0]?.media_details?.sizes?.full?.source_url,
      });
    }
  }, [data]);

  const sanitize = (html: string) => {
    return sanitizeHtml(html, {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "h2", "h3", "h4", "h5", "h6", "img"],
      allowedAttributes: { a: ["href"] },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        {post ? (
          <div className={styles.content}>
            <h2 style={{ fontWeight: "normal" }}>{post?.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: post?.content }}></p>
            {post?.content}
          </div>
        ) : (
          isFetching && <h3 style={{ marginTop: "40%", marginLeft: "30%" }}>Loading...</h3>
        )}
      </div>
    </div>
  );
}

export default Post;
