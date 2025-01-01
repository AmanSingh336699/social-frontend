import React, { useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/Slices/postSlice'
import Skeleton from '../components/SkeletonPost'
import Header from '../components/Header'


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
        {posts.length === 0 && <div>No posts found</div>}
        <Suspense fallback={
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6}).map((__, index) => (
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