import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { deleteMessage } from '../../redux/actions/message';
import "./chat.css"
const ShowMessage = ({userKey, msg}) => {

  const { chatReducer} = useSelector(state => state)
  const dispatch = useDispatch()
  const { user } = useContext(AuthContext);
  const handleDeleteMsg = () => {
    if(chatReducer.data)
      dispatch(deleteMessage({msg, user, chatReducer}))
  }


  return (
        <>
          <div className="chat_info">
              <img src={userKey.avatar} alt="avatar" className="super-small-avatar mb-1" />
              <span className="ml-1">{userKey.username}</span>
          </div>

          <div className="my_text">
            {
              userKey._id === user._id && <i className="fas fa-trash-alt mr-2 text-danger" onClick={handleDeleteMsg} />
            }
              <div>
                {
                  msg.text && <div className="chat_content">{msg.text}</div>
                }
                {
                  msg.media?.map((item, index) => (
                    <div key={index}>
                        {
                          item.url.match(/video/i) 
                          ? <video controls src={item.url} alt={item.url} />
                          : <img src={item.url} alt={item.url} />
                        }
                    </div>
                  ))
                }
              </div>
          </div>

          <div className="chat_time">
              {new Date(msg.createdAt).toLocaleString()}
          </div>
        </>
  )
}

export default ShowMessage