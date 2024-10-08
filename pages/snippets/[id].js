// pages/snippets/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SnippetPage() {
  const router = useRouter();
  const { id } = router.query;
  const [code, setCode] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/snippet/${id}`)
        .then((res) => res.json())
        .then((data) => setCode(data.code));
    }
  }, [id]);

  return (
    <div>
      <h1>Code Snippet</h1>
      <pre>{code}</pre>
    </div>
  );
}
