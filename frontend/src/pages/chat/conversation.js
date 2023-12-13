import React from "react";
import SearchUser from "./searchUser";
import ShowChat from "./ChatId.js";
import "./chat.css";
import ListConversation from "./listConversation.js";
const Conversation = () => {
  return (
    <div className="chat d-flex" style={{ display: "flex", flexDirection: "row", width: "96vw", border: "unset" }}>
      <div style={{ width: "200px" }}>
        <ListConversation />
      </div>
      <div style={{ width: "calc(100% - 200px)" }}>
        <div className="col-md-3 border-right px-0">
          <SearchUser />
        </div>

        <div className="col-md-8 px-0 pl-4">
          <ShowChat />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
