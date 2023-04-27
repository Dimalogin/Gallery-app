export class GalleryApi {
  getDataFromApi() {
    return fetch(`https://rickandmortyapi.com/api/character`).then(
      (response) => {
        return response.json();
      }
    );
  }

  getDataByIdFromApi(id) {
    return fetch(`https://rickandmortyapi.com/api/character?page=${id}`).then(
      (response) => {
        return response.json();
      }
    );
  }
}
