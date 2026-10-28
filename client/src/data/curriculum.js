// Master Curriculum & Timetable Data strictly matching KTU/MACE AIML S5 & S3
export const SUBJECTS = {
  da: {
    id: "da",
    code: "B24CD3T01",
    name: "Data Analytics",
    slot: "S5 Slot A",
    date: "2026-11-10",
    day: "Tuesday",
    time: "09:30 AM – 12:30 PM",
    color: "#06b6d4",
    hex: "#06b6d4",
    difficulty: "Moderate-High",
    credits: 4,
    hours: 45,
    modules: [
      {
        num: 1,
        title: "Introduction to Data Analytics",
        hours: 6,
        topics: [
          "Analytics process model & analytical model requirements",
          "Overview of the Data Analytics Life Cycle",
          "Association of two variables: discrete, ordinal, and continuous variables",
          "Probability calculus and probability distributions",
          "Basics of hypothesis testing",
          "Proximity measures: data objects, attribute types, dissimilarity and similarity measures",
          "Uncomputability – Halting problem"
        ],
        pyqs: [
          "Define the data analytics life cycle. List any two key stages. (3 marks)",
          "Distinguish between discrete, ordinal, and continuous variables with examples. (3 marks)",
          "Explain proximity measures: similarity and dissimilarity. (6 marks)",
          "Explain the analytics process model and its components. (8 marks)"
        ]
      },
      {
        num: 2,
        title: "Statistical Foundations and Data Preprocessing",
        hours: 10,
        topics: [
          "Summarizing the Distribution of Two Discrete Variables",
          "Contingency Tables for Discrete Data",
          "Joint, Marginal and Conditional Frequency Distributions",
          "Measures of central tendency & dispersion: Mean, Median, Range, Quartiles, Variance, Standard Deviation, IQR",
          "Data Preprocessing: Cleaning, Integration, Reduction",
          "Overview of data analytics tools and environments (R, Python, notebooks, spreadsheets)"
        ],
        pyqs: [
          "What is a contingency table? Give an example. (3 marks)",
          "Explain IQR (Interquartile Range). How is it computed? (3 marks)",
          "Explain data cleaning, data integration, and data reduction with examples. (8 marks)",
          "Describe measures of central tendency and dispersion. (8 marks)"
        ]
      },
      {
        num: 3,
        title: "Frequent Pattern Mining & Clustering",
        hours: 10,
        topics: [
          "Mining Frequent Patterns - Discretization, Transformation, Associations, Correlations",
          "Apriori Algorithm (Apriori principle, candidate generation, pruning)",
          "Classification: General approach, Attribute selection measures",
          "Naïve Bayesian Classification",
          "Clustering: K-Means algorithm",
          "Hierarchical Clustering: Agglomerative versus Divisive"
        ],
        pyqs: [
          "What is the Apriori principle? (3 marks)",
          "Differentiate between K-Means clustering and hierarchical clustering. (3 marks)",
          "Explain the Apriori algorithm with a suitable example. (6 marks)",
          "Compare K-Means clustering with agglomerative clustering. (8 marks)"
        ]
      },
      {
        num: 4,
        title: "Introduction to Neural Networks",
        hours: 9,
        topics: [
          "Biological Neuron and Perceptron model",
          "Multilayer Neural Networks architecture",
          "Activation functions: Sign, Sigmoid, Tanh, ReLU, leaky ReLU, Hard Tanh, Softmax",
          "Loss functions & gradient descent",
          "Training a Neural Network with Backpropagation (derivation & weight updates)",
          "Practical issues: Overfitting, Underfitting, Hyperparameters and Validation sets"
        ],
        pyqs: [
          "What is an activation function? Mention any two commonly used activation functions. (3 marks)",
          "Explain the architecture of a multilayer neural network and the role of backpropagation. (8 marks)",
          "Discuss practical issues in neural network training: overfitting, underfitting, hyperparameters, validation sets. (6 marks)"
        ]
      },
      {
        num: 5,
        title: "Introduction to Information Retrieval",
        hours: 10,
        topics: [
          "Text Processing: Data Acquisition, Text Extraction, Clean-up, Pre-processing, Feature Engineering, Modeling, Evaluation",
          "Text Representation: Vector Space Models",
          "Basic Vectorization Approaches: One-Hot Encoding, Bag of Words, Bag of N-Grams, TF-IDF",
          "Distributed Representations: Word Embeddings, Doc2Vec",
          "Boolean retrieval, inverted index, processing Boolean queries, tokenization, stemming, phrase queries"
        ],
        pyqs: [
          "Explain TF-IDF with a simple example. (3 marks)",
          "Compare one-hot encoding, Bag of Words, and TF-IDF. (6 marks)",
          "Explain vector space model for information retrieval. (9 marks)",
          "Describe tokenization, stemming, and phrase queries. (5 marks)"
        ]
      }
    ]
  },

  bdp: {
    id: "bdp",
    code: "B24AM3T01",
    name: "Big Data Processing",
    slot: "S5 Slot B",
    date: "2026-11-13",
    day: "Friday",
    time: "09:30 AM – 12:30 PM",
    color: "#3b82f6",
    hex: "#3b82f6",
    difficulty: "Moderate",
    credits: 4,
    hours: 45,
    modules: [
      {
        num: 1,
        title: "Introduction to Big Data & Ecosystem",
        hours: 9,
        topics: [
          "Evolution of Big Data and Big Data Characteristics (5Vs)",
          "History of Hadoop, RDBMS vs Big Data systems",
          "Comparison of Hadoop with other systems",
          "Hadoop Ecosystem overview",
          "Core Components: HDFS, Programming Model, High level abstractions, Coordination, Enterprise Data Integration",
          "Applications & Use cases: Web search indexing"
        ],
        pyqs: [
          "Define Big Data and list any three characteristics. (3 marks)",
          "Differentiate between RDBMS and Big Data systems. (3 marks)",
          "With a neat diagram explain the core components of Hadoop Ecosystem. (12 marks)"
        ]
      },
      {
        num: 2,
        title: "HDFS and HBase",
        hours: 9,
        topics: [
          "HDFS Architecture and Design, Blocks, NameNodes and DataNodes",
          "HDFS Federation and High Availability (HDFS Failover Architecture)",
          "Using HDFS Files & Basic File System Operations",
          "Hadoop Specific File Types (SequenceFiles, Avro, Parquet)",
          "Anatomy of a File Read and File Write in HDFS",
          "HBase: Architecture, Data Model, HBase Schema Design"
        ],
        pyqs: [
          "What is the role of NameNode in HDFS? (3 marks)",
          "Explain HDFS Architecture with a neat diagram. (8 marks)",
          "Explain the anatomy of a file read and file write. (8 marks)",
          "Explain the data model and architecture of HBase. (10 marks)"
        ]
      },
      {
        num: 3,
        title: "MapReduce Programming",
        hours: 9,
        topics: [
          "Data Processing with MapReduce: Execution Pipeline",
          "Runtime Coordination and Task Management in MapReduce",
          "Designing MapReduce implementations: Parallel processing framework",
          "Face Recognition example using MapReduce",
          "Simple Data Processing: Inverted Indexes example",
          "Road Enrichment example and Link Elevation example",
          "MapReduce Design Gotchas"
        ],
        pyqs: [
          "What is a Mapper function in MapReduce? (3 marks)",
          "Illustrate the execution pipeline of MapReduce job using word count. (8 marks)",
          "Discuss in detail about Road Enrichment example. (8 marks)",
          "Explain common MapReduce Design Gotchas. (5 marks)"
        ]
      },
      {
        num: 4,
        title: "Stream Data Model and Hive",
        hours: 9,
        topics: [
          "Introduction to Stream: Concepts, Stream Data Model & Architecture",
          "Sampling Data in a Stream, Filtering Streams, Counting Distinct Elements",
          "Hive Features, Architecture, Data types and file formats",
          "Primitive and Collection data types in Hive",
          "HiveQL: Creating tables, Dropping tables, Alter table, Partitioning & Bucketing"
        ],
        pyqs: [
          "What is stream data? Give an example. (3 marks)",
          "List three features of Hive. (3 marks)",
          "Explain in detail the Stream Data Model and its architecture. (9 marks)",
          "Write the syntax to create a table and partition in Hive. (5 marks)"
        ]
      },
      {
        num: 5,
        title: "Pig and Spark",
        hours: 9,
        topics: [
          "Pig Data Model, Pig Latin: Structure, Operators, Functions",
          "Spark: History, Storage layers for Spark, Core Spark concepts",
          "Resilient Distributed Datasets (RDD) basics and characteristics",
          "RDD Operations: Transformations (map, filter, flatMap) vs Actions (count, collect, reduce)",
          "Spark Applications and Architecture (Driver, Cluster Manager, Executors)"
        ],
        pyqs: [
          "What is Pig Latin? (3 marks)",
          "Define RDD in Spark and mention its two characteristics. (3 marks)",
          "Write about Pig Latin Structure and Functions. (10 marks)",
          "Draw the Spark architecture and explain the role of different components. (8 marks)"
        ]
      }
    ]
  },

  cd: {
    id: "cd",
    code: "B24CS3T03",
    name: "Compiler Design",
    slot: "S5 Slot C",
    date: "2026-11-17",
    day: "Tuesday",
    time: "09:30 AM – 12:30 PM",
    color: "#ef4444",
    hex: "#ef4444",
    difficulty: "Very High",
    credits: 4,
    hours: 45,
    modules: [
      {
        num: 1,
        title: "Compiler Architecture & Lexical Analysis",
        hours: 9,
        topics: [
          "Analysis of source program: Analysis & Synthesis phases",
          "Phases of a compiler (Lexical, Syntax, Semantic, Intermediate code, Optimizer, Code Gen)",
          "Compiler writing tools and Bootstrapping",
          "Role of Lexical Analyzer, Input Buffering (Buffer Pairs, Sentinels)",
          "Specification of Tokens (Regular Expressions) & Recognition of Tokens (Finite Automata)"
        ],
        pyqs: [
          "Distinguish between compiler and interpreter. (3 marks)",
          "Explain lexical analyzer role and input buffering techniques. (8 marks)",
          "With a neat diagram, explain all phases of a compiler. (8 marks)",
          "Discuss bootstrapping and its importance in compiler construction. (6 marks)"
        ]
      },
      {
        num: 2,
        title: "Syntax Analysis & Top-Down Parsing",
        hours: 9,
        topics: [
          "Role of Syntax Analyzer, Syntax error handling strategies",
          "Context Free Grammars (CFGs), Derivation and Parse Trees, Ambiguity elimination",
          "Grammar transformations: Eliminating left recursion, Left factoring",
          "Top-Down Parsing: Recursive Descent parsing",
          "FIRST and FOLLOW computation algorithms",
          "Predictive Parsing: LL(1) Grammars and Parsing Table construction"
        ],
        pyqs: [
          "Differentiate between top-down and bottom-up parsing. (3 marks)",
          "Write the advantages of predictive parsing over recursive descent parsing. (3 marks)",
          "Eliminate left recursion and left factor the given grammar. (8 marks)",
          "Explain LL(1) parsing with parse table construction. (6 marks)"
        ]
      },
      {
        num: 3,
        title: "Bottom-Up Parsing (LR Parsers)",
        hours: 9,
        topics: [
          "Bottom-Up Parsing: Handle Pruning, Shift-Reduce parsing",
          "Operator precedence parsing (Concept only)",
          "LR Parsing: SLR Grammar, LR(0) items, Augmented Grammar",
          "Canonical collection of LR(0) items & SLR Parser Table construction",
          "Constructing Canonical LR (CLR / LR(1)) parsing tables",
          "Constructing LALR Parsing Tables and LALR parser implementation"
        ],
        pyqs: [
          "Define handle and handle pruning in bottom-up parsing. (3 marks)",
          "Explain shift-reduce parsing with an example. (8 marks)",
          "Construct an SLR parse table for a given grammar. (6 marks)",
          "Compare SLR, LALR and Canonical LR parsers. (8 marks)"
        ]
      },
      {
        num: 4,
        title: "Syntax Directed Translation & Intermediate Code",
        hours: 9,
        topics: [
          "Syntax Directed Translation (SDT), Syntax Directed Definitions (SDD)",
          "S-Attributed Definitions vs L-Attributed Definitions",
          "Type System, Type Expressions, Static and Dynamic Type Checking",
          "Intermediate Languages: Syntax Trees, Directed Acyclic Graphs (DAGs)",
          "Three-Address Code (3AC): Types, Quadruples, Triples, Indirect Triples"
        ],
        pyqs: [
          "Differentiate between S-attributed and L-attributed definitions. (3 marks)",
          "Define quadruples and triples with examples. (3 marks)",
          "Explain construction of three-address code from SDD. (8 marks)",
          "Describe storage organization and activation records. (6 marks)"
        ]
      },
      {
        num: 5,
        title: "Code Optimization & Code Generation",
        hours: 9,
        topics: [
          "Opportunities and scope of code optimization",
          "Local Optimization: Local Value Numbering (LVN), Tree-Height Balancing",
          "Regional Optimization: Superlocal Value Numbering, Loop Unrolling",
          "Global Optimization: Live Sets, Finding Uninitialized Variables, Global Code Placement",
          "Code Generation: Issues in design, Target language, Simple code generator algorithm"
        ],
        pyqs: [
          "What is peephole optimization? Give an example. (3 marks)",
          "What is local value numbering? Explain briefly with a small example. (3 marks)",
          "Differentiate machine-dependent and machine-independent optimizations. (8 marks)",
          "Explain a simple algorithm for code generation from three-address code. (6 marks)"
        ]
      }
    ]
  },

  cn: {
    id: "cn",
    code: "B24CS2T03",
    name: "Computer Networks",
    slot: "S3 Slot D",
    date: "2026-11-19",
    day: "Thursday",
    time: "09:30 AM – 12:30 PM",
    color: "#a855f7",
    hex: "#a855f7",
    difficulty: "High (S3 Backlog/Regular Track)",
    credits: 4,
    hours: 45,
    modules: [
      {
        num: 1,
        title: "Data Link Layer & MAC",
        hours: 9,
        topics: [
          "Layered Architecture (OSI vs TCP/IP model)",
          "Framing techniques (Character count, Byte stuffing, Bit stuffing)",
          "Error Detection & Correction: Parity, Checksum, CRC (Cyclic Redundancy Check)",
          "Flow Control Protocols: Stop-and-Wait, Go-Back-N, Selective Repeat ARQ",
          "MAC Protocols: Pure ALOHA, Slotted ALOHA, CSMA, CSMA/CD, CSMA/CA, Ethernet"
        ],
        pyqs: [
          "Differentiate Go-Back-N and Selective Repeat ARQ in terms of window size and efficiency. (7 marks)",
          "Calculate CRC for given dataword and polynomial generator. (7 marks)",
          "Explain the working of CSMA/CD protocol with flow chart. (7 marks)"
        ]
      },
      {
        num: 2,
        title: "Network Layer & IP Addressing",
        hours: 9,
        topics: [
          "Network Layer design issues, Store-and-forward packet switching",
          "IPv4 Addressing: Classful addressing, Subnetting, Supernetting, CIDR notation",
          "IPv4 Packet Header format and fragmentation",
          "Address Resolution Protocol (ARP), RARP, DHCP, ICMP, NAT",
          "IPv6 Addressing and comparison with IPv4"
        ],
        pyqs: [
          "A block of IP addresses is given. Perform subnetting into 4 equal subnets. (8 marks)",
          "Explain the header format of IPv4 packet with neat diagram. (7 marks)",
          "Explain how ARP and DHCP protocols work in local networks. (7 marks)"
        ]
      },
      {
        num: 3,
        title: "Routing Algorithms",
        hours: 9,
        topics: [
          "Routing principles: Static vs Dynamic routing",
          "Shortest Path Routing: Dijkstra’s algorithm",
          "Distance Vector Routing (DVR) - Bellman-Ford & Count-to-Infinity problem",
          "Link State Routing (LSR) - Reliable flooding and link state packets",
          "Hierarchical Routing, Internet Routing Protocols: RIP, OSPF, BGP"
        ],
        pyqs: [
          "Apply Dijkstra's shortest path routing algorithm for a 6-node network. (7 marks)",
          "Explain Count-to-Infinity problem in Distance Vector Routing and solutions. (7 marks)",
          "Compare OSPF and BGP routing protocols. (7 marks)"
        ]
      },
      {
        num: 4,
        title: "Transport Layer Protocols",
        hours: 9,
        topics: [
          "Transport Layer services: Multiplexing and Demultiplexing",
          "User Datagram Protocol (UDP): Header format and applications",
          "Transmission Control Protocol (TCP): Segment structure, 3-way handshake connection establishment, Termination",
          "TCP Flow Control using Sliding Window",
          "TCP Congestion Control: AIMD, Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery"
        ],
        pyqs: [
          "Explain TCP 3-way handshake connection establishment and graceful release. (8 marks)",
          "Describe the four phases of TCP Congestion Control with window diagram. (8 marks)",
          "Differentiate UDP and TCP in terms of reliability, overhead, and use cases. (6 marks)"
        ]
      },
      {
        num: 5,
        title: "Application Layer & Security",
        hours: 9,
        topics: [
          "Domain Name System (DNS): Hierarchical namespace, Resource records, Resolution",
          "World Wide Web: HTTP and HTTPS, Persistent vs Non-persistent connections",
          "Electronic Mail: SMTP, POP3, IMAP",
          "File Transfer: FTP control and data connections",
          "Network Security Basics: Symmetric vs Asymmetric key cryptography (RSA), Firewalls, SSL/TLS"
        ],
        pyqs: [
          "Explain DNS resolution process (recursive and iterative) with diagram. (7 marks)",
          "Explain RSA public key encryption algorithm with a numerical example. (7 marks)",
          "Differentiate HTTP 1.0, 1.1 and persistent HTTP connections. (6 marks)"
        ]
      }
    ]
  },

  aad: {
    id: "aad",
    code: "B24CS3T04",
    name: "Algorithm Analysis and Design",
    slot: "S5 Slot D",
    date: "2026-11-20",
    day: "Friday",
    time: "09:30 AM – 12:30 PM",
    color: "#f97316",
    hex: "#f97316",
    difficulty: "Extremely High (CRITICAL ZERO-GAP)",
    credits: 4,
    hours: 45,
    modules: [
      {
        num: 1,
        title: "Introduction to Algorithm Analysis & Recurrences",
        hours: 9,
        topics: [
          "Characteristics of Algorithms, Criteria for Analysing Algorithms",
          "Time and Space Complexity: Best, Worst and Average Case",
          "Asymptotic Notations: Big-Oh (O), Big-Omega (Ω), Big-Theta (Θ), Little-oh (o), Little-Omega (ω) and properties",
          "Classifying functions by asymptotic growth rate, Code complexity calculations",
          "Solving Recurrence Equations: Iteration Method, Recursion Tree Method, Substitution Method, Master's Theorem"
        ],
        pyqs: [
          "Arrange functions in increasing order of growth rate: n^3, 2^n, log n^3, 2^100, n^2 log n, n^n, log n, 2^log n. (3 marks)",
          "State Master's Theorem. Solve T(n) = 8T(n/2) + 100n^2 and T(n) = 2T(n/2) + 10n. (7 marks)",
          "Solve T(n) = T(n/3) + T(2n/3) + n using Recursion Tree method. (7 marks)"
        ]
      },
      {
        num: 2,
        title: "Advanced Data Structures & Graph Algorithms",
        hours: 10,
        topics: [
          "Self Balancing Trees: AVL Trees (Insertion & Deletion operations with all rotations in detail)",
          "Disjoint Sets: Disjoint set operations, Union and Find algorithms, Linked list representation",
          "Graph Algorithms: BFS and DFS traversals & complexity analysis",
          "Classification of edges in DFS (Tree, Back, Forward, Cross edges)",
          "Strongly Connected Components (SCC) of Directed Graph, Topological Sorting"
        ],
        pyqs: [
          "Explain AVL rotations (LL, RR, LR, RL) with examples. Perform insertion of keys. (7 marks)",
          "Write DFS algorithm, analyze time complexity, illustrate edge classification. (7 marks)",
          "Find Strongly Connected Components and Topological orderings of a DAG. (7 marks)"
        ]
      },
      {
        num: 3,
        title: "Divide & Conquer and Greedy Strategy",
        hours: 8,
        topics: [
          "Divide & Conquer: Control Abstraction, 2-way Merge Sort & analysis",
          "Strassen's Algorithm for Matrix Multiplication & recurrence analysis",
          "Greedy Strategy: Control Abstraction",
          "Fractional Knapsack Problem and Greedy algorithm",
          "Minimum Cost Spanning Tree (MST): Kruskal's Algorithm & Prim's Algorithm analysis",
          "Single Source Shortest Path: Dijkstra's Algorithm analysis"
        ],
        pyqs: [
          "State Fractional Knapsack Problem, write Greedy algorithm, solve for given weights/profits. (7 marks)",
          "Write pseudo code for Dijkstra's algorithm. Compute shortest distances for given graph. (7 marks)",
          "Explain Strassen's matrix multiplication and how it reduces complexity from O(n^3) to O(n^2.81). (7 marks)"
        ]
      },
      {
        num: 4,
        title: "Dynamic Programming, Backtracking, Branch & Bound",
        hours: 8,
        topics: [
          "Dynamic Programming: Control Abstraction, Principle of Optimality",
          "Matrix Chain Multiplication (MCM) - Algorithm & recurrence analysis",
          "All Pairs Shortest Path: Floyd-Warshall Algorithm & optimal substructure",
          "Backtracking: Control Abstraction, The N-Queens Problem (4-Queens state space)",
          "Branch and Bound: Control Abstraction, Travelling Salesman Problem (TSP) state space tree"
        ],
        pyqs: [
          "Find optimal parenthesization of matrix chain product 4x10, 10x3, 3x12, 12x20 using DP. (9 marks)",
          "Write Floyd-Warshall algorithm and analyze its complexity. (5 marks)",
          "Explain Backtracking using 4-Queens problem. (7 marks)",
          "Define TSP. Apply Branch and Bound to solve TSP for given cost matrix. (7 marks)"
        ]
      },
      {
        num: 5,
        title: "Complexity Theory & Randomized Algorithms",
        hours: 10,
        topics: [
          "Tractable and Intractable Problems, Complexity Classes: P, NP, NP-Hard, NP-Complete",
          "NP-Completeness proofs: Clique Problem and Vertex Cover Problem",
          "Approximation Algorithms: Bin Packing Problem (First Fit Decreasing), Graph Coloring",
          "Randomized Algorithms: Definitions of Monte Carlo and Las Vegas algorithms",
          "Randomized version of Quick Sort algorithm with expected running time analysis"
        ],
        pyqs: [
          "Differentiate between P and NP problems. (3 marks)",
          "Prove that the Clique Problem / Vertex Cover is NP-Complete. (7 marks)",
          "Explain Bin Packing problem and First Fit Decreasing strategy. (7 marks)",
          "Differentiate Las Vegas and Monte Carlo algorithms. Analyze Randomized Quicksort. (9 marks)"
        ]
      }
    ]
  },

  ai: {
    id: "ai",
    code: "B24CS3T05",
    name: "Artificial Intelligence",
    slot: "S5 Slot E",
    date: "2026-11-24",
    day: "Tuesday",
    time: "09:30 AM – 12:30 PM",
    color: "#10b981",
    hex: "#10b981",
    difficulty: "Moderate",
    credits: 3,
    hours: 36,
    modules: [
      {
        num: 1,
        title: "Introduction & Intelligent Agents",
        hours: 7,
        topics: [
          "What is AI, History of AI, Applications & Foundations of AI, Responsible AI",
          "Intelligent Agents: Agents and Environments, Concept of Rationality",
          "Nature of Environments: Specifying Task Environment (PEAS description)",
          "Environment Properties: Fully/Partially Observable, Deterministic/Stochastic, Episodic/Sequential, Static/Dynamic, Discrete/Continuous",
          "Agent Architectures: Simple reflex, Model-based, Goal-based, Utility-based Agents"
        ],
        pyqs: [
          "Define rationality in the context of intelligent agents. (3 marks)",
          "Differentiate between static and dynamic environments with examples. (3 marks)",
          "Describe the PEAS representation for two real-world agents. (7 marks)",
          "Explain the four agent architectures with neat diagrams. (8 marks)"
        ]
      },
      {
        num: 2,
        title: "Problem Solving by Searching",
        hours: 6,
        topics: [
          "Problem formulation, State space, Trade-offs in BFS and DFS",
          "Uninformed Search: Depth Limited Search (DLS), Iterative Deepening Search (IDS), Performance measures",
          "Informed (Heuristic) Search: Heuristic functions, Greedy Best-First Search",
          "A* Search: Algorithm, Admissibility and Consistency conditions for optimality"
        ],
        pyqs: [
          "Differences between BFS and DFS in terms of completeness and optimality. (3 marks)",
          "What are admissible and consistent heuristics? Show how they affect A*. (7 marks)",
          "Explain IDS. Why is it preferred over BFS and DFS? (7 marks)"
        ]
      },
      {
        num: 3,
        title: "Search in Complex Environments & CSP",
        hours: 9,
        topics: [
          "Adversarial Search: Game playing, Minimax algorithm, Alpha-Beta pruning, Evaluation functions, Cut-off, Move ordering",
          "Constraint Satisfaction Problems (CSP): Variables, Domains, Constraints",
          "Example CSPs: Cryptarithmetic Problem (TWO+TWO=FOUR), Map Coloring",
          "CSP Backtracking Search: MRV heuristic, Degree heuristic, LCV heuristic, Forward Checking",
          "Constraint Propagation (AC-3), Local Search: Simple Hill Climbing, Simulated Annealing"
        ],
        pyqs: [
          "What is the purpose of evaluation functions and Alpha-Beta pruning in game playing? (7 marks)",
          "Solve Cryptarithmetic problem (TWO + TWO = FOUR) using backtracking with heuristics. (7 marks)",
          "Discuss forward checking and constraint propagation in CSP. (7 marks)"
        ]
      },
      {
        num: 4,
        title: "Knowledge Representation and Reasoning",
        hours: 7,
        topics: [
          "Knowledge-Based Agents: The Wumpus World environment",
          "Propositional Logic: Syntax, Semantics, Entailment, Inference, Resolution refutation",
          "First-Order Logic (FOL): Syntax and Semantics of FOL, Knowledge Representation in FOL",
          "Inference in FOL: Unification algorithm, Generalized Modus Ponens, Lifting, Forward & Backward chaining, Resolution",
          "Algorithms for Planning: State Space Search, Planning Graphs"
        ],
        pyqs: [
          "Describe Wumpus World. Why is it a good testbed for logic-based agents? (10 marks)",
          "Use resolution refutation in Propositional Logic to prove conclusion. (7 marks)",
          "Explain Unification and Lifting in First-Order Logic with examples. (6 marks)"
        ]
      },
      {
        num: 5,
        title: "Towards Modern AI: Symbolic & ML Integration",
        hours: 7,
        topics: [
          "Evolution to Data-Driven AI: Core limitations of symbolic AI approaches",
          "Machine Learning Paradigms: Supervised, Unsupervised, Reinforcement Learning",
          "Integration of Search & RL: Modern game playing (AlphaGo)",
          "Ethics & Responsibility: Bias, fairness, societal impact of learned models",
          "Case Studies: Healthcare, Autonomous Systems, and Intelligent Assistants"
        ],
        pyqs: [
          "Explain the limitations of symbolic AI that led to data-driven learning. (8 marks)",
          "Discuss how search techniques are integrated with Reinforcement Learning in AlphaGo. (7 marks)",
          "Discuss ethical and societal issues of AI models: bias and fairness. (7 marks)"
        ]
      }
    ]
  },

  iot: {
    id: "iot",
    code: "B24CS3P13",
    name: "Internet of Things",
    slot: "S5 Elective",
    date: "2026-11-26",
    day: "Thursday",
    time: "09:30 AM – 12:30 PM",
    color: "#84cc16",
    hex: "#84cc16",
    difficulty: "Moderate-Low",
    credits: 3,
    hours: 36,
    modules: [
      {
        num: 1,
        title: "Fundamentals of IoT & Architecture",
        hours: 6,
        topics: [
          "What is IoT, Genesis & Evolution of IoT, IoT Impact and Opportunities",
          "Digitization and Convergence of IT and OT, IoT Challenges",
          "IoT Network Architecture and Design, Comparing IoT Architectures, Simplified IoT Architecture",
          "The Core IoT Functional Stack, IoT Data Management and Compute Stack"
        ],
        pyqs: [
          "Define IoT. Explain impact of IoT on digitization and IT/OT convergence. (3 marks)",
          "Explain Core IoT Functional Stack with neat diagram. (7 marks)",
          "Discuss IoT Network Architecture and compare different architectural models. (7 marks)"
        ]
      },
      {
        num: 2,
        title: "Smart Objects and Connectivity",
        hours: 7,
        topics: [
          "Smart Objects – 'The Things' in IoT, Characteristics of smart objects",
          "Sensors, Actuators, and their classifications",
          "Sensor Networks and Connectivity Models",
          "Communications Criteria: Range, Bandwidth, Power, Topology, Cost",
          "IoT Access Technologies: IEEE 802.15.4 (Zigbee), IEEE 802.11ah, LoRa / LoRaWAN, NB-IoT, LTE"
        ],
        pyqs: [
          "Differentiate between sensors and actuators with examples. (3 marks)",
          "Compare IEEE 802.15.4, LoRaWAN, and NB-IoT technologies. (8 marks)",
          "Explain communication criteria for connecting smart objects. (6 marks)"
        ]
      },
      {
        num: 3,
        title: "IP and Application Protocols for IoT",
        hours: 7,
        topics: [
          "IP as the IoT Network Layer and Business Case for IP",
          "Need for Optimization: Constrained devices and constrained networks (6LoWPAN)",
          "Optimizing IP for IoT: Profiles and Compliance",
          "Application Protocols for IoT: CoAP architecture & message types",
          "MQTT (Message Queuing Telemetry Transport): Publish/Subscribe model, QoS levels 0, 1, 2",
          "Transport Layer: IoT Application Transport methods"
        ],
        pyqs: [
          "Compare MQTT and CoAP in terms of architecture, overhead, and reliability. (8 marks)",
          "Explain the need for optimizing IP for constrained devices. (7 marks)",
          "Describe the working of transport layer in IoT communication. (7 marks)"
        ]
      },
      {
        num: 4,
        title: "Data and Analytics for IoT",
        hours: 6,
        topics: [
          "Data and Analytics for IoT: Nature of IoT data, Types of IoT data, IoT data life cycle",
          "Introduction to Machine Learning for IoT: Role of ML, Types of ML used in IoT",
          "Big Data Analytics Tools and Technologies for IoT",
          "Edge Analytics and Streaming Analytics vs Cloud Analytics",
          "Network Analytics, Visualization and Interpretation of IoT data",
          "IoT Security Overview: Common challenges, Risk analysis concepts"
        ],
        pyqs: [
          "What is edge analytics? How does it differ from cloud-based analytics? (3 marks)",
          "Explain the role of data analytics in IoT systems with an example. (7 marks)",
          "Describe how machine learning techniques are applied in IoT data analysis. (8 marks)"
        ]
      },
      {
        num: 5,
        title: "Developing IoT Systems & Cloud Services",
        hours: 10,
        topics: [
          "IoT Logical Design using Python",
          "IoT Physical Devices and Endpoints: Raspberry Pi interfaces (GPIO, SPI, I2C)",
          "Programming Raspberry Pi with Python: Interfacing Sensors (DHT11/22) and Actuators",
          "Cloud Storage Models and IoT Cloud Offerings",
          "Designing RESTful Web APIs for IoT applications",
          "Cloud Web Services for IoT: AWS IoT Core, ThingSpeak platform",
          "Case Study: Smart Home or Smart Agriculture Application",
          "Security and Privacy in IoT System Implementation"
        ],
        pyqs: [
          "List major components of a Raspberry Pi–based IoT system. (3 marks)",
          "Demonstrate how Raspberry Pi can be programmed to interface a temperature sensor using Python. (7 marks)",
          "Explain architecture and functioning of cloud services for IoT (AWS IoT / ThingSpeak). (8 marks)",
          "Explain essential security and privacy considerations in IoT application development. (6 marks)"
        ]
      }
    ]
  },

  lab: {
    id: "lab",
    code: "B24CD3L07 / B24AM3L08",
    name: "Practical Lab Examinations",
    slot: "Slots G & H",
    date: "2026-12-04",
    endDate: "2026-12-11",
    day: "Fri - Fri",
    time: "Lab Timings",
    color: "#ec4899",
    hex: "#ec4899",
    difficulty: "Hands-on Practical & Viva",
    credits: 4,
    hours: 30,
    modules: [
      {
        num: 1,
        title: "Data Analytics Lab (B24CD3L07)",
        hours: 15,
        topics: [
          "Weka tool exploratory data analysis and visualization",
          "Similarity and dissimilarity computation for numeric & nominal attributes",
          "Correlation analysis between numeric and nominal attributes",
          "Information gain evaluation for dataset attributes",
          "Association rule mining algorithm implementation (Apriori)",
          "K-Means clustering and Single Linkage hierarchical clustering",
          "Naïve Bayes classifier implementation",
          "Outlier detection algorithms and Data Analytics micro-project"
        ],
        pyqs: [
          "Demonstrate EDA on Iris dataset using Weka / Python. (Viva & Execution)",
          "Implement Apriori algorithm and generate association rules for minimum support 0.3. (Practical output)",
          "Perform K-Means clustering and evaluate cluster purity. (Practical output)"
        ]
      },
      {
        num: 2,
        title: "Machine Learning Lab (B24AM3L08)",
        hours: 15,
        topics: [
          "Linear regression on California Housing dataset",
          "Polynomial regression on Auto MPG dataset",
          "Logistic regression using MLE and MAP on Breast Cancer dataset",
          "Logistic regression with and without feature scaling on Pima Indians Diabetes",
          "Multilayer Perceptron (MLP) on Wine Quality dataset (hidden layer tuning)",
          "Multilayer feedforward neural network trained with Backpropagation",
          "KNN algorithm on Fashion MNIST for image classification",
          "Activation function comparison (Sigmoid, ReLU, Tanh) on MNIST",
          "Hyperparameter tuning for neural network on Fashion MNIST",
          "Hierarchical vs K-Means clustering on Mall Customers dataset",
          "DBSCAN clustering algorithm on Digits dataset",
          "Bootstrapping and Cross-Validation on Iris dataset",
          "Bagging and Boosting on Titanic dataset using ensemble methods",
          "Bias-Variance trade-off investigation using polynomial regression"
        ],
        pyqs: [
          "Write Python code in VS Code to train an MLP with Backpropagation on Wine Quality. (Practical)",
          "Demonstrate Bagging and Boosting on Titanic dataset and plot ROC curve. (Practical)",
          "Explain Bias-Variance tradeoff and effect of polynomial degrees. (Viva)"
        ]
      }
    ]
  }
};

