const serverType = process.env.NEXT_PUBLIC_SERVER_TYPE;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_TYPE: process.env.NEXT_PUBLIC_SERVER_TYPE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_KAKAO_JS_KEY:
      process.env.NODE_ENV === 'production'
        ? process.env.KAKAO_JS_KEY
        : process.env.KAKAO_JS_KEY_TEST,
    PLUGIN_APP_ID: process.env.PLUGIN_APP_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: serverType === 'dev' ? 'ca.edge.vg' : 'ca.group-edge.net',
        pathname: '/i/**/**',
      },
    ],
  },
};

export default nextConfig;
