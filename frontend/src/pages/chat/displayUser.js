import React from 'react'
import './DisplayUser.css'
import "./chat.css"
const DisplayUser = ({user, children}) => {
  return (
      <div className="display_user d-flex p-2 align-items-center justify-content-between" style={{padding: 10}}>
        <div style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', gap: '10px' }} className="d-flex align-items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" style={{width: '20px', height: '20px'}} alt="Loading..." className="small-avatar" />
          <h6 className="text-dark ml-2 mt-2" style={{fontSize: '17px'}}>{user.username}</h6>
        </div>

        {children}
      </div>
  )
}

export default DisplayUser