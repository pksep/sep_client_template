import PATH_TO_SERVER from '@/utils/path';

export function ReqSse(path) {
  const eventSource = new EventSource(`${PATH_TO_SERVER}${path}`);
  return eventSource;
}
