declare namespace NodeJS {
  interface ProcessEnv {
    // .env.local
    NEXT_PUBLIC_SERVER_TYPE: string;
    NEXT_PUBLIC_APP_URL: string;

    // .env.local
    PROVIDER: {
      FACEBOOK: {
        CLIENT_ID: string;
      };
      KAKAO: {
        JS_KEY_TEST: string; // Javascript Key(테스트앱)
        REST_API_TEST: string; // REST API Key(테스트앱)
        JS_KEY: string; // Javascript Key
        REST_API: string; // REST API Key
      };
    };
  }
}
