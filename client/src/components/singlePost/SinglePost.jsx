import axios from "axios";
import { useContext, useEffect,useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context";


export default function SinglePost() {
  const location=useLocation();
  const path=location.pathname.split("/")[2];
  const [imgId,setImgId]=useState("")
  const {user}=useContext(Context)

   
  const [post,setPost]=useState({});

  useEffect(()=>{
   const getPost=async()=>{
    const res = await axios.get("/api/posts/"+path);
    setPost(res.data);
    setImgId(res.data.photo.split("/")[0])

   }
   getPost();
  },[path])
 
 const handleDelete=async()=>{
  await axios.delete("/api/posts/"+path,{data:{username:user.username}})
  window.location.replace('/')

 }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
      {post.photo && 
        <img
          className="singlePostImg"
          src={`https://res.cloudinary.com/dvjc0fusx/image/upload/v1677194349/blog-app/${imgId}.png`}
          alt=""
        />
      }
        <h1 className="singlePostTitle">
          {post.title}
          {post.username===user?.username && 
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>
          }
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={'/posts?user='+post.username}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.desc}
        </p>
      </div>
    </div>
  );
}
