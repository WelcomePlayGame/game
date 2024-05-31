/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['games-for-you-img.s3.us-east-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  env: {
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    URL_AWS: process.env.URL_AWS,
    BASE_URL: process.env.BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async redirects() {
    return [
      {
        source: '/en/article/how_to_check_steam_deck_for_originality',
        destination: '/platforms/Steam%20Deck',
        permanent: true,
      },
      {
        source: '/en/article/warcraft_rumble_decks',
        destination:
          '/news/best-warcraft-rumble-builds-for-dominating-the-battlefield',
        permanent: true,
      },
      {
        source: '/ru/article/kak_uvelichit_limit_vassalov_crusader_kings_3',
        destination: '/games/crusader-kings-3',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
