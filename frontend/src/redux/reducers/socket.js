import { APPTYPES } from "./index"
import io from "socket.io-client";

const socket = (state = io('http://127.0.0.1:8800'), action) => {
    switch(action.type){
        case APPTYPES.SOCKET:
            return action.payload
        default:
            return state
    }
}

export default socket