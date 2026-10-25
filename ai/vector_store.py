import chromadb
from sentence_transformers import SentenceTransformer


# Load the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


# Create a persistent Chroma database
client = chromadb.PersistentClient(
    path="./chroma_db"
)


# Create or get our collection
collection = client.get_or_create_collection(
    name="studymate_documents"
)


def add_chunks(chunks, filename):

    if not chunks:
        return 0

    documents = []
    embeddings = []
    metadatas = []
    ids = []

    for index, chunk in enumerate(chunks):

        text = chunk["text"]

        # Convert text into an embedding
        embedding = model.encode(text).tolist()

        documents.append(text)

        embeddings.append(embedding)

        metadatas.append({
            "filename": filename,
            "page": chunk["page"]
        })

        ids.append(
            f"{filename}_{index}"
        )

    collection.add(
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas,
        ids=ids
    )

    return len(documents)

def search_chunks(query, filename=None, top_k=5, max_distance=1.0):

    query_embedding = model.encode(query).tolist()

    # If a filename is provided,
    # search only inside that PDF.
    if filename:

        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where={
                "filename": filename
            }
        )

    else:

        # Search all documents
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )

    filtered_documents = []
    filtered_metadatas = []
    filtered_distances = []

    for i in range(len(results["documents"][0])):

        distance = results["distances"][0][i]

        if distance <= max_distance:

            filtered_documents.append(
                results["documents"][0][i]
            )

            filtered_metadatas.append(
                results["metadatas"][0][i]
            )

            filtered_distances.append(
                distance
            )

    results["documents"][0] = filtered_documents
    results["metadatas"][0] = filtered_metadatas
    results["distances"][0] = filtered_distances

    return results
