import axios from 'axios';
import React, { useState } from 'react';

export default function CreatePost() {
  const [formData, setFormData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:4000/posts', {
      post: formData,
    });

    console.log(res.data)
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="create-post">
        <label htmlFor="post">Create post</label>
        <input
          type="text"
          name="post"
          id=""
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
