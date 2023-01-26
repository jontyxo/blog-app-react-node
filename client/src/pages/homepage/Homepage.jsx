import { useEffect,useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios"

export default function Homepage() {
  const[posts,setPosts]=useState([]);
  const {search} = useLocation();
  
  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await axios.get("/api/posts"+search)
      setPosts(response.data)
      console.log(response);
    }
    
    fetchPosts();
  },[search])

  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
