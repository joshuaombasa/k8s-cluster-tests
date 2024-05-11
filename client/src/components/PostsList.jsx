import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateComment from './CreateComment';

export default function PostsList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('http://localhost:4004/query');
      setPosts(Object.values(res.data));
      console.log(Object.values(res.data));
    };

    fetchUser();
  }, []);

  const renderComments = (comments) => {
    comments.map((comment) => <em key={comment.id}>{comment.comment}</em>);
  };

  const postsElements = Object.values(posts).map((post) => (
    <div className="post-item" key={post.postId}>
      <h3>{post.post}</h3>
      <div className="comments-list">
        {post.comments.map((comment) => (
          <em key={comment.id}>{comment.comment}</em>
        ))}
      </div>
      <CreateComment postId={post.postId} />
    </div>
  ));

  return (
    <div className="posts-list">
      <h1>Posts list</h1>
      {postsElements}
    </div>
  );
}
