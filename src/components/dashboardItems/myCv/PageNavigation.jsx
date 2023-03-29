const PageNavigation = (props) => {
  const pages = Array.from({ length: props.numPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center">
      {pages.length > 1 && pages.map((page) => (
        <button
          key={page}
          className={`${
            props.currentPage === page ? "bg-blue-500" : "bg-gray-300"
          } mx-1 my-1 px-3 py-1 rounded text-sm font-semibold text-gray-700 hover:bg-blue-400 focus:outline-none`}
          onClick={() => props.onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PageNavigation;