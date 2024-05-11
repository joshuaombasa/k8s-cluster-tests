import React, { useState } from 'react';
import axios from 'axios';
export default function CreateComment({ postId }) {
  const [formData, setFormData] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      {
        comment: formData,
      }
    );

    console.log(res.data);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="create-comment">
        <label htmlFor="comment">Create post</label>
        <input
          type="text"
          name="comment"
          id=""
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
