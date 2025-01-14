import { useEffect, useState } from "react";
import { usePdfFocus } from "~/context/pdf";
import { Document } from "~/types/document";

export const useMultiplePdfs = (pdfs: Document[]) => {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const { pdfFocusState } = usePdfFocus();

  useEffect(() => {
    if (pdfs && pdfs[0]) {
      setActivePdfUrl(pdfs[0].url);
    }
  }, [pdfs]);

  useEffect(() => {
    if (pdfFocusState.documentId) {
      const selectedPdf = pdfs.find(
        (doc) => doc.id == pdfFocusState.documentId
      );
      if (selectedPdf) {
        setActivePdfUrl(selectedPdf.url);
      }
    }
  }, [pdfFocusState.pageNumber, pdfFocusState.documentId, setActivePdfUrl]);

  const isActivePdf = (file: Document) => {
    return file.url == activePdfUrl;
  };

  const handlePdfFocus = (file: Document) => {
    setActivePdfUrl(file.url);
  };

  return {
    activePdfUrl,
    isActivePdf,
    handlePdfFocus,
  };
};
