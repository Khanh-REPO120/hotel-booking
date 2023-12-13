import React from "react";
import SearchUser from "./searchUser";
import "./chat.css";
import ListConversation from "./listConversation";
const Chat = () => {
  return (
    <div className="chat d-flex" style={{display: 'flex', flexDirection: 'row', width: '96vw', border: "unset", height: '95vh'}}>
      <div style={{width: '200px'}}>
        <ListConversation />
      </div>
      <div style={{width: 'calc(100% - 200px)'}}>
        <div className="col-md-3 border-right px-0">
          <SearchUser />
        </div>

        <div className="col-md-8 px-0">
          <div className="d-flex align-items-center justify-content-center h-100">
            <h2 className="mr-2">No message </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
