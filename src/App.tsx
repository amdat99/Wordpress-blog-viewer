import { useState, Suspense } from "react";
import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NabBar from "./components/Navbar";
import "./App.css";

export const UserContext = React.createContext<any>(null);

const Home = React.lazy(() => import("./pages/Home"));
const Post = React.lazy(() => import("./pages/Post"));
const Posts = React.lazy(() => import("./pages/Posts"));

function App() {
  const [currentCacheData, setCurrentCacheData] = useState({});
  const [currentPost, setCurrentPost] = useState<any>(null);
  const value = useMemo(() => ({ currentCacheData, setCurrentCacheData }), [currentCacheData]);
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <NabBar />

        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home setCurrentPost={setCurrentPost} />} />
            <Route path="/post">
              <Route path=":id" element={<Post currentPost={currentPost} />} />
            </Route>
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const Fallback = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      Loading...
    </div>
  );
};

export default App;
