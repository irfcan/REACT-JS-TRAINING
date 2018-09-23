import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; // lodash is an optimized version of popular js library called underscore (_)

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  //İHTİYACIMIZ bir page-number dizisi ve her page number'ı bir li'ye map etme
  //[1,2,3].map()

  console.log("Current Page..:", currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize); //[1...pagesCount].map şeklind olacak
  if (pagesCount === 1) return null; // Tek bir sayfa olursa rendera gerek yok.

  const pages = _.range(1, pagesCount + 1); // We add 1 to make sure the last page is included. (_.range is from lodash)

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//Alttaki kısım PropTypes olarak import ettiğimiz kısımdan Type Validation yapmak için kullanılır
// Components'ı built yaptıkça type checking bugs olmaması için kullanılır
// Ayrıca burası bize component hakkında bilgi verir. rendera bakmak gerekmez. Documentation oluşturur.

Pagination.PropTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
export default Pagination;
