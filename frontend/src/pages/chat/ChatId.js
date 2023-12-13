import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ShowMessage from "./showMessage";
import { createMessage, deleteConversation, getMessage } from "../../redux/actions/message";
import { uploadImage } from "../../utils/uploadImage";
import DisplayUser from "./displayUser";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chat.css";
import { FileImageOutlined } from "@ant-design/icons";
import ListConversation from "./listConversation";
const ShowChat = () => {
  const { message, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext)?.user;

  const { id } = useParams();
  const history = useNavigate();

  const [user, setUser] = useState([]);
  const [text, setText] = useState("");

  const refChat = useRef();
  const pageMore = useRef();

  const [page, setPage] = useState(0);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) setUser(newUser);
  }, [message.users, id]);
  const imgShow = (src) => {
    return <img src={src} alt="images" className="img-thumbnail" />;
  };
  const videoShow = (src) => {
    return <video controls src={src} alt="images" className="img-thumbnail" />;
  };

  const handleUploadMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.");
      }

      return newMedia.push(file);
    });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;


    let newArr = [];
    if (media.length > 0) newArr = await uploadImage(media);
    setMedia([]);

    const message = {
      sender: auth._id,
      recipient: id,
      text,
      createdAt: new Date().toISOString(),
      media: newArr,
    };

    await dispatch(createMessage({ message, auth, socket }));
    setText("");
    if (refChat.current) {
      refChat.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  useEffect(() => {
    const getChatData = async () => {
      setPage(1);
      await dispatch(getMessage({ auth, id }));
      if (refChat.current) {
        refChat.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };
    getChatData();
  }, [id, dispatch, auth]);

  useEffect(() => {
    if (refChat.current) {
      refChat.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [message?.data?.length]);

  //Load more message
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageMore.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultData >= (page - 1) * 9 && page > 1) {
      dispatch(getMessage({ auth, id, page }));
    }
  }, [id, auth, page, dispatch, message.resultData]);

  const handleDeleteConversation = () => {
    dispatch(deleteConversation({ auth, id }));
    return history("/chat");
  };

  return (
    <div className="chat d-flex" style={{ display: "flex", flexDirection: "row", width: "96vw", border: "unset" }}>
      <div style={{ width: "200px" }}>
        <ListConversation activeId={id}/>
      </div>
      <div
        style={{
          width: "calc(100% - 200px)",
          padding: "30px",
          height: "calc(100vh - 90px)",
          boxShadow: "10px 10px 10px gray",
        }}
      >
        <div className="chat_header">
          {user.length !== 0 && (
            <DisplayUser user={user}>
              <i className="fas fa-trash-alt mr-2" style={{ cursor: "pointer" }} onClick={handleDeleteConversation} />
            </DisplayUser>
          )}
        </div>

        <div className="chat_container" style={{ height: media.length > 0 ? "calc(100% - 200px)" : "" }}>
          <div className="chat_showmessage" ref={refChat}>
            <button style={{ marginTop: "-18px", opacity: 0 }} ref={pageMore}>
              More
            </button>

            {message.data.map((msg, index) => (
              <div key={index}>
                {msg.sender !== auth._id && (
                  <div className="chat_row another_showmessage">
                    <ShowMessage userKey={user} msg={msg} />
                  </div>
                )}

                {msg.sender === auth._id && (
                  <div className="chat_row my_showmessage">
                    <ShowMessage userKey={auth} msg={msg} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="show_media" style={{ display: media.length > 0 ? "grid" : "none" }}>
          {media.map((item, index) => (
            <div key={index} id="file_media">
              {item.type.match(/video/i) ? videoShow(URL.createObjectURL(item)) : imgShow(URL.createObjectURL(item))}
              <span onClick={() => handleDeleteMedia(index)}>&times;</span>
            </div>
          ))}
        </div>

        <form className="chat_input" style={{ display: "flex", flexDirection: "row" }} onSubmit={handleSubmit}>
          <input type="text" placeholder="Say something..." value={text} onChange={(e) => setText(e.target.value)} />

          <div className="file_upload">
            <FileImageOutlined />
            <input type="file" name="file" id="file" multiple accept="image/*, video/*" onChange={handleUploadMedia} />
          </div>

          <button type="submit" className="material-icons" disabled={text || media.length > 0 ? false : true}>
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShowChat;
