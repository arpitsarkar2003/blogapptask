import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useBlog } from '../../contexts/BlogContext';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

export default function BlogForm({ postId }) {
  const navigate = useNavigate();
  const { getBlogPost, createBlogPost, updateBlogPost } = useBlog();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const post = await getBlogPost(postId);
        if (post) {
          setTitle(post.title);
          setContent(post.content);
          setImage(post.image || '');
        }
      }
    };

    fetchPost();
  }, [postId, getBlogPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const blogPost = { title, content, image };
    try {
      if (postId) {
        await updateBlogPost({ id: postId, ...blogPost });
      } else {
        await createBlogPost(blogPost);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
        <Input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <Button type="submit" variant="outline" disabled={loading}>
        {postId ? 'Update' : 'Create'} Blog Post
      </Button>
    </form>
  );
}
