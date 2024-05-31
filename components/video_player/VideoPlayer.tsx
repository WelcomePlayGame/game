'use client';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import(`react-player/youtube`), {
  ssr: false,
});
const VideoPlayer = ({ url }: { url: string }) => {
  return (
    <div suppressHydrationWarning>
      <ReactPlayer
        url={url}
        width="100%"
        height="400px"
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
        muted
      />
    </div>
  );
};
export default VideoPlayer;
