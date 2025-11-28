import { showMessage } from '@/utils';
import PATH_TO_SERVER from '@/utils/path';
import { isServerError, Reqi } from '@pksep/reqi';

const serverApi = new Reqi(PATH_TO_SERVER + 'api', {
  credentials: 'include'
});

serverApi.on('error', error => {
  if (isServerError(error)) {
    showMessage('', 'Произошла не предвиденная ошибка на сервере', 'e');
  }
});

export default serverApi;
