import Comments from "../models/commentModel.js";
import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";

export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { description, image } = req.body;

    if (!description) {
      next("You must provide a description");
      return;
    }

    const post = await Posts.create({
      userId,
      description,
      image,
    });

    res.status(200).json({
      sucess: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { search } = req.body;

    const user = await Users.findById(userId);
    const friends = user?.friends?.toString().split(",") ?? [];
    friends.push(userId);

    const searchPostQuery = {
      $or: [
        {
          description: { $regex: search, $options: "i" },
        },
      ],
    };

    const posts = await Posts.find(search ? searchPostQuery : {})
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    const friendsPosts = posts?.filter((post) => {
      return friends.includes(post?.userId?._id.toString());
    });

    const otherPosts = posts?.filter(
      (post) => !friends.includes(post?.userId?._id.toString())
    );

    let postsRes = null;

    if (friendsPosts?.length > 0) {
      postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
    } else {
      postsRes = posts;
    }

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postsRes,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Posts.findById(id).populate({
      path: "userId",
      select: "firstName lastName location profileUrl -password",
    });
    // .populate({
    //   path: "comments",
    //   populate: {
    //     path: "userId",
    //     select: "firstName lastName location profileUrl -password",
    //   },
    //   options: {
    //     sort: "-_id",
    //   },
    // })
    // .populate({
    //   path: "comments",
    //   populate: {
    //     path: "replies.userId",
    //     select: "firstName lastName location profileUrl -password",
    //   },
    // });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Posts.find({ userId: id })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const postComments = await Comments.find({ postId })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .populate({
        path: "replies.userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;

    const post = await Posts.findById(id);

    const index = post.likes.findIndex((pid) => pid === String(userId));

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((pid) => pid !== String(userId));
    }

    const newPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePostComment = async (req, res, next) => {
  const { userId } = req.body.user; // ✅ Extract userId from request body
  const { id, rid } = req.params;   // ✅ Get comment ID and optional reply ID from route params

  try {
    // ✅ Check if it's a main comment like (no rid provided)
    if (!rid) {
      // 🔁 Fetch the main comment
      const comment = await Comments.findById(id);
      if (!comment) return res.status(404).json({ message: "Comment not found" }); // ✅ Better error handling

      // 🔁 Check if user already liked the comment
      const index = comment.likes.findIndex((el) => el === String(userId));

      if (index === -1) {
        comment.likes.push(userId); // 👍 Add like
      } else {
        comment.likes = comment.likes.filter((i) => i !== String(userId)); // 👎 Remove like
      }

      // 🔁 Save updated comment
      const updated = await Comments.findByIdAndUpdate(id, comment, { new: true });
      return res.status(201).json(updated); // ✅ Respond with updated comment
    } else {
      // ✅ It's a reply like since rid exists

      // 🔁 Find the parent comment and match specific reply
      const comment = await Comments.findOne(
        { _id: id, "replies._id": rid },  // ✅ Use MongoDB positional operator to match reply
        { "replies.$": 1 }               // ✅ Project only the matched reply
      );

      if (!comment || !comment.replies.length) {
        return res.status(404).json({ message: "Reply not found" }); // ✅ Handle missing reply
      }

      const reply = comment.replies[0]; // ✅ Access matched reply
      const index = reply.likes.findIndex((i) => i === String(userId));

      if (index === -1) {
        reply.likes.push(userId); // 👍 Add like
      } else {
        reply.likes = reply.likes.filter((i) => i !== String(userId)); // 👎 Remove like
      }

      // 🔁 Update the specific reply's likes using positional operator
      const updated = await Comments.updateOne(
        { _id: id, "replies._id": rid },
        { $set: { "replies.$.likes": reply.likes } }
      );

      return res.status(201).json({ updated: true }); // ✅ Simple success response
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message }); // ✅ General error handler
  }
};
;

export const commentPost = async (req, res, next) => {
  try {
    const { comment, from } = req.body;
    const { userId } = req.body.user;
    const { id } = req.params;

    if (comment === null) {
      return res.status(404).json({ message: "Comment is required." });
    }

    const newComment = new Comments({ comment, from, userId, postId: id });

    await newComment.save();

    //updating the post with the comments id
    const post = await Posts.findById(id);

    post.comments.push(newComment._id);

    const updatedPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const replyPostComment = async (req, res, next) => {
  const { userId } = req.body.user;
  const { comment, replyAt, from } = req.body;
  const { id } = req.params;

  if (comment === null) {
    return res.status(404).json({ message: "Comment is required." });
  }

  try {
    const commentInfo = await Comments.findById(id);

    commentInfo.replies.push({
      comment,
      replyAt,
      from,
      userId,
      created_At: Date.now(),
    });

    commentInfo.save();

    res.status(200).json(commentInfo);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Posts.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};