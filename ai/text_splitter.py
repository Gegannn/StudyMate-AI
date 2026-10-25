def split_text(text, chunk_size=1000, overlap=200):

    chunks = []

    start = 0

    while start < len(text):

        end = start + chunk_size

        chunk = text[start:end]

        if chunk.strip():
            chunks.append(chunk.strip())

        start += chunk_size - overlap

    return chunks

if __name__ == "__main__":

    text = """
    Artificial Intelligence is the field of building
    machines that can perform tasks that normally
    require human intelligence. These tasks include
    reasoning, learning, perception and decision making.
    """

    chunks = split_text(
        text,
        chunk_size=100,
        overlap=20
    )

    for i, chunk in enumerate(chunks):

        print(f"\n--- CHUNK {i + 1} ---")
        print(chunk)