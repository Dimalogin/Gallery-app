export const cardTemplate = `
<li class="list-item item">
<div class ='item__body'>
<div class="item__icon">
  <img src="" alt="card" />
</div>
<h3 class="item__title"></h3>
<div class="item-modal modal">
  <div class="modal__body">
    <div class = 'modal__image'>
      <img  src="" alt="modal" />
    </div>
    <ul class="modal__list">
      <li class="modal-item item">
        <h3 class="item-name__title">Name:</h3>
        <p class="item-name__text"></p>
      </li>
      <li class="modal-item item">
        <h3 class="item-origin__title">Origin:</h3>
        <p class="item-origin__text"></p>
      </li>
      <li class="modal-item item">
        <h3 class="item-status__title">Status:</h3>
        <p class="item-status__text"></p>
      </li>
      <li class="modal-item item">
        <h3 class="item-location__title">Location:</h3>
        <p class="item-location__text"></p>
      </li>
      <li class="modal-item item">
        <h3 class="item-species__title">Species:</h3>
        <p class="item-species__text"></p>
      </li>
      <li class="modal-item item">
        <h3 class="item-gender__title">Gender:</h3>
        <p class="item-gender__text"></p>
      </li>
    </ul>
    <button class="modal-btn__close">&#10006;</button>
  </div>
  </div>
</div>
</li>
`;
