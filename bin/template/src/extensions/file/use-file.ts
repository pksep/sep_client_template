import PATH_TO_SERVER, { PATH_TO_FILE_CDN } from '@/utils/path';

const useFile = () => {
  /**
   * Возвращает путь до файла по наменованию файла
   * @param filePath
   * @returns
   */
  const getFilePath = (filePath: string): string => {
    let pathToCdn = PATH_TO_FILE_CDN;

    if (window.location.hostname === 'localhost')
      pathToCdn = PATH_TO_SERVER + 'api/documents/cdn/';

    return pathToCdn + filePath;
  };

  /**
   * Вызывает скачивание файла
   * @param filePath
   * @returns
   */
  const downloadFile = async (filePath: string): Promise<void> => {
    if (filePath === '') {
      return;
    }

    const fullFilePath = getFilePath(filePath);

    if (fullFilePath === '') {
      return;
    }

    const response = await fetch(fullFilePath, { credentials: 'include' });

    if (!response.ok)
      throw new Error(`Failed to fetch file: ${response.statusText}`);

    const getJson = await response.json();

    const name = getJson.filename;
    const url = getJson.url;

    const responseImage = await fetch(url);

    if (!responseImage.ok) {
      throw new Error(`Failed to fetch image: ${responseImage.statusText}`);
    }

    const blob = await responseImage.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name || 'downloaded-file';
    a.click();

    URL.revokeObjectURL(url); // Освобождаем память
  };

  // Возвращает путь до файла в minio
  const getLoadFile = async (
    url: string
  ): Promise<{
    url: string;
    filename: string;
  } | null> => {
    const requestUrl = getFilePath(url);

    // Получаем файл
    const response = await fetch(requestUrl, { credentials: 'include' });

    // если нет, то ставим пустой путь
    if (!response.ok) {
      return null;
    }

    const getJson = await response.json();
    return getJson;
  };

  return { getFilePath, downloadFile, getLoadFile };
};

export default useFile;
