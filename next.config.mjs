// TODO: 서버 타입에 따라 배포 셋팅
// const serverType = process.env.NEXT_PUBLIC_SERVER_TYPE;

const kakaoKeys =
  process.env.NODE_ENV === 'production'
    ? { JS_KEY: process.env.KAKAO_JS_KEY, REST_API: process.env.KAKAO_REST_API }
    : {
        JS_KEY_TEST: process.env.KAKAO_JS_KEY_TEST,
        REST_API_TEST: process.env.KAKAO_REST_API_TEST,
      };

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_SERVER_TYPE: process.env.NEXT_PUBLIC_SERVER_TYPE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    PROVIDER: {
      FACEBOOK: {
        CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
      },
      KAKAO: kakaoKeys,
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
