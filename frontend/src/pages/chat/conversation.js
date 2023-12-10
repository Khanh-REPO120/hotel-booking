import React from 'react'
import SearchUser from './searchUser'
import ShowChat from './ChatId.js'
import "./chat.css"
const Conversation = () => {
    return (
        <div className="chat d-flex">
            <div className="col-md-3 border-right px-0">
                <SearchUser />
            </div>

            <div className="col-md-8 px-0 pl-4">
                <ShowChat />
            </div>
        </div>
  )
}

export default Conversation