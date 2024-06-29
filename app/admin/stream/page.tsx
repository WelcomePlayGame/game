'use client';
import { useState } from 'react';

const PageStartStream = () => {
  const [message, setMessage] = useState('');

  const startStream = async () => {
    const fbStreamKey = process.env.NEXT_PUBLIC_FB_STREAM_KEY; // Убедитесь, что FB_STREAM_KEY доступен в окружении
    const videoUrl = 'https://youtu.be/n-B377Modf4?si=WXQRPE_2R2IB0P-P'; // Ваша ссылка на видео

    try {
      const response = await fetch('/api/auth/start-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fbStreamKey, videoUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to start stream');
      }

      setMessage(data.message);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Stream to Facebook</h1>
      <button onClick={startStream}>Start Stream</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PageStartStream;
