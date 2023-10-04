import mongoose from "mongoose";


const authorSchema = new mongoose.Schema({
    name: String,
    role: String,
    avatarUrl: String,
});
  
  // Esquema para OwnComment
const ownCommentSchema = new mongoose.Schema({
    name: String,
    role: String,
    avatarUrl: String,
    content: String,
});
  
  // Esquema para PostType
const PostSchema = new mongoose.Schema({
    author: {
      type: authorSchema,
      required: true,
    },
    content: String,
    comments: [ownCommentSchema],
});

export default mongoose.model("Post", PostSchema);