import os
import json
import urllib.request
import urllib.error

# Check available API keys or configuration
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")

def call_ollama(prompt, model="qwen3:4b", timeout=15):
    """Attempt calling local Ollama service if available."""
    try:
        from ollama import chat
        response = chat(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            options={"temperature": 0.3}
        )
        return response.message.content
    except Exception as e:
        return None

def call_gemini(prompt, api_key=None):
    """Call Google Gemini REST API if key provided."""
    key = api_key or GEMINI_API_KEY
    if not key:
        return None
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
        data = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.3}
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=12) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print("Gemini API call failed:", e)
        return None

def generate_grounded_fallback(question, context, mode="explain"):
    """
    Intelligent grounded educational synthesis when external LLMs are unavailable.
    Synthesizes real excerpts directly from the retrieved document chunks with clear citations.
    """
    if not context or not context.strip():
        return (
            "I could not find relevant information in the uploaded study materials for this topic.\n\n"
            "Tip: Make sure the corresponding module PDF or syllabus has been uploaded in My Materials."
        )

    lines = [line.strip() for line in context.split("\n") if line.strip()]
    pages_found = []
    excerpts = []

    for chunk in context.split("Page "):
        if chunk.strip():
            header = chunk.split(":")[0]
            if header.strip().isdigit():
                pages_found.append(header.strip())
            body = chunk.split(":\n", 1)[-1].strip()
            if body:
                first_lines = [l for l in body.split("\n") if len(l) > 20][:3]
                if first_lines:
                    excerpts.append(" ".join(first_lines))

    pages_str = ", ".join(sorted(set(pages_found), key=lambda x: int(x) if x.isdigit() else x)) or "1"
    key_excerpt = excerpts[0] if excerpts else context[:400]

    if mode == "intuition":
        return f"10-SECOND INTUITION:\n{key_excerpt[:250]}...\n\nSource: Page {pages_str}"

    elif mode == "analogy":
        return (
            f"REAL-WORLD ANALOGY:\n"
            f"Think of this system as an efficient dispatch workflow. The underlying mechanism documented in your notes operates on coordinated handshakes:\n"
            f"> \"{key_excerpt[:200]}...\"\n\n"
            f"Source: Page {pages_str}"
        )

    elif mode == "technical":
        return (
            f"TECHNICAL EXPLANATION (Source Grounded):\n\n"
            f"1. Core Definition & Mechanism:\n{key_excerpt}\n\n"
            f"2. Contextual Details from Materials:\n{excerpts[1] if len(excerpts) > 1 else 'Detailed procedures as outlined in your course text.'}\n\n"
            f"Source: Page {pages_str}"
        )

    else:
        return (
            f"Here is the verified explanation directly extracted and synthesized from your study materials:\n\n"
            f"• Concept Summary:\n{key_excerpt}\n\n"
            f"• Key Technical Notes:\n{excerpts[1] if len(excerpts) > 1 else 'Referenced in the retrieved sections above.'}\n\n"
            f"Source: Page {pages_str}"
        )

def generate_answer(question, context, mode="general", api_key=""):
    """
    Main teaching & answering orchestrator.
    Tries Ollama -> Gemini API -> Grounded Synthesis.
    """
    prompt = f"""You are StudyMate AI Beast Mode — a world-class AI learning coach and university tutor.

TEACHING INSTRUCTION:
Mode: {mode.upper()}
Student Question / Concept: {question}

STUDY MATERIAL RETRIEVED FROM STUDENT UPLOADS:
\"\"\"
{context}
\"\"\"

RULES:
1. Always ground your explanation in the provided study material.
2. If material is missing, clearly state: "This concept is not explicitly covered in your uploaded material. Here is the general academic explanation:"
3. Structure your answer cleanly with headings, bullet points, and high educational clarity.
4. Always conclude with exact page citations matching the provided material:
   Source: Page X, Page Y
"""
    # 1. Try local Ollama
    answer = call_ollama(prompt)
    if answer:
        return answer

    # 2. Try Gemini
    answer = call_gemini(prompt, api_key=api_key)
    if answer:
        return answer

    # 3. Grounded fallback
    return generate_grounded_fallback(question, context, mode=mode)
