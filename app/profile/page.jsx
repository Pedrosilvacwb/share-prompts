'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import Profile from '@components/Profile';
import { HashLoader } from 'react-spinners';

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'tem certeza que gostaria de deletar esse comando?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filterPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filterPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    if (session?.user?.id) fetchPosts();
  }, []);

  return (
    <>
      {loading && (
        <>
          {' '}
          <div className="flex justify-center items-center">
            <HashLoader color="#FF5722" />
          </div>
        </>
      )}
      {!loading && (
        <Profile
          name="Meu Perfil"
          desc="Bem vindo ao seu perfil"
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default MyProfile;
