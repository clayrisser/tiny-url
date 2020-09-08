import useFetch from 'use-http';

export default function useUploadImage() {
  const { post } = useFetch();
  return async (file?: File) => {
    const formData = new FormData();
    formData.append('file', file);
    await post('/api/upload', formData);
  };
}
