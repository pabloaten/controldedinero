import React from 'react';

const Pagination = ({ todosPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    
    <div class="container large">
  <div class="pagination">
      <ul>
      {pageNumbers.map(number => (
          <li key={number} className='page-item'>
          <a onClick={() => paginate(number)}  className='page-link'>
            {number}
          </a>
        </li>
          
          ))}
      </ul>
  </div>
</div>
  
  /*   <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)}  className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav> */
  );
};

export default Pagination;