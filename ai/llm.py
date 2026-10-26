from ollama import chat


def generate_answer(question, context):

    prompt = f"""
You are StudyMate AI, a personal study assistant.

Answer the student's question using ONLY the provided study material.

Important rules:

1. Do not use information that is not present in the study material.
2. If the answer cannot be found in the study material, say:
   "I could not find the answer in the uploaded study material."
3. Explain the answer clearly and simply.
4. Do not use Markdown formatting.
5. Do not use **bold**, *italics*, headings, or special formatting.
6. At the end of the answer, mention the page numbers that contain the information.
7. Use this format for the source:
   Source: Page X, Page Y
8. Only mention pages that actually contain information used in your answer.

STUDY MATERIAL:
{context}

STUDENT QUESTION:
{question}
"""

    response = chat(
        model="qwen3:4b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.message.content