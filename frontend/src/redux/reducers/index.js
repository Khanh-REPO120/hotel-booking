import {combineReducers} from 'redux'
import message from './message'
import socket from './socket'

export const APPTYPES = {
    SOCKET: "SOCKET",
}

export const MESSAGE_TYPES = {
    GET_MESSAGE: 'GET_MESSAGE',
    GET_USER_CONVERSATION: 'GET_USER_CONVERSATION',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    GET_INFO_USER: 'GET_INFO_USER',
    CREATE_MESSAGE: 'CREATE_MESSAGE',
   
}

export const EditData = (data, id, post) => {
    const newData = data.map(item => 
        (item._id === id ? post : item)
    )
    return newData;
}

export const DeleteData = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}

export const reducers = combineReducers({
    message,
    socket,
})