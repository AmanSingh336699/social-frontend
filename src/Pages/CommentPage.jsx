import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment, fetchPosts } from '../redux/Slices/postSlice'

function CommentPage() {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.posts)
    const post = post.find(p => p.id === postId)
    const [commentText, setCommentText] = useState('')

    useEffect(() => {
        if(!post) {
            dispatch(fetchPosts())
        }
    }, [dispatch, post])

    const handleAddComment = (e) => {
        e.preventDefault()
        if(commentText.trim()){
            dispatch(addComment({ postId, comment: commentText }))
            setCommentText('')
        }
    }

    if(!post) return
    <div>Loading...</div>

  return (
    <div>
        <div>
            <img src={post.image} alt='post' />
        </div>
    </div>
  )
}

export default CommentPage