/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AIROPS_USER_ID: string;
  readonly VITE_AIROPS_WORKSPACE_ID: string;
  readonly VITE_AIROPS_HASHED_USER_ID: string;
  readonly VITE_AIROPS_APP_ID: string;
  readonly VITE_AIROPS_EXECUTION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
