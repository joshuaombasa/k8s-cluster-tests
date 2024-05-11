import { useState } from 'react'
import CreatePost from './components/Createpost'

import './App.css'
import PostsList from './components/PostsList'



function App() {
 
  return (
    <div className='container'>
     <CreatePost/>
     <PostsList/>
    </div>
  )
}

export default App
