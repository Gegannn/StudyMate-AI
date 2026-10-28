// Formula Lab: Complete repository of academic formulas across all subjects
export const FORMULAS_DATA = [
  {
    id: "f-master",
    subject: "aad",
    name: "Master's Theorem Recurrence",
    latex: "T(n) = aT(n/b) + f(n)",
    meaning: "Determines asymptotic bounds for divide-and-conquer recurrence relations.",
    variables: [
      { sym: "a", desc: "Number of recursive subproblems (a >= 1)" },
      { sym: "b", desc: "Factor by which input size is divided (b > 1)" },
      { sym: "f(n)", desc: "Cost of work done outside recursive calls (divide & combine)" }
    ],
    units: "Operations / Time Complexity",
    whenToUse: "Divide-and-conquer recurrences with equal-sized subproblems. Cannot be used if subproblems have different sizes or non-polynomial f(n).",
    commonMistakes: "Applying Master Theorem when a < 1 or when f(n) is not polynomially bounded compared to n^(log_b a).",
    memoryTrick: "Compare f(n) with n^(log_b a): Smaller = Case 1; Equal = Case 2; Larger = Case 3.",
    practice: {
      problem: "Solve recurrence: T(n) = 4T(n/2) + n^2",
      hint: "Calculate log_2(4) = 2. Then compare n^2 with n^2.",
      solution: "Here a=4, b=2, log_b(a) = 2. f(n) = n^2 = Θ(n^2). This fits Case 2 (k=0), yielding T(n) = Θ(n^2 log n)."
    }
  },
  {
    id: "f-avl",
    subject: "aad",
    name: "AVL Balance Factor Invariant",
    latex: "BF(v) = Height(LeftSubtree) - Height(RightSubtree) \\in \\{-1, 0, +1\\}",
    meaning: "Ensures binary search tree stays logarithmic in height.",
    variables: [
      { sym: "BF(v)", desc: "Balance factor of node v" },
      { sym: "Height(L)", desc: "Height of left child node" },
      { sym: "Height(R)", desc: "Height of right child node" }
    ],
    units: "Integer height delta",
    whenToUse: "After every binary tree insertion and deletion. If BF reaches +2 or -2, perform LL, RR, LR, or RL rotation.",
    commonMistakes: "Confusing LR rotation with RL rotation. LR requires Left rotation on child, then Right on parent.",
    memoryTrick: "LL = Single Right; RR = Single Left; LR = Double (Left then Right).",
    practice: {
      problem: "Given node with Left height 3 and Right height 1, what is the balance factor and what action is required?",
      hint: "BF = 3 - 1 = +2.",
      solution: "BF = +2 (Unbalanced!). Requires a Right rotation (or LR if the left child is right-heavy) to restore |BF| <= 1."
    }
  },
  {
    id: "f-strassen",
    subject: "aad",
    name: "Strassen's Matrix Multiplication Complexity",
    latex: "T(n) = 7T(n/2) + \\Theta(n^2) \\implies T(n) = \\Theta(n^{\\log_2 7}) \\approx \\Theta(n^{2.807})",
    meaning: "Multiplies two n×n matrices using 7 recursive multiplications instead of 8 standard ones.",
    variables: [
      { sym: "n", desc: "Dimension of n×n square matrix" },
      { sym: "7", desc: "Subproblem multiplications (P1 to P7)" }
    ],
    units: "Operations",
    whenToUse: "Large matrix multiplications where reducing multiplications from 8 to 7 offsets addition overhead.",
    commonMistakes: "Forgetting that Strassen's algorithm introduces 18 matrix additions/subtractions.",
    memoryTrick: "Seven subproblems: 2^2.807 beats cubic 2^3.",
    practice: {
      problem: "How many scalar multiplications are saved for an 8×8 matrix using 1 level of Strassen vs naive?",
      hint: "Naive uses 8^3 = 512 multiplications.",
      solution: "Naive uses 8^3 = 512. Strassen uses 7^3 = 343 multiplications, saving 169 multiplications."
    }
  },
  {
    id: "f-tfidf",
    subject: "da",
    name: "TF-IDF Weighting",
    latex: "TF\\text{-}IDF(t, d, D) = TF(t, d) \\times \\log\\left(\\frac{N}{DF(t)}\\right)",
    meaning: "Measures importance of a term in a document relative to an entire corpus.",
    variables: [
      { sym: "TF(t, d)", desc: "Term frequency: count of term t in document d" },
      { sym: "N", desc: "Total number of documents in corpus D" },
      { sym: "DF(t)", desc: "Document frequency: count of documents containing term t" }
    ],
    units: "Relevance score",
    whenToUse: "Text feature extraction, search engine rankings, information retrieval vector space models.",
    commonMistakes: "Taking log(N/DF) without smoothing when DF=0, causing division by zero.",
    memoryTrick: "Frequent in this doc (TF high) + Rare in other docs (IDF high) = Golden keyword!",
    practice: {
      problem: "A corpus has 10,000 documents. Word 'algorithm' appears 5 times in doc A, and exists in 100 documents. Find TF-IDF.",
      hint: "IDF = log10(10000 / 100) = log10(100) = 2.",
      solution: "TF = 5. IDF = log10(10000/100) = 2. TF-IDF = 5 * 2 = 10."
    }
  },
  {
    id: "f-iqr",
    subject: "da",
    name: "Interquartile Range & Outlier Detection",
    latex: "IQR = Q_3 - Q_1, \\quad \\text{Outliers} < Q_1 - 1.5 \\times IQR \\text{ or } > Q_3 + 1.5 \\times IQR",
    meaning: "Statistical dispersion measure robust against extreme outliers.",
    variables: [
      { sym: "Q1", desc: "25th percentile (first quartile)" },
      { sym: "Q3", desc: "75th percentile (third quartile)" },
      { sym: "IQR", desc: "Middle 50% spread of dataset" }
    ],
    units: "Same units as data attribute",
    whenToUse: "Data cleaning, boxplot construction, and automated anomaly detection.",
    commonMistakes: "Using 1.5 * mean instead of 1.5 * IQR.",
    memoryTrick: "Tuckey Fences: Q1 minus 1.5*IQR (floor), Q3 plus 1.5*IQR (ceiling).",
    practice: {
      problem: "Given Q1 = 20, Q3 = 40. Is a data value of 75 an outlier?",
      hint: "Compute IQR = 40 - 20 = 20. Upper fence = 40 + 1.5 * 20.",
      solution: "IQR = 20. Upper bound = 40 + 1.5(20) = 70. Since 75 > 70, it is a confirmed statistical outlier."
    }
  },
  {
    id: "f-crc",
    subject: "cn",
    name: "Cyclic Redundancy Check (CRC)",
    latex: "T(x) = D(x) \\cdot 2^r + R(x), \\quad R(x) = (D(x) \\cdot 2^r) \\pmod{G(x)}",
    meaning: "Hardware-friendly polynomial division for detecting transmission bit errors.",
    variables: [
      { sym: "D(x)", desc: "Original data bitstream" },
      { sym: "r", desc: "Degree of generator polynomial G(x)" },
      { sym: "R(x)", desc: "r-bit CRC remainder appended to payload" }
    ],
    units: "Bits / Checksum",
    whenToUse: "Data Link Layer framing (Ethernet, Wi-Fi) error detection.",
    commonMistakes: "Using normal binary subtraction instead of XOR (modulo-2 division).",
    memoryTrick: "Append r zeros, divide by generator using XOR, replace zeros with remainder.",
    practice: {
      problem: "Data = 100100, Generator G(x) = 1101 (r=3). What is the transmitted codeword?",
      hint: "Append 000: 100100000. Perform modulo-2 division by 1101.",
      solution: "Modulo-2 division gives remainder 001. Transmitted frame = 100100001."
    }
  },
  {
    id: "f-slidingwin",
    subject: "cn",
    name: "Sliding Window Maximum Channel Utilization",
    latex: "U = \\frac{W}{1 + 2a}, \\quad a = \\frac{T_{prop}}{T_{trans}} = \\frac{\\text{Distance}/v}{\\text{Size}/\\text{Bandwidth}}",
    meaning: "Determines pipe utilization under propagation delay and window size W.",
    variables: [
      { sym: "W", desc: "Sender window size in packets" },
      { sym: "a", desc: "Ratio of propagation delay to transmission delay" },
      { sym: "Tprop", desc: "One-way latency through physical medium" },
      { sym: "Ttrans", desc: "Packet transmission time L/B" }
    ],
    units: "Ratio / Percentage",
    whenToUse: "Sizing TCP socket buffers and Go-Back-N / Selective Repeat window sizes.",
    commonMistakes: "Using RTT instead of 2 * Tprop (Round Trip Time is already 2*Tprop).",
    memoryTrick: "W must be at least 1 + 2a to achieve 100% link utilization.",
    practice: {
      problem: "If a = 4, what window size W is required to get 100% throughput?",
      hint: "Set U = 1 => W = 1 + 2a.",
      solution: "W = 1 + 2(4) = 9 packets required to saturate the link."
    }
  }
];
