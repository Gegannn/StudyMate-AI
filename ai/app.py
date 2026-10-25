from flask import Flask, request, jsonify
from pdf_reader import extract_text
from text_splitter import split_text
from vector_store import add_chunks, search_chunks

app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "StudyMate AI Python service is running!"
    })


@app.route("/extract", methods=["POST"])
def extract():

    data = request.get_json()

    pdf_path = data.get("pdf_path")
    filename = data.get("filename", "unknown.pdf")

    if not pdf_path:
        return jsonify({
            "error": "PDF path is required"
        }), 400

    try:

        # --------------------------------
        # STEP 1: Extract PDF pages
        # --------------------------------

        pages = extract_text(pdf_path)

        print("TOTAL PAGES:", len(pages))

        for page in pages:
            print(
                "PAGE",
                page["page"],
                "TEXT LENGTH:",
                len(page["text"])
            )


        # --------------------------------
        # STEP 2: Create chunks
        # --------------------------------

        all_chunks = []

        for page in pages:

            chunks = split_text(
                page["text"],
                chunk_size=1000,
                overlap=200
            )

            for chunk in chunks:

                all_chunks.append({
                    "page": page["page"],
                    "text": chunk
                })


        # --------------------------------
        # STEP 3: Store ALL chunks
        # --------------------------------

        stored_chunks = add_chunks(
            all_chunks,
            filename
        )


        # --------------------------------
        # STEP 4: Return response
        # --------------------------------

        return jsonify({
            "success": True,
            "total_pages": len(pages),
            "total_chunks": len(all_chunks),
            "stored_chunks": stored_chunks
        })


    except Exception as error:

        print("ERROR:", error)

        return jsonify({
            "success": False,
            "error": str(error)
        }), 500

@app.route("/search", methods=["POST"])
def search():

    data = request.get_json()

    query = data.get("query")
    filename = data.get("filename")

    if not query:
        return jsonify({
            "error": "Query is required"
        }), 400

    try:

        results = search_chunks(
        query,
        filename=filename,
        top_k=5
)

        documents = results["documents"][0]
        metadatas = results["metadatas"][0]
        distances = results["distances"][0]

        matches = []

        for i in range(len(documents)):

            matches.append({
                "text": documents[i],
                "page": metadatas[i]["page"],
                "filename": metadatas[i]["filename"],
                "distance": distances[i]
            })

        return jsonify({
            "success": True,
            "query": query,
            "matches": matches
        })

    except Exception as error:

        print("SEARCH ERROR:", error)

        return jsonify({
            "success": False,
            "error": str(error)
        }), 500

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=8000,
        debug=True
    )