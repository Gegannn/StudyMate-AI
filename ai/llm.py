from ollama import chat


def generate_answer(question, context):

    prompt = f"""
You are StudyMate AI, a personal study assistant.

Answer the student's question using ONLY the information provided
in the study material below.

If the answer cannot be found in the study material, say:
"I could not find the answer in the uploaded study material."

Explain the answer clearly and simply.

Do not use Markdown formatting.
Do not use **bold**, *italics*, headings, or special formatting.
Use normal plain text only.

Use examples when they are present in the study material.

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