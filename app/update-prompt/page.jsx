'use client';

import Form from '@components/Form';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const UpdatePrompt = () => {
  const [submittin, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  useEffect(() => {
    console.log(promptId);
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'GET',
      });
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Id do comando não encontrado!');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Editar"
      post={post}
      setPost={setPost}
      submittin={submittin}
      handleSubmit={editPrompt}
    />
  );
};

export default UpdatePrompt;
