// import React from 'react'

// const PaginationComponent = ({
//     currentPage,
//     totalPages,
//     filteredUsers,
//     onPageChange,
//     loadingAll
// }) => {
    
//     const itemsPerPage = 10; // Mantenemos 10 como en el código original
//     const startItem = (currentPage - 1) * itemsPerPage + 1
//     const endItem = Math.min(currentPage * itemsPerPage, filteredUsers.length)

//     const renderPageNumbers = () => {
//         const pages = []
//         const maxPagesToShow = 5
        
//         let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
//         let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
        
//         if (endPage - startPage + 1 < maxPagesToShow) {
//             startPage = Math.max(1, endPage - maxPagesToShow + 1)
//         }
        
//         // Botón primera página
//         if (startPage > 1) {
//             pages.push(
//                 <li key={1} className="page-item">
//                     <button className="page-link" onClick={() => onPageChange(1)}>
//                         1
//                     </button>
//                 </li>
//             )
//             if (startPage > 2) {
//                 pages.push(<li key="ellipsis1" className="page-item disabled"><span className="page-link">...</span></li>)
//             }
//         }
        
//         // Páginas intermedias
//         for (let i = startPage; i <= endPage; i++) {
//             pages.push(
//                 <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//                     <button className="page-link" onClick={() => onPageChange(i)}>
//                         {i}
//                     </button>
//                 </li>
//             )
//         }
        
//         // Botón última página
//         if (endPage < totalPages) {
//             if (endPage < totalPages - 1) {
//                 pages.push(<li key="ellipsis2" className="page-item disabled"><span className="page-link">...</span></li>)
//             }
//             pages.push(
//                 <li key={totalPages} className="page-item">
//                     <button className="page-link" onClick={() => onPageChange(totalPages)}>
//                         {totalPages}
//                     </button>
//                 </li>
//             )
//         }
        
//         return pages
//     }

//     return (
//         <div className='card-footer bg-amber-50'>
//             <div className='row align-items-center'>
//                 <div className='col-md-6'>
//                     <div className='d-flex align-items-center'>
//                         <span className='me-2'>Mostrar:</span>
//                         <select 
//                             className='form-select form-select-sm'
//                             style={{width: '80px'}}
//                             disabled
//                         >
//                             <option value="25">25</option>
//                         </select>
//                         <span className='ms-3 text-muted'>
//                             {startItem}-{endItem} de {filteredUsers.length} registros
//                         </span>
//                     </div>
//                 </div>
//                 <div className='col-md-6'>
//                     <div className='d-flex justify-content-end'>
//                         <nav>
//                             <ul className='pagination mb-0'>
//                                 <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                                     <button 
//                                         className='page-link' 
//                                         onClick={() => onPageChange(currentPage - 1)}
//                                         disabled={currentPage === 1 || loadingAll}
//                                     >
//                                         Anterior
//                                     </button>
//                                 </li>
                                
//                                 {renderPageNumbers()}
                                
//                                 <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                                     <button 
//                                         className='page-link' 
//                                         onClick={() => onPageChange(currentPage + 1)}
//                                         disabled={currentPage === totalPages || loadingAll}
//                                     >
//                                         Siguiente
//                                     </button>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PaginationComponent



import React from "react";

const PaginationComponent = ({
  currentPage,
  totalPages,
  filteredUsers,
  onPageChange,
  loadingAll,
}) => {
  const itemsPerPage = 10;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredUsers.length);

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={loadingAll}
          className={`px-3 py-1 rounded-md text-sm font-medium border
            ${
              currentPage === i
                ? "bg-[#5B21B6] text-white border-violet-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
      {/* LADO IZQUIERDO */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <span>Mostrar:</span>

        <select
          disabled
          className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-100 cursor-not-allowed"
        >
          <option value="25">10</option>
        </select>

        <span>
          {startItem}-{endItem} de {filteredUsers.length} registros
        </span>
      </div>

      {/* LADO DERECHO */}
      <div className="flex items-center gap-1">

        <p>Página {currentPage} de {totalPages}</p>
        {/* Primera página */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || loadingAll}
          className="px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          «
        </button>

        {/* Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loadingAll}
          className="px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          ‹
        </button>

        {/* Páginas */}
        <div className="flex gap-1">{renderPageNumbers()}</div>

        {/* Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loadingAll}
          className="px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          ›
        </button>

        {/* Última */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || loadingAll}
          className="px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
