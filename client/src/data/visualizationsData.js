// Interactive step-by-step visualizations data for "SHOW ME" engine
export const VISUALIZATION_MODULES = {
  avl: {
    id: "avl",
    title: "AVL Tree Rotations (LL, RR, LR, RL)",
    subject: "aad",
    topic: "AVL Trees",
    description: "Watch how binary search trees self-balance when height imbalances occur.",
    steps: [
      {
        step: 1,
        title: "Initial Balanced State",
        explanation: "Insert 30, then insert 20. The tree maintains BST property with height balanced.",
        treeState: [
          { id: 1, value: 30, x: 50, y: 20, bf: 1, status: "normal" },
          { id: 2, value: 20, x: 30, y: 55, bf: 0, status: "normal", parent: 1 }
        ],
        edges: [{ from: 1, to: 2 }],
        codeHighlight: "insert(20); checkBalance(30); // BF = 1 - 0 = +1 (OK)"
      },
      {
        step: 2,
        title: "Imbalance Triggered (LL Case)",
        explanation: "Insert 10 into the left subtree of node 20. Node 30 balance factor becomes +2 (Unbalanced!).",
        treeState: [
          { id: 1, value: 30, x: 50, y: 20, bf: 2, status: "danger" },
          { id: 2, value: 20, x: 30, y: 50, bf: 1, status: "warning", parent: 1 },
          { id: 3, value: 10, x: 18, y: 80, bf: 0, status: "highlight", parent: 2 }
        ],
        edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }],
        codeHighlight: "insert(10); BF(30) = +2; // Imbalance at Node 30 via Left-of-Left"
      },
      {
        step: 3,
        title: "Applying Right Rotation on Node 30",
        explanation: "Perform a Right Rotation (LL Rotation) around Node 30. Node 20 becomes the new local root.",
        treeState: [
          { id: 2, value: 20, x: 50, y: 25, bf: 0, status: "active" },
          { id: 3, value: 10, x: 28, y: 65, bf: 0, status: "normal", parent: 2 },
          { id: 1, value: 30, x: 72, y: 65, bf: 0, status: "normal", parent: 2 }
        ],
        edges: [{ from: 2, to: 3 }, { from: 2, to: 1 }],
        codeHighlight: "root = rotateRight(node30); // node20 becomes new root, BF restored to 0"
      },
      {
        step: 4,
        title: "LR Double Rotation Setup",
        explanation: "Insert 25 into the right subtree of 20. This prepares an LR imbalance requiring two rotations.",
        treeState: [
          { id: 2, value: 20, x: 50, y: 20, bf: -1, status: "normal" },
          { id: 3, value: 10, x: 28, y: 50, bf: 0, status: "normal", parent: 2 },
          { id: 1, value: 30, x: 72, y: 50, bf: 1, status: "warning", parent: 2 },
          { id: 4, value: 25, x: 60, y: 80, bf: 0, status: "highlight", parent: 1 }
        ],
        edges: [{ from: 2, to: 3 }, { from: 2, to: 1 }, { from: 1, to: 4 }],
        codeHighlight: "insert(25); Left rotation on child + Right rotation on parent"
      },
      {
        step: 5,
        title: "Balanced AVL Invariant Reached",
        explanation: "All nodes now satisfy |Balance Factor| <= 1. Tree search time complexity guaranteed O(log n).",
        treeState: [
          { id: 2, value: 25, x: 50, y: 20, bf: 0, status: "success" },
          { id: 3, value: 20, x: 30, y: 55, bf: 0, status: "success", parent: 2 },
          { id: 1, value: 30, x: 70, y: 55, bf: 0, status: "success", parent: 2 },
          { id: 4, value: 10, x: 18, y: 85, bf: 0, status: "success", parent: 3 }
        ],
        edges: [{ from: 2, to: 3 }, { from: 2, to: 1 }, { from: 3, to: 4 }],
        codeHighlight: "assert(abs(BF) <= 1); // Tree is strictly height balanced!"
      }
    ]
  },

  dijkstra: {
    id: "dijkstra",
    title: "Dijkstra's Shortest Path Algorithm",
    subject: "aad",
    topic: "Single Source Shortest Path",
    description: "Greedy shortest-path relaxation on weighted directed/undirected graphs.",
    steps: [
      {
        step: 1,
        title: "Initialization",
        explanation: "Set source vertex A distance to 0, all other nodes (B, C, D, E) to Infinity. Visited set = empty.",
        nodes: [
          { id: "A", dist: 0, visited: true, x: 20, y: 50 },
          { id: "B", dist: "∞", visited: false, x: 45, y: 20 },
          { id: "C", dist: "∞", visited: false, x: 45, y: 80 },
          { id: "D", dist: "∞", visited: false, x: 75, y: 30 },
          { id: "E", dist: "∞", visited: false, x: 75, y: 70 }
        ],
        edges: [
          { u: "A", v: "B", weight: 4, active: true },
          { u: "A", v: "C", weight: 2, active: true },
          { u: "B", v: "D", weight: 5, active: false },
          { u: "C", v: "B", weight: 1, active: false },
          { u: "C", v: "E", weight: 8, active: false },
          { u: "D", v: "E", weight: 2, active: false }
        ],
        codeHighlight: "dist['A'] = 0; dist[others] = INF; PQ.insert('A', 0);"
      },
      {
        step: 2,
        title: "Relax Neighbors of A",
        explanation: "From A: dist[B] = 0 + 4 = 4; dist[C] = 0 + 2 = 2. Smallest unvisited is C (dist=2).",
        nodes: [
          { id: "A", dist: 0, visited: true, x: 20, y: 50 },
          { id: "B", dist: 4, visited: false, x: 45, y: 20 },
          { id: "C", dist: 2, visited: true, x: 45, y: 80 },
          { id: "D", dist: "∞", visited: false, x: 75, y: 30 },
          { id: "E", dist: "∞", visited: false, x: 75, y: 70 }
        ],
        edges: [
          { u: "A", v: "B", weight: 4, active: false },
          { u: "A", v: "C", weight: 2, active: true },
          { u: "B", v: "D", weight: 5, active: false },
          { u: "C", v: "B", weight: 1, active: true },
          { u: "C", v: "E", weight: 8, active: true },
          { u: "D", v: "E", weight: 2, active: false }
        ],
        codeHighlight: "u = PQ.extractMin(); // u = 'C' with dist = 2"
      },
      {
        step: 3,
        title: "Relax Neighbors of C (B and E)",
        explanation: "Through C: dist[B] updated to min(4, 2 + 1) = 3! dist[E] updated to 2 + 8 = 10.",
        nodes: [
          { id: "A", dist: 0, visited: true, x: 20, y: 50 },
          { id: "B", dist: 3, visited: false, x: 45, y: 20 },
          { id: "C", dist: 2, visited: true, x: 45, y: 80 },
          { id: "D", dist: "∞", visited: false, x: 75, y: 30 },
          { id: "E", dist: 10, visited: false, x: 75, y: 70 }
        ],
        edges: [
          { u: "A", v: "B", weight: 4, active: false },
          { u: "A", v: "C", weight: 2, active: false },
          { u: "B", v: "D", weight: 5, active: true },
          { u: "C", v: "B", weight: 1, active: true },
          { u: "C", v: "E", weight: 8, active: false },
          { u: "D", v: "E", weight: 2, active: false }
        ],
        codeHighlight: "if (dist[C] + 1 < dist[B]) dist[B] = 3; // Relaxation success!"
      },
      {
        step: 4,
        title: "Process B and Relax D",
        explanation: "Node B is minimum (3). Relax D: dist[D] = 3 + 5 = 8.",
        nodes: [
          { id: "A", dist: 0, visited: true, x: 20, y: 50 },
          { id: "B", dist: 3, visited: true, x: 45, y: 20 },
          { id: "C", dist: 2, visited: true, x: 45, y: 80 },
          { id: "D", dist: 8, visited: false, x: 75, y: 30 },
          { id: "E", dist: 10, visited: false, x: 75, y: 70 }
        ],
        edges: [
          { u: "A", v: "B", weight: 4, active: false },
          { u: "A", v: "C", weight: 2, active: false },
          { u: "B", v: "D", weight: 5, active: true },
          { u: "C", v: "B", weight: 1, active: false },
          { u: "C", v: "E", weight: 8, active: false },
          { u: "D", v: "E", weight: 2, active: true }
        ],
        codeHighlight: "dist[D] = dist[B] + weight(B, D) = 3 + 5 = 8"
      },
      {
        step: 5,
        title: "Final Optimal Paths Established",
        explanation: "Process D (dist=8). Relax E: dist[E] = min(10, 8 + 2) = 10. All nodes finalized!",
        nodes: [
          { id: "A", dist: 0, visited: true, x: 20, y: 50 },
          { id: "B", dist: 3, visited: true, x: 45, y: 20 },
          { id: "C", dist: 2, visited: true, x: 45, y: 80 },
          { id: "D", dist: 8, visited: true, x: 75, y: 30 },
          { id: "E", dist: 10, visited: true, x: 75, y: 70 }
        ],
        edges: [
          { u: "A", v: "C", weight: 2, active: true },
          { u: "C", v: "B", weight: 1, active: true },
          { u: "B", v: "D", weight: 5, active: true },
          { u: "D", v: "E", weight: 2, active: true }
        ],
        codeHighlight: "// Shortest Path Tree Complete: O((V + E) log V)"
      }
    ]
  },

  tcp: {
    id: "tcp",
    title: "TCP 3-Way Handshake & Sliding Window",
    subject: "cn",
    topic: "Transport Layer Protocols",
    description: "Reliable connection establishment and flow control packet mechanics.",
    steps: [
      {
        step: 1,
        title: "SYN Segment (Client -> Server)",
        explanation: "Client initiates connection with SYN=1, choosing random initial sequence number ISN(c) = 1000.",
        clientState: "SYN-SENT (Seq=1000)",
        serverState: "LISTEN",
        packet: { direction: "right", label: "SYN: Seq=1000, ACK=0", type: "syn" },
        progress: 25
      },
      {
        step: 2,
        title: "SYN-ACK Segment (Server -> Client)",
        explanation: "Server responds with SYN=1, ACK=1. Sets Seq=5000, and Ack=1001 acknowledging client's SYN.",
        clientState: "SYN-SENT",
        serverState: "SYN-RECEIVED (Seq=5000, Ack=1001)",
        packet: { direction: "left", label: "SYN-ACK: Seq=5000, Ack=1001", type: "syn-ack" },
        progress: 50
      },
      {
        step: 3,
        title: "ACK Segment (Client -> Server)",
        explanation: "Client sends ACK=1, Seq=1001, Ack=5001. Connection is now fully established!",
        clientState: "ESTABLISHED",
        serverState: "ESTABLISHED",
        packet: { direction: "right", label: "ACK: Seq=1001, Ack=5001", type: "ack" },
        progress: 75
      },
      {
        step: 4,
        title: "Sliding Window Flow Control",
        explanation: "Sender sends packets 1, 2, 3 within advertised window (Win=3). As ACKs return, window slides forward.",
        clientState: "Transmitting Win [1001 .. 1003]",
        serverState: "Receiving Buffers",
        packet: { direction: "right", label: "Data Segments (Sliding Window size = 3)", type: "data" },
        progress: 100
      }
    ]
  },

  compiler: {
    id: "compiler",
    title: "Compiler Pipeline: Lexical to 3AC Code",
    subject: "cd",
    topic: "Compiler Architecture",
    description: "Step through how source code transforms into three-address code quadruples.",
    steps: [
      {
        step: 1,
        title: "Source Expression",
        explanation: "Input high level code: position = initial + rate * 60",
        source: "position = initial + rate * 60;",
        outputType: "source",
        outputData: "position = initial + rate * 60;"
      },
      {
        step: 2,
        title: "Lexical Analyzer (Scanner)",
        explanation: "Streams of characters mapped into token tuples <token-name, attribute-value>.",
        source: "position = initial + rate * 60;",
        outputType: "tokens",
        outputData: [
          "<id, 1 (position)>",
          "<=>",
          "<id, 2 (initial)>",
          "<+>",
          "<id, 3 (rate)>",
          "<*>",
          "<number, 60>"
        ]
      },
      {
        step: 3,
        title: "Syntax Analyzer (Parser & Parse Tree)",
        explanation: "Constructs hierarchical Abstract Syntax Tree validating Context-Free Grammar precedence (* over +).",
        source: "position = initial + rate * 60;",
        outputType: "ast",
        outputData: {
          root: "=",
          left: "id(position)",
          right: {
            op: "+",
            left: "id(initial)",
            right: {
              op: "*",
              left: "id(rate)",
              right: "60"
            }
          }
        }
      },
      {
        step: 4,
        title: "Intermediate Code Generation (Three-Address Code)",
        explanation: "Decomposes tree into linearized instructions with at most three addresses per command.",
        source: "position = initial + rate * 60;",
        outputType: "tac",
        outputData: [
          "t1 = inttofloat(60)",
          "t2 = id3 * t1",
          "t3 = id2 + t2",
          "id1 = t3"
        ]
      },
      {
        step: 5,
        title: "Quadruple Representation (Op, Arg1, Arg2, Result)",
        explanation: "Standard compiler record structure ready for optimization and target machine emission.",
        source: "position = initial + rate * 60;",
        outputType: "quadruples",
        outputData: [
          { op: "inttofloat", arg1: "60", arg2: "-", res: "t1" },
          { op: "*", arg1: "rate", arg2: "t1", res: "t2" },
          { op: "+", arg1: "initial", arg2: "t2", res: "t3" },
          { op: "=", arg1: "t3", arg2: "-", res: "position" }
        ]
      }
    ]
  },

  masterTheorem: {
    id: "masterTheorem",
    title: "Master Theorem Branch Visualizer",
    subject: "aad",
    topic: "Solving Recurrences",
    description: "Interactive visual decision logic for recurrences of form T(n) = aT(n/b) + f(n).",
    cases: [
      {
        caseNum: 1,
        condition: "f(n) = O(n^(log_b(a) - ε)) for some ε > 0",
        meaning: "The work at the root f(n) is asymptotically smaller than leaf work n^(log_b a). Leaves dominate!",
        solution: "T(n) = Θ(n^(log_b a))",
        example: "T(n) = 8T(n/2) + 1000n^2 => log_2(8) = 3 => n^3 dominates n^2 => T(n) = Θ(n^3)"
      },
      {
        caseNum: 2,
        condition: "f(n) = Θ(n^(log_b a) * log^k n) where k >= 0",
        meaning: "Work is evenly distributed across all tree levels.",
        solution: "T(n) = Θ(n^(log_b a) * log^(k+1) n)",
        example: "T(n) = 2T(n/2) + 10n => log_2(2) = 1 => f(n) = Θ(n) => T(n) = Θ(n log n) [Merge Sort!]"
      },
      {
        caseNum: 3,
        condition: "f(n) = Ω(n^(log_b(a) + ε)) and regularity condition a*f(n/b) <= c*f(n)",
        meaning: "The work at the root f(n) dominates all recursive subdivision. Root dominates!",
        solution: "T(n) = Θ(f(n))",
        example: "T(n) = 2T(n/2) + n^2 => log_2(2) = 1 => f(n) = n^2 dominates n^1 => T(n) = Θ(n^2)"
      }
    ]
  }
};
