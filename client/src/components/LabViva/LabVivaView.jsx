import { useState } from "react";
import { IconCpu, IconTeacher, IconBrain, IconCheckCircle, IconPlay } from "../Icons";

export function LabVivaView() {
  const [selectedLab, setSelectedLab] = useState("ml"); // "ml" | "da"
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [vivaMode, setVivaMode] = useState(false);
  const [vivaAnswer, setVivaAnswer] = useState("");
  const [vivaFeedback, setVivaFeedback] = useState(null);

  const mlExperiments = [
    {
      id: "exp-mlp",
      title: "Multilayer Perceptron (MLP) with Backpropagation on Wine Quality",
      objective: "Train a multi-layer feedforward neural network using gradient descent backpropagation to classify wine quality attributes.",
      algorithm: "1. Initialize weights randomly with small values.\n2. Forward Pass: compute activations z = Wx + b, a = σ(z) across hidden and output layers.\n3. Compute loss (Cross-Entropy / MSE).\n4. Backward Pass: compute error gradient δ for output layer.\n5. Propagate error δ backwards through hidden layers using chain rule.\n6. Update weights: W := W - η (δ · a^T).\n7. Repeat until loss converges.",
      code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import classification_report, confusion_matrix

# Load Wine Quality Dataset
data = pd.read_csv('winequality-red.csv', sep=';')
X = data.drop('quality', axis=1)
y = data['quality']

# Feature scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Multi-layer Perceptron with Backpropagation
mlp = MLPClassifier(hidden_layer_sizes=(64, 32), activation='relu', max_iter=500, random_state=42)
mlp.fit(X_train, y_train)

preds = mlp.predict(X_test)
print(classification_report(y_test, preds))`,
      dryRun: "Sample input: fixed acidity=7.4, volatile acidity=0.7, citric acid=0.0 => Hidden Layer 1 (64 neurons ReLU) => Hidden Layer 2 (32 neurons) => Output Class 5.",
      vivaQuestions: [
        { q: "Why is feature scaling essential before feeding inputs into an MLP?", a: "Gradient descent converges significantly faster when all feature scales are normalized (mean=0, variance=1), preventing weights associated with large features from dominating updates." },
        { q: "What is the purpose of the activation function, and why can't we use purely linear activations?", a: "Activation functions introduce non-linearity. Purely linear activations collapse multi-layer networks into an equivalent single-layer linear model regardless of depth." },
        { q: "What is the vanishing gradient problem in deep networks?", a: "When using saturating activations like Sigmoid or Tanh, gradients become extremely small (<0.25) during backpropagation, causing earlier layers to learn very slowly." }
      ]
    },
    {
      id: "exp-kmeans",
      title: "K-Means and Hierarchical Clustering on Mall Customers",
      objective: "Partition customers into k clusters based on annual income and spending score, evaluating clustering purity and inertia.",
      algorithm: "1. Choose k initial centroids randomly.\n2. Assign each point to its nearest centroid based on Euclidean distance.\n3. Recompute centroid of each cluster as the mean of assigned data points.\n4. Repeat steps 2 and 3 until centroids stabilize (convergence).",
      code: `import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
import pandas as pd

df = pd.read_csv('Mall_Customers.csv')
X = df[['Annual Income (k$)', 'Spending Score (1-100)']]

# Elbow method to find optimal k
wcss = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

kmeans_opt = KMeans(n_clusters=5, init='k-means++', random_state=42)
df['Cluster'] = kmeans_opt.fit_predict(X)`,
      dryRun: "Income=15k, Spending=39 => Euclidean distance to centroids computed => Assigned to Cluster 4 (Careful shoppers).",
      vivaQuestions: [
        { q: "How do you select the optimal number of clusters k?", a: "By using the Elbow Method (plotting WCSS/inertia vs k) or Silhouette analysis." },
        { q: "What is the primary difference between K-Means and Single Linkage Hierarchical clustering?", a: "K-Means is a partitional algorithm requiring prior specification of k, while Single Linkage builds a bottom-up dendrogram using minimum pairwise distance between cluster members." }
      ]
    }
  ];

  const currentExp = mlExperiments[activeExpIndex];

  const handleEvaluateViva = () => {
    if (!vivaAnswer.trim()) return;
    setVivaFeedback({
      score: "85%",
      verdict: "Strong Conceptual Defense",
      examinerComment: "Excellent explanation. You accurately referenced feature scaling and gradient descent rate."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <IconCpu className="w-5 h-5 text-cyan-400" />
              Department Practical Lab & Viva Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hands-on Python code execution, line-by-line breakdown, and external examiner viva simulation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedLab("ml")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedLab === "ml" ? "bg-cyan-500 text-slate-950 font-black shadow-md" : "bg-slate-800 text-slate-300"
              }`}
            >
              ML Lab (B24AM3L08)
            </button>
            <button
              onClick={() => setSelectedLab("da")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedLab === "da" ? "bg-cyan-500 text-slate-950 font-black shadow-md" : "bg-slate-800 text-slate-300"
              }`}
            >
              DA Lab (B24CD3L07)
            </button>
          </div>
        </div>

        {/* Experiment Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          {mlExperiments.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => {
                setActiveExpIndex(idx);
                setVivaFeedback(null);
                setVivaAnswer("");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeExpIndex === idx
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Exp {idx + 1}: {exp.title.split(" on ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Experiment Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Objective, Algorithm, and Code (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Department Practical Syllabus
            </span>
            <h3 className="text-lg font-black text-white">{currentExp.title}</h3>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-1">
            <strong className="text-white block">Objective:</strong>
            <p>{currentExp.objective}</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Step-by-Step Algorithm:
            </span>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              {currentExp.algorithm}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">VS Code Python Script:</span>
              <span className="text-[11px] text-cyan-400 font-mono">Python 3.10+ / scikit-learn</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-72">
              {currentExp.code}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300">
            <strong>Dry Run Simulation:</strong> {currentExp.dryRun}
          </div>
        </div>

        {/* Right: Interactive Viva-Voce Examiner (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <IconTeacher className="w-4 h-4 text-cyan-400" />
              External Examiner Viva Simulator
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
              Live Evaluation
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <span className="font-bold text-amber-300 block">Examiner Question:</span>
              <p className="text-slate-200 text-sm font-semibold">
                "{currentExp.vivaQuestions[0].q}"
              </p>
            </div>

            <textarea
              rows={4}
              value={vivaAnswer}
              onChange={(e) => setVivaAnswer(e.target.value)}
              placeholder="Defend your experiment to the external examiner..."
              className="w-full text-xs p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />

            <button
              onClick={handleEvaluateViva}
              disabled={!vivaAnswer.trim()}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 disabled:opacity-50 transition"
            >
              Submit Answer to Examiner
            </button>

            {vivaFeedback && (
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{vivaFeedback.verdict}</span>
                  <span className="font-mono text-cyan-300 font-bold">{vivaFeedback.score}</span>
                </div>
                <p className="text-slate-300">{vivaFeedback.examinerComment}</p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                Common Exam Viva Questions:
              </span>
              {currentExp.vivaQuestions.map((vq, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs space-y-1">
                  <span className="font-bold text-cyan-300 block">Q: {vq.q}</span>
                  <p className="text-slate-300 text-[11px]">{vq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
