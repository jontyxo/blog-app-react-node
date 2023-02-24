import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(user.profilePic);
  const [username, setUsername] = useState("");

  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    dispatch({type:"UPDATE_START"})
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      
     
    };
    if(username){
      updatedUser.username=username;
    }
    if (file) {
      const formData = new FormData();
      formData.append("file",file)
      formData.append("upload_preset","urde6fpz")
const res=      await axios.post("https://api.cloudinary.com/v1_1/dvjc0fusx/image/upload",formData)
console.log(res.data.public_id.split("/")[1])       
const photoid=res.data.public_id.split("/")[1];
updatedUser.profilePic=`https://res.cloudinary.com/dvjc0fusx/image/upload/v1677195922/blog-app/${photoid}.png`
    }
    try {
      const res = await axios.put("/api/users/" + user._id, updatedUser);
      setSuccess(true);
    dispatch({type:"UPDATE_SUCCESS", payload:res.data})

    
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
    {success && (
            <span className="ack">
              Profile has been updated...
            </span>
          )}
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>

        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          
        </form>
      </div>
     
    </div>
  );
}