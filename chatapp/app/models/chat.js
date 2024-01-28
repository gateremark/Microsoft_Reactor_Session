import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI ?? "MONGODB_URI is not available");

mongoose.Promise = global.Promise;

const chatSchema = mongoose.Schema({
    email: String,
    messages: Object,
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
