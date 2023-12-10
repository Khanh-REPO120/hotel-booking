import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import User from "../models/User.js";
class Messagefeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export const searchUser = async (req, res, next) => {
  try {
    const users = await User.find({ username: { $regex: req.query.username } })

    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { text, recipient, media } = req.body;
    console.log(req.user)

    if (!recipient || (!text.trim() && media.length === 0)) return;

    const new_conversation = await Conversation.findOneAndUpdate(
      {
        $or: [{ recipients: [req.user.id, recipient] }, { recipients: [recipient, req.user.id] }],
      },
      {
        recipients: [req.user.id, recipient],
        text,
        media,
      },
      { new: true, upsert: true }
    );

    const new_message = new Message({
      conversation: new_conversation._id,
      sender: req.user.id,
      recipient,
      text,
      media,
    });

    await new_message.save();

    res.send({ msg: "Created new message" });
  } catch (err) {
    next(err);
  }
};
export const getUserConversation = async (req, res) => {
  try {
    const feature = new Messagefeatures(
      Conversation.find({
        recipients: req.user.id,
      }),
      req.query
    ).paginating();

    const conversation = await feature.query.sort("-updatedAt").populate("recipients", "avatar username");

    res.json({
      conversation,
      result: conversation.length,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const getMessage = async (req, res) => {
  try {
    const feature = new Messagefeatures(
      Message.find({
        $or: [
          { sender: req.user.id, recipient: req.params.id },
          { sender: req.params.id, recipient: req.user.id },
        ],
      }),
      req.query
    ).paginating();

    const message = await feature.query.sort("-createdAt");

    res.json({
      message,
      result: message.length,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    await Message.findOneAndDelete({ _id: req.params.id, sender: req.user.id });
    res.json({ msg: "Delete Message  Success !" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const deleteConversation = async (req, res) => {
  try {
    const new_conversation = await Conversation.findOneAndDelete({
      $or: [{ recipients: [req.user.id, req.params.id] }, { recipients: [req.params.id, req.user.id] }],
    });
    await Message.deleteMany({ conversation: new_conversation._id });
    res.json({ msg: "Delete Conversation Success !" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
