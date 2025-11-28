const PATH_TO_SERVER =
  import.meta.env.PROD && import.meta.env.VITE_IS_SERVER === 'true'
    ? `${window.location.protocol}//${window.location.hostname}/`
    : `${import.meta.env.VITE_PATH_TO_SERVER}/`;

const PATH_TO_SOCKET = `${import.meta.env.VITE_PATH_TO_SOCKET}/`;
const PATH_TO_FILE_CDN = `${window.location.origin}/api/documents/cdn/`;
const PATH_TO_SOLIDWORKS = `${import.meta.env.VITE_PATH_TO_SOLIDWORKS}`;
const TYPESENSE_API_KEY = import.meta.env.VITE_TYPESENSE_API_KEY;
const TYPESENSE_TIMEOUT_SECONDS = import.meta.env
  .VITE_TYPESENSE_TIMEOUT_SECONDS;
const TYPESENSE_URL = import.meta.env.VITE_TYPESENSE_URL;

export {
  PATH_TO_SOCKET,
  PATH_TO_FILE_CDN,
  PATH_TO_SOLIDWORKS,
  TYPESENSE_API_KEY,
  TYPESENSE_TIMEOUT_SECONDS,
  TYPESENSE_URL
};

export default PATH_TO_SERVER;