// Master Study Schedule (29 Oct to 11 Dec 2026)
export const SCHEDULE_DAYS = [
  {
    date: "2026-10-29",
    day: "Thursday",
    type: "prep",
    phase: 1,
    title: "Day 1: AAD Foundations & Networks Kickoff",
    badge: "Prep Day 1",
    primarySubj: "aad",
    secondarySubj: "cn",
    tasks: [
      { id: "t-1029-1", subj: "aad", mod: 1, cat: "learn", text: "AAD M1: Asymptotic notations (O, Ω, Θ, o, ω) properties & growth rate hierarchy", hrs: 2.0 },
      { id: "t-1029-2", subj: "aad", mod: 1, cat: "practice", text: "AAD M1: Solving Recurrences: Master's Theorem, Iteration & Recursion Tree", hrs: 2.0 },
      { id: "t-1029-3", subj: "cn", mod: 1, cat: "learn", text: "CN M1: Framing techniques (bit/byte stuffing) & CRC error detection", hrs: 1.5 },
      { id: "t-1029-4", subj: "cn", mod: 1, cat: "practice", text: "CN M1: Stop-and-Wait, Go-Back-N, Selective Repeat ARQ window calculations", hrs: 1.5 },
      { id: "t-1029-5", subj: "aad", mod: 1, cat: "pyq", text: "Self-Test: 3 Master Theorem recurrences + 1 CRC numerical", hrs: 0.5 }
    ]
  },
  {
    date: "2026-10-30",
    day: "Friday",
    type: "prep",
    phase: 1,
    title: "Day 2: AVL Rotations & Compiler Lexical Phase",
    badge: "Prep Day 2",
    primarySubj: "aad",
    secondarySubj: "cd",
    tasks: [
      { id: "t-1030-1", subj: "aad", mod: 2, cat: "learn", text: "AAD M2: AVL Trees: Insertion/Deletion with LL, RR, LR, RL rotations", hrs: 2.5 },
      { id: "t-1030-2", subj: "aad", mod: 2, cat: "practice", text: "AAD M2: Disjoint Sets: Union and Find operations (Linked list representation)", hrs: 1.5 },
      { id: "t-1030-3", subj: "cd", mod: 1, cat: "learn", text: "Compiler M1: Phases of compiler, Input Buffering (buffer pairs, sentinels), Bootstrapping", hrs: 2.0 },
      { id: "t-1030-4", subj: "cd", mod: 1, cat: "pyq", text: "Compiler M1: Finite automata for identifier token recognition", hrs: 1.0 },
      { id: "t-1030-5", subj: "aad", mod: 2, cat: "pyq", text: "Self-Test: Construct AVL tree for 7 keys + trace balance factors", hrs: 0.5 }
    ]
  },
  {
    date: "2026-10-31",
    day: "Saturday",
    type: "prep",
    phase: 1,
    title: "Day 3: Top-Down Parsing & IP Subnetting",
    badge: "Prep Day 3 (Buffer)",
    primarySubj: "cd",
    secondarySubj: "cn",
    tasks: [
      { id: "t-1031-1", subj: "cd", mod: 2, cat: "learn", text: "Compiler M2: CFGs, Ambiguity elimination, Left recursion elimination, Left factoring", hrs: 2.5 },
      { id: "t-1031-2", subj: "cd", mod: 2, cat: "practice", text: "Compiler M2: FIRST & FOLLOW computation algorithms + LL(1) Table construction", hrs: 2.0 },
      { id: "t-1031-3", subj: "cn", mod: 2, cat: "learn", text: "CN M2: IPv4/IPv6 addressing, Subnetting, Supernetting, CIDR mask calculations", hrs: 1.5 },
      { id: "t-1031-4", subj: "all", mod: 0, cat: "rev", text: "Buffer Slot (1.5 hrs): Catch-up on pending AAD/Compiler items + 3-day recap", hrs: 1.0 },
      { id: "t-1031-5", subj: "cd", mod: 2, cat: "pyq", text: "Self-Test: Eliminate left recursion & construct LL(1) table for 1 grammar", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-01",
    day: "Sunday",
    type: "prep",
    phase: 1,
    title: "Day 4: Dynamic Programming & Routing Protocols",
    badge: "Prep Day 4",
    primarySubj: "aad",
    secondarySubj: "cn",
    tasks: [
      { id: "t-1101-1", subj: "aad", mod: 3, cat: "learn", text: "AAD M3: Divide & Conquer (Strassen's Matrix Mult) & Greedy (Fractional Knapsack, Kruskal/Prim)", hrs: 2.5 },
      { id: "t-1101-2", subj: "aad", mod: 4, cat: "practice", text: "AAD M4: Matrix Chain Multiplication (MCM) recurrence & Floyd-Warshall All-Pairs Shortest Path", hrs: 2.5 },
      { id: "t-1101-3", subj: "cn", mod: 3, cat: "learn", text: "CN M3: Distance Vector Routing (Bellman-Ford & Count-to-Infinity) & Link State (Dijkstra)", hrs: 1.5 },
      { id: "t-1101-4", subj: "aad", mod: 4, cat: "pyq", text: "Self-Test: Compute MCM table for 4 matrices + Dijkstra shortest path trace", hrs: 1.0 }
    ]
  },
  {
    date: "2026-11-02",
    day: "Monday",
    type: "prep",
    phase: 1,
    title: "Day 5: Bottom-Up Parsing (LR/SLR/LALR) & Big Data",
    badge: "Prep Day 5",
    primarySubj: "cd",
    secondarySubj: "bdp",
    tasks: [
      { id: "t-1102-1", subj: "cd", mod: 3, cat: "learn", text: "Compiler M3: Handle pruning, Shift-reduce parsing, Canonical collection of LR(0) items", hrs: 2.5 },
      { id: "t-1102-2", subj: "cd", mod: 3, cat: "practice", text: "Compiler M3: SLR, CLR, LALR parse table construction and conflict resolution", hrs: 2.0 },
      { id: "t-1102-3", subj: "bdp", mod: 1, cat: "learn", text: "BDP M1: Big data 5Vs, Hadoop ecosystem, Core components, HDFS vs RDBMS", hrs: 1.5 },
      { id: "t-1102-4", subj: "bdp", mod: 2, cat: "learn", text: "BDP M2: HDFS Architecture, NameNode/DataNode, HA failover, File read/write anatomy", hrs: 1.0 },
      { id: "t-1102-5", subj: "cd", mod: 3, cat: "pyq", text: "Self-Test: Construct SLR(1) parse table for augmented expression grammar", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-03",
    day: "Tuesday",
    type: "prep",
    phase: 1,
    title: "Day 6: NP-Completeness, TCP Congestion & Buffer",
    badge: "Prep Day 6 (Buffer)",
    primarySubj: "aad",
    secondarySubj: "cn",
    tasks: [
      { id: "t-1103-1", subj: "aad", mod: 5, cat: "learn", text: "AAD M5: P, NP, NP-Hard, NP-Complete definitions & Clique / Vertex Cover NP proof", hrs: 2.5 },
      { id: "t-1103-2", subj: "aad", mod: 4, cat: "practice", text: "AAD M4: N-Queens Backtracking & TSP Branch and Bound state space trees", hrs: 1.5 },
      { id: "t-1103-3", subj: "cn", mod: 4, cat: "learn", text: "CN M4: TCP 3-way handshake, TCP Sliding Window flow control, Congestion Control (AIMD/Slow Start)", hrs: 1.5 },
      { id: "t-1103-4", subj: "all", mod: 0, cat: "rev", text: "Buffer Slot: Catch-up on hard derivation sheets for AAD & Compiler", hrs: 1.5 },
      { id: "t-1103-5", subj: "aad", mod: 5, cat: "pyq", text: "Self-Test: State Vertex Cover problem & prove NP-Completeness via reduction", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-04",
    day: "Wednesday",
    type: "prep",
    phase: 1,
    title: "Day 7: SDD / Intermediate Code & AI Core Search",
    badge: "Prep Day 7",
    primarySubj: "cd",
    secondarySubj: "ai",
    tasks: [
      { id: "t-1104-1", subj: "cd", mod: 4, cat: "learn", text: "Compiler M4: Syntax Directed Translation (SDD), S-attributed vs L-attributed definitions", hrs: 2.5 },
      { id: "t-1104-2", subj: "cd", mod: 4, cat: "practice", text: "Compiler M4: Three-Address Code: Quadruples, Triples, DAG representations", hrs: 1.5 },
      { id: "t-1104-3", subj: "ai", mod: 1, cat: "learn", text: "AI M1: PEAS model, Agent environments, Rationality, 4 Agent architectures", hrs: 1.5 },
      { id: "t-1104-4", subj: "ai", mod: 2, cat: "learn", text: "AI M2: Problem formulation, BFS/DFS trade-offs, Iterative Deepening, A* Search (admissibility)", hrs: 1.5 },
      { id: "t-1104-5", subj: "cd", mod: 4, cat: "pyq", text: "Self-Test: Generate Quadruples and Triples for arithmetic expression", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-05",
    day: "Thursday",
    type: "prep",
    phase: 1,
    title: "Day 8: MapReduce, Pig/Spark & IoT Architecture",
    badge: "Prep Day 8",
    primarySubj: "bdp",
    secondarySubj: "iot",
    tasks: [
      { id: "t-1105-1", subj: "bdp", mod: 3, cat: "learn", text: "BDP M3: MapReduce execution pipeline, task management, Inverted Index & Road Enrichment", hrs: 2.5 },
      { id: "t-1105-2", subj: "bdp", mod: 5, cat: "learn", text: "BDP M5: Pig Latin structure/functions, Spark RDD basics, Transformations vs Actions", hrs: 2.0 },
      { id: "t-1105-3", subj: "iot", mod: 1, cat: "learn", text: "IoT M1: Core IoT Functional Stack, IT/OT convergence, Simplified IoT Architecture", hrs: 1.5 },
      { id: "t-1105-4", subj: "iot", mod: 2, cat: "learn", text: "IoT M2: Smart objects, Sensors/Actuators, LoRaWAN vs NB-IoT vs IEEE 802.15.4", hrs: 1.0 },
      { id: "t-1105-5", subj: "bdp", mod: 3, cat: "pyq", text: "Self-Test: Write MapReduce Mapper & Reducer pseudo code for word count", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-06",
    day: "Friday",
    type: "prep",
    phase: 1,
    title: "Day 9: AI Logic, IoT Protocols & Buffer",
    badge: "Prep Day 9 (Buffer)",
    primarySubj: "ai",
    secondarySubj: "iot",
    tasks: [
      { id: "t-1106-1", subj: "ai", mod: 3, cat: "learn", text: "AI M3: Minimax, Alpha-Beta pruning, CSP: Cryptarithmetic (TWO+TWO=FOUR) & Map Coloring", hrs: 2.5 },
      { id: "t-1106-2", subj: "ai", mod: 4, cat: "learn", text: "AI M4: Wumpus World, Propositional logic resolution, First-Order Logic unification", hrs: 2.0 },
      { id: "t-1106-3", subj: "iot", mod: 3, cat: "learn", text: "IoT M3: IP optimization (6LoWPAN), MQTT (Pub/Sub & QoS) vs CoAP architecture", hrs: 1.5 },
      { id: "t-1106-4", subj: "all", mod: 0, cat: "rev", text: "Buffer Slot: Complete pending weekly backlog before dedicated DA pivot", hrs: 1.0 },
      { id: "t-1106-5", subj: "ai", mod: 3, cat: "pyq", text: "Self-Test: Alpha-Beta pruning tree calculation + Propositional resolution", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-07",
    day: "Saturday",
    type: "prep",
    phase: 1,
    title: "Day 10: Dedicated Pivot to Data Analytics (M1, M2, M3)",
    badge: "Exam 1 Focus (T-3 Days)",
    primarySubj: "da",
    secondarySubj: "da",
    tasks: [
      { id: "t-1107-1", subj: "da", mod: 1, cat: "learn", text: "DA M1: Analytics process model, Life cycle stages, Probability distributions, Hypothesis testing", hrs: 2.5 },
      { id: "t-1107-2", subj: "da", mod: 2, cat: "practice", text: "DA M2: Contingency tables, Joint/Marginal frequencies, Mean/Median/SD/IQR & Preprocessing", hrs: 2.5 },
      { id: "t-1107-3", subj: "da", mod: 3, cat: "learn", text: "DA M3: Apriori algorithm step-by-step, Naïve Bayes classifier, K-Means clustering", hrs: 2.0 },
      { id: "t-1107-4", subj: "da", mod: 1, cat: "pyq", text: "Self-Test: Solve Data Analytics Model Paper Part A (Questions 1 to 6)", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-08",
    day: "Sunday",
    type: "prep",
    phase: 1,
    title: "Day 11: Data Analytics Deep Pass (M4 & M5) & Model Paper",
    badge: "Exam 1 Focus (T-2 Days)",
    primarySubj: "da",
    secondarySubj: "da",
    tasks: [
      { id: "t-1108-1", subj: "da", mod: 4, cat: "practice", text: "DA M4: Perceptron, Multilayer NN, Backpropagation derivation & weight updates, Overfitting", hrs: 3.0 },
      { id: "t-1108-2", subj: "da", mod: 5, cat: "learn", text: "DA M5: Text representation (One-Hot, BoW, TF-IDF), Boolean retrieval, Inverted index", hrs: 2.5 },
      { id: "t-1108-3", subj: "da", mod: 0, cat: "pyq", text: "DA Model Paper: Solve full Part B (Questions 11 to 20 from S5.pdf)", hrs: 1.5 },
      { id: "t-1108-4", subj: "da", mod: 0, cat: "formula", text: "Prepare 1-page condensed formula sheet: Distance metrics, IQR, Backprop update, TF-IDF", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-09",
    day: "Monday",
    type: "prep",
    phase: 1,
    title: "Day 12: Data Analytics Pre-Exam Eve (Light Day)",
    badge: "Exam 1 Eve (Light)",
    primarySubj: "da",
    secondarySubj: "da",
    tasks: [
      { id: "t-1109-1", subj: "da", mod: 0, cat: "rev", text: "DA Final Review: 1-page formula sheet, Data Analytics life-cycle flow, Activation functions", hrs: 2.5 },
      { id: "t-1109-2", subj: "da", mod: 0, cat: "pyq", text: "Mock speed drill: 10 Part A questions written under 30 minutes", hrs: 1.5 },
      { id: "t-1109-3", subj: "da", mod: 0, cat: "rev", text: "Pre-exam checklist: Pack hall ticket, ID, scientific calculator, pens", hrs: 0.5 },
      { id: "t-1109-4", subj: "all", mod: 0, cat: "rev", text: "REST PROTOCOL: No late-night cramming. Sleep by 10:00 PM for peak mental acuity", hrs: 0.5 }
    ]
  },

  // PHASE 2: EXAM PERIOD
  {
    date: "2026-11-10",
    day: "Tuesday",
    type: "exam",
    phase: 2,
    title: "⚡ EXAM 1: Data Analytics (Slot A: B24CD3T01)",
    badge: "EXAM 1 (09:30 - 12:30)",
    primarySubj: "da",
    secondarySubj: "bdp",
    tasks: [
      { id: "t-1110-1", subj: "da", mod: 0, cat: "pyq", text: "EXECUTION: Sit Data Analytics exam (9:30 AM - 12:30 PM). Write clear diagrams & steps", hrs: 3.0 },
      { id: "t-1110-2", subj: "bdp", mod: 1, cat: "rev", text: "Post-Exam Rest until 3:00 PM. Then Kick off Big Data M1: Hadoop Ecosystem & 5Vs", hrs: 2.0 },
      { id: "t-1110-3", subj: "bdp", mod: 2, cat: "learn", text: "BDP M2: HDFS Block storage, NameNode HA, and HBase schema design review", hrs: 2.0 }
    ]
  },
  {
    date: "2026-11-11",
    day: "Wednesday",
    type: "gap",
    phase: 2,
    title: "Gap Day 1: Big Data MapReduce & Hive",
    badge: "BDP Gap Day 1",
    primarySubj: "bdp",
    secondarySubj: "bdp",
    tasks: [
      { id: "t-1111-1", subj: "bdp", mod: 3, cat: "learn", text: "BDP M3: MapReduce execution pipeline, task management, Inverted Index, Road Enrichment", hrs: 3.0 },
      { id: "t-1111-2", subj: "bdp", mod: 4, cat: "learn", text: "BDP M4: Stream data sampling & filtering, Hive architecture, HiveQL DDL/DML", hrs: 2.5 },
      { id: "t-1111-3", subj: "bdp", mod: 5, cat: "learn", text: "BDP M5: Pig Latin operators & functions, Spark RDD operations (map, filter, reduce)", hrs: 2.0 }
    ]
  },
  {
    date: "2026-11-12",
    day: "Thursday",
    type: "gap",
    phase: 2,
    title: "Gap Day 2: Big Data Eve (Model Paper & Architecture)",
    badge: "BDP Eve (Light)",
    primarySubj: "bdp",
    secondarySubj: "bdp",
    tasks: [
      { id: "t-1112-1", subj: "bdp", mod: 0, cat: "pyq", text: "BDP Model Paper: Solve Part A 10 questions + Part B architectural questions from S5.pdf", hrs: 3.0 },
      { id: "t-1112-2", subj: "bdp", mod: 0, cat: "formula", text: "Review key diagrams: HDFS architecture, MapReduce pipeline, Spark component stack", hrs: 2.0 },
      { id: "t-1112-3", subj: "cd", mod: 2, cat: "rev", text: "Flash Review (45 min): Keep Compiler Design parsing rules warm", hrs: 1.0 },
      { id: "t-1112-4", subj: "bdp", mod: 0, cat: "rev", text: "Sleep early by 10:30 PM for fresh energy tomorrow", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-13",
    day: "Friday",
    type: "exam",
    phase: 2,
    title: "⚡ EXAM 2: Big Data Processing (Slot B: B24AM3T01)",
    badge: "EXAM 2 (09:30 - 12:30)",
    primarySubj: "bdp",
    secondarySubj: "cd",
    tasks: [
      { id: "t-1113-1", subj: "bdp", mod: 0, cat: "pyq", text: "EXECUTION: Sit Big Data Processing exam (09:30 AM - 12:30 PM)", hrs: 3.0 },
      { id: "t-1113-2", subj: "cd", mod: 1, cat: "rev", text: "Post-Exam Rest until 3:00 PM. Start Compiler Sprint M1: Lexical analysis & buffer pairs", hrs: 2.0 },
      { id: "t-1113-3", subj: "cd", mod: 2, cat: "practice", text: "Compiler M2: FIRST and FOLLOW set computations & LL(1) parse table derivation", hrs: 2.0 }
    ]
  },
  {
    date: "2026-11-14",
    day: "Saturday",
    type: "gap",
    phase: 2,
    title: "Gap Day 1: Compiler LR Parsing Intensive",
    badge: "Compiler Gap Day 1",
    primarySubj: "cd",
    secondarySubj: "cd",
    tasks: [
      { id: "t-1114-1", subj: "cd", mod: 3, cat: "practice", text: "Compiler M3: LR(0) canonical items, SLR(1) parse table construction & shift/reduce conflicts", hrs: 3.0 },
      { id: "t-1114-2", subj: "cd", mod: 3, cat: "practice", text: "Compiler M3: CLR (LR(1)) and LALR parse table construction and comparison", hrs: 2.5 },
      { id: "t-1114-3", subj: "cn", mod: 2, cat: "rev", text: "Maintenance Pass (1 hr): Re-verify Computer Networks IP subnetting formulas", hrs: 1.0 }
    ]
  },
  {
    date: "2026-11-15",
    day: "Sunday",
    type: "gap",
    phase: 2,
    title: "Gap Day 2: SDD, Code Optimization & Model Paper",
    badge: "Compiler Gap Day 2",
    primarySubj: "cd",
    secondarySubj: "cd",
    tasks: [
      { id: "t-1115-1", subj: "cd", mod: 4, cat: "practice", text: "Compiler M4: S-attributed vs L-attributed SDDs, Type expressions, Quadruples/Triples", hrs: 3.0 },
      { id: "t-1115-2", subj: "cd", mod: 5, cat: "learn", text: "Compiler M5: Local Value Numbering, Loop Unrolling, Live sets, Code generator issues", hrs: 2.5 },
      { id: "t-1115-3", subj: "aad", mod: 1, cat: "rev", text: "Maintenance Pass (1 hr): Rapid flash review of AAD Master Theorem & AVL rotations", hrs: 1.0 }
    ]
  },
  {
    date: "2026-11-16",
    day: "Monday",
    type: "gap",
    phase: 2,
    title: "Gap Day 3: Compiler Eve (Model Paper & Synthesis)",
    badge: "Compiler Eve (Light)",
    primarySubj: "cd",
    secondarySubj: "cd",
    tasks: [
      { id: "t-1116-1", subj: "cd", mod: 0, cat: "pyq", text: "Compiler Model Paper: Solve Part A (10 questions) and Part B (11 to 20 from S5.pdf)", hrs: 3.0 },
      { id: "t-1116-2", subj: "cd", mod: 0, cat: "rev", text: "Synthesize summary: Parsing table rules, activation record layout, DAG construction", hrs: 2.0 },
      { id: "t-1116-3", subj: "cd", mod: 0, cat: "rev", text: "Sleep early by 10:00 PM for maximum analytical alertness on Tuesday", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-17",
    day: "Tuesday",
    type: "exam",
    phase: 2,
    title: "⚡ EXAM 3: Compiler Design (Slot C: B24CS3T03)",
    badge: "EXAM 3 (09:30 - 12:30)",
    primarySubj: "cd",
    secondarySubj: "cn",
    tasks: [
      { id: "t-1117-1", subj: "cd", mod: 0, cat: "pyq", text: "EXECUTION: Sit Compiler Design exam (09:30 AM - 12:30 PM)", hrs: 3.0 },
      { id: "t-1117-2", subj: "cn", mod: 1, cat: "rev", text: "Post-Exam Rest until 3:00 PM. URGENT CN SPRINT M1 & M2: Framing, CRC, Subnetting", hrs: 2.5 },
      { id: "t-1117-3", subj: "cn", mod: 3, cat: "practice", text: "CN M3: Distance Vector Routing vs Link State (Dijkstra algorithm trace)", hrs: 2.0 }
    ]
  },
  {
    date: "2026-11-18",
    day: "Wednesday",
    type: "gap",
    phase: 2,
    title: "⚠️ CRITICAL EVE: S3 Networks Eve & Pre-AAD Flash",
    badge: "CN Eve + AAD Prep",
    primarySubj: "cn",
    secondarySubj: "aad",
    tasks: [
      { id: "t-1118-1", subj: "cn", mod: 4, cat: "learn", text: "CN M4: TCP 3-way handshake, Sliding window flow control, TCP Tahoe/Reno congestion phases", hrs: 2.5 },
      { id: "t-1118-2", subj: "cn", mod: 5, cat: "learn", text: "CN M5: DNS resolution, HTTP/HTTPS, RSA public key cryptography numericals", hrs: 2.0 },
      { id: "t-1118-3", subj: "aad", mod: 0, cat: "formula", text: "🚨 ZERO-GAP PRE-FLASH (2.0 hrs): Review Master Theorem, Floyd-Warshall, AVL rotations, Knapsack for Friday morning!", hrs: 2.0 },
      { id: "t-1118-4", subj: "cn", mod: 0, cat: "rev", text: "Sleep by 10:30 PM sharp to survive the back-to-back 19 & 20 Nov exams!", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-19",
    day: "Thursday",
    type: "exam",
    phase: 2,
    title: "⚡ EXAM 4: Computer Networks (S3 Slot D: B24CS2T03) & ZERO-GAP NIGHT",
    badge: "EXAM 4 + 0-GAP MARATHON",
    primarySubj: "cn",
    secondarySubj: "aad",
    tasks: [
      { id: "t-1119-1", subj: "cn", mod: 0, cat: "pyq", text: "EXECUTION: Sit Computer Networks S3 Exam (09:30 AM - 12:30 PM)", hrs: 3.0 },
      { id: "t-1119-2", subj: "aad", mod: 1, cat: "rev", text: "🚨 ZERO-GAP MARATHON (Starts 2:30 PM): AAD M1 & M2: Master Theorem, AVL insert/delete rotations, Disjoint Sets", hrs: 2.5 },
      { id: "t-1119-3", subj: "aad", mod: 3, cat: "practice", text: "AAD M3 & M4: Fractional Knapsack, Kruskal/Prim MST, Dijkstra, Matrix Chain Multiplication, Floyd-Warshall", hrs: 3.0 },
      { id: "t-1119-4", subj: "aad", mod: 5, cat: "rev", text: "AAD M5: P vs NP, Clique & Vertex Cover NP-Completeness proofs, Bin Packing", hrs: 1.5 },
      { id: "t-1119-5", subj: "aad", mod: 0, cat: "rev", text: "Sleep by 11:00 PM: The brain must rest to calculate matrix indices and trees tomorrow", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-20",
    day: "Friday",
    type: "exam",
    phase: 2,
    title: "⚡ EXAM 5: Algorithm Analysis & Design (Slot D: B24CS3T04)",
    badge: "EXAM 5 (CRITICAL PASS)",
    primarySubj: "aad",
    secondarySubj: "ai",
    tasks: [
      { id: "t-1120-1", subj: "aad", mod: 0, cat: "pyq", text: "EXECUTION: Sit Algorithm Analysis and Design Exam (09:30 AM - 12:30 PM). Crack the algorithms!", hrs: 3.0 },
      { id: "t-1120-2", subj: "all", mod: 0, cat: "rev", text: "🎉 CONGRATULATIONS: The hardest zero-gap bottleneck is conquered! Take a long rest until 4:00 PM", hrs: 2.0 },
      { id: "t-1120-3", subj: "ai", mod: 1, cat: "learn", text: "AI M1: Intelligent agents, PEAS model, 4 Agent architectures review", hrs: 1.5 }
    ]
  },
  {
    date: "2026-11-21",
    day: "Saturday",
    type: "gap",
    phase: 2,
    title: "Gap Day 1: AI Search & Game Trees",
    badge: "AI Gap Day 1",
    primarySubj: "ai",
    secondarySubj: "ai",
    tasks: [
      { id: "t-1121-1", subj: "ai", mod: 2, cat: "practice", text: "AI M2: Problem formulation, DLS, IDS performance, A* heuristic admissibility & consistency", hrs: 2.5 },
      { id: "t-1121-2", subj: "ai", mod: 3, cat: "practice", text: "AI M3: Minimax game trees & Alpha-Beta pruning, CSP Cryptarithmetic & Map Coloring", hrs: 2.5 },
      { id: "t-1121-3", subj: "iot", mod: 1, cat: "rev", text: "Light IoT Pass (1 hr): Functional stack, Core network architecture", hrs: 1.0 }
    ]
  },
  {
    date: "2026-11-22",
    day: "Sunday",
    type: "gap",
    phase: 2,
    title: "Gap Day 2: AI Logic, FOL & Modern AI",
    badge: "AI Gap Day 2",
    primarySubj: "ai",
    secondarySubj: "ai",
    tasks: [
      { id: "t-1122-1", subj: "ai", mod: 4, cat: "practice", text: "AI M4: Wumpus World, Propositional logic resolution, First-Order Logic (FOL) unification & chaining", hrs: 3.0 },
      { id: "t-1122-2", subj: "ai", mod: 5, cat: "learn", text: "AI M5: Limitations of symbolic AI, ML paradigms (Supervised, RL, AlphaGo), Ethics & bias", hrs: 2.5 },
      { id: "t-1122-3", subj: "iot", mod: 3, cat: "rev", text: "Light IoT Pass (1 hr): MQTT QoS levels vs CoAP comparison", hrs: 1.0 }
    ]
  },
  {
    date: "2026-11-23",
    day: "Monday",
    type: "gap",
    phase: 2,
    title: "Gap Day 3: AI Eve (Model Question Paper)",
    badge: "AI Eve (Light)",
    primarySubj: "ai",
    secondarySubj: "ai",
    tasks: [
      { id: "t-1123-1", subj: "ai", mod: 0, cat: "pyq", text: "AI Model Paper: Solve Part A (10 questions) and Part B (11 to 20 from S5.pdf)", hrs: 3.0 },
      { id: "t-1123-2", subj: "ai", mod: 0, cat: "rev", text: "Review key definitions: Rationality, Admissibility, Consistent heuristic, MRV/LCV, Alpha-Beta cuts", hrs: 2.0 },
      { id: "t-1123-3", subj: "ai", mod: 0, cat: "rev", text: "Sleep early by 10:30 PM for sharp logical reasoning tomorrow", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-24",
    day: "Tuesday",
    type: "exam",
    phase: 2,
    title: "⚡ EXAM 6: Artificial Intelligence (Slot E: B24CS3T05)",
    badge: "EXAM 6 (09:30 - 12:30)",
    primarySubj: "ai",
    secondarySubj: "iot",
    tasks: [
      { id: "t-1124-1", subj: "ai", mod: 0, cat: "pyq", text: "EXECUTION: Sit Artificial Intelligence Exam (09:30 AM - 12:30 PM)", hrs: 3.0 },
      { id: "t-1124-2", subj: "iot", mod: 1, cat: "rev", text: "Post-Exam Rest until 3:00 PM. IoT Sprint M1 & M2: Functional stack, Sensors/Actuators, LoRaWAN", hrs: 2.5 },
      { id: "t-1124-3", subj: "iot", mod: 3, cat: "learn", text: "IoT M3: 6LoWPAN IP optimization, MQTT architecture vs CoAP protocol messages", hrs: 2.0 }
    ]
  },
  {
    date: "2026-11-25",
    day: "Wednesday",
    type: "gap",
    phase: 2,
    title: "Gap Day 1: IoT Eve (RPi Python, Cloud & Model Paper)",
    badge: "IoT Eve (Light)",
    primarySubj: "iot",
    secondarySubj: "iot",
    tasks: [
      { id: "t-1125-1", subj: "iot", mod: 4, cat: "learn", text: "IoT M4: IoT data lifecycle, Edge streaming analytics vs Cloud analytics, Security risks", hrs: 2.0 },
      { id: "t-1125-2", subj: "iot", mod: 5, cat: "practice", text: "IoT M5: Raspberry Pi GPIO Python programming, RESTful APIs, AWS IoT / ThingSpeak", hrs: 2.5 },
      { id: "t-1125-3", subj: "iot", mod: 0, cat: "pyq", text: "IoT Model Paper: Solve Part A (10 questions) & Part B architectural questions from S5.pdf", hrs: 2.0 },
      { id: "t-1125-4", subj: "iot", mod: 0, cat: "rev", text: "Sleep by 10:30 PM: All theory exams conclude tomorrow morning!", hrs: 0.5 }
    ]
  },
  {
    date: "2026-11-26",
    day: "Thursday",
    type: "exam",
    phase: 2,
    title: "⚡ EXAM 7: Internet of Things (Elective: B24CS3P13) - THEORY FINALE!",
    badge: "THEORY FINALE (09:30 - 12:30)",
    primarySubj: "iot",
    secondarySubj: "all",
    tasks: [
      { id: "t-1126-1", subj: "iot", mod: 0, cat: "pyq", text: "EXECUTION: Sit Internet of Things Exam (09:30 AM - 12:30 PM)", hrs: 3.0 },
      { id: "t-1126-2", subj: "all", mod: 0, cat: "rev", text: "🎉 CELEBRATION & RECHARGE: S5 Regular Theory Examinations are officially COMPLETED!", hrs: 3.0 }
    ]
  },

  // PHASE 3: LAB EXAMS PREP & EXECUTION
  {
    date: "2026-12-01",
    day: "Tuesday",
    type: "lab",
    phase: 3,
    title: "Lab Prep Day 1: Data Analytics Lab (B24CD3L07)",
    badge: "DA Lab Prep",
    primarySubj: "lab",
    secondarySubj: "lab",
    tasks: [
      { id: "t-1201-1", subj: "lab", mod: 1, cat: "practice", text: "DA Lab: Weka exploratory data analysis & document similarity algorithms", hrs: 2.5 },
      { id: "t-1201-2", subj: "lab", mod: 1, cat: "practice", text: "DA Lab: Implement Apriori association rules, K-Means & Single linkage clustering in Python", hrs: 3.0 },
      { id: "t-1201-3", subj: "lab", mod: 1, cat: "pyq", text: "DA Lab: Prepare answers for Viva-voce questions on information gain and distance metrics", hrs: 1.5 }
    ]
  },
  {
    date: "2026-12-02",
    day: "Wednesday",
    type: "lab",
    phase: 3,
    title: "Lab Prep Day 2: Machine Learning Lab (B24AM3L08)",
    badge: "ML Lab Prep",
    primarySubj: "lab",
    secondarySubj: "lab",
    tasks: [
      { id: "t-1202-1", subj: "lab", mod: 2, cat: "practice", text: "ML Lab: Linear & Polynomial regression, Logistic regression (MLE & MAP) on Breast Cancer", hrs: 3.0 },
      { id: "t-1202-2", subj: "lab", mod: 2, cat: "practice", text: "ML Lab: Multilayer Perceptron backpropagation implementation & activation tuning", hrs: 2.5 },
      { id: "t-1202-3", subj: "lab", mod: 2, cat: "pyq", text: "ML Lab: Bagging, Boosting on Titanic dataset & Bias-variance trade-off experiment", hrs: 1.5 }
    ]
  },
  {
    date: "2026-12-03",
    day: "Thursday",
    type: "lab",
    phase: 3,
    title: "Lab Prep Day 3: Record Books & Final Viva Simulation",
    badge: "Lab Record Signoff",
    primarySubj: "lab",
    secondarySubj: "lab",
    tasks: [
      { id: "t-1203-1", subj: "lab", mod: 0, cat: "formula", text: "Lab Records: Verify all 10 Data Analytics + 14 ML Lab experiments are documented", hrs: 2.5 },
      { id: "t-1203-2", subj: "lab", mod: 0, cat: "pyq", text: "Viva Drill: Master performance metrics (Precision, Recall, F1, ROC-AUC, Silhouette score)", hrs: 2.0 },
      { id: "t-1203-3", subj: "lab", mod: 0, cat: "rev", text: "Test Python scripts in VS Code environment to ensure error-free runtime", hrs: 1.5 }
    ]
  },
  {
    date: "2026-12-04",
    day: "Friday",
    type: "lab",
    phase: 3,
    title: "🔬 Practical Exam Window Starts (04 Dec – 11 Dec 2026)",
    badge: "LAB EXAM PERIOD",
    primarySubj: "lab",
    secondarySubj: "lab",
    tasks: [
      { id: "t-1204-1", subj: "lab", mod: 0, cat: "practice", text: "Department Practical Examinations: Execute lab programs & defend viva-voce", hrs: 3.5 },
      { id: "t-1204-2", subj: "all", mod: 0, cat: "rev", text: "CONGRATULATIONS: Successful completion of S5 AIML Autonomous Curriculum!", hrs: 1.0 }
    ]
  }
];
