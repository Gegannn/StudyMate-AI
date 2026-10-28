from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

from llm import generate_answer
from pdf_reader import extract_text
from text_splitter import split_text
from vector_store import add_chunks, search_chunks, collection

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    try:
        doc_count = collection.count()
    except Exception:
        doc_count = 0
    return jsonify({
        "status": "online",
        "service": "StudyMate AI Python Brain",
        "indexed_chunks": doc_count,
        "capabilities": [
            "pdf_extraction",
            "semantic_vector_search",
            "rag_qa",
            "multi_layer_teaching",
            "active_recall",
            "feynman_eval"
        ]
    })

@app.route("/extract", methods=["POST"])
def extract():
    data = request.get_json() or {}
    pdf_path = data.get("pdf_path")
    filename = data.get("filename", "unknown.pdf")

    if not pdf_path:
        return jsonify({"error": "PDF path is required"}), 400

    if not os.path.exists(pdf_path):
        return jsonify({"error": f"File not found: {pdf_path}"}), 404

    try:
        pages = extract_text(pdf_path)
        all_chunks = []

        for page in pages:
            chunks = split_text(page["text"], chunk_size=1000, overlap=200)
            for chunk in chunks:
                all_chunks.append({
                    "page": page["page"],
                    "text": chunk
                })

        stored_chunks = add_chunks(all_chunks, filename)

        return jsonify({
            "success": True,
            "filename": filename,
            "total_pages": len(pages),
            "total_chunks": len(all_chunks),
            "stored_chunks": stored_chunks
        })
    except Exception as error:
        print("EXTRACTION ERROR:", error)
        return jsonify({"success": False, "error": str(error)}), 500

@app.route("/search", methods=["POST"])
def search():
    data = request.get_json() or {}
    query = data.get("query")
    filename = data.get("filename")
    mode = data.get("mode", "general")
    api_key = data.get("api_key", "")

    if not query:
        return jsonify({"error": "Query is required"}), 400

    try:
        results = search_chunks(query, filename=filename, top_k=5)
        documents = results["documents"][0] if results.get("documents") else []
        metadatas = results["metadatas"][0] if results.get("metadatas") else []
        distances = results["distances"][0] if results.get("distances") else []

        matches = []
        for i in range(len(documents)):
            matches.append({
                "text": documents[i],
                "page": metadatas[i].get("page", 1),
                "filename": metadatas[i].get("filename", "unknown"),
                "distance": float(distances[i]) if i < len(distances) else 0.0
            })

        context_parts = []
        for match in matches:
            context_parts.append(f"Page {match['page']} ({match['filename']}):\n{match['text']}")

        context = "\n\n".join(context_parts)

        answer = generate_answer(query, context, mode=mode, api_key=api_key)

        return jsonify({
            "success": True,
            "query": query,
            "mode": mode,
            "answer": answer,
            "matches": matches,
            "total_matches": len(matches)
        })
    except Exception as error:
        print("SEARCH ERROR:", error)
        return jsonify({"success": False, "error": str(error)}), 500

@app.route("/teach", methods=["POST"])
def teach():
    """
    Dedicated endpoint for Companion teaching engine.
    Accepts topic, subject, module, layer/mode, and student level.
    """
    data = request.get_json() or {}
    topic = data.get("topic", "")
    subject = data.get("subject", "")
    module = data.get("module", "")
    layer = data.get("layer", "intuition")  # intuition, analogy, technical, story, confused, quiz
    filename = data.get("filename")
    api_key = data.get("api_key", "")

    if not topic:
        return jsonify({"error": "Topic is required"}), 400

    query = f"{subject} {topic} {module}".strip()

    try:
        results = search_chunks(query, filename=filename, top_k=5)
        documents = results["documents"][0] if results.get("documents") else []
        metadatas = results["metadatas"][0] if results.get("metadatas") else []
        distances = results["distances"][0] if results.get("distances") else []

        matches = []
        for i in range(len(documents)):
            matches.append({
                "text": documents[i],
                "page": metadatas[i].get("page", 1),
                "filename": metadatas[i].get("filename", "unknown"),
                "distance": float(distances[i]) if i < len(distances) else 0.0
            })

        context = "\n\n".join([f"Page {m['page']} ({m['filename']}):\n{m['text']}" for m in matches])
        answer = generate_answer(f"Teach topic '{topic}' in mode '{layer}'", context, mode=layer, api_key=api_key)

        return jsonify({
            "success": True,
            "topic": topic,
            "layer": layer,
            "answer": answer,
            "matches": matches
        })
    except Exception as error:
        return jsonify({"success": False, "error": str(error)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=False)
