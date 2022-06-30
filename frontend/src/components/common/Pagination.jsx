import React from 'react';
import _ from 'lodash';
import propType from 'prop-types'

function Pagination({pageSize,currentPage,itemsCount,onPageChange}) {
    //const pageCount = count / pageSize + 1;
    const pageCount = Math.ceil(itemsCount/pageSize);
    //conventional way of creating the array
    // const pages = [] // [1,2,3,4,5,....]

    // for(let i=1;i<pageCount;i++){
    //     pages.push(i);
    // }

    //lodash way of creating the array
    const pages = _.range(1,pageCount+1);

    if (pageCount === 1) return null; 
    return (
        
            <nav aria-label="Page navigation example">
            <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    {
                    pages.map( page => (
                    <li key={page}  onClick= {()=> onPageChange(page)}className={page === currentPage ? "page-item active" : "page-item" }>
                        <a className="page-link" href="#">{page}</a>
                    </li>
                    )
                    )
                    }
                    
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
</nav>
        
    );
}
Pagination.propTypes = {
    pageSize : propType.number.isRequired,
    currentPage : propType.number.isRequired,
    itemsCount : propType.number.isRequired,
    onPageChange : propType.func.isRequired,
}
export default Pagination;