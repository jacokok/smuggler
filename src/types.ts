export interface PDFOptions {
  scale: number;
  displayHeaderFooter: boolean;
  headerTemplate: string;
  footerTemplate: string;
  printBackground: boolean;
  landscape: boolean;
  pageRanges: string;
  format: Format;
  width: string | number;
  height: string | number;
  margin: {
    top: string | number;
    left: string | number;
    bottom: string | number;
    right: string | number;
  };
  preferCSSPageSize: boolean;
  omitBackground: boolean;
  timeout: number;
}

type Format =
  | "Letter"
  | "Legal"
  | "Tabloid"
  | "Ledger"
  | "A0"
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6";

export interface UrlBody {
  url: string;
  options?: PDFOptions;
}

export interface HtmlBody {
  html: string;
  options?: PDFOptions;
}
