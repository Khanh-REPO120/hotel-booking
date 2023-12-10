import mongoose from "mongoose";
const ConversationSchema = new mongoose.Schema({
    text: String,
    recipients: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    media: Array,
},{
    timestamps: true
})

export default mongoose.model("Conversation", ConversationSchema);
