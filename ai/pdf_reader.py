import pymupdf
import sys


def extract_text(pdf_path):

    document = pymupdf.open(pdf_path)

    pages = []

    for page_number, page in enumerate(document):

        text = page.get_text()

        pages.append({
            "page": page_number + 1,
            "text": text
        })

    document.close()

    return pages


if __name__ == "__main__":

    pdf_path = sys.argv[1]

    pages = extract_text(pdf_path)

    for page in pages:

        print(f"--- PAGE {page['page']} ---")
        print(page["text"])