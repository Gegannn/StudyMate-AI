// Question Paper DNA & Historical PYQ Intelligence
export const PYQ_INTELLIGENCE = {
  aad: {
    subject: "Algorithm Analysis and Design",
    code: "B24CS3T04",
    totalPastPapersAnalyzed: 8,
    highFrequencyTopics: [
      { topic: "Master's Theorem Recurrences", frequency: 8, weight: "High", expectedMarks: "7-8 marks", repeatRate: "100%", tag: "Must Know" },
      { topic: "AVL Tree Rotations (LL, RR, LR, RL)", frequency: 7, weight: "High", expectedMarks: "7 marks", repeatRate: "88%", tag: "Must Know" },
      { topic: "Dijkstra's Single Source Shortest Path", frequency: 6, weight: "High", expectedMarks: "7 marks", repeatRate: "75%", tag: "High Yield" },
      { topic: "Matrix Chain Multiplication (DP)", frequency: 6, weight: "High", expectedMarks: "8-9 marks", repeatRate: "75%", tag: "High Yield" },
      { topic: "Floyd-Warshall All-Pairs Algorithm", frequency: 5, weight: "Medium", expectedMarks: "5-7 marks", repeatRate: "63%", tag: "High Yield" },
      { topic: "Fractional Knapsack (Greedy)", frequency: 5, weight: "Medium", expectedMarks: "7 marks", repeatRate: "63%", tag: "Should Know" },
      { topic: "Strassen's Matrix Multiplication", frequency: 4, weight: "Medium", expectedMarks: "6-7 marks", repeatRate: "50%", tag: "Should Know" },
      { topic: "Clique / Vertex Cover NP Proof", frequency: 4, weight: "Medium", expectedMarks: "7 marks", repeatRate: "50%", tag: "Should Know" },
      { topic: "Disjoint Sets Union-Find", frequency: 3, weight: "Low", expectedMarks: "3-5 marks", repeatRate: "38%", tag: "Optional" }
    ],
    dnaInsights: [
      "Master's Theorem appears in every single past examination (100% historical recurrence).",
      "Module 2 always tests either AVL insertion with balance factors or DFS edge classifications.",
      "Module 4 tests Dynamic Programming (Matrix Chain Multiplication) vs Backtracking (N-Queens) in the choice question."
    ]
  },

  cd: {
    subject: "Compiler Design",
    code: "B24CS3T03",
    totalPastPapersAnalyzed: 7,
    highFrequencyTopics: [
      { topic: "FIRST and FOLLOW Set Computation", frequency: 7, weight: "High", expectedMarks: "6-8 marks", repeatRate: "100%", tag: "Must Know" },
      { topic: "LL(1) Predictive Parsing Table", frequency: 7, weight: "High", expectedMarks: "8 marks", repeatRate: "100%", tag: "Must Know" },
      { topic: "SLR(1) Parsing & LR(0) Items", frequency: 6, weight: "High", expectedMarks: "8 marks", repeatRate: "86%", tag: "Must Know" },
      { topic: "Phases of Compiler Architecture", frequency: 6, weight: "High", expectedMarks: "8 marks", repeatRate: "86%", tag: "High Yield" },
      { topic: "S-Attributed vs L-Attributed SDD", frequency: 5, weight: "Medium", expectedMarks: "6-8 marks", repeatRate: "71%", tag: "High Yield" },
      { topic: "Input Buffering (Buffer Pairs & Sentinels)", frequency: 4, weight: "Medium", expectedMarks: "3-6 marks", repeatRate: "57%", tag: "Should Know" },
      { topic: "Three-Address Code Quadruples/Triples", frequency: 4, weight: "Medium", expectedMarks: "6 marks", repeatRate: "57%", tag: "Should Know" },
      { topic: "Local Value Numbering (LVN)", frequency: 3, weight: "Low", expectedMarks: "3 marks", repeatRate: "43%", tag: "Optional" }
    ],
    dnaInsights: [
      "Eliminating left recursion and constructing LL(1) parse table is guaranteed in Module 2.",
      "Comparing SLR, CLR, and LALR parsers has appeared 5 out of 7 exam cycles.",
      "Phases of compiler is the top-scoring 8-mark starter question in Part B."
    ]
  },

  cn: {
    subject: "Computer Networks",
    code: "B24CS2T03",
    totalPastPapersAnalyzed: 8,
    highFrequencyTopics: [
      { topic: "TCP 3-Way Handshake & Flow Control", frequency: 8, weight: "High", expectedMarks: "8 marks", repeatRate: "100%", tag: "Must Know" },
      { topic: "IPv4 Subnetting & CIDR Numericals", frequency: 7, weight: "High", expectedMarks: "7-8 marks", repeatRate: "88%", tag: "Must Know" },
      { topic: "CRC Error Detection Polynomial Division", frequency: 7, weight: "High", expectedMarks: "7 marks", repeatRate: "88%", tag: "Must Know" },
      { topic: "Dijkstra Link State vs Distance Vector", frequency: 6, weight: "High", expectedMarks: "7 marks", repeatRate: "75%", tag: "High Yield" },
      { topic: "Go-Back-N vs Selective Repeat ARQ", frequency: 6, weight: "High", expectedMarks: "6-7 marks", repeatRate: "75%", tag: "High Yield" },
      { topic: "CSMA/CD Flow Chart & Mechanics", frequency: 5, weight: "Medium", expectedMarks: "7 marks", repeatRate: "63%", tag: "Should Know" },
      { topic: "DNS Resolution (Recursive vs Iterative)", frequency: 5, weight: "Medium", expectedMarks: "6-7 marks", repeatRate: "63%", tag: "Should Know" },
      { topic: "RSA Public Key Numerical Example", frequency: 4, weight: "Medium", expectedMarks: "7 marks", repeatRate: "50%", tag: "Should Know" }
    ],
    dnaInsights: [
      "Subnetting numericals carry guaranteed 8 marks in Module 2.",
      "CRC polynomial division numerical appears with almost 90% recurrence in Part B.",
      "TCP congestion control phases (Slow Start to Congestion Avoidance) is the #1 Transport question."
    ]
  },

  bdp: {
    subject: "Big Data Processing",
    code: "B24AM3T01",
    totalPastPapersAnalyzed: 6,
    highFrequencyTopics: [
      { topic: "Hadoop Ecosystem Core Architecture", frequency: 6, weight: "High", expectedMarks: "12 marks", repeatRate: "100%", tag: "Must Know" },
      { topic: "HDFS Architecture & Block Storage", frequency: 6, weight: "High", expectedMarks: "8 marks", repeatRate: "100%", tag: "Must Know" },
      { topic: "MapReduce Execution Pipeline (Word Count)", frequency: 5, weight: "High", expectedMarks: "8 marks", repeatRate: "83%", tag: "High Yield" },
      { topic: "HDFS Anatomy of File Read and Write", frequency: 5, weight: "High", expectedMarks: "8 marks", repeatRate: "83%", tag: "High Yield" },
      { topic: "Spark RDD Transformations vs Actions", frequency: 4, weight: "Medium", expectedMarks: "6-8 marks", repeatRate: "67%", tag: "Should Know" },
      { topic: "Big Data 5Vs Characteristics", frequency: 4, weight: "Medium", expectedMarks: "3 marks", repeatRate: "67%", tag: "Should Know" },
      { topic: "Hive Architecture & Partitioning", frequency: 4, weight: "Medium", expectedMarks: "6-8 marks", repeatRate: "67%", tag: "Should Know" }
    ],
    dnaInsights: [
      "Draw the Hadoop Ecosystem diagram clearly with NameNode, DataNodes, YARN, and MapReduce.",
      "Anatomy of HDFS File Read and Write is the most repeatedly asked descriptive architecture question."
    ]
  },

  da: {
    subject: "Data Analytics",
    code: "B24CD3T01",
    totalPastPapersAnalyzed: 6,
    highFrequencyTopics: [
      { topic: "Data Analytics Life Cycle Stages", frequency: 6, weight: "High", expectedMarks: "8 marks", repeatRate: "100%", tag: "Must Know" },
      { topic: "Apriori Algorithm (Support & Confidence)", frequency: 5, weight: "High", expectedMarks: "6-8 marks", repeatRate: "83%", tag: "Must Know" },
      { topic: "Backpropagation Neural Network Derivation", frequency: 5, weight: "High", expectedMarks: "8 marks", repeatRate: "83%", tag: "High Yield" },
      { topic: "K-Means Clustering vs Hierarchical", frequency: 5, weight: "High", expectedMarks: "6-8 marks", repeatRate: "83%", tag: "High Yield" },
      { topic: "TF-IDF Vector Space Model", frequency: 4, weight: "Medium", expectedMarks: "6-8 marks", repeatRate: "67%", tag: "Should Know" },
      { topic: "Central Tendency & IQR Outliers", frequency: 4, weight: "Medium", expectedMarks: "3-8 marks", repeatRate: "67%", tag: "Should Know" }
    ],
    dnaInsights: [
      "Life cycle stages (Discovery, Preparation, Model Planning, Execution) is tested in 100% of papers.",
      "Backpropagation algorithm weight updates and activation functions (ReLU, Sigmoid, Tanh) are high-yield."
    ]
  }
};
