'use client';

import Script from 'next/script';

const KakaoScript = () => {
  const handleReady = () => {
    if (typeof window.Kakao === 'undefined') return;
    window.Kakao.init(process.env.PROVIDER.KAKAO.JS_KEY);
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
      integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
      crossOrigin="anonymous"
      async
      strategy="lazyOnload"
      onReady={handleReady}
    />
  );
};

export default KakaoScript;
