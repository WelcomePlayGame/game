import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { Orbitron } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import SessionWrapper from '@/components/session_wrapper/SessionWrapper';
import GoogleAdsense from '@/components/GoogleAdsense/GoogleAdsense';
import GooglePublisher from '@/components/GoogleAdsense/GooglePublisher';
import GoogleAnalytics from '@/components/GoogleAdsense/GoogleAnalytics';
const rubik = Rubik({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
const orbitron = Orbitron({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Unlock Your Next Adventure: Game Portal to Infinite Possibilities!',
  description:
    'Where Every Click Leads to Adventure - Dive into Your Next Great Game!. GameForOnline',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <script
            charSet="UTF-8"
            src="//web.webpushs.com/js/push/7fe3159fa95403fee198e9079ce98b25_1.js"
            async
          ></script>

          <meta
            name="google-adsense-account"
            content="ca-pub-8462086079240804"
          ></meta>
        </head>
        <body className={rubik.className}>{children}</body>
        <GoogleAdsense pId="8462086079240804" />
        <GooglePublisher />
        <GoogleAnalytics trackingId="G-5G4LKF8230" />
      </html>
    </SessionWrapper>
  );
}
