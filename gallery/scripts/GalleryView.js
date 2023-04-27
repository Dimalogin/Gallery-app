import { galleryTemplate } from "./templates/galleryTemplate.js";
import { endlessLoadingTemplate } from "./templates/endlessLoadingTemplate.js";
import { paginationTemplate } from "./templates/paginationTemplate.js";
import { cardTemplate } from "./templates/cardTemplate.js";
import { GalleryModel } from "./GalleryModel.js";

export class GalleryView {
  #eventListeners = {
    handleEvent: (event) => {
      if (event.currentTarget === this.#select) {
        const index = event.target.selectedIndex;
        const option = event.target.options[index];
        const valueOption = option.value;

        if (valueOption === "endless-loading") {
          this.#onEndlessLoading();
        }
        if (valueOption === "pagination") {
          this.#onPagination();
        }
      }
    },
  };

  initScroll = this.#getDataByScroll.bind(this);
  #model = null;
  #select = null;
  #list = null;
  #pageId = 1;

  constructor() {
    this.#render();
  }

  #render() {
    this.#initTemplate();
    this.#bindListener();
    this.#initController();
    this.#onEndlessLoading();
  }

  #initTemplate() {
    const body = document.body;
    const template = document.createElement("template");
    template.innerHTML = galleryTemplate;
    const fullView = template.content.cloneNode(true);

    this.#select = fullView.querySelector(".header__switch-filter");
    this.#list = fullView.querySelector(".page-gallery");

    body.appendChild(fullView);
  }

  #bindListener() {
    this.#select.addEventListener("change", this.#eventListeners);
  }

  #initController() {
    this.#model = new GalleryModel();
  }

  /*Endless Loading*/

  #onEndlessLoading() {
    this.#list.innerHTML = "";
    this.#onCreateList();
    this.#onGetDataForEndlessLoading();
    this.#addScroll();
  }

  #addScroll() {
    window.addEventListener("scroll", this.initScroll);
  }

  #removeScroll() {
    window.removeEventListener("scroll", this.initScroll);
  }

  #getDataByScroll() {
    const height = document.body.scrollHeight;

    const heightClient = document.body.clientHeight;
    const totalHeight = height - heightClient - 400;

    if (document.documentElement.scrollTop > totalHeight) {
      this.#pageId += 1;
      if (this.#pageId <= 42) {
        this.#onGetDataByIdForEndlessLoading(this.#pageId);
      } else {
        this.#hideLoader();
      }
    }
  }

  #onGetDataForEndlessLoading() {
    this.#showLoader();
    this.#model.getData().then((data) => {
      const galleryList = this.#list.querySelector(".gallery-list");
      const result = data.results;
      const cards = this.#onListUpdate(result);
      galleryList.appendChild(cards);
      this.#hideLoader();
    });
  }

  #onGetDataByIdForEndlessLoading(id) {
    this.#showLoader();
    this.#model
      .getDataById(id)
      .then((data) => {
        const galleryList = this.#list.querySelector(".gallery-list");
        const result = data.results;
        const cards = this.#onListUpdate(result);
        galleryList.appendChild(cards);
        this.#hideLoader();
      })
      .catch((error) => {
        alert("Ошибка при загузке данных");
      });
  }

  /*Pagination*/

  #onPagination() {
    this.#list.innerHTML = "";
    this.#removeScroll();
    this.#onCreateList();
    this.#onGetDataForPagination();
  }

  #onCreatePagination(amountPage) {
    const template = document.createElement("template");
    template.innerHTML = paginationTemplate;
    const paginationView = template.content.cloneNode(true);
    const pageCurrent = paginationView.querySelector(`.page__current`);
    const pageTotal = paginationView.querySelector(`.page__total`);
    const btnPrevious = paginationView.querySelector(`.btn__prev`);
    const btnNext = paginationView.querySelector(`.btn__next`);
    btnPrevious.addEventListener(
      "click",
      this.#onSwitchToPreviousPage.bind(this)
    );
    btnNext.addEventListener("click", this.#onSwitchToNextPage.bind(this));
    pageCurrent.textContent = 1;
    pageTotal.textContent = amountPage;

    return paginationView;
  }

  #onSwitchToPreviousPage(event) {
    const parent = event.target.closest(".pagination__body");
    const currentPage = parent.querySelector(".page__current");
    let numberPage = Number(currentPage.textContent);
    numberPage -= 1;

    if (numberPage >= 1) {
      currentPage.textContent = numberPage;
      this.#onGetDataByIdForPagination(numberPage);
    }
  }

  #onSwitchToNextPage(event) {
    const parent = event.target.closest(".pagination__body");
    const currentPage = parent.querySelector(".page__current");
    const totalPage = parent.querySelector(".page__total");
    let numberCarrentPage = Number(currentPage.textContent);
    const numberTotaltPage = Number(totalPage.textContent);
    numberCarrentPage += 1;
    if (numberCarrentPage <= numberTotaltPage) {
      currentPage.textContent = numberCarrentPage;
      this.#onGetDataByIdForPagination(numberCarrentPage);
    }
  }

  #onGetDataForPagination() {
    this.#showLoader();
    this.#model.getData().then((data) => {
      const galleryList = this.#list.querySelector(".gallery-list");
      const totalPages = data.info.pages;
      const result = data.results;
      const cards = this.#onListUpdate(result);
      const pagination = this.#onCreatePagination(totalPages);
      this.#list.appendChild(pagination);
      galleryList.appendChild(cards);
      this.#hideLoader();
    });
  }

  #onGetDataByIdForPagination(id) {
    this.#showLoader();
    this.#model
      .getDataById(id)
      .then((data) => {
        const galleryList = this.#list.querySelector(".gallery-list");
        galleryList.innerHTML = "";
        const result = data.results;
        const cards = this.#onListUpdate(result);
        galleryList.appendChild(cards);
        this.#hideLoader();
      })
      .catch((error) => {
        alert("Ошибка при загузке данных");
      });
  }

  // Fill Cards

  #onCreateList() {
    const template = document.createElement("template");
    template.innerHTML = endlessLoadingTemplate;
    const fullView = template.content.cloneNode(true);
    this.#list.appendChild(fullView);
  }

  #onListUpdate(data) {
    const template = document.createElement("template");
    template.innerHTML = cardTemplate;

    return data.reduce((fragment, card) => {
      const cardElement = template.content.cloneNode("true");

      const cardBody = cardElement.querySelector(".item__body");
      const cardImage = cardElement.querySelector(".item__icon img");
      const cardTitle = cardElement.querySelector(".item__title");

      const modalImage = cardElement.querySelector(".modal__image img");
      const modalName = cardElement.querySelector(".item-name__text");
      const modalOrigin = cardElement.querySelector(".item-origin__text");
      const modalStatus = cardElement.querySelector(".item-status__text");
      const modalLocation = cardElement.querySelector(".item-location__text");
      const modalSpecies = cardElement.querySelector(".item-species__text");
      const modalGender = cardElement.querySelector(".item-gender__text");

      cardBody.addEventListener("click", function (event) {
        const parent = event.target.closest(".list-item");
        const modal = parent.querySelector(".item-modal");
        const btnClose = parent.querySelector(".modal-btn__close");
        modal.classList.add("modal-show");

        btnClose.addEventListener("click", function (event) {
          event.stopPropagation();
          modal.classList.remove("modal-show");
        });
      });

      cardImage.src = card.image;
      cardTitle.textContent = card.name;

      modalImage.src = card.image;
      modalName.textContent = card.name;
      modalOrigin.textContent = card.origin.name;
      modalStatus.textContent = card.status;
      modalLocation.textContent = card.location.name;
      modalSpecies.textContent = card.species;
      modalGender.textContent = card.gender;

      fragment.appendChild(cardElement);
      return fragment;
    }, document.createDocumentFragment());
  }

  /*Loader*/

  #showLoader() {
    const loader = this.#list.querySelector(".gallery-loader");
    loader.style.display = "block";
  }

  #hideLoader() {
    const loader = this.#list.querySelector(".gallery-loader");
    loader.style.display = "none";
  }
}
