import React, { useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/Slices/postSlice'
import Skeleton from '../components/SkeletonPost'
import Header from '../components/Header/Header'
import image from '../assets/post.png'


const PostCard = lazy(() => import('../components/PostCard'))

function Home() {
    const { posts } = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

  return (
    <div className='container mx-auto py-6'>
        <Header />
        {posts.length === 0 && (
          <div className='flex flex-col justify-center items-center h-screen bg-gray-50'>
            <img src={image} alt="ADD POST" className='w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 mb-8 animate-pulse' />
            <p className='text-xl font-semibold text-gray-700
             text-center mb-6'>No posts yet. Start sharing your memories</p>
          </div>
        )}
        <Suspense fallback={
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((__, index) => (
              <Skeleton key={index} />
             ))}
          </div>
        }
        >
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </Suspense>
    </div>
  )
}

export default Home 