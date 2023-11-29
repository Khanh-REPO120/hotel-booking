import mongoose, { Schema } from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    content: String,
    tag: { type: Schema.Types.ObjectId, ref: "User"},
    user: { type: Schema.Types.ObjectId, ref: "User"},
    photo: {
        type: String,
    },
    is_delete: { type: Boolean, default: false}
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
