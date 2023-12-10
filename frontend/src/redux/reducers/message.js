import { DeleteData, MESSAGE_TYPES } from "./index";

const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    resultData: 0,
}

const message = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_TYPES.GET_INFO_USER:
            return{
                ...state,
                users: [action.payload, ...state.users]
        }
        case MESSAGE_TYPES.CREATE_MESSAGE:
            return{
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map(user => 
                    user._id === action.payload.recipient || user.id === action.payload.sender
                    ? {...user, text: action.payload.text}
                    : user
                )
            };
        case MESSAGE_TYPES.GET_USER_CONVERSATION:
                return{
                    ...state,
                    users: action.payload.newArr,
                    resultUsers: action.payload.result
                };
        case MESSAGE_TYPES.GET_MESSAGE:
                return{
                    ...state,
                    data: action.payload.message.reverse(),
                    resultData: action.payload.result
                };
        case MESSAGE_TYPES.DELETE_MESSAGE:
                return{
                    ...state,
                    data: action.payload.newData,
                    resultData: action.payload.newData.length
                };  
        case MESSAGE_TYPES.DELETE_CONVERSATION:
                return{
                    ...state,
                    users: DeleteData(state.users, action.payload),
                    data: DeleteData(state.data, action.payload)
               };   
        default:
            return state;
    }
}

export default message