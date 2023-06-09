'use client';

import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { HashLoader } from 'react-spinners';

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const filteredPosts = posts.filter(
    (post) =>
      post.prompt.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      post.tag.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      post.creator.username
        .toLowerCase()
        .includes(searchText.trim().toLowerCase())
  );

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Buscar por comandos ou tags..."
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>

      {loading && (
        <>
          {' '}
          <div className="flex justify-center items-center mt-6">
            <HashLoader color="#FF5722" />
          </div>
        </>
      )}

      {!loading && (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
