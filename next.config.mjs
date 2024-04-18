import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

// TODO: 서버 타입에 따라서 env 값 분기
// const serverType = process.env.NEXT_PUBLIC_SERVER_TYPE;

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_SERVER_TYPE: process.env.NEXT_PUBLIC_SERVER_TYPE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default withNextIntl(nextConfig);
