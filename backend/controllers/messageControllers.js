const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
// const Notification = require("../models/notificationModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat", "chatName isGroupChat groupAdmin users")
      .populate("chat.groupAdmin", "name pic email");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat", "chatName groupAdmin isGroupChat users").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    message = await User.populate(message, {
      path: "chat.groupAdmin",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "name pic email");

    //for each user in the chat, save message object in their notification array
    for (var i = 0; i < message.chat.users.length; i++) {
      if (message.chat.users[i]._id.toString() !== message.sender._id.toString()) {
        await User.findByIdAndUpdate(message.chat.users[i]._id, {
          $push: {
            notifications: message._id,
          },
        });
      }
    }
    
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Get all messages of every chat where the user is not the sender AND is not in the readBy array of the message AND is in the users array of the chat
//@route           GET /api/Message/
//@access          Protected
const allMessagesNotSender = asyncHandler(async (req, res) => {
  userChats = await Chat.find({
    users: { $elemMatch: { $in: [req.user._id] } },

  }).populate("groupAdmin", "name pic email");

  try {
    const messages = await Message.find({
      $and: [
        {sender: { $ne: req.user._id }},
        {readBy: { $nin: [req.user._id] }},
        {chat: { $in: userChats.map((chat) => chat._id) }},
      ],
    })
      .populate("sender", "name pic email")
      .populate("chat", "chatName isGroupChat groupAdmin users")
      .populate("groupAdmin", "name pic email");
    //sort by latest to oldest
    messages.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}
);

const updateReadBy = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId });
    //loop through messages
    for (let i = 0; i < messages.length; i++) {
      //if user is not in the readBy array of the message
      if (!messages[i].readBy.includes(req.user._id) && messages[i].sender != req.user._id) {
        //add user to the readBy array of the message
        messages[i].readBy.push(req.user._id);
        //save message
        await Message.findByIdAndUpdate(messages[i]._id, {
          readBy: messages[i].readBy,
        });
      }
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}
);

module.exports = { allMessages, sendMessage, allMessagesNotSender, updateReadBy };
