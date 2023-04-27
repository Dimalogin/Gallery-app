import { GalleryApi } from "./GalleryApi.js";

export class GalleryModel {
  #api = new GalleryApi();

  getData() {
    return this.#api.getDataFromApi();
  }

  getDataById(id) {
    return this.#api.getDataByIdFromApi(id);
  }
}
