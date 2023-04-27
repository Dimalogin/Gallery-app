export const galleryTemplate = `
<div class="wrapper">
<header id="to-top" class="header">
  <div class="container">
    <div class="header__body">
      <div class="header__row">
        <div class="header__title">Gallery</div>
        <div class="header__switch">
          <select name="todos" class="header__switch-filter">
            <option class="filter__item" value="endless-loading">
              Endless loading
            </option>
            <option class="filter__item" value="pagination">
              Pagination
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</header>

<main class="page">
  <div class="container">
    <div class = 'page-gallery gallery'></div>
  </div>
</main>

<footer class="footer">
  <div class="footer-top-btn btn">
    <a class="btn-top" href="#to-top">&#9650;</a>
  </div>
</footer>
</div>
`;
