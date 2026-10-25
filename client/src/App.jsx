import { useState } from "react";

function App() {

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [documentInfo, setDocumentInfo] = useState(null);

  const [selectedFilename, setSelectedFilename] = useState("");
  const [question, setQuestion] = useState("");
  const [searching, setSearching] = useState(false);
  const [matches, setMatches] = useState([]);

  const handleUpload = async (event) => {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setMessage("Please select a PDF file.");
      return;
    }

    const formData = new FormData();

    formData.append("pdf", file);

    try {

      setUploading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/documents/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      setMessage(data.message);

      if (data.total_pages && data.total_chunks) {

        setDocumentInfo({
            totalPages: data.total_pages,
            totalChunks: data.total_chunks
        });

        setSelectedFilename(file.name);
      }

    } catch (error) {

      console.error(error);

      setMessage("Upload failed.");

    } finally {

      setUploading(false);

    }
  };

  const handleSearch = async () => {

  if (!question.trim()) {
    return;
  }

  if (!selectedFilename) {
    setMessage("Please upload a PDF first.");
    return;
  }

  try {

    setSearching(true);
    setMatches([]);
    setMessage("");

    const response = await fetch(
      "http://127.0.0.1:8000/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: question,
          filename: selectedFilename
        })
      }
    );

    const data = await response.json();

    if (!data.success) {
      setMessage("Search failed.");
      return;
    }

    setMatches(data.matches);

    if (data.matches.length === 0) {
      setMessage("No relevant information found in this document.");
    }

  } catch (error) {

    console.error(error);

    setMessage("Could not connect to StudyMate AI.");

  } finally {

    setSearching(false);

  }
};


  return (

    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <header className="bg-white border-b px-6 py-4">

        <h1 className="text-2xl font-bold">
          StudyMate AI
        </h1>

        <p className="text-gray-500 text-sm">
          Your personal AI study assistant
        </p>

      </header>


      <div className="flex">


        {/* Sidebar */}

        <aside className="w-64 min-h-[calc(100vh-81px)] bg-white border-r p-5">

          <h2 className="font-semibold mb-4">
            My Documents
          </h2>


          {/* Hidden file input */}

          <input
            type="file"
            accept="application/pdf"
            id="pdf-upload"
            onChange={handleUpload}
            className="hidden"
          />


          {/* Upload button */}

          <label
            htmlFor="pdf-upload"
            className="block text-center cursor-pointer bg-black text-white py-2 rounded-lg"
          >
            {uploading ? "Uploading..." : "+ Upload PDF"}
          </label>


          {/* Upload message */}

          {message && (
            <p className="text-sm mt-4 text-gray-600">
              {message}
            </p>
          )}
          {documentInfo && (
            <div className="mt-5 p-4 bg-gray-100 rounded-lg">

                <p className="font-semibold">
                    Document processed
                </p>

                <p className="text-sm text-gray-600 mt-2">
                    Pages: {documentInfo.totalPages}
                </p>

                <p className="text-sm text-gray-600">
                    Chunks: {documentInfo.totalChunks}
                </p>

            </div>
          )}

        </aside>


        {/* Main content */}

        <main className="flex-1 p-10">

          <div className="max-w-3xl mx-auto">

            <h2 className="text-3xl font-bold mb-2">
              What do you want to learn?
            </h2>

            <p className="text-gray-500 mb-8">
              Upload your study material and ask StudyMate anything.
            </p>


            {/* Chat box */}

            <div className="bg-white rounded-xl border p-4">

              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask something about your study material..."
                className="w-full h-32 resize-none outline-none"
              />

              <div className="flex justify-end">

                <button
                  onClick={handleSearch}
                  disabled={searching}
                  className="bg-black text-white px-5 py-2 rounded-lg"
                >
                  {searching ? "Searching..." : "Ask StudyMate"}
                </button>

              </div>

            </div>

                        {/* Retrieved chunks */}

            {matches.length > 0 && (

              <div className="mt-6 space-y-4">

                <h3 className="font-semibold text-lg">
                  Relevant information
                </h3>

                {matches.map((match, index) => (

                  <div
                    key={index}
                    className="bg-white border rounded-xl p-4"
                  >

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-semibold">
                        Page {match.page}
                      </span>

                      <span className="text-xs text-gray-500">
                        Distance: {match.distance.toFixed(3)}
                      </span>

                    </div>

                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {match.text}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </main>

      </div>

    </div>

  );
}

export default App;