import React from "react";
import ReactPaginate from 'react-paginate';

const Pagination = ({totalPages, currentPage, onPageChange}) => {
    return (
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       pageNum={totalPages}
                       marginPagesDisplayed={4}
                       pageRangeDisplayed={2}
                       forceSelected={currentPage}
                       clickCallback={onPageChange}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}
        />
    )
};

export default Pagination;
