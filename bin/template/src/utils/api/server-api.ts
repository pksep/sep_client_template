import { showMessage } from '@/utils';
import PATH_TO_SERVER from '@/utils/path';
import { isServerError, Reqi } from '@pksep/reqi';

const serverApi = new Reqi(PATH_TO_SERVER + 'api', {
  credentials: 'include'
});

serverApi.request.use(request => {
  const user = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null;

  const id = user?.id || null;

  if (id) {
    request.headers.set('user-id', `${id}`);
  }
  return request;
});

serverApi.on('error', error => {
  if (isServerError(error)) {
    showMessage('', 'Произошла не предвиденная ошибка на сервере', 'e');
  }
});

export default serverApi;
