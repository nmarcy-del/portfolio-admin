import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PageNavigation from "components/dashboardItems/myCv/PageNavigation";
import { useTranslation } from 'react-i18next';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = (props) => {
  const { t } = useTranslation();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [height, setHeight] = useState(800);
  const [maxHeight, setMaxHeight] = useState(800);
  const [width, setWidth] = useState(565);
  const [maxWidth, setMaxWidth] = useState(565);
  const [scale, setScale] = useState(1);
  const [buttonTop, setButtonTop] = useState(50);
  const [buttonRight, setButtonRight] = useState(300);

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
        setButtonTop(50);
        setButtonRight(300);
      } else if (screenWidth >= 768) {
        setHeight(700);
        setMaxHeight(700)
        setWidth(480);
        setMaxWidth(480)
        setButtonTop(40);
        setButtonRight(175);
      } else if (screenWidth >= 385) {
        setHeight(450);
        setMaxHeight(450)
        setWidth(360);
        setMaxWidth(360)
        setButtonTop(40);
        setButtonRight(130);
      } else {
        setHeight(400);
        setMaxHeight(400)
        setWidth(320);
        setMaxWidth(320)
        setButtonTop(40);
        setButtonRight(110);
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
            className="relative text-white bg-gray-700 opacity-50 px-4 py-1"
            onClick={handleZoomIn}
            style={{
              top: scale < 1 ? buttonTop * scale : buttonTop,
              right: scale < 1 ? buttonRight * scale - 10 : buttonRight,
            }}
          >
            +
          </button>
          <button
            className="relative md:right-[12rem] lg:right-[19rem] text-white bg-gray-700 opacity-50 px-4 py-1"
            onClick={handleZoomOut}
            style={{
              top: scale < 1 ? buttonTop * scale : buttonTop,
              right: scale < 1 ? buttonRight * scale - 10 : buttonRight 
            }}
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
                minHeight: scale < 1 ? height * scale - 80 : height - 80,
                maxWidth: maxWidth,
                minWidth: scale < 1 ? width * scale : width,
              }}
            >
              <Document
                key={props.pdfUrl}
                file={props.pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                error={t("No file..")}
                loading={t("Loading...")}
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
