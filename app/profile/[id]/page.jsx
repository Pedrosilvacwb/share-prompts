'use client';

import Profile from '@components/Profile';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [creator, setCreator] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
      setCreator(data[0]?.creator);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      {' '}
      <Profile
        name={`Perfil de ${creator?.username} `}
        desc={`Bem vindo ao perfil de ${creator?.username}`}
        data={posts}
      />
    </div>
  );
};

export default UserProfile;
