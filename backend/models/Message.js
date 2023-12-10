import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
    text: String,
    sender: {type: mongoose.Types.ObjectId, ref: 'User'},
    recipient: {type: mongoose.Types.ObjectId, ref: 'User'},
    conversation: {type: mongoose.Types.ObjectId, ref: 'Conversation'},
    media: Array,
},{
    timestamps: true
})

export default mongoose.model("Message", MessageSchema);
