import { useState } from "react";
import { Link } from "react-router-dom";

import "./post.css";

export default function Post({post}) {
  const [imgId,setImgId]=useState("")


  return (
    <div className="post">
    {console.log(post)}
    {post.photo && 
  <>

      <img
        className="postImg"
          src={`https://res.cloudinary.com/dvjc0fusx/image/upload/v1677194349/blog-app/${post.photo.split("/")[0]}.png`}     
        alt=""
      />
      {/* <img 
        src={post.profilePic}
      /> */}
  </>
    }
      <div className="postInfo">
        <div className="postCats">
        {post.categories.map((c)=>(
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              {c.name}
            </Link>
          </span>
        ))}
          
         
        </div>
        <span className="postTitle">
          <Link to={`post/${post._id}`} className="link">
          {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
