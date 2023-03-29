import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PageNavigation from "components/dashboardItems/myCv/PageNavigation";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [height, setHeight] = useState(800);
  const [maxHeight, setMaxHeight] = useState(800);
  const [width, setWidth] = useState(565);
  const [maxWidth, setMaxWidth] = useState(565);
  const [scale, setScale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPage = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handleZoomIn = () => {
    setScale(scale * 1.1);
  };

  const handleZoomOut = () => {
    setScale(scale / 1.1);
  };

  // Update heigh and width props with screen size
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setHeight(989);
        setMaxHeight(989);
        setWidth(700);
        setMaxWidth(700);
      } else if (screenWidth >= 768) {
        setHeight(700);
        setMaxHeight(700)
        setWidth(480);
        setMaxWidth(480)
      } else if (screenWidth >= 385) {
        setHeight(450);
        setMaxHeight(450)
        setWidth(360);
        setMaxWidth(360)
      } else {
        setHeight(400);
        setMaxHeight(400)
        setWidth(320);
        setMaxWidth(320)
      }
    }

    // Add event listener on resize event
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-2 md:pr-0 lg:pr-0 md:mt-2 lg:mt-0">
      <div className="flex flex-col items-center">
        <div className="mt-1">
          <button
            className="relative top-[3rem] right-[7.5rem] md:right-[12rem] lg:right-[19rem] text-white bg-gray-700 opacity-50 px-4 py-1"
            onClick={handleZoomIn}
          >
            +
          </button>
          <button
            className="relative top-[3rem] right-[7.5rem] md:right-[12rem] lg:right-[19rem] text-white bg-gray-700 opacity-50 px-4 py-1"
            onClick={handleZoomOut}
          >
            -
          </button>
        </div>
        {props.pdfUrl && (
          <>
            <div
              className="overflow-auto b-green-500 bg-gray-700"
              style={{
                maxHeight: maxHeight,
                minHeight: scale < 1 ? height * scale - 20 : height - 20,
                maxWidth: maxWidth,
                minWidth: scale < 1 ? width * scale : width - 20,
              }}
            >
              <Document
                key={props.pdfUrl}
                file={props.pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                error="Aucun fichier.."
                loading="Chargement..."
                height={height}
                width={width}
              >
                <Page
                  pageNumber={pageNumber}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="static-pdf"
                  height={height}
                  width={width}
                  scale={scale}
                />
              </Document>
            </div>
            <PageNavigation
              numPages={numPages}
              currentPage={pageNumber}
              onPageChange={goToPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
