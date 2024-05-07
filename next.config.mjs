// TODO: 서버 타입에 따라 배포 셋팅
// const serverType = process.env.NEXT_PUBLIC_SERVER_TYPE;

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_SERVER_TYPE: process.env.NEXT_PUBLIC_SERVER_TYPE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    PROVIDER: {
      KAKAO: {
        JS_KEY:
          process.env.NODE_ENV === 'production'
            ? process.env.KAKAO_JS_KEY
            : process.env.KAKAO_JS_KEY_TEST,
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ca.edge.vg',
        pathname: '/i/**/**',
      },
    ],
  },
};

export default nextConfig;
