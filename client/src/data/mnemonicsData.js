// Memory Lab: Mnemonics, Acronyms, and Cognitive Hooks
export const MNEMONICS_DATA = [
  {
    id: "m-osi",
    subject: "cn",
    title: "OSI 7 Layers (Bottom-Up & Top-Down)",
    items: [
      { letter: "P", name: "Physical", hook: "Cables, bits, voltages" },
      { letter: "D", name: "Data Link", hook: "Frames, MAC address, switches" },
      { letter: "N", name: "Network", hook: "Packets, IP address, routers" },
      { letter: "T", name: "Transport", hook: "Segments, TCP/UDP ports" },
      { letter: "S", name: "Session", hook: "Dialog control, sync points" },
      { letter: "P", name: "Presentation", hook: "Syntax, encryption, compression" },
      { letter: "A", name: "Application", hook: "HTTP, DNS, user interface" }
    ],
    mnemonicBottomUp: "Please Do Not Throw Sausage Pizza Away",
    mnemonicTopDown: "All People Seem To Need Data Processing",
    examTip: "Always mention PDU for each layer: Bits (Physical) -> Frames (Data Link) -> Packets (Network) -> Segments (Transport) -> Data (Top 3)."
  },
  {
    id: "m-bigdata-5v",
    subject: "bdp",
    title: "Big Data 5Vs Characteristics",
    items: [
      { letter: "V", name: "Volume", hook: "Terabytes to Petabytes scale" },
      { letter: "V", name: "Velocity", hook: "Speed of data generation & real-time streaming" },
      { letter: "V", name: "Variety", hook: "Structured, Semi-structured (JSON/XML), Unstructured (video/text)" },
      { letter: "V", name: "Veracity", hook: "Trustworthiness, noise, quality, biases" },
      { letter: "V", name: "Value", hook: "Actionable business intelligence extracted" }
    ],
    mnemonicBottomUp: "Vast Velocity Vanquishes Vague Value",
    mnemonicTopDown: "Very Vibrant Vegetables Vibrate Violently",
    examTip: "In 3-mark questions, list all 5 with 1-line definitions. In 12-mark questions, draw the 5V diagram around a central Big Data hub."
  },
  {
    id: "m-compiler-phases",
    subject: "cd",
    title: "Compiler 6 Front & Back-end Phases",
    items: [
      { letter: "L", name: "Lexical Analysis", hook: "Character stream to Tokens" },
      { letter: "S", name: "Syntax Analysis", hook: "Tokens to Parse Tree / AST" },
      { letter: "S", name: "Semantic Analysis", hook: "Type checking & declarations" },
      { letter: "I", name: "Intermediate Code Gen", hook: "Three-address code quadruples" },
      { letter: "C", name: "Code Optimization", hook: "Loop unrolling, dead code elimination" },
      { letter: "T", name: "Target Code Gen", hook: "Assembly / machine code emission" }
    ],
    mnemonicBottomUp: "Lazy Students Seldom Initiate Clever Thoughts",
    mnemonicTopDown: "Lexical Syntax Semantic Intermediate Code Target",
    examTip: "Draw Symbol Table and Error Handler connected to every single phase vertically down the margin!"
  },
  {
    id: "m-deadlock-4cond",
    subject: "aad",
    title: "Coffman's 4 Deadlock Conditions",
    items: [
      { letter: "M", name: "Mutual Exclusion", hook: "At least one non-shareable resource" },
      { letter: "H", name: "Hold and Wait", hook: "Process holds resource while waiting for another" },
      { letter: "N", name: "No Preemption", hook: "Resources cannot be forcibly seized" },
      { letter: "C", name: "Circular Wait", hook: "Cycle P0 -> P1 -> P2 -> P0 in allocation graph" }
    ],
    mnemonicBottomUp: "Many Hungry Nurses Cry",
    mnemonicTopDown: "Mutual-Hold-No-Circle",
    examTip: "Breaking ANY ONE of these four conditions guarantees deadlock prevention."
  },
  {
    id: "m-tcp-congestion",
    subject: "cn",
    title: "TCP Congestion Control Sequence",
    items: [
      { letter: "S", name: "Slow Start", hook: "Exponential window growth (cwnd doubles every RTT)" },
      { letter: "C", name: "Congestion Avoidance", hook: "Linear growth (cwnd increases by 1 MSS every RTT) after ssthresh" },
      { letter: "F", name: "Fast Retransmit", hook: "Triggered on receiving 3 duplicate ACKs" },
      { letter: "F", name: "Fast Recovery", hook: "Halves ssthresh and avoids dropping cwnd to 1" }
    ],
    mnemonicBottomUp: "Smart Cars Fast Forward",
    mnemonicTopDown: "Slow Avoid Retransmit Recover",
    examTip: "Draw the sawtooth curve with threshold ssthresh horizontal line."
  }
];
