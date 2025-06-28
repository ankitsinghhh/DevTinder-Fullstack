import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'


const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store)=>store.feed)
  console.log(feed)

  const getFeed = async () =>{
    if(feed) return;
    try{
      const res = await axios.get(
        BASE_URL+"/feed",
   
        {withCredentials: true}
      );
      console.log(res)
      dispatch(addFeed(res.data.data))
    }
    catch(err){
      console.error(err)
    }
  };

  useEffect( ()=>{
    getFeed()
  },[])

  return feed && (
    <div className = "flex justify-center my-10 mb-30">
        <UserCard user={feed[8]} />
    </div>
  )
}

export default Feed
