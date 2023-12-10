import { SearchOutlined } from '@ant-design/icons'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { APPTYPES } from '../../redux/reducers/index'
import { getInfoUser, getUserConversation } from '../../redux/actions/message'
import DisplayUser from './displayUser'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./chat.css"
const SearchUser = () => {
  const [searchUser, setSearchUser] = useState('')
  const [users, setUsers] = useState([])

  const {message} = useSelector(state => state)
  const auth = useContext(AuthContext)?.user;

  const dispatch = useDispatch()

  const history = useNavigate()

  const handleSearch = async (e) => {
      e.preventDefault()
      if(!searchUser) {
        return setUsers([]);
      }
        try {
          const res = await axios.get(`/messages/search_user?username=${searchUser}`)

          setUsers(res.data.users)

        } catch (err) {
      }
  }

  const handleGetInfoUser = (user) => {
      setSearchUser('')
      setUsers([])
      dispatch(getInfoUser({user, message}))
      return history(`/chat/${user._id}`)
  }

  useEffect(() => {
      dispatch(getUserConversation({auth}))
  }, [dispatch, auth])

  return (
      <>
        <div className="chat_search">
          <form onClick={handleSearch}>

              <input type="text" value={searchUser}
              onChange={event => setSearchUser(event.target.value)}
              placeholder="Search on chat" />

              <button >
                <SearchOutlined style={{fontSize: 24}}/>
              </button>

          </form>
        </div>

        <div className="chat_user_list">
            { 
                users.length !== 0
                ? 
                  <>
                    {
                      users.map(user => (
                          <div key={user._id} onClick={() => handleGetInfoUser(user)}>
                            <DisplayUser user={user}/>
                          </div>
                      ))
                    }
                  </>
                : 
                  <>
                    {
                      message.users.map(user => (
                          <div key={user._id} onClick={() => handleGetInfoUser(user)}>
                            <DisplayUser user={user}/>
                          </div>
                      ))
                    }
                  </>
            }
          </div>
      </>
  )
}

export default SearchUser