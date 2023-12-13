import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoUser, getUserConversation } from '../../redux/actions/message'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ListConversation = ({activeId}) => {
    const {message} = useSelector(state => state)
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)?.user;
    const history = useNavigate()

    const handleGetInfoUser = (user) => {
        dispatch(getInfoUser({user, message}))
        return history(`/chat/${user._id}`)
    }

    useEffect(() => {
        dispatch(getUserConversation({auth}))
    }, [dispatch, auth])
  return (
    <div className="box-conversation" style={{marginRight: '10px'}}>
        {message?.users?.filter(item => item._id !== auth._id).map((item, index) => {
            return (
                <div onClick={() => handleGetInfoUser(item)} className="box-conversation-chat" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px', borderBottom: '1px solid silver', cursor: 'pointer', backgroundColor: activeId === item._id ? 'silver' : 'white'}} key={index}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="logo-user" style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                        <p>{item.username}</p>
                    </div>
                    <p>Tin Nhắn: {item.text}</p>
                </div>
            )
        })}
    </div>
  )
}

export default ListConversation