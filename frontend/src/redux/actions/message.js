import { DeleteData, MESSAGE_TYPES } from '../reducers/index'
import axios from 'axios';

export const getInfoUser = ({user, messageReducer}) => (dispatch) => {
    if(messageReducer.users.every(item => item._id !== user._id)){
        dispatch({
            type: MESSAGE_TYPES.GET_INFO_USER,
            payload: user
        })
    }
} 
export const createMessage = ({message, auth, socketReducer}) => async (dispatch) => {
    dispatch({
        type: MESSAGE_TYPES.CREATE_MESSAGE,
        payload: message
    })

    socketReducer.emit("createMessage", {...message})
    
    try {
        await axios.post('/messages/message', message)

    } catch (err) {
    }
}
export const getUserConversation = ({auth}) => async (dispatch) => {
    try {
        const res = await axios.get('/messages/conversation')

        let newArr = [];

        res.data.conversation.forEach(item => {
            item.recipients.forEach(info => {
                if(info._id !== auth.user._id){
                    newArr.push({...info, text: item.text})
                }
            })
        })

        dispatch({
            type: MESSAGE_TYPES.GET_USER_CONVERSATION,
            payload: {newArr, result: res.data.result}
        })

    } catch (err) {
    }
}
export const getMessage = ({auth, id, page = 1}) => async (dispatch) => {
    try {
        const res = await axios.get(`/messages/message/${id}?limit=${page * 9}`)
        dispatch({
            type: MESSAGE_TYPES.GET_MESSAGE, 
            payload: res.data
        })

    } catch (err) {
    }
}
export const deleteMessage = ({msg, auth, messageReducer}) => async (dispatch) => {
    const newData = DeleteData(messageReducer.data, msg._id)
    // console.log(newData)
    dispatch({
        type: MESSAGE_TYPES.DELETE_MESSAGE, 
        payload: {newData, _id: msg.recipient}}) 
    
    try {
        await axios.delete(`/messages/message/${msg._id}`)
    } catch (err) {
    }
}
export const deleteConversation = ({auth, id}) => async (dispatch) => {
    dispatch({
        type: MESSAGE_TYPES.DELETE_CONVERSATION,
        payload: id
    })
    try {
        await axios.delete(`/messages/conversation/${id}`)
    } catch (err) {
    }
}