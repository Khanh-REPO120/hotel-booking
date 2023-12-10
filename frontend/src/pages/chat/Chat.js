import React from 'react'
import SearchUser from './searchUser'
import "./chat.css"
const Chat = () => {
  return (
        <div className="chat d-flex">
            <div className="col-md-3 border-right px-0">
                <SearchUser />
            </div>

            <div className="col-md-8 px-0">
                <div className="d-flex align-items-center justify-content-center h-100">
                    <h2 className='mr-2'>No message </h2>
                </div>
            </div>
        </div>
  )
}

export default Chat