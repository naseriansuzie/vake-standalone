declare namespace NodeJS {
  interface ProcessEnv {
    // .env.local
    NEXT_PUBLIC_SERVER_TYPE: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_KAKAO_JS_KEY: string; // Javascript Key
    PLUGIN_APP_ID: string; // can plugin static app id
  }
}
