const API_KEY = '19197868-48df692c0a14d7fda4172233f';
const BASE_URL = 'https://pixabay.com';

export default function pixabayAPI(value, page) {
  const url = `${BASE_URL}/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No results were found for "${value}"`));
  });
}
