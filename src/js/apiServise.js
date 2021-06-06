const API_KEY = '21948624-31b67ed2e94e468d71d1f3d1d';
// const BASE_URL = 'https://pixabay.com/api/';



export default class ApiService {
  constructor() {
    this.searchQuery = '';
      this.page = 1;      
  }

    fetchArticles() {
        console.log(this);
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
            });         
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}