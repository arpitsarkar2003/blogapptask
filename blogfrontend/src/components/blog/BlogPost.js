import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useBlog } from '../../contexts/BlogContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/formatDate';
import { Button } from '../ui/Button';

export default function BlogPost({ id }) {
  const navigate = useNavigate();
  const { getBlogPost, deleteBlogPost } = useBlog();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getBlogPost(id);
        setPost(fetchedPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, getBlogPost]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Blog post not found</div>;
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteBlogPost(post._id);
      navigate('/');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img src={post.image || '/placeholder.svg'} alt={post.title} className="w-full h-64 object-cover mb-6 rounded-lg" />
      <p className="text-gray-600 mb-4">{post.content}</p>
      <div className="text-sm text-gray-500 mb-6">
        Posted on {formatDate(post.createdAt)} by {post.author.name}
      </div>
      {user && user.id === post.authorId && (
        <div className="flex space-x-4">
          <Link to={`/edit/${post._id}`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
}
