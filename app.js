const assets = [
  "NASDAQ 100",
  "S&P 500",
  "XAU/USD",
  "XAG/USD",
  "EUR/USD",
  "AUD/USD",
  "NVIDIA",
  "TESLA",
  "AIRBNB",
  "WTI OIL/USD",
  "BTC/USD",
  "ETH/USD",
  "LTC/USD",
];

const lensAssets = [
  "BTC/USD",
  "ETH/USD",
  "LTC/USD",
  "NASDAQ 100",
  "S&P 500",
  "NVIDIA",
  "XAU/USD",
  "EUR/USD",
  "WTI OIL/USD",
];

const styleModes = {
  Scalping: {
    label: "Scalping",
    description:
      "Seconds to 1m-5m chart. Fast trades based on live/current price, spread, volume bursts, micro levels, and very tight invalidation.",
    setupSuffix: "micro pullback",
    targetTone: "quick partial",
    stopTone: "tight stop",
    chartTimeframe: "seconds-1m-5m",
    confidenceShift: -4,
    rrShift: -0.35,
    winShift: 0,
    resultMultiplier: 0.65,
    relevantDurations: ["Scalp", "Intraday"],
    holding: "seconds to a few minutes",
  },
  Intraday: {
    label: "Intraday",
    description:
      "5m-15m chart. Short session trades built for roughly 1-2 hours, using live price, VWAP, news, and structure.",
    setupSuffix: "session setup",
    targetTone: "session target",
    stopTone: "level invalidation",
    chartTimeframe: "5m-15m",
    confidenceShift: 0,
    rrShift: 0,
    winShift: 0,
    resultMultiplier: 1,
    relevantDurations: ["Scalp", "Intraday"],
    holding: "about 1-2 hours",
  },
  "Day Trading": {
    label: "Day Trading",
    description:
      "15m chart. Same-day plan that can hold through the full session if the setup keeps working.",
    setupSuffix: "15m day structure",
    targetTone: "full-day target",
    stopTone: "structure stop",
    chartTimeframe: "15m",
    confidenceShift: 2,
    rrShift: 0.2,
    winShift: -1,
    resultMultiplier: 1.15,
    relevantDurations: ["Intraday", "Swing"],
    holding: "same day, up to full session",
  },
  Swing: {
    label: "Swing",
    description:
      "1D chart. Multi-day plan with wider stop loss, higher take profit, macro news, and daily trend alignment.",
    setupSuffix: "1D swing setup",
    targetTone: "multi-day target",
    stopTone: "wide swing stop",
    chartTimeframe: "1D",
    confidenceShift: -2,
    rrShift: 0.55,
    winShift: -4,
    resultMultiplier: 1.35,
    relevantDurations: ["Swing", "Intraday"],
    holding: "multi-day",
  },
};

const categories = ["Crypto", "Forex", "Futures", "Stocks/Indices", "Commodities", "Other"];

const marketMeta = {
  "BTC/USD": {
    category: "Crypto",
    marketType: "Crypto",
    currentPrice: "$74,000",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "COINBASE:BTCUSD",
  },
  "ETH/USD": {
    category: "Crypto",
    marketType: "Crypto",
    currentPrice: "$3,950",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "COINBASE:ETHUSD",
  },
  "LTC/USD": {
    category: "Crypto",
    marketType: "Crypto",
    currentPrice: "$88.00",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "COINBASE:LTCUSD",
  },
  "EUR/USD": {
    category: "Forex",
    marketType: "Forex",
    currentPrice: "$1.0840",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "FX:EURUSD",
  },
  "AUD/USD": {
    category: "Forex",
    marketType: "Forex",
    currentPrice: "$0.6640",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "FX:AUDUSD",
  },
  "NASDAQ 100": {
    category: "Futures",
    marketType: "Futures",
    currentPrice: "$18,960",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "CAPITALCOM:US100",
  },
  "S&P 500": {
    category: "Futures",
    marketType: "Futures",
    currentPrice: "$5,308",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "CAPITALCOM:US500",
  },
  "WTI OIL/USD": {
    category: "Futures",
    marketType: "Futures",
    currentPrice: "$78.46",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "CAPITALCOM:OIL_CRUDE",
  },
  NVIDIA: {
    category: "Stocks/Indices",
    marketType: "Stock",
    currentPrice: "$1,151",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "NASDAQ:NVDA",
  },
  TESLA: {
    category: "Stocks/Indices",
    marketType: "Stock",
    currentPrice: "$178.20",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "NASDAQ:TSLA",
  },
  AIRBNB: {
    category: "Stocks/Indices",
    marketType: "Stock",
    currentPrice: "$146.40",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "NASDAQ:ABNB",
  },
  "XAU/USD": {
    category: "Commodities",
    marketType: "Commodity",
    currentPrice: "$2,344",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "COMEX:GC1!",
  },
  "XAG/USD": {
    category: "Commodities",
    marketType: "Commodity",
    currentPrice: "$31.20",
    dataBasis: "Demo current reference price. Live feed not connected.",
    liveData: false,
    tradingViewSymbol: "COMEX:SI1!",
  },
};

const markets = [
  {
    asset: "NVIDIA",
    symbol: "NVDA",
    action: "Buy",
    bias: "Bullish",
    confidence: 86,
    buyerControl: 84,
    volume: 81,
    newsImpact: 88,
    reversalRisk: 44,
    quality: "A",
    gradeWhy:
      "A because trend, buyer control, volume, and news impact are aligned. The only warning is a fast move that raises reversal risk after extension.",
    setupType: "Pullback continuation",
    entry: "$1,145-$1,152",
    stop: "$1,132",
    target1: "$1,178",
    target2: "$1,196",
    rr: "2.4R",
    noTrade: "Do not chase above $1,175 without a fresh higher-low.",
    invalidation: "Invalid if price loses $1,132 and buyer control drops under 60.",
    timeframes: { "5m": "Bullish", "15m": "Bullish", "1h": "Bullish", Daily: "Neutral" },
    checklist: [
      ["Price near entry", true],
      ["Volume confirming", true],
      ["Risk/reward above 1.5R", true],
      ["Macro risk clear", true],
      ["Reversal risk acceptable", true],
    ],
    confidenceBreakdown: { Trend: 24, Volume: 21, News: 18, Risk: 12, Structure: 14 },
    levels: {
      support: ["$1,145", "$1,132", "$1,108"],
      resistance: ["$1,178", "$1,196", "$1,220"],
      liquidity: ["Stops above $1,178", "Prior breakout retest near $1,145"],
      vwap: "$1,151",
    },
    chart: [11.0, 11.18, 11.12, 11.35, 11.5, 11.46, 11.72, 11.84, 11.62, 11.9, 12.02],
    markers: { entry: 8, stop: 5, exit: 10 },
  },
  {
    asset: "BTC/USD",
    symbol: "BTC",
    action: "Buy",
    bias: "Bullish",
    confidence: 84,
    buyerControl: 82,
    volume: 79,
    newsImpact: 73,
    reversalRisk: 31,
    quality: "A-",
    gradeWhy:
      "A- because buyers control the tape, volume confirms the move, and reversal risk is low. It is not A+ because the news catalyst is supportive but not extreme.",
    setupType: "Breakout retest",
    entry: "$68,950-$69,250",
    stop: "$68,420",
    target1: "$70,450",
    target2: "$71,200",
    rr: "2.1R",
    noTrade: "No trade if price breaks below the retest zone and fails to reclaim it.",
    invalidation: "Invalid below $68,420 or if crypto breadth turns risk-off.",
    timeframes: { "5m": "Bullish", "15m": "Bullish", "1h": "Bullish", Daily: "Bullish" },
    checklist: [
      ["Price near entry", true],
      ["Volume confirming", true],
      ["Risk/reward above 1.5R", true],
      ["Macro risk clear", false],
      ["Reversal risk acceptable", true],
    ],
    confidenceBreakdown: { Trend: 23, Volume: 20, News: 15, Risk: 13, Structure: 13 },
    levels: {
      support: ["$69,000", "$68,420", "$67,800"],
      resistance: ["$70,450", "$71,200", "$72,000"],
      liquidity: ["Stops above $70,450", "Liquidation pocket below $68,420"],
      vwap: "$69,180",
    },
    chart: [66.8, 67.2, 67.1, 67.9, 68.6, 68.4, 69.2, 69.7, 69.4, 70.2, 70.8],
    markers: { entry: 8, stop: 6, exit: 10 },
  },
  {
    asset: "ETH/USD",
    symbol: "ETH",
    action: "Buy",
    bias: "Bullish",
    confidence: 79,
    buyerControl: 76,
    volume: 72,
    newsImpact: 70,
    reversalRisk: 38,
    quality: "B+",
    gradeWhy:
      "B+ because ETH is following crypto strength with solid buyer control and acceptable reversal risk. It is not A quality because BTC is still the cleaner leader.",
    setupType: "Higher-low continuation",
    entry: "$3,720-$3,750",
    stop: "$3,665",
    target1: "$3,835",
    target2: "$3,920",
    rr: "1.9R",
    noTrade: "No trade if ETH/USD loses the higher-low structure while BTC/USD also weakens.",
    invalidation: "Invalid below $3,665 or if ETH/BTC relative strength turns lower.",
    timeframes: { "5m": "Bullish", "15m": "Bullish", "1h": "Bullish", Daily: "Neutral" },
    checklist: [
      ["Price near entry", true],
      ["Volume confirming", true],
      ["Risk/reward above 1.5R", true],
      ["Macro risk clear", false],
      ["Reversal risk acceptable", true],
    ],
    confidenceBreakdown: { Trend: 21, Volume: 18, News: 15, Risk: 12, Structure: 13 },
    levels: {
      support: ["$3,725", "$3,665", "$3,560"],
      resistance: ["$3,835", "$3,920", "$4,050"],
      liquidity: ["Buy stops above $3,835", "Long invalidation below $3,665"],
      vwap: "$3,742",
    },
    chart: [36.4, 36.7, 36.55, 37.1, 37.35, 37.2, 37.65, 37.95, 37.55, 38.25, 38.7],
    markers: { entry: 8, stop: 5, exit: 10 },
  },
  {
    asset: "LTC/USD",
    symbol: "LTC",
    action: "Buy",
    bias: "Bullish",
    confidence: 68,
    buyerControl: 64,
    volume: 61,
    newsImpact: 58,
    reversalRisk: 49,
    quality: "B-",
    gradeWhy:
      "B- because Litecoin is participating in crypto strength, but volume and news impact are weaker than BTC/USD and ETH/USD.",
    setupType: "Range breakout retest",
    entry: "$84.20-$84.80",
    stop: "$82.90",
    target1: "$87.40",
    target2: "$89.20",
    rr: "1.5R",
    noTrade: "No trade if LTC/USD fails to hold the breakout retest or BTC/USD turns risk-off.",
    invalidation: "Invalid below $82.90 or if the breakout turns into a failed move.",
    timeframes: { "5m": "Neutral", "15m": "Bullish", "1h": "Neutral", Daily: "Neutral" },
    checklist: [
      ["Price near entry", true],
      ["Volume confirming", false],
      ["Risk/reward above 1.5R", true],
      ["Macro risk clear", false],
      ["Reversal risk acceptable", false],
    ],
    confidenceBreakdown: { Trend: 17, Volume: 14, News: 12, Risk: 10, Structure: 15 },
    levels: {
      support: ["$84.20", "$82.90", "$80.40"],
      resistance: ["$87.40", "$89.20", "$92.00"],
      liquidity: ["Stops above $87.40", "Failed breakout risk below $82.90"],
      vwap: "$84.55",
    },
    chart: [82.1, 82.6, 82.4, 83.2, 84.0, 83.6, 84.8, 85.4, 84.6, 86.2, 87.1],
    markers: { entry: 8, stop: 5, exit: 10 },
  },
  {
    asset: "NASDAQ 100",
    symbol: "NQ",
    action: "Buy",
    bias: "Bullish",
    confidence: 78,
    buyerControl: 74,
    volume: 68,
    newsImpact: 81,
    reversalRisk: 42,
    quality: "B+",
    gradeWhy:
      "B+ because tech sentiment and news impact are strong, and buyers still have control. It is not an A setup because volume is only moderate and reversal risk rises if support breaks.",
    setupType: "VWAP pullback",
    entry: "$18,940-$18,970",
    stop: "$18,880",
    target1: "$19,060",
    target2: "$19,125",
    rr: "1.9R",
    noTrade: "No trade if price is between VWAP and resistance without a pullback.",
    invalidation: "Invalid if support breaks and buyer control drops below 55.",
    timeframes: { "5m": "Bullish", "15m": "Bullish", "1h": "Neutral", Daily: "Bullish" },
    checklist: [
      ["Price near entry", true],
      ["Volume confirming", false],
      ["Risk/reward above 1.5R", true],
      ["Macro risk clear", true],
      ["Reversal risk acceptable", true],
    ],
    confidenceBreakdown: { Trend: 21, Volume: 17, News: 18, Risk: 12, Structure: 10 },
    levels: {
      support: ["$18,970", "$18,880", "$18,760"],
      resistance: ["$19,060", "$19,125", "$19,240"],
      liquidity: ["Stops above premarket high", "Buy stops above $19,125"],
      vwap: "$18,955",
    },
    chart: [18.72, 18.78, 18.74, 18.86, 18.91, 18.88, 18.98, 19.04, 18.96, 19.08, 19.13],
    markers: { entry: 8, stop: 5, exit: 10 },
  },
  {
    asset: "EUR/USD",
    symbol: "EURUSD",
    action: "No Trade",
    bias: "Neutral",
    confidence: 63,
    buyerControl: 51,
    volume: 57,
    newsImpact: 74,
    reversalRisk: 52,
    quality: "B-",
    gradeWhy:
      "B- because EUR/USD is macro-sensitive near Fed and CPI risk, but current structure is not clean enough for a forced directional trade.",
    setupType: "Macro range wait",
    entry: "Break above $1.0870 or rejection near $1.0805",
    stop: "Back inside range",
    target1: "$1.0910 / $1.0765",
    target2: "$1.0960 / $1.0715",
    rr: "1.4R",
    noTrade: "No trade if price stays between range midpoint and VWAP.",
    invalidation: "Invalid if dollar momentum reverses against the setup.",
    timeframes: { "5m": "Neutral", "15m": "Neutral", "1h": "Neutral", Daily: "Neutral" },
    checklist: [
      ["Price near entry", false],
      ["Volume confirming", false],
      ["Risk/reward above 1.5R", false],
      ["Macro risk clear", false],
      ["Reversal risk acceptable", true],
    ],
    confidenceBreakdown: { Trend: 14, Volume: 13, News: 17, Risk: 8, Structure: 11 },
    levels: {
      support: ["$1.0805", "$1.0765", "$1.0715"],
      resistance: ["$1.0870", "$1.0910", "$1.0960"],
      liquidity: ["Stops above $1.0870", "Stops below $1.0805"],
      vwap: "$1.0840",
    },
    chart: [1.081, 1.083, 1.082, 1.085, 1.084, 1.0835, 1.086, 1.0845, 1.0855, 1.084, 1.0865],
    markers: { entry: 7, stop: 2, exit: 10 },
  },
  {
    asset: "AUD/USD",
    symbol: "AUDUSD",
    action: "No Trade",
    bias: "Neutral",
    confidence: 59,
    buyerControl: 48,
    volume: 54,
    newsImpact: 62,
    reversalRisk: 55,
    quality: "C+",
    gradeWhy:
      "C+ because AUD/USD lacks strong control and is vulnerable to dollar and risk-sentiment shifts.",
    setupType: "Risk sentiment wait",
    entry: "Break above $0.6670 or rejection near $0.6615",
    stop: "Back inside range",
    target1: "$0.6705 / $0.6585",
    target2: "$0.6740 / $0.6545",
    rr: "1.2R",
    noTrade: "No trade while risk sentiment is mixed and price remains near the middle of the range.",
    invalidation: "Invalid if dollar strength or equity weakness breaks the setup.",
    timeframes: { "5m": "Neutral", "15m": "Neutral", "1h": "Neutral", Daily: "Bearish" },
    checklist: [
      ["Price near entry", false],
      ["Volume confirming", false],
      ["Risk/reward above 1.5R", false],
      ["Macro risk clear", false],
      ["Reversal risk acceptable", false],
    ],
    confidenceBreakdown: { Trend: 12, Volume: 12, News: 13, Risk: 8, Structure: 14 },
    levels: {
      support: ["$0.6615", "$0.6585", "$0.6545"],
      resistance: ["$0.6670", "$0.6705", "$0.6740"],
      liquidity: ["Stops above $0.6670", "Stops below $0.6615"],
      vwap: "$0.6640",
    },
    chart: [0.662, 0.664, 0.663, 0.665, 0.664, 0.6635, 0.666, 0.664, 0.665, 0.663, 0.6645],
    markers: { entry: 7, stop: 2, exit: 10 },
  },
  {
    asset: "XAU/USD",
    symbol: "Gold",
    action: "Sell",
    bias: "Bearish",
    confidence: 72,
    buyerControl: 36,
    volume: 66,
    newsImpact: 77,
    reversalRisk: 39,
    quality: "B+",
    gradeWhy:
      "B+ because sellers have control and macro news is pressuring gold. It is not A quality because volume is solid rather than dominant.",
    setupType: "Failed bounce",
    entry: "$2,342-$2,347",
    stop: "$2,355",
    target1: "$2,326",
    target2: "$2,315",
    rr: "1.8R",
    noTrade: "No trade if price reclaims $2,355 and holds above it.",
    invalidation: "Invalid above $2,355 or if yields reverse sharply lower.",
    timeframes: { "5m": "Bearish", "15m": "Bearish", "1h": "Neutral", Daily: "Neutral" },
    checklist: [
      ["Price near entry", true],
      ["Volume confirming", true],
      ["Risk/reward above 1.5R", true],
      ["Macro risk clear", false],
      ["Reversal risk acceptable", true],
    ],
    confidenceBreakdown: { Trend: 19, Volume: 17, News: 17, Risk: 9, Structure: 10 },
    levels: {
      support: ["$2,326", "$2,315", "$2,300"],
      resistance: ["$2,347", "$2,355", "$2,372"],
      liquidity: ["Sell stops below $2,326", "Short invalidation above $2,355"],
      vwap: "$2,344",
    },
    chart: [23.7, 23.62, 23.68, 23.5, 23.42, 23.48, 23.31, 23.24, 23.35, 23.18, 23.08],
    markers: { entry: 8, stop: 2, exit: 10 },
  },
  {
    asset: "S&P 500",
    symbol: "ES",
    action: "No Trade",
    bias: "Neutral",
    confidence: 61,
    buyerControl: 52,
    volume: 58,
    newsImpact: 64,
    reversalRisk: 50,
    quality: "B",
    gradeWhy:
      "B because the market is stable but neither buyers nor sellers have clean control. Wait for a range break or deeper pullback.",
    setupType: "Range compression",
    entry: "Above $5,330 or pullback to $5,285",
    stop: "Back inside range",
    target1: "$5,355",
    target2: "$5,380",
    rr: "1.4R",
    noTrade: "No trade while price sits in the middle of the range.",
    invalidation: "Directional idea invalid if price rejects the range edge.",
    timeframes: { "5m": "Neutral", "15m": "Neutral", "1h": "Neutral", Daily: "Bullish" },
    checklist: [
      ["Price near entry", false],
      ["Volume confirming", false],
      ["Risk/reward above 1.5R", false],
      ["Macro risk clear", true],
      ["Reversal risk acceptable", true],
    ],
    confidenceBreakdown: { Trend: 15, Volume: 14, News: 13, Risk: 10, Structure: 9 },
    levels: {
      support: ["$5,285", "$5,260", "$5,230"],
      resistance: ["$5,330", "$5,355", "$5,380"],
      liquidity: ["Stops above $5,330", "Stops below $5,285"],
      vwap: "$5,308",
    },
    chart: [52.8, 53.0, 52.9, 53.2, 53.1, 52.95, 53.22, 53.05, 53.18, 53.12, 53.25],
    markers: { entry: 7, stop: 2, exit: 10 },
  },
  {
    asset: "WTI OIL/USD",
    symbol: "Oil",
    action: "No Trade",
    bias: "Neutral",
    confidence: 56,
    buyerControl: 49,
    volume: 62,
    newsImpact: 70,
    reversalRisk: 58,
    quality: "C+",
    gradeWhy:
      "C+ because price is trapped between competing supply and demand headlines. Reversal risk is too high for a clean directional trade.",
    setupType: "Range break only",
    entry: "Confirmed break above $78.90 or below $78.10",
    stop: "Back inside prior range",
    target1: "$79.45 / $77.55",
    target2: "$80.10 / $76.95",
    rr: "1.3R",
    noTrade: "No trade until price leaves the range with volume.",
    invalidation: "Invalid if breakout fails back into range.",
    timeframes: { "5m": "Neutral", "15m": "Neutral", "1h": "Neutral", Daily: "Bearish" },
    checklist: [
      ["Price near entry", false],
      ["Volume confirming", false],
      ["Risk/reward above 1.5R", false],
      ["Macro risk clear", false],
      ["Reversal risk acceptable", false],
    ],
    confidenceBreakdown: { Trend: 12, Volume: 14, News: 14, Risk: 6, Structure: 10 },
    levels: {
      support: ["$78.10", "$77.55", "$76.95"],
      resistance: ["$78.90", "$79.45", "$80.10"],
      liquidity: ["Stops clustered outside range", "Inventory headline risk"],
      vwap: "$78.46",
    },
    chart: [78.2, 78.6, 78.1, 78.8, 78.3, 78.65, 78.25, 78.72, 78.34, 78.58, 78.4],
    markers: { entry: 7, stop: 6, exit: 9 },
  },
];

const news = [
  {
    title: "Treasury yields ease as traders price a softer inflation path",
    importance: 9,
    relevance: 94,
    assets: ["NASDAQ 100", "S&P 500", "NVIDIA"],
    duration: "Intraday",
    why: "Lower yields support long-duration equity risk and improve the quality of bullish index setups.",
    styleNotes: {
      Scalping: "For scalping, this matters only if yields keep dropping during the current push.",
      Intraday: "For intraday, lower yields support buying pullbacks instead of chasing highs.",
      "Day Trading": "For day trading, it supports holding winners toward the next resistance zone.",
      Swing: "For swing trades, this helps if the yield move persists into the daily close.",
    },
  },
  {
    title: "BTC/USD holds above prior breakout while spot demand remains firm",
    importance: 8,
    relevance: 91,
    assets: ["BTC/USD", "ETH/USD", "LTC/USD"],
    duration: "Swing",
    why: "Crypto leadership remains constructive while buyers defend the breakout area.",
    styleNotes: {
      Scalping: "For scalping, only use this if BTC/USD reclaims the micro retest with volume.",
      Intraday: "For intraday, the defended breakout supports buying controlled pullbacks.",
      "Day Trading": "For day trading, BTC/USD can be held longer if the prior high becomes support.",
      Swing: "For swing, this is one of the more relevant headlines because spot demand can persist.",
    },
  },
  {
    title: "ETH/USD follows Bitcoin higher but still needs relative strength confirmation",
    importance: 7,
    relevance: 88,
    assets: ["ETH/USD", "BTC/USD"],
    duration: "Intraday",
    why: "Ethereum participation improves crypto breadth, but ETH/USD needs to hold its higher-low structure to become a cleaner buy.",
    styleNotes: {
      Scalping: "For scalping, ETH/USD needs a fast reclaim of VWAP with volume; otherwise BTC/USD is cleaner.",
      Intraday: "For intraday, ETH/USD is tradable on controlled pullbacks while BTC remains firm.",
      "Day Trading": "For day trading, watch the 15m higher-low and whether ETH keeps pace with BTC.",
      Swing: "For swing, ETH/USD needs daily relative strength before it deserves full-size exposure.",
    },
  },
  {
    title: "LTC/USD tests breakout retest as crypto breadth improves",
    importance: 6,
    relevance: 80,
    assets: ["LTC/USD", "BTC/USD", "ETH/USD"],
    duration: "Scalp",
    why: "Litecoin is participating, but weaker volume means the setup needs tighter confirmation than BTC/USD or ETH/USD.",
    styleNotes: {
      Scalping: "For scalping, LTC/USD is only interesting at the breakout retest with tight invalidation.",
      Intraday: "For intraday, LTC/USD is lower priority unless volume expands above the retest.",
      "Day Trading": "For day trading, wait for a 15m close above the retest before trusting the move.",
      Swing: "For swing, LTC/USD is not as attractive unless it clears higher resistance and crypto breadth stays strong.",
    },
  },
  {
    title: "Fed speaker warns inflation progress may slow into next CPI print",
    importance: 8,
    relevance: 86,
    assets: ["NASDAQ 100", "S&P 500", "XAU/USD", "EUR/USD"],
    duration: "Intraday",
    why: "Rate-sensitive USD markets can reprice quickly when Fed messaging changes before CPI.",
    styleNotes: {
      Scalping: "For scalping, this is a reason to cut faster around sudden Fed headlines.",
      Intraday: "For intraday, it means avoid new entries right into speaker volatility.",
      "Day Trading": "For day trading, Fed tone can decide whether morning direction survives afternoon trade.",
      Swing: "For swing, Fed messaging matters because it can change the whole macro backdrop.",
    },
  },
  {
    title: "Crude consolidates as supply headlines offset weak demand data",
    importance: 6,
    relevance: 73,
    assets: ["WTI OIL/USD"],
    duration: "Intraday",
    why: "Mixed drivers reduce trade quality until price leaves the current range.",
    styleNotes: {
      Scalping: "For scalping, only range edges are tradable; midpoint trades are low quality.",
      Intraday: "For intraday, wait for a confirmed break outside the range.",
      "Day Trading": "For day trading, oil needs a range break plus headline confirmation.",
      Swing: "For swing, mixed supply and demand headlines mean patience is better than early entry.",
    },
  },
  {
    title: "Tesla volume expands after premarket delivery commentary",
    importance: 7,
    relevance: 79,
    assets: ["TESLA", "NASDAQ 100"],
    duration: "Scalp",
    why: "Single-name volatility can lift Nasdaq beta, but reversal risk remains elevated.",
    styleNotes: {
      Scalping: "For scalping, this is directly relevant because TSLA can move Nasdaq quickly.",
      Intraday: "For intraday, Tesla strength helps Nasdaq only if breadth confirms.",
      "Day Trading": "For day trading, watch whether the Tesla move holds after the open.",
      Swing: "For swing, this headline is less important unless it changes sector leadership.",
    },
  },
];

const backtests = [
  {
    asset: "NVIDIA",
    trades: 100,
    wins: 61,
    losses: 39,
    averageWinR: 0.82,
    averageLossR: -0.55,
    expectancyR: 0.29,
    profitFactor: 2.34,
    maxDrawdownR: -4.1,
    resultR: 29.0,
    note: "Best scalp profile. Pullbacks held structure well and average loss stayed controlled.",
  },
  {
    asset: "BTC/USD",
    trades: 100,
    wins: 58,
    losses: 42,
    averageWinR: 0.78,
    averageLossR: -0.57,
    expectancyR: 0.21,
    profitFactor: 1.89,
    maxDrawdownR: -5.6,
    resultR: 21.3,
    note: "Good but more volatile. Works best when the retest is clean and not near macro news.",
  },
  {
    asset: "ETH/USD",
    trades: 100,
    wins: 56,
    losses: 44,
    averageWinR: 0.74,
    averageLossR: -0.59,
    expectancyR: 0.15,
    profitFactor: 1.61,
    maxDrawdownR: -6.2,
    resultR: 15.4,
    note: "Playable crypto setup. ETH/USD performs best when BTC/USD stays firm and ETH holds higher-low structure.",
  },
  {
    asset: "LTC/USD",
    trades: 100,
    wins: 51,
    losses: 49,
    averageWinR: 0.68,
    averageLossR: -0.64,
    expectancyR: 0.04,
    profitFactor: 1.11,
    maxDrawdownR: -8.4,
    resultR: 3.4,
    note: "Small edge only. LTC/USD needs stricter confirmation because volume and news impact are weaker.",
  },
  {
    asset: "NASDAQ 100",
    trades: 100,
    wins: 55,
    losses: 45,
    averageWinR: 0.72,
    averageLossR: -0.6,
    expectancyR: 0.13,
    profitFactor: 1.47,
    maxDrawdownR: -6.8,
    resultR: 12.6,
    note: "Positive but less clean. B+ setups need strict entry discipline and no midpoint chasing.",
  },
  {
    asset: "XAU/USD",
    trades: 100,
    wins: 53,
    losses: 47,
    averageWinR: 0.7,
    averageLossR: -0.62,
    expectancyR: 0.08,
    profitFactor: 1.27,
    maxDrawdownR: -7.4,
    resultR: 8.0,
    note: "Small edge. Best results came from failed bounces after yields confirmed direction.",
  },
  {
    asset: "S&P 500",
    trades: 100,
    wins: 48,
    losses: 52,
    averageWinR: 0.62,
    averageLossR: -0.62,
    expectancyR: -0.02,
    profitFactor: 0.92,
    maxDrawdownR: -9.2,
    resultR: -2.5,
    note: "No-trade label is justified. Range midpoint scalps produced poor expectancy.",
  },
  {
    asset: "WTI OIL/USD",
    trades: 100,
    wins: 46,
    losses: 54,
    averageWinR: 0.68,
    averageLossR: -0.69,
    expectancyR: -0.06,
    profitFactor: 0.84,
    maxDrawdownR: -11.0,
    resultR: -5.9,
    note: "No-trade label is justified. Headline risk and range failures hurt scalping results.",
  },
];

const calendarEvents = [
  {
    name: "CPI Inflation Report",
    time: "Tomorrow 8:30 AM ET",
    severity: "High",
    affected: ["NASDAQ 100", "S&P 500", "XAU/USD", "EUR/USD", "BTC/USD", "ETH/USD", "LTC/USD"],
    rule: "Avoid new trades 15 minutes before release. Wait for first reaction and retest.",
  },
  {
    name: "FOMC Speaker: Powell",
    time: "Today 1:15 PM ET",
    severity: "High",
    affected: ["NASDAQ 100", "S&P 500", "XAU/USD", "BTC/USD", "ETH/USD", "LTC/USD"],
    rule: "Reduce size if in profit. New entries need level confirmation.",
  },
  {
    name: "Crude Oil Inventories",
    time: "Wednesday 10:30 AM ET",
    severity: "Medium",
    affected: ["WTI OIL/USD"],
    rule: "Oil range setups can break violently. Avoid midpoint trades.",
  },
  {
    name: "NFP Jobs Report",
    time: "Friday 8:30 AM ET",
    severity: "High",
    affected: ["NASDAQ 100", "S&P 500", "XAU/USD", "EUR/USD"],
    rule: "Stand aside into release unless already risk-free.",
  },
];

const alerts = [
  "NQ enters $18,940-$18,970 buy zone",
  "BTC/USD loses $68,420 invalidation",
  "CPI risk within 30 minutes",
];

const journal = [
  { asset: "NASDAQ 100", grade: "B+", result: "Pending", note: "Waiting for VWAP pullback." },
  { asset: "BTC/USD", grade: "A-", result: "+1.2R", note: "Breakout retest worked; partial taken." },
];

const state = {
  selectedAsset: "all",
  selectedSetupAction: "all",
  selectedLevelsAsset: "all",
  selectedBacktestAsset: "all",
  selectedNewsAsset: "all",
  selectedCategory: "Crypto",
  marketSearch: "",
  tradingStyle: "Intraday",
  minImportance: 8,
  minRelevance: 70,
  onboardingStep: 0,
  favorites: loadFavorites(),
  notificationsEnabled: loadNotificationSetting(),
  hasLiveSnapshot: false,
};

const byId = (id) => document.getElementById(id);
const liveQuotes = {};
const quoteHistory = {};
let activeDrawerAsset = null;
const notifiedEntries = new Set();
const tradeAnchors = {};
const invalidatedPlans = {};

function init() {
  populateSelects();
  bindEvents();
  renderAll();
  drawPulse();
  fetchLiveQuotes();
  setInterval(fetchLiveQuotes, 1500);
  setInterval(drawPulse, 1600);
}

function populateSelects() {
  for (const id of ["assetFilter", "newsAssetFilter", "levelsAssetFilter", "backtestAssetFilter"]) {
    const select = byId(id);
    assets.forEach((asset) => {
      const option = document.createElement("option");
      option.value = asset;
      option.textContent = asset;
      select.appendChild(option);
    });
  }
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchPage(tab.dataset.page));
  });
  document.querySelectorAll(".style-button").forEach((button) => {
    button.addEventListener("click", () => setTradingStyle(button.dataset.style));
  });
  byId("marketSearch").addEventListener("input", (event) => {
    state.marketSearch = event.target.value.toLowerCase();
    renderMarkets();
  });
  byId("assetFilter").addEventListener("change", (event) => {
    state.selectedAsset = event.target.value;
    renderMarkets();
  });
  byId("setupFilter").addEventListener("change", (event) => {
    state.selectedSetupAction = event.target.value;
    renderSetups();
  });
  byId("levelsAssetFilter").addEventListener("change", (event) => {
    state.selectedLevelsAsset = event.target.value;
    renderLevels();
  });
  byId("backtestAssetFilter").addEventListener("change", (event) => {
    state.selectedBacktestAsset = event.target.value;
    renderBacktests();
  });
  byId("newsAssetFilter").addEventListener("change", (event) => {
    state.selectedNewsAsset = event.target.value;
    renderNews();
  });
  byId("importanceFilter").addEventListener("change", (event) => {
    state.minImportance = Number(event.target.value);
    renderNews();
  });
  byId("relevanceFilter").addEventListener("change", (event) => {
    state.minRelevance = Number(event.target.value);
    renderNews();
  });
  byId("styleFilter").addEventListener("change", (event) => {
    setTradingStyle(event.target.value);
  });
  byId("profileStyle").addEventListener("change", (event) => {
    setTradingStyle(event.target.value);
  });
  byId("refreshButton").addEventListener("click", () => {
    rotateMarketScores();
    renderAll();
    drawPulse();
  });
  byId("confidenceSlider").addEventListener("input", (event) => {
    byId("confidenceLabel").textContent = `${event.target.value}%`;
  });
  byId("notificationsToggle").checked = state.notificationsEnabled;
  byId("notificationsToggle").addEventListener("change", (event) => {
    state.notificationsEnabled = event.target.checked;
    saveNotificationSetting();
    if (state.notificationsEnabled) requestNotificationPermission();
  });
  byId("enableNotificationsButton").addEventListener("click", () => {
    state.notificationsEnabled = true;
    byId("notificationsToggle").checked = true;
    saveNotificationSetting();
    requestNotificationPermission();
  });
  byId("onboardingConfidence").addEventListener("input", (event) => {
    byId("onboardingConfidenceLabel").textContent = `${event.target.value}%`;
  });
  byId("skipOnboarding").addEventListener("click", finishOnboarding);
  byId("nextOnboarding").addEventListener("click", nextOnboarding);
  byId("closeDrawer").addEventListener("click", closeExplanationDrawer);
  byId("explainDrawer").addEventListener("click", (event) => {
    if (event.target.id === "explainDrawer") closeExplanationDrawer();
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".explain-button");
    if (!button) return;
    openExplanationDrawer(button.dataset.asset);
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".favorite-button");
    if (!button) return;
    toggleFavorite(button.dataset.asset);
  });
  byId("selectAllButton").addEventListener("click", () => {
    state.favorites = [...assets];
    saveFavorites();
    document.querySelectorAll(".watch-item input").forEach((input) => {
      input.checked = true;
    });
    renderFavorites();
  });
  byId("addAlertButton").addEventListener("click", () => {
    alerts.unshift("New alert: strongest setup reaches entry zone");
    renderAlerts();
  });
  byId("addJournalButton").addEventListener("click", () => {
    journal.unshift({ asset: "Manual", grade: "-", result: "Open", note: "Trade note added." });
    renderJournal();
  });
  byId("drawerAiForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = byId("drawerAiInput");
    const question = input.value.trim();
    if (!question) return;
    addDrawerAiMessage(question, "user");
    addDrawerAiMessage(answerDrawerQuestion(question), "ai");
    input.value = "";
  });
  document.querySelectorAll("[data-drawer-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      byId("drawerAiInput").value = button.dataset.drawerPrompt;
      byId("drawerAiForm").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
  });
  document.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach((choice) => choice.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
}

function renderAll() {
  syncStyleControls();
  renderCategoryTabs();
  renderMarkets();
  renderSetups();
  renderLevels();
  renderCalendar();
  renderNews();
  renderBacktests();
  renderFavorites();
  renderWatchlist();
  renderAlerts();
  renderJournal();
  renderOnboardingMarkets();
}

async function fetchLiveQuotes() {
  if (!["http:", "https:"].includes(window.location.protocol)) {
    return;
  }
  try {
    const response = await fetch(`/api/quotes?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    Object.assign(liveQuotes, payload.quotes || {});
    recordQuoteHistory(payload.quotes || {});
    if (!state.hasLiveSnapshot) {
      state.hasLiveSnapshot = true;
      renderAll();
    } else {
      updateLiveDrivenUi();
    }
    checkFavoriteEntryAlerts();
  } catch {
    // Keep the app usable when the local live server or network is unavailable.
  }
}

function recordQuoteHistory(quotes) {
  Object.entries(quotes).forEach(([asset, quote]) => {
    if (!quote?.isFresh || !Number.isFinite(quote.price)) return;
    const history = quoteHistory[asset] || [];
    history.push({ price: quote.price, time: Date.now() });
    quoteHistory[asset] = history.filter((point) => Date.now() - point.time <= 90 * 1000).slice(-60);
  });
}

function updateLiveDrivenUi() {
  const currentMarkets = styledMarkets();
  const active = currentMarkets.filter((market) => market.action !== "No Trade" && market.confidence >= 70).length;
  const avg = Math.round(currentMarkets.reduce((sum, market) => sum + market.confidence, 0) / currentMarkets.length);
  byId("activeCount").textContent = active;
  byId("avgConfidence").textContent = `${avg}%`;

  currentMarkets.forEach((market) => {
    document.querySelectorAll(`[data-market-asset="${cssEscape(market.asset)}"]`).forEach((card) => {
      updateField(card, "summary", `${market.action} · ${market.bias} · ${market.chartTimeframe} · ${market.confidence}% confidence`);
      updateField(card, "biasValue", market.bias);
      updateField(card, "enterDecision", market.enterDecision);
      updateField(card, "enterReason", market.enterReason);
      updateField(card, "marketStatus", market.marketStatus);
      updateField(card, "currentPrice", market.currentPrice, true);
      updateField(card, "action", market.action);
      updateField(card, "actionBadge", market.action);
      updateField(card, "entry", market.entry);
      updateField(card, "stop", market.stop);
      updateField(card, "target1", market.target1);
      updateField(card, "target2", market.target2);
      updateField(card, "riskRewardRatio", market.riskRewardRatio);
      updateField(card, "noTrade", market.noTrade);
      updateField(card, "dataBasis", market.dataBasis);
      updateField(card, "simpleSummary", market.simpleSummary);
      updateField(card, "favoriteAlert", market.enterDecision === "YES" ? "READY NOW" : "WAITING");

      card.querySelectorAll(".bias-box").forEach((box) => {
        box.classList.toggle("bullish", market.bias === "Bullish");
        box.classList.toggle("bearish", market.bias === "Bearish");
        box.classList.toggle("neutral", market.bias === "Neutral");
      });
      card.querySelectorAll(".enter-box").forEach((box) => {
        box.classList.toggle("yes", market.enterDecision === "YES");
        box.classList.toggle("no", market.enterDecision !== "YES");
      });
      card.querySelectorAll("[data-live-field='actionBadge']").forEach((badge) => {
        badge.classList.toggle("buy", market.action === "Buy");
        badge.classList.toggle("sell", market.action === "Sell");
        badge.classList.toggle("no-trade", market.action === "No Trade");
      });
      card.querySelectorAll("[data-live-field='favoriteAlertBox']").forEach((box) => {
        box.classList.toggle("ready", market.enterDecision === "YES");
        box.classList.toggle("waiting", market.enterDecision !== "YES");
      });
      card.querySelectorAll(".chart-markers").forEach((markers) => {
        markers.innerHTML = chartMarkerItems(market);
      });
      card.classList.toggle("ready", market.enterDecision === "YES");
      card.classList.toggle("waiting", market.enterDecision !== "YES");
    });
  });
}

function updateField(root, field, value, flash = false) {
  root.querySelectorAll(`[data-live-field="${field}"]`).forEach((element) => {
    if (element.textContent === value) return;
    element.textContent = value;
    if (flash) {
      element.classList.remove("price-tick");
      void element.offsetWidth;
      element.classList.add("price-tick");
    }
  });
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(value);
  return String(value).replace(/"/g, '\\"');
}

function renderCategoryTabs() {
  byId("categoryTabs").innerHTML = categories
    .filter((category) =>
      styledMarkets().some((market) => (market.category || "Other") === category),
    )
    .map(
      (category) =>
        `<button class="category-tab ${category === state.selectedCategory ? "active" : ""}" data-category="${category}">${category}</button>`,
    )
    .join("");
  document.querySelectorAll(".category-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCategory = button.dataset.category;
      state.selectedAsset = "all";
      byId("assetFilter").value = "all";
      renderCategoryTabs();
      renderMarkets();
    });
  });
}

function setTradingStyle(style) {
  state.tradingStyle = styleModes[style] ? style : "Intraday";
  renderAll();
}

function syncStyleControls() {
  const mode = styleModes[state.tradingStyle];
  byId("styleDescription").textContent = mode.description;
  byId("styleFilter").value = state.tradingStyle;
  byId("profileStyle").value = state.tradingStyle;
  document.querySelectorAll(".style-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.style === state.tradingStyle);
  });
}

function switchPage(page) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.page === page);
  });
  document.querySelectorAll(".page").forEach((section) => section.classList.remove("active"));
  byId(`${page}Page`).classList.add("active");
}

function styledMarkets() {
  return markets.map((market) => styledMarket(market));
}

function styledMarket(market) {
  const mode = styleModes[state.tradingStyle];
  const meta = marketMeta[market.asset] || {
    category: "Other",
    marketType: "Other",
    currentPrice: "Unavailable",
    dataBasis: "Live data unavailable.",
    liveData: false,
  };
  const quote = liveQuotes[market.asset];
  const hasFreshQuote = Boolean(quote?.isFresh && Number.isFinite(quote.price));
  const currentPriceValue = hasFreshQuote ? quote.price : null;
  let enrichedMarket = {
    ...market,
    ...meta,
    currentPrice: hasFreshQuote
      ? quote.formatted
      : "No fresh live price",
    currentPriceValue,
    quoteMarketStatus: quote?.marketStatus || null,
    dataBasis: quote
      ? `${quote.source}. Updated ${Math.round(quote.ageSeconds || 0)}s ago. ${quote.note || ""}`
      : meta.dataBasis,
    liveData: hasFreshQuote,
  };
  if (enrichedMarket.liveData && enrichedMarket.currentPriceValue) {
    enrichedMarket = {
      ...enrichedMarket,
      levels: liveAdjustedLevels(enrichedMarket),
    };
  }
  const status = getMarketStatus(meta.marketType, enrichedMarket);
  const forceNoTrade = !enrichedMarket.liveData || !status.isOpen;
  const scalpRead = state.tradingStyle === "Scalping" ? scalpReadForMarket(enrichedMarket) : null;
  const actionForPlan = state.tradingStyle === "Scalping" && scalpRead ? scalpRead.action : market.action;
  const stylePlan = buildStylePlan(enrichedMarket, mode, actionForPlan);
  const adjustedConfidence = state.tradingStyle === "Scalping"
    ? scalpRead.confidence
    : clamp(market.confidence + mode.confidenceShift, 35, 96);
  const baseAction = forceNoTrade ? "No Trade" : state.tradingStyle === "Scalping" ? scalpRead.action : market.action;
  const invalidationState = resolveLiveInvalidation(enrichedMarket, stylePlan, baseAction);
  const adjustedAction = invalidationState.invalidated ? "No Trade" : baseAction;
  const effectiveBias = adjustedAction === "Buy" ? "Bullish" : adjustedAction === "Sell" ? "Bearish" : "Neutral";
  const canEnter =
    adjustedAction !== "No Trade" &&
    status.isOpen &&
    enrichedMarket.liveData &&
    adjustedConfidence >= 70 &&
    !invalidationState.invalidated;
  return {
    ...enrichedMarket,
    marketStatus: status.label,
    marketStatusClass: status.isOpen ? "open" : "closed",
    expectedHold: mode.holding,
    confidence: adjustedConfidence,
    bias: effectiveBias,
    setupType: `${state.tradingStyle} ${market.setupType} · ${mode.setupSuffix}`,
    action: adjustedAction,
    enterDecision: canEnter ? "YES" : "NO",
    enterReason: canEnter
      ? "Fresh quote, market open, and setup conditions are valid."
      : !enrichedMarket.liveData
        ? "No fresh live quote. Do not enter from stale data."
      : !status.isOpen
        ? "Market is closed."
        : invalidationState.invalidated
          ? invalidationState.reason
          : adjustedAction === "No Trade"
            ? state.tradingStyle === "Scalping" && scalpRead
              ? scalpRead.reason
              : "Setup conditions do not justify a trade."
            : "Confidence is below the entry threshold.",
    entry: forceNoTrade ? "No precise entry without a fresh live quote" : scalpRead?.entry || stylePlan.entry,
    stop: forceNoTrade ? "No precise stop without live price confirmation" : scalpRead?.stop || stylePlan.stop,
    target1: forceNoTrade ? "No active target without fresh live price" : scalpRead?.target || stylePlan.target1,
    target2: forceNoTrade ? "No active target without fresh live price" : stylePlan.target2,
    rr: `${Math.max(0.7, Number.parseFloat(market.rr) + mode.rrShift).toFixed(1)}R`,
    riskRewardRatio: forceNoTrade ? "Unavailable" : scalpRead?.ratio || stylePlan.riskRewardRatio || ratioFromR(Math.max(0.7, Number.parseFloat(market.rr) + mode.rrShift)),
    chartTimeframe: mode.chartTimeframe,
    noTrade: forceNoTrade
      ? status.isOpen
        ? "Live data is unavailable or stale. Do not trade from reference prices."
        : "Market closed. Build a plan for the next open session instead."
      : invalidationState.invalidated
        ? invalidationState.reason
        : stylePlan.noTrade,
    invalidation: forceNoTrade
      ? "No active invalidation because precise live/current entry data is unavailable."
      : invalidationState.invalidated
        ? invalidationState.reason
        : stylePlan.invalidation,
    simpleSummary: simpleTradeSummary({
      ...enrichedMarket,
      action: adjustedAction,
      bias: effectiveBias,
      confidence: adjustedConfidence,
      entry: forceNoTrade ? "No precise entry without a fresh live quote" : scalpRead?.entry || stylePlan.entry,
      stop: forceNoTrade ? "No precise stop without live price confirmation" : scalpRead?.stop || stylePlan.stop,
      target1: forceNoTrade ? "No active target without fresh live price" : scalpRead?.target || stylePlan.target1,
      riskRewardRatio: forceNoTrade ? "Unavailable" : scalpRead?.ratio || stylePlan.riskRewardRatio || ratioFromR(Math.max(0.7, Number.parseFloat(market.rr) + mode.rrShift)),
      scalpRead,
    }),
    gradeWhy: state.tradingStyle === "Scalping" && scalpRead
      ? `${market.gradeWhy} Scalp read: ${scalpRead.reason}`
      : `${market.gradeWhy} In ${state.tradingStyle.toLowerCase()} mode, the app weights ${stylePlan.weighting}.`,
    styleRead: forceNoTrade
      ? `${stylePlan.styleRead} Because this app needs a fresh quote to calculate a precise entry, it will not produce a trade from stale or demo/reference data.`
      : stylePlan.styleRead,
  };
}

function liveAdjustedLevels(market) {
  const price = market.currentPriceValue;
  const tight = market.marketType === "Crypto" ? 0.0025 : 0.0015;
  const mid = market.marketType === "Crypto" ? 0.006 : 0.004;
  const wide = market.marketType === "Crypto" ? 0.012 : 0.008;
  return {
    support: [
      formatPriceForMarket(market, price * (1 - tight)),
      formatPriceForMarket(market, price * (1 - mid)),
      formatPriceForMarket(market, price * (1 - wide)),
    ],
    resistance: [
      formatPriceForMarket(market, price * (1 + tight)),
      formatPriceForMarket(market, price * (1 + mid)),
      formatPriceForMarket(market, price * (1 + wide)),
    ],
    liquidity: [
      `Nearby buy stops above ${formatPriceForMarket(market, price * (1 + tight))}`,
      `Nearby sell stops below ${formatPriceForMarket(market, price * (1 - tight))}`,
    ],
    vwap: market.currentPrice,
  };
}

function getMarketStatus(marketType, market = null) {
  if (market?.quoteMarketStatus) {
    const isOpen = market.quoteMarketStatus === "TRADEABLE";
    return {
      label: isOpen ? "Market Open" : `Market ${market.quoteMarketStatus}`,
      isOpen,
    };
  }
  if (marketType === "Crypto") return { label: "Market Open", isOpen: true };
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  const weekday = get("weekday");
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  const minutes = hour * 60 + minute;
  const isWeekend = weekday === "Sat" || weekday === "Sun";
  if (marketType === "Stock") {
    return {
      label: !isWeekend && minutes >= 570 && minutes <= 960 ? "Market Open" : "Market Closed",
      isOpen: !isWeekend && minutes >= 570 && minutes <= 960,
    };
  }
  if (marketType === "Forex") {
    const isOpen = !(weekday === "Sat" || (weekday === "Fri" && minutes >= 1020) || (weekday === "Sun" && minutes < 1020));
    return { label: isOpen ? "Market Open" : "Market Closed", isOpen };
  }
  if (marketType === "Futures" || marketType === "Commodity") {
    const isOpen = !(weekday === "Sat" || (weekday === "Fri" && minutes >= 1020) || (weekday === "Sun" && minutes < 1080));
    return { label: isOpen ? "Market Open" : "Market Closed", isOpen };
  }
  return { label: "Status Unknown", isOpen: false };
}

function scalpProfile(market) {
  if (market.marketType === "Crypto") {
    return {
      entry: 0.00012,
      stop: 0.00065,
      tp1: 0.00045,
      tp2: 0.0009,
      chaseText: "0.04%-0.06%",
    };
  }
  if (market.marketType === "Forex") {
    return {
      entry: 0.00005,
      stop: 0.00022,
      tp1: 0.00016,
      tp2: 0.00032,
      chaseText: "0.01%-0.02%",
    };
  }
  if (market.marketType === "Futures" || market.marketType === "Commodity") {
    return {
      entry: 0.00008,
      stop: 0.00045,
      tp1: 0.00028,
      tp2: 0.00058,
      chaseText: "0.03%",
    };
  }
  return {
    entry: 0.0001,
    stop: 0.00055,
    tp1: 0.00035,
    tp2: 0.00075,
    chaseText: "0.03%-0.05%",
  };
}

function scalpReadForMarket(market) {
  const history = quoteHistory[market.asset] || [];
  const current = market.currentPriceValue;
  if (!market.liveData || !Number.isFinite(current)) {
    return { action: "No Trade", confidence: 35, reason: "No fresh live quote, so there is no scalp.", target: "" };
  }
  if (history.length < 8) {
    return {
      action: "No Trade",
      confidence: 45,
      reason: "WAIT. Waiting for enough live ticks to build a basic auction/value read for the 1m/5m scalp.",
      target: "",
      ratio: "Unavailable",
    };
  }
  const auction = auctionScalpContext(market, history);
  const first = history[0].price;
  const recent = history[Math.max(0, history.length - 4)].price;
  const previous = history[Math.max(0, history.length - 2)].price;
  const shortMovePct = ((current - recent) / recent) * 100;
  const sessionMovePct = ((current - first) / first) * 100;
  const lastTickPct = ((current - previous) / previous) * 100;
  const spreadPct = estimateSpreadPct(market);
  const buyerScore = market.buyerControl + market.volume - market.reversalRisk + auction.deltaScore;
  const sellerScore = 100 - market.buyerControl + market.volume - market.reversalRisk - auction.deltaScore;
  if (spreadPct > maxScalpSpreadPct(market)) {
    return {
      action: "No Trade",
      confidence: 50,
      entry: `Wait for ${auction.locationText} to test and confirm`,
      stop: "No stop until a real entry triggers",
      target: auction.pocText,
      ratio: ratioFromValue(auction.rr),
      reason: simplifiedScalpOutput({
        auction,
        trade: "No Trade",
        confidence: 50,
        reason: `Spread is too wide for a clean scalp (${spreadPct.toFixed(3)}%).`,
      }),
    };
  }
  if (auction.longAllowed && buyerScore >= 72) {
    const confidence = clamp(62 + Math.round(Math.abs(shortMovePct) * 120) + Math.round((market.volume - 60) / 2) + auction.qualityBoost, 60, 94);
    return {
      action: "Buy",
      confidence,
      entry: auction.entryText,
      stop: auction.stopText,
      target: auction.targetText,
      ratio: ratioFromValue(auction.rr),
      reason: simplifiedScalpOutput({
        auction,
        trade: "Long",
        confidence,
        reason: `Buyers are taking control at ${auction.locationText}.`,
      }),
    };
  }
  if (auction.shortAllowed && sellerScore >= 72) {
    const confidence = clamp(62 + Math.round(Math.abs(shortMovePct) * 120) + Math.round((market.volume - 60) / 2) + auction.qualityBoost, 60, 94);
    return {
      action: "Sell",
      confidence,
      entry: auction.entryText,
      stop: auction.stopText,
      target: auction.targetText,
      ratio: ratioFromValue(auction.rr),
      reason: simplifiedScalpOutput({
        auction,
        trade: "Short",
        confidence,
        reason: `Sellers are taking control at ${auction.locationText}.`,
      }),
    };
  }
  const confidence = clamp(42 + Math.round(market.volume / 5) - Math.round(market.reversalRisk / 6) + Math.round(Math.abs(auction.deltaScore) / 5), 35, 68);
  return {
    action: "No Trade",
    confidence,
    entry: `Wait for ${auction.locationText} to test and confirm`,
    stop: "No stop until a real entry triggers",
    target: auction.pocText,
    ratio: ratioFromValue(auction.rr),
    reason: simplifiedScalpOutput({
      auction,
      trade: "No Trade",
      confidence,
      reason: `Wait because market state, location, and aggression do not all line up yet.`,
    }),
  };
}

function auctionScalpContext(market, history) {
  const current = market.currentPriceValue;
  const prices = history.map((point) => point.price);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const range = Math.max(high - low, current * 0.00001);
  const poc = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const vah = low + range * 0.7;
  const val = low + range * 0.3;
  const upperLvn = low + range * 0.62;
  const lowerLvn = low + range * 0.38;
  const upperHvn = poc + range * 0.12;
  const lowerHvn = poc - range * 0.12;
  const start = prices[0];
  const directionalMovePct = ((current - start) / start) * 100;
  const valueWidthPct = (range / current) * 100;
  const momentum = directionalMovePct;
  const marketState =
    Math.abs(momentum) > scalpMomentumThreshold(market) * 2.4 && (current > vah || current < val)
      ? "Out of Balance"
      : "Balanced";
  let cvd = 0;
  let upTicks = 0;
  let downTicks = 0;
  for (let index = 1; index < prices.length; index += 1) {
    const change = prices[index] - prices[index - 1];
    cvd += change;
    if (change > 0) upTicks += 1;
    if (change < 0) downTicks += 1;
  }
  const deltaScore = upTicks - downTicks;
  const nearLowerLvn = Math.abs(current - lowerLvn) <= range * 0.18;
  const nearUpperLvn = Math.abs(current - upperLvn) <= range * 0.18;
  const failedLowAuction = low < val && current > val && current < poc;
  const failedHighAuction = high > vah && current < vah && current > poc;
  const positiveAggression = deltaScore >= 2 && cvd > 0 && market.volume >= 64;
  const negativeAggression = deltaScore <= -2 && cvd < 0 && market.volume >= 64;
  const longTrend = marketState === "Out of Balance" && momentum > 0 && nearLowerLvn && positiveAggression;
  const shortTrend = marketState === "Out of Balance" && momentum < 0 && nearUpperLvn && negativeAggression;
  const longReversion = marketState === "Balanced" && failedLowAuction && nearLowerLvn && positiveAggression;
  const shortReversion = marketState === "Balanced" && failedHighAuction && nearUpperLvn && negativeAggression;
  const direction = longTrend || longReversion ? 1 : shortTrend || shortReversion ? -1 : momentum >= 0 ? 1 : -1;
  const model = longTrend || shortTrend ? "Trend Model" : longReversion || shortReversion ? "Mean Reversion Model" : "Reject";
  const target = model === "Mean Reversion Model" ? poc : direction > 0 ? vah : val;
  const stop = direction > 0 ? Math.min(low, lowerLvn) - range * 0.08 : Math.max(high, upperLvn) + range * 0.08;
  const risk = Math.abs(current - stop);
  const reward = Math.abs(target - current);
  const rr = risk > 0 ? reward / risk : 0;
  const goodRr = rr >= 1.15;
  const longAllowed = (longTrend || longReversion) && goodRr && market.reversalRisk <= 62;
  const shortAllowed = (shortTrend || shortReversion) && goodRr && market.reversalRisk <= 62;
  const qualityBoost = (goodRr ? 8 : -8) + (model !== "Reject" ? 6 : -10);
  return {
    marketState,
    model,
    poc,
    vah,
    val,
    lowerLvn,
    upperLvn,
    lowerHvn,
    upperHvn,
    deltaScore,
    cvd,
    rr,
    longAllowed,
    shortAllowed,
    qualityBoost,
    entryText: `${formatPriceForMarket(market, current)} at ${model === "Trend Model" ? "LVN pullback" : "LVN reclaim"} confirmation`,
    stopText: `${formatPriceForMarket(market, stop)} beyond aggressive print/invalidation`,
    targetText: `${formatPriceForMarket(market, target)} (${model === "Mean Reversion Model" ? "POC target" : "next value area target"})`,
    pocText: formatPriceForMarket(market, poc),
    locationText: nearLowerLvn ? `lower LVN ${formatPriceForMarket(market, lowerLvn)}` : nearUpperLvn ? `upper LVN ${formatPriceForMarket(market, upperLvn)}` : "not at a clean LVN",
    levelsText: `POC ${formatPriceForMarket(market, poc)}, VAH ${formatPriceForMarket(market, vah)}, VAL ${formatPriceForMarket(market, val)}, LVNs ${formatPriceForMarket(market, lowerLvn)} / ${formatPriceForMarket(market, upperLvn)}, HVNs ${formatPriceForMarket(market, lowerHvn)} / ${formatPriceForMarket(market, upperHvn)}`,
    orderFlowText: `Delta proxy ${deltaScore > 0 ? "+" : ""}${deltaScore}, CVD proxy ${cvd > 0 ? "rising" : cvd < 0 ? "falling" : "flat"}, aggression ${positiveAggression ? "buyers hitting offers" : negativeAggression ? "sellers hitting bids" : "not confirmed"}, absorption ${Math.abs(cvd) < range * 0.08 ? "possible" : "not obvious"}`,
    valueWidthPct,
  };
}

function simplifiedScalpOutput({ auction, trade, confidence, reason }) {
  const setupQuality =
    trade !== "No Trade" && confidence >= 88 ? "A+" :
    trade !== "No Trade" && confidence >= 78 ? "A" :
    trade !== "No Trade" ? "B" :
    "Reject";
  const bias = trade === "Long" ? "Bullish" : trade === "Short" ? "Bearish" : "Neutral";
  const decision = trade === "No Trade" ? "WAIT" : "EXECUTE";
  return `${decision}: ${bias} scalp read, ${auction.marketState.toLowerCase()} market, ${setupQuality} quality. ${reason} Watch ${auction.locationText}; target is ${auction.targetText}; risk/reward is ${ratioFromValue(auction.rr)}.`;
}

function estimateSpreadPct(market) {
  const text = market.dataBasis || "";
  const match = text.match(/Bid ([0-9.]+), offer ([0-9.]+)/i);
  if (!match || !market.currentPriceValue) return 0;
  const bid = Number(match[1]);
  const offer = Number(match[2]);
  if (!Number.isFinite(bid) || !Number.isFinite(offer)) return 0;
  return ((offer - bid) / market.currentPriceValue) * 100;
}

function maxScalpSpreadPct(market) {
  if (market.marketType === "Crypto") return 0.09;
  if (market.marketType === "Forex") return 0.025;
  return 0.06;
}

function scalpMomentumThreshold(market) {
  if (market.marketType === "Forex") return 0.004;
  if (market.marketType === "Crypto") return 0.012;
  return 0.008;
}

function tradeProfile(market) {
  const scalp = scalpProfile(market);
  const isCrypto = market.marketType === "Crypto";
  const isForex = market.marketType === "Forex";
  const multiplier = isCrypto ? 1 : isForex ? 0.55 : 0.85;
  return {
    Scalping: scalp,
    Intraday: {
      entry: 0.001 * multiplier,
      stop: 0.0038 * multiplier,
      tp1: 0.0055 * multiplier,
      tp2: 0.0095 * multiplier,
      chaseText: isForex ? "0.04%" : "0.08%-0.12%",
    },
    "Day Trading": {
      entry: 0.0015 * multiplier,
      stop: 0.0065 * multiplier,
      tp1: 0.009 * multiplier,
      tp2: 0.016 * multiplier,
      chaseText: isForex ? "0.08%" : "0.15%-0.20%",
    },
  };
}

function resolveLiveInvalidation(market, stylePlan, action) {
  if (!market.liveData || action === "No Trade" || !stylePlan.stopValue) {
    return { invalidated: false, reason: "" };
  }
  const key = `${market.asset}-${state.tradingStyle}`;
  const now = Date.now();
  const cooldown = invalidatedPlans[key];
  if (cooldown && now < cooldown.until) {
    return {
      invalidated: true,
      reason: `${action} is invalidated for now: ${cooldown.reason}`,
    };
  }
  const previous = tradeAnchors[key];
  if (previous && previous.action === action) {
    const brokeStop =
      action === "Buy"
        ? market.currentPriceValue <= previous.stopValue
        : market.currentPriceValue >= previous.stopValue;
    if (brokeStop) {
      const reason = `live price ${market.currentPrice} broke the previous ${state.tradingStyle.toLowerCase()} invalidation at ${formatPriceForMarket(market, previous.stopValue)}. Wait for a new setup instead of forcing another ${action.toLowerCase()}.`;
      invalidatedPlans[key] = { until: now + invalidationCooldownMs(), reason };
      tradeAnchors[key] = { ...stylePlan, action, createdAt: now };
      return { invalidated: true, reason: `${action} is invalidated: ${reason}` };
    }
  }
  tradeAnchors[key] = { ...stylePlan, action, createdAt: now };
  return { invalidated: false, reason: "" };
}

function invalidationCooldownMs() {
  if (state.tradingStyle === "Scalping") return 45 * 1000;
  if (state.tradingStyle === "Intraday") return 8 * 60 * 1000;
  if (state.tradingStyle === "Day Trading") return 20 * 60 * 1000;
  return 60 * 60 * 1000;
}

function buildStylePlan(market, mode, actionOverride = market.action) {
  const live = Boolean(market.liveData && market.currentPriceValue);
  const price = market.currentPriceValue || parsePrice(market.currentPrice);
  const direction = actionOverride === "Sell" ? -1 : 1;
  const scalp = scalpProfile(market);
  const profiles = tradeProfile(market);
  const intraday = profiles.Intraday;
  const day = profiles["Day Trading"];
  const entryZone = (width) => {
    if (!live) return "No precise entry: fresh live price unavailable";
    const low = price * (1 - width);
    const high = price * (1 + width);
    return `${formatPriceForMarket(market, Math.min(low, high))}-${formatPriceForMarket(market, Math.max(low, high))} around live price ${market.currentPrice}`;
  };
  const microEntryLow = live ? formatPriceForMarket(market, price * (1 - scalp.entry)) : null;
  const microEntryHigh = live ? formatPriceForMarket(market, price * (1 + scalp.entry)) : null;
  const wickStop = live ? formatPriceForMarket(market, price * (1 - direction * scalp.stop)) : null;
  const scalpTp1 = live ? formatPriceForMarket(market, price * (1 + direction * scalp.tp1)) : null;
  const scalpTp2 = live ? formatPriceForMarket(market, price * (1 + direction * scalp.tp2)) : null;
  const planValues = (profile) => ({
    stopValue: live ? price * (1 - direction * profile.stop) : null,
    target1Value: live ? price * (1 + direction * profile.tp1) : null,
    target2Value: live ? price * (1 + direction * profile.tp2) : null,
    riskRewardRatio: ratioFromValue(profile.tp1 / profile.stop),
  });
  const scalpValues = planValues(scalp);
  const intradayValues = planValues(intraday);
  const dayValues = planValues(day);
  const byStyle = {
    Scalping: {
      ...scalpValues,
      entry: live
        ? `${microEntryLow}-${microEntryHigh} near live price ${market.currentPrice}`
        : "No precise scalp entry: live price unavailable",
      stop: live
        ? `${mode.stopTone}: ${wickStop} after wick buffer`
        : "No scalp stop: live price unavailable",
      target1: live
        ? `Fast scalp TP1: ${scalpTp1}`
        : "No active scalp target",
      target2: live
        ? `Fast scalp TP2: ${scalpTp2}`
        : "No active scalp target",
      noTrade: live
        ? `No scalp if spread widens, price is more than ${scalp.chaseText} from ${market.currentPrice}, or the 1m/5m candle closes back through the entry zone.`
        : "No scalp without a fresh live quote.",
      invalidation: live
        ? `Scalp fails if price wicks through ${wickStop} and cannot reclaim the live-price zone near ${market.currentPrice}.`
        : "No scalp invalidation without live price, spread, and candle reaction.",
      weighting: "1m-5m speed, spread, immediate candle reaction, and very small reachable targets",
      styleRead: `This is a true 1m/5m scalp plan. It uses a tiny entry band, a wick-buffered stop, and targets meant for a quick push, not a 15m intraday move.`,
    },
    Intraday: {
      ...intradayValues,
      entry: entryZone(intraday.entry),
      stop: live
        ? `${mode.stopTone}: ${formatPriceForMarket(market, intradayValues.stopValue)}`
        : "No intraday stop: fresh live price unavailable",
      target1: live
        ? `1-2 hour TP1: ${formatPriceForMarket(market, intradayValues.target1Value)}`
        : "No intraday target: fresh live price unavailable",
      target2: live
        ? `1-2 hour TP2: ${formatPriceForMarket(market, intradayValues.target2Value)}`
        : "No intraday target: fresh live price unavailable",
      noTrade: live
        ? `No intraday trade if price is more than ${intraday.chaseText} away from ${market.currentPrice}, chops through VWAP, or the 5m/15m candle closes against the setup.`
        : "No intraday trade without a fresh live quote.",
      invalidation: live
        ? `Intraday setup fails if live price breaks ${formatPriceForMarket(market, intradayValues.stopValue)} and cannot reclaim the entry zone.`
        : "No intraday invalidation without fresh live price.",
      weighting: "5m-15m VWAP, session structure, current news, and 15m trend",
      styleRead: "This is built for a roughly 1-2 hour hold on the 5m-15m chart. It should be more patient than a scalp but still tighter than a full day trade.",
    },
    "Day Trading": {
      ...dayValues,
      entry: entryZone(day.entry),
      stop: live
        ? `${mode.stopTone}: ${formatPriceForMarket(market, dayValues.stopValue)}`
        : "No day-trade stop: fresh live price unavailable.",
      target1: live
        ? `Full-session TP1: ${formatPriceForMarket(market, dayValues.target1Value)}`
        : "No day-trade target: fresh live price unavailable.",
      target2: live
        ? `Full-session TP2: ${formatPriceForMarket(market, dayValues.target2Value)}`
        : "No day-trade target: fresh live price unavailable.",
      noTrade: live
        ? `No day trade if price is more than ${day.chaseText} away from ${market.currentPrice}, loses VWAP/current structure, or the 15m candles stay trapped in chop.`
        : "No day trade without a fresh live quote.",
      invalidation: live
        ? `Day trade fails if live price breaks ${formatPriceForMarket(market, dayValues.stopValue)} and cannot reclaim current/VWAP structure.`
        : "No day-trade invalidation without fresh live price.",
      weighting: "15m current price location, VWAP, opening range, breadth, and news follow-through",
      styleRead: "This is the same-day version of intraday: still based near live price, but with more room because it can hold for the full session if the market keeps confirming.",
    },
    Swing: {
      entry: live
        ? `1D scale-in zone ${formatPriceForMarket(market, price * (1 - 0.008))}-${formatPriceForMarket(market, price * (1 + 0.003))}; avoid full size on the first touch.`
        : "No swing entry: fresh live price unavailable",
      stop: price
        ? `${mode.stopTone}: wider SL near ${formatPriceForMarket(market, price * (1 - direction * 0.035))}`
        : `${mode.stopTone}: wider SL near ${market.levels.support[2] || market.stop}.`,
      target1: price
        ? `Higher swing TP1: ${formatPriceForMarket(market, price * (1 + direction * 0.055))}`
        : `Higher swing TP1: ${market.levels.resistance[1] || market.target1}.`,
      target2: price
        ? `Higher swing TP2: ${formatPriceForMarket(market, price * (1 + direction * 0.09))}`
        : `Higher swing TP2: ${market.levels.resistance[2] || market.target2}.`,
      noTrade: `No swing if macro risk can gap the market or the daily trend disagrees with the setup.`,
      invalidation: `Swing fails if daily structure breaks or macro news reverses the bias.`,
      weighting: "1D trend, macro calendar, larger levels, wider SL, and higher TP",
      styleRead: "This mode is for 1D swing trading. It uses wider stop loss and higher take-profit zones because the trade has to survive larger candles and overnight news.",
    },
  };
  return byStyle[state.tradingStyle] || byStyle.Intraday;
}

function renderMarkets() {
  const currentMarkets = styledMarkets();
  const filtered = currentMarkets.filter(
    (market) =>
      (market.category || "Other") === state.selectedCategory &&
      (state.selectedAsset === "all" || market.asset === state.selectedAsset) &&
      (!state.marketSearch ||
        market.asset.toLowerCase().includes(state.marketSearch) ||
        market.symbol.toLowerCase().includes(state.marketSearch)),
  );
  byId("marketList").innerHTML =
    filtered.map((market) => marketCard(market, "home")).join("") ||
    '<article class="notice-card"><strong>No markets found</strong><p>Try another category or search term.</p></article>';
  const active = currentMarkets.filter((market) => market.action !== "No Trade" && market.confidence >= 70).length;
  const avg = Math.round(currentMarkets.reduce((sum, market) => sum + market.confidence, 0) / currentMarkets.length);
  byId("activeCount").textContent = active;
  byId("avgConfidence").textContent = `${avg}%`;
  byId("nextRisk").textContent = calendarEvents[0].name.split(" ")[0];
}

function marketCard(market, prefix) {
  const chartId = `${prefix}-${slug(market.asset)}-chart`;
  return `
    <article class="market-card" data-market-asset="${market.asset}">
      <div class="market-top">
        <div>
          <h3 class="asset-name">${market.asset}</h3>
          <div class="confidence" data-live-field="summary">${market.action} · ${market.bias} · ${market.chartTimeframe} · ${market.confidence}% confidence</div>
        </div>
        <div class="card-badges">
          ${favoriteButton(market.asset)}
          <span class="market-status ${market.marketStatusClass}">${market.marketStatus}</span>
          <div class="trade-quality">${market.quality}</div>
        </div>
      </div>
      <button class="bias explain-button ${market.bias.toLowerCase()}" data-asset="${market.asset}" type="button">${market.setupType} · Explain</button>
      ${decisionStrip(market)}
      ${scoreGrid(market)}
      <div class="setup-explain"><strong>Why ${market.quality}?</strong><p>${market.gradeWhy}</p></div>
      <div class="setup-explain"><strong>${state.tradingStyle} read</strong><p>${market.styleRead}</p></div>
      <div class="trade-map">
        <div class="trade-map-head"><strong>Live Chart</strong><span>${market.chartTimeframe} · ${market.rr}</span></div>
        ${tradingViewChart(market, chartId)}
        ${chartTradeMarkers(market)}
        ${tradeLevels(market)}
      </div>
      ${simplifyPanel(market)}
    </article>
  `;
}

function favoriteButton(asset) {
  const active = isFavorite(asset);
  return `
    <button
      class="favorite-button ${active ? "active" : ""}"
      data-asset="${asset}"
      type="button"
      aria-label="${active ? `Remove ${asset} from favorites` : `Add ${asset} to favorites`}"
      title="${active ? "Remove favorite" : "Add favorite"}"
    >${active ? "★" : "☆"}</button>
  `;
}

function decisionStrip(market) {
  return `
    <div class="decision-strip">
      <div class="decision-box bias-box ${market.bias.toLowerCase()}">
        <span>Bias</span>
        <strong data-live-field="biasValue">${market.bias}</strong>
      </div>
      <div class="decision-box enter-box ${market.enterDecision === "YES" ? "yes" : "no"}">
        <span>Enter?</span>
        <strong data-live-field="enterDecision">${market.enterDecision}</strong>
      </div>
    </div>
    <div class="entry-reason" data-live-field="enterReason">${market.enterReason}</div>
  `;
}

function tradingViewChart(market, chartId) {
  const symbol = encodeURIComponent(market.tradingViewSymbol || market.symbol);
  const interval = tradingViewInterval();
  const url =
    `https://s.tradingview.com/widgetembed/?symbol=${symbol}` +
    `&interval=${interval}&theme=dark&style=1&timezone=Etc%2FUTC` +
    `&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=0&save_image=0` +
    `&studies=%5B%5D&hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D`;
  return `
    <div class="live-chart-frame" id="${chartId}">
      <iframe
        title="${market.asset} live ${market.chartTimeframe} chart"
        src="${url}"
        loading="lazy"
        referrerpolicy="origin"
        allowtransparency="true"
      ></iframe>
    </div>
  `;
}

function chartTradeMarkers(market) {
  return `
    <div class="chart-markers">
      ${chartMarkerItems(market)}
    </div>
  `;
}

function chartMarkerItems(market) {
  return `
    <div class="chart-marker entry"><span>Entry trigger</span><strong>${market.entry}</strong></div>
    <div class="chart-marker stop"><span>Invalidation</span><strong>${market.stop}</strong></div>
    <div class="chart-marker target"><span>Target / magnet</span><strong>${market.target1}</strong></div>
  `;
}

function simplifyPanel(market) {
  return `
    <details class="simplify-panel">
      <summary>Simplify</summary>
      <p data-live-field="simpleSummary">${market.simpleSummary}</p>
    </details>
  `;
}

function simpleTradeSummary(market) {
  if (state.tradingStyle === "Scalping") {
    if (market.action === "No Trade") {
      return `${market.asset} is a wait. The app does not see a clean scalp yet, so do not force an entry. Watch the marked entry-test level; only trade if price tests it, confirms with a 1m candle, and buyers/sellers clearly take control.`;
    }
    return `${market.asset} is a ${market.action.toLowerCase()} scalp only if price respects the marked entry trigger. Risk is the marked invalidation level, first target is the marked target, and the trade ratio is ${market.riskRewardRatio}. If the trigger fails, skip it.`;
  }
  if (market.action === "No Trade") {
    return `${market.asset} is not a trade right now. Price is either stale, closed, invalidated, or not at a clean level. Wait for a fresh setup instead of chasing.`;
  }
  return `${market.asset} is a ${market.action.toLowerCase()} idea with ${market.confidence}% confidence. Entry is the marked level, risk is the invalidation level, first target is marked on the chart, and the ratio is ${market.riskRewardRatio}.`;
}

function tradingViewInterval() {
  if (state.tradingStyle === "Scalping") return "1";
  if (state.tradingStyle === "Intraday") return "15";
  if (state.tradingStyle === "Day Trading") return "15";
  if (state.tradingStyle === "Swing") return "D";
  return "15";
}

function scoreGrid(market) {
  const scores = [
    ["Buyer Control", market.buyerControl, market.buyerControl >= 60 ? "good" : "bad"],
    ["Volume", market.volume, market.volume >= 65 ? "good" : ""],
    ["News Impact", market.newsImpact, market.newsImpact >= 75 ? "good" : ""],
    ["Reversal Risk", market.reversalRisk, market.reversalRisk >= 55 ? "bad" : ""],
  ];
  return `<div class="score-grid">${scores
    .map(
      ([label, value, tone]) => `
        <div class="score">
          <label><span>${label}</span><span>${value}</span></label>
          <div class="bar"><span class="${tone}" style="width:${value}%"></span></div>
        </div>`,
    )
    .join("")}</div>`;
}

function tradeLevels(market) {
  return `
    <div class="trade-levels">
      <div><span>Setup Type</span><strong>${state.tradingStyle}</strong></div>
      <div><span>Symbol</span><strong>${market.symbol}</strong></div>
      <div><span>Market Type</span><strong>${market.marketType}</strong></div>
      <div><span>Market Status</span><strong data-live-field="marketStatus">${market.marketStatus}</strong></div>
      <div><span>Current Price Used</span><strong class="live-price-number" data-live-field="currentPrice">${market.currentPrice}</strong></div>
      <div><span>Expected Hold</span><strong>${market.expectedHold}</strong></div>
      <div><span>Action</span><strong data-live-field="action">${market.action}</strong></div>
      <div><span>Chart</span><strong>${market.chartTimeframe}</strong></div>
      <div><span>Entry</span><strong data-live-field="entry">${market.entry}</strong></div>
      <div><span>Stop / Invalidation</span><strong data-live-field="stop">${market.stop}</strong></div>
      <div><span>Risk:Reward</span><strong data-live-field="riskRewardRatio">${market.riskRewardRatio}</strong></div>
      <div><span>Target 1</span><strong data-live-field="target1">${market.target1}</strong></div>
      <div><span>Target 2</span><strong data-live-field="target2">${market.target2}</strong></div>
      <div><span>No Trade If</span><strong data-live-field="noTrade">${market.noTrade}</strong></div>
      <div><span>Data Basis</span><strong data-live-field="dataBasis">${market.dataBasis}</strong></div>
    </div>`;
}

function renderSetups() {
  const filtered = styledMarkets().filter(
    (market) => state.selectedSetupAction === "all" || market.action === state.selectedSetupAction,
  );
  byId("setupList").innerHTML = filtered.map(setupCard).join("");
}

function setupCard(market) {
  return `
    <article class="setup-card" data-market-asset="${market.asset}">
      <div class="market-top">
        <div>
          <h3>${market.asset}</h3>
          <p>${market.chartTimeframe} chart · ${market.setupType} · ${market.rr}</p>
        </div>
        <div class="setup-actions">
          ${favoriteButton(market.asset)}
          <button class="action-badge explain-button ${market.action.toLowerCase().replace(" ", "-")}" data-live-field="actionBadge" data-asset="${market.asset}" type="button">${market.action}</button>
        </div>
      </div>
      ${decisionStrip(market)}
      <div class="trade-map standalone-chart">
        <div class="trade-map-head"><strong>Live Chart</strong><span>${market.chartTimeframe} · ${market.rr}</span></div>
        ${tradingViewChart(market, `setup-${slug(market.asset)}-chart`)}
        ${chartTradeMarkers(market)}
      </div>
      ${tradeLevels(market)}
      ${simplifyPanel(market)}
      <div class="two-column">
        <div class="mini-panel">
          <strong>Confidence Breakdown</strong>
          ${Object.entries(market.confidenceBreakdown)
            .map(([label, value]) => `<div class="tiny-score"><span>${label}</span><b>${value}</b></div>`)
            .join("")}
        </div>
        <div class="mini-panel">
          <strong>Checklist</strong>
          ${market.checklist.map(([label, ok]) => `<div class="check ${ok ? "ok" : "no"}">${ok ? "✓" : "×"} ${label}</div>`).join("")}
        </div>
      </div>
      <div class="mini-panel">
        <strong>Multi-Timeframe Alignment</strong>
        <div class="timeframes">${Object.entries(market.timeframes)
          .map(([tf, value]) => `<span class="${value.toLowerCase()}">${tf}: ${value}</span>`)
          .join("")}</div>
      </div>
      <div class="setup-explain"><strong>Why this could fail</strong><p>${market.invalidation}</p></div>
    </article>`;
}

function renderLevels() {
  const filtered = styledMarkets().filter(
    (market) => state.selectedLevelsAsset === "all" || market.asset === state.selectedLevelsAsset,
  );
  byId("levelsList").innerHTML = filtered
    .map(
      (market) => `
        <article class="levels-card">
          <div class="market-top"><h3>${market.asset}</h3><span>${market.symbol}</span></div>
          <div class="level-grid">
            <div><strong>Support</strong>${market.levels.support.map((level) => `<p>${level}</p>`).join("")}</div>
            <div><strong>Resistance</strong>${market.levels.resistance.map((level) => `<p>${level}</p>`).join("")}</div>
            <div><strong>Liquidity</strong>${market.levels.liquidity.map((level) => `<p>${level}</p>`).join("")}</div>
            <div><strong>VWAP</strong><p>${market.levels.vwap}</p></div>
          </div>
        </article>`,
    )
    .join("");
}

function renderCalendar() {
  byId("calendarList").innerHTML = calendarEvents
    .map(
      (event) => `
        <article class="calendar-card ${event.severity.toLowerCase()}">
          <div class="market-top"><div><h3>${event.name}</h3><p>${event.time}</p></div><span>${event.severity}</span></div>
          <p>${event.rule}</p>
          <div class="asset-tags">${event.affected.map((asset) => `<span>${asset}</span>`).join("")}</div>
        </article>`,
    )
    .join("");
}

function renderNews() {
  const mode = styleModes[state.tradingStyle];
  const filtered = news.filter((item) => {
    const assetMatch = state.selectedNewsAsset === "all" || item.assets.includes(state.selectedNewsAsset);
    const styleMatch = mode.relevantDurations.includes(item.duration);
    return (
      assetMatch &&
      styleMatch &&
      item.importance >= state.minImportance &&
      item.relevance >= state.minRelevance
    );
  });
  byId("newsList").innerHTML =
    filtered.map(newsCard).join("") ||
    '<article class="news-card"><h3>No matching intelligence</h3><p>Lower filters to expand the feed.</p></article>';
}

function renderBacktests() {
  const currentBacktests = styledBacktests();
  const filtered = currentBacktests.filter(
    (test) =>
      state.selectedBacktestAsset === "all" || test.asset === state.selectedBacktestAsset,
  );
  byId("backtestSummary").innerHTML = backtestSummary(filtered);
  byId("backtestList").innerHTML = filtered.map(backtestCard).join("");
}

function renderFavorites() {
  const favorites = styledMarkets().filter((market) => isFavorite(market.asset));
  byId("favoritesList").innerHTML = favorites.length
    ? favorites.map(favoriteCard).join("")
    : `<article class="notice-card">
        <strong>No favorites saved yet</strong>
        <p>Tap the star on any market or setup to save it here. Saved markets can trigger entry alerts.</p>
      </article>`;
}

function favoriteCard(market) {
  const alertReady = market.enterDecision === "YES";
  return `
    <article class="favorite-card ${alertReady ? "ready" : "waiting"}" data-market-asset="${market.asset}">
      <div class="market-top">
        <div>
          <h3>${market.asset}</h3>
          <p data-live-field="summary">${market.action} · ${market.bias} · ${market.chartTimeframe} · ${market.confidence}% confidence</p>
        </div>
        ${favoriteButton(market.asset)}
      </div>
      <div class="favorite-alert ${alertReady ? "ready" : "waiting"}" data-live-field="favoriteAlertBox">
        <span>Entry Alert</span>
        <strong data-live-field="favoriteAlert">${alertReady ? "READY NOW" : "WAITING"}</strong>
      </div>
      ${decisionStrip(market)}
      <div class="trade-map">
        <div class="trade-map-head"><strong>Favorite Live Chart</strong><span>${market.chartTimeframe} · ${market.rr}</span></div>
        ${tradingViewChart(market, `favorite-${slug(market.asset)}-chart`)}
        ${chartTradeMarkers(market)}
        ${tradeLevels(market)}
      </div>
      ${simplifyPanel(market)}
    </article>
  `;
}

function backtestSummary(results) {
  const trades = results.reduce((sum, test) => sum + test.trades, 0);
  const wins = results.reduce((sum, test) => sum + test.wins, 0);
  const losses = results.reduce((sum, test) => sum + test.losses, 0);
  const totalR = results.reduce((sum, test) => sum + test.resultR, 0);
  const weightedExpectancy = trades
    ? results.reduce((sum, test) => sum + test.expectancyR * test.trades, 0) / trades
    : 0;
  const avgProfitFactor = results.length
    ? results.reduce((sum, test) => sum + test.profitFactor, 0) / results.length
    : 0;
  const worstDrawdown = results.length
    ? Math.min(...results.map((test) => test.maxDrawdownR))
    : 0;
  return `
    <div><span>Total Trades</span><strong>${trades}</strong></div>
    <div><span>Win Rate</span><strong>${trades ? Math.round((wins / trades) * 100) : 0}%</strong></div>
    <div><span>Net Result</span><strong>${formatR(totalR)}</strong></div>
    <div><span>Expectancy</span><strong>${formatR(weightedExpectancy)}/trade</strong></div>
    <div><span>Profit Factor</span><strong>${avgProfitFactor.toFixed(2)}</strong></div>
    <div><span>Worst DD</span><strong>${formatR(worstDrawdown)}</strong></div>
    <div><span>Wins</span><strong>${wins}</strong></div>
    <div><span>Losses</span><strong>${losses}</strong></div>
  `;
}

function backtestCard(test) {
  const market = styledMarkets().find((item) => item.asset === test.asset);
  const verdict =
    test.expectancyR >= 0.2 ? "Strong" : test.expectancyR > 0 ? "Playable" : "Avoid";
  return `
    <article class="backtest-card">
      <div class="market-top">
        <div>
          <h3>${test.asset}</h3>
          <p>${market ? `${market.action} · ${market.setupType} · ${market.quality}` : `${state.tradingStyle} model`}</p>
        </div>
        <div class="action-badge ${verdict.toLowerCase()}">${verdict}</div>
      </div>
      <div class="result-strip">
        <div><span>100 Trades</span><strong>${test.wins}W / ${test.losses}L</strong></div>
        <div><span>Win Rate</span><strong>${test.wins}%</strong></div>
        <div><span>Net</span><strong>${formatR(test.resultR)}</strong></div>
        <div><span>PF</span><strong>${test.profitFactor.toFixed(2)}</strong></div>
      </div>
      <div class="level-grid backtest-grid">
        <div><strong>Average Win</strong><p>${formatR(test.averageWinR)}</p></div>
        <div><strong>Average Loss</strong><p>${formatR(test.averageLossR)}</p></div>
        <div><strong>Expectancy</strong><p>${formatR(test.expectancyR)} per trade</p></div>
        <div><strong>Max Drawdown</strong><p>${formatR(test.maxDrawdownR)}</p></div>
      </div>
      <div class="setup-explain"><strong>${state.tradingStyle} read</strong><p>${test.note}</p></div>
    </article>`;
}

function styledBacktests() {
  const mode = styleModes[state.tradingStyle];
  return backtests.map((test) => {
    const wins = clamp(test.wins + mode.winShift, 28, 72);
    const losses = test.trades - wins;
    const resultR = test.resultR * mode.resultMultiplier + mode.rrShift * 6;
    const expectancyR = resultR / test.trades;
    const profitFactor = Math.max(0.45, test.profitFactor + mode.rrShift * 0.45 + mode.winShift * 0.015);
    return {
      ...test,
      wins,
      losses,
      resultR,
      expectancyR,
      profitFactor,
      averageWinR: Math.max(0.35, test.averageWinR + mode.rrShift * 0.25),
      averageLossR:
        state.tradingStyle === "Swing"
          ? test.averageLossR - 0.12
          : state.tradingStyle === "Scalping"
            ? test.averageLossR + 0.08
            : test.averageLossR,
      maxDrawdownR:
        state.tradingStyle === "Swing"
          ? test.maxDrawdownR * 1.35
          : state.tradingStyle === "Scalping"
            ? test.maxDrawdownR * 0.75
            : test.maxDrawdownR,
      note: `${test.note} In ${state.tradingStyle.toLowerCase()} mode, this model emphasizes ${mode.holding} holding behavior and ${mode.targetTone}.`,
    };
  });
}

function newsCard(item) {
  return `
    <article class="news-card">
      <div class="news-meta"><span>Importance ${item.importance}/10</span><span>Relevance ${item.relevance}</span><span>${item.duration}</span></div>
      <h3>${item.title}</h3>
      <p>${item.why}</p>
      <p><strong>${state.tradingStyle} relevance:</strong> ${item.styleNotes[state.tradingStyle]}</p>
      <div class="asset-tags">${item.assets.map((asset) => `<span>${asset}</span>`).join("")}</div>
    </article>`;
}

function renderWatchlist() {
  byId("watchlist").innerHTML = assets
    .map(
      (asset) => `
        <label class="watch-item">
          <span>${asset}</span>
          <input type="checkbox" data-watch-asset="${asset}" ${isFavorite(asset) ? "checked" : ""} />
        </label>`,
    )
    .join("");
  document.querySelectorAll("[data-watch-asset]").forEach((input) => {
    input.addEventListener("change", () => toggleFavorite(input.dataset.watchAsset, input.checked));
  });
}

function renderAlerts() {
  byId("alertList").innerHTML = alerts.map((alert) => `<div class="alert-item">${alert}</div>`).join("");
}

function toggleFavorite(asset, forceValue = null) {
  const next = new Set(state.favorites);
  const shouldAdd = forceValue === null ? !next.has(asset) : forceValue;
  if (shouldAdd) {
    next.add(asset);
  } else {
    next.delete(asset);
  }
  state.favorites = [...next].filter((item) => assets.includes(item));
  saveFavorites();
  renderMarkets();
  renderSetups();
  renderFavorites();
  renderWatchlist();
}

function isFavorite(asset) {
  return state.favorites.includes(asset);
}

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("market-intelligence-favorites") || "null");
    if (Array.isArray(saved)) return saved.filter((asset) => assets.includes(asset));
  } catch {
    // Ignore damaged local settings and fall back to the starter list.
  }
  return ["BTC/USD", "ETH/USD", "NASDAQ 100", "S&P 500"];
}

function saveFavorites() {
  localStorage.setItem("market-intelligence-favorites", JSON.stringify(state.favorites));
}

function loadNotificationSetting() {
  return localStorage.getItem("market-intelligence-notifications") !== "off";
}

function saveNotificationSetting() {
  localStorage.setItem("market-intelligence-notifications", state.notificationsEnabled ? "on" : "off");
}

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alerts.unshift("Laptop alerts are not supported by this browser.");
    renderAlerts();
    return;
  }
  if (Notification.permission === "default") {
    Notification.requestPermission().then(() => renderAlerts());
  }
}

function checkFavoriteEntryAlerts() {
  if (!state.notificationsEnabled) return;
  const markets = styledMarkets().filter((market) => isFavorite(market.asset));
  markets.forEach((market) => {
    const key = `${market.asset}-${state.tradingStyle}`;
    if (market.enterDecision !== "YES") {
      notifiedEntries.delete(key);
      return;
    }
    if (notifiedEntries.has(key)) return;
    notifiedEntries.add(key);
    const message = `${market.asset}: ENTER YES for ${state.tradingStyle}. ${market.action} near ${market.entry}.`;
    alerts.unshift(message);
    alerts.splice(12);
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(`${market.asset} entry ready`, {
        body: `${market.action} · ${market.bias} · ${market.confidence}% confidence`,
      });
    }
  });
  renderAlerts();
}

function renderJournal() {
  byId("journalList").innerHTML = journal
    .map(
      (entry) => `
        <article class="journal-item">
          <strong>${entry.asset}</strong><span>${entry.grade} · ${entry.result}</span><p>${entry.note}</p>
        </article>`,
    )
    .join("");
}

function renderOnboardingMarkets() {
  byId("onboardingMarkets").innerHTML = lensAssets
    .map((asset, index) => `<button class="pill ${index < 4 ? "selected" : ""}">${asset}</button>`)
    .join("");
  document.querySelectorAll(".pill").forEach((button) => {
    button.addEventListener("click", () => button.classList.toggle("selected"));
  });
}

function addDrawerAiMessage(text, type) {
  const messages = byId("drawerAiMessages");
  const bubble = document.createElement("div");
  bubble.className = `ai-message ${type}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function openExplanationDrawer(asset) {
  const market = styledMarkets().find((item) => item.asset === asset);
  if (!market) return;
  activeDrawerAsset = asset;
  byId("drawerEyebrow").textContent = `${state.tradingStyle} · ${market.chartTimeframe} · ${market.marketStatus}`;
  byId("drawerTitle").textContent = `${market.asset} in simple terms`;
  byId("drawerAiTitle").textContent = `Ask about ${market.asset}`;
  byId("drawerBody").innerHTML = explanationHtml(market);
  byId("drawerAiMessages").innerHTML = "";
  addDrawerAiMessage(
    `Ask me anything about this ${market.asset} setup: entry, stop, targets, why it could fail, or whether to wait.`,
    "ai",
  );
  byId("explainDrawer").classList.add("open");
  byId("explainDrawer").setAttribute("aria-hidden", "false");
}

function answerDrawerQuestion(question) {
  const market = styledMarkets().find((item) => item.asset === activeDrawerAsset);
  if (!market) return "Open a setup first and I’ll explain that market in plain English.";
  const text = question.toLowerCase();
  if (includesAny(text, ["simple", "simplify", "explain easier", "plain english", "dumb it down"])) {
    return `Simple version: ${market.asset} is ${market.bias.toLowerCase()} right now, but I would only consider the trade if it says ENTER: YES. Current live price status is ${market.currentPrice}. The plan is ${market.action}. Entry is ${market.entry}. Risk is ${market.stop}. First profit area is ${market.target1}. If the app says the quote is stale, that means do not use the entry yet.`;
  }
  if (includesAny(text, ["ratio", "risk reward", "risk/reward", "rr", "r:r"])) {
    return `The planned risk/reward is ${market.rr}. That means the target is aiming to pay more than the amount being risked. For this setup, the risk is defined at ${market.stop}, TP1 is ${market.target1}, and TP2 is ${market.target2}. I would still manage it by reaction: if price reaches TP1 weakly, take partials instead of hoping for TP2.`;
  }
  if (includesAny(text, ["current price", "live price", "price now", "what price"])) {
    return `The current price reading for ${market.asset} is ${market.currentPrice}. Data source: ${market.dataBasis} If it says stale or unavailable, I would not trust a precise entry from it. For scalping especially, fresh live price is mandatory.`;
  }
  if (includesAny(text, ["confidence", "how sure", "score", "grade"])) {
    return `Confidence is ${market.confidence}%, and the setup grade is ${market.quality}. The score is built from trend/control, volume, news impact, reversal risk, and structure. A high score does not mean guaranteed; it means the setup has more things lined up than against it.`;
  }
  if (includesAny(text, ["timeframe", "chart", "hold", "how long"])) {
    return `This is using the ${market.chartTimeframe} chart for ${state.tradingStyle.toLowerCase()} trading. Expected hold is ${market.expectedHold}. If you switch to scalping, entries must be much closer to live price. If you switch to swing, stops and targets widen because daily candles move more.`;
  }
  if (includesAny(text, ["news", "macro", "fed", "cpi", "nfp", "fomc"])) {
    const relevant = news
      .filter((item) => item.assets.includes(market.asset) || item.assets.includes("NASDAQ 100") || item.assets.includes("S&P 500"))
      .filter((item) => styleModes[state.tradingStyle].relevantDurations.includes(item.duration))
      .slice(0, 2);
    if (!relevant.length) {
      return `I do not see a high-priority news item directly tied to ${market.asset} in this demo feed. I would still check CPI, NFP, FOMC, Fed speakers, yields, and broad risk sentiment before entering.`;
    }
    return relevant
      .map((item) => `${item.title}: ${item.why} For this ${state.tradingStyle.toLowerCase()} plan, ${item.styleNotes[state.tradingStyle]}`)
      .join(" ");
  }
  if (includesAny(text, ["entry", "enter", "buy", "sell", "trigger"])) {
    return entryExplanation(market);
  }
  if (includesAny(text, ["stop", "fail", "risk", "wrong", "invalid"])) {
    return `The risk line is ${market.stop}. The reason is simple: if price pushes through that area and cannot reclaim it, the setup is probably wrong. The stop is designed with wick room, so it is not sitting exactly on the most obvious first touch.`;
  }
  if (includesAny(text, ["target", "tp", "where", "go", "trade to"])) {
    return `The first place it could trade to is ${market.target1}. If price reaches that level weakly, taking partial profit makes sense. If momentum stays strong, the next area is ${market.target2}.`;
  }
  if (includesAny(text, ["wait", "avoid", "no trade", "stand aside"])) {
    return `I would wait if this happens: ${market.noTrade}. For newer traders, this is the important part: a good setup is only good at the right price. Late entries usually turn good ideas into bad trades.`;
  }
  if (includesAny(text, ["up", "bull", "move higher"])) {
    return `${market.asset} can move up if buyers defend the entry area, volume confirms, and price stays above invalidation. If it cannot hold above the live/current price zone, the upside idea gets weaker.`;
  }
  if (includesAny(text, ["down", "bear", "move lower"])) {
    return `${market.asset} can move down if the entry area fails, sellers absorb the bounce, or news flips risk sentiment. The warning sign is price wicking through support and failing to reclaim it.`;
  }
  return `${market.asset} is a ${market.action} idea on the ${market.chartTimeframe} chart. Current price used: ${market.currentPrice}. Entry: ${market.entry}. Stop: ${market.stop}. Targets: ${market.target1}, then ${market.target2}. The simplest rule is: take it only if price is near the plan and still behaving correctly.`;
}

function entryExplanation(market) {
  if (state.tradingStyle === "Scalping") {
    const directionText = market.action === "Sell" ? "short" : market.action === "Buy" ? "long" : "no trade";
    const triggerText =
      market.action === "Buy"
        ? "I want to see a 1m candle close above the previous 1m candle high, then hold that breakout instead of instantly falling back inside the old candle."
        : market.action === "Sell"
          ? "I want to see a 1m candle close below the previous 1m candle low, then hold that breakdown instead of instantly reclaiming the old candle."
          : "I do not want an entry yet. The app is saying wait because the auction, location, or aggression read is not clean enough.";
    const whyText =
      market.action === "Buy"
        ? "That close tells me buyers did more than tap the level; they accepted higher prices and likely forced short-term sellers to cover."
        : market.action === "Sell"
          ? "That close tells me sellers did more than wick the level; they accepted lower prices and likely forced short-term buyers to exit."
          : "A scalp needs all three pieces together: market state, location, and aggression. If one is missing, the trade is random.";
    const confirmationText =
      market.action === "Buy"
        ? "After the close, I want the next pullback to stay above the breakout area or LVN/reclaim zone, with buyers stepping back in quickly."
        : market.action === "Sell"
          ? "After the close, I want the next bounce to stay below the breakdown area or LVN/reject zone, with sellers stepping back in quickly."
          : "The confirmation would be a clean 1m/5m break and hold at a real LVN/value location, with delta/CVD proxy and volume agreeing.";
    const cancelText =
      market.action === "Buy"
        ? "If price closes back under the breakout candle, loses the entry zone, or the aggression disappears, the buy is cancelled."
        : market.action === "Sell"
          ? "If price closes back above the breakdown candle, reclaims the entry zone, or the aggression disappears, the short is cancelled."
          : "If price is chopping around fair value, sitting away from LVN, or volume is not confirming, I keep waiting.";
    return [
      `Scalp entry explanation for ${market.asset}: the current decision is ${market.action}, so the entry idea is ${directionText}.`,
      `Planned entry zone: ${market.entry}.`,
      `What I need to see: ${triggerText}`,
      `Why that matters: ${whyText}`,
      `Confirmation: ${confirmationText}`,
      `Risk: ${market.stop}. The stop is where the scalp idea is wrong, not a place to widen risk.`,
      `Target: ${market.target1}. Risk/reward: ${market.riskRewardRatio}.`,
      `Cancel the entry: ${cancelText}`,
      `Simple rule: do not enter just because price touches the zone. Enter only after the 1m trigger proves buyers or sellers are actually taking control.`,
    ].join(" ");
  }
  return [
    `For this ${state.tradingStyle.toLowerCase()} setup, the entry is ${market.entry}.`,
    `The reason is location plus confirmation: price should be near the planned level, then show acceptance in the trade direction.`,
    `For a buy, I want candles to hold above the level and continue making progress. For a sell, I want candles to hold below the level and continue rejecting bounces.`,
    `Risk is ${market.stop}, target one is ${market.target1}, and risk/reward is ${market.riskRewardRatio}.`,
    `If price moves away from the entry or closes back through the invalidation area, I would wait instead of chasing.`,
  ].join(" ");
}

function closeExplanationDrawer() {
  byId("explainDrawer").classList.remove("open");
  byId("explainDrawer").setAttribute("aria-hidden", "true");
}

function explanationHtml(market) {
  const upOrDown = market.action === "Sell" ? "down" : market.action === "Buy" ? "up" : "nowhere cleanly yet";
  const firstArea = market.action === "No Trade" ? "the nearest clean breakout level" : market.target1;
  const secondArea = market.action === "No Trade" ? "the next support or resistance after the break" : market.target2;
  const currentNote =
    state.tradingStyle === "Scalping" && !market.liveData
      ? "Because this is scalping, I would not trust a precise entry unless the quote is live and fresh."
      : `The current reference price used is ${market.currentPrice}.`;
  return `
    <section class="drawer-section">
      <strong>What this means</strong>
      <p>${market.asset} is currently a <b>${market.action}</b> idea with a ${market.bias.toLowerCase()} bias. In plain English, the app thinks price could move ${upOrDown} if the level reacts correctly. ${currentNote}</p>
    </section>
    <section class="drawer-section">
      <strong>Why it could move up</strong>
      <p>It could move up if buyers defend the entry area, volume expands, and price holds above the invalidation zone. For crypto, this also means BTC/ETH breadth should stay supportive.</p>
    </section>
    <section class="drawer-section">
      <strong>Why it could move down</strong>
      <p>It could move down if the entry area fails, price wicks through the stop zone and cannot reclaim it, or news/macro risk flips momentum. That is why the stop is placed beyond the obvious wick area instead of exactly on the first touch.</p>
    </section>
    <section class="drawer-section">
      <strong>Where it could trade first</strong>
      <p>The first important area is ${firstArea}. If price hesitates there, that is where partial profit or caution makes sense.</p>
    </section>
    <section class="drawer-section">
      <strong>Where it could trade after that</strong>
      <p>If momentum stays clean, the next area is ${secondArea}. If price reaches that area weakly, do not assume it keeps going.</p>
    </section>
    <section class="drawer-section">
      <strong>What would make me stand aside</strong>
      <p>${market.noTrade}</p>
    </section>
  `;
}

function answerMarketQuestion(question) {
  const text = question.toLowerCase();
  if (!isMarketQuestion(text)) {
    return "I’m built only for market intelligence, so I’m going to stay in my lane here: USD markets, stocks, crypto/USD, commodities/USD, news, setups, entries, exits, risk, CPI, NFP, FOMC, Fed speakers, and trading decisions. Ask me something like “what’s the cleanest setup?” or “what would stop me from taking NQ?”";
  }
  const currentMarkets = styledMarkets();
  const currentBacktests = styledBacktests();
  if (includesAny(text, ["cleanest", "best", "strongest", "highest quality"])) {
    const best = [...currentMarkets].sort((a, b) => b.confidence - a.confidence)[0];
    return `For ${state.tradingStyle.toLowerCase()}, I’d start with ${best.asset}. It’s the cleanest setup because the bias, control score, and structure line up better than the others. The plan is ${best.action}, ${best.quality} quality, ${best.confidence}% confidence, ${best.rr}. I’d want entry around ${best.entry}, risk defined at ${best.stop}, then targets at ${best.target1} and ${best.target2}. The important part: don’t force it if the entry zone is gone.`;
  }
  if (includesAny(text, ["changed", "news", "headline", "fed", "cpi", "nfp", "fomc", "macro"])) {
    const relevantNews = news.filter((item) => styleModes[state.tradingStyle].relevantDurations.includes(item.duration));
    return relevantNews
      .slice(0, 3)
      .map(
        (item) =>
          `${item.title}. Importance ${item.importance}/10. ${item.why} For ${state.tradingStyle.toLowerCase()}: ${item.styleNotes[state.tradingStyle]}`,
      )
      .join(" ");
  }
  if (includesAny(text, ["backtest", "100 trades", "scalp", "scalping", "intraday", "swing", "day trading", "win rate"])) {
    const active = currentBacktests.filter((test) => {
      const market = currentMarkets.find((item) => item.asset === test.asset);
      return market && market.action !== "No Trade";
    });
    const totalR = active.reduce((sum, test) => sum + test.resultR, 0);
    const wins = active.reduce((sum, test) => sum + test.wins, 0);
    const trades = active.reduce((sum, test) => sum + test.trades, 0);
    const best = [...active].sort((a, b) => b.expectancyR - a.expectancyR)[0];
    const worst = [...currentBacktests].sort((a, b) => a.expectancyR - b.expectancyR)[0];
    return `For ${state.tradingStyle.toLowerCase()}, the demo 100-trade model says active setups average ${Math.round(
      (wins / trades) * 100,
    )}% wins and ${formatR(totalR)} combined. Best is ${best.asset} at ${best.wins}% wins, ${formatR(
      best.resultR,
    )}, ${best.profitFactor.toFixed(2)} PF. Avoid ${worst.asset}: ${formatR(
      worst.resultR,
    )}, ${worst.profitFactor.toFixed(2)} PF. My read: use this as a filter, not a promise. If the setup no longer looks like the model conditions, skip it.`;
  }
  const market = findMentionedMarket(text, currentMarkets) || currentMarkets[0];
  if (market.watchlistOnly) {
    return `${market.asset} is on the USD watchlist, but I don’t have an active setup card for it in this demo. If I were helping you trade it, I’d want current price, trend, volume, key levels, and news impact before saying buy, sell, or stand aside.`;
  }
  if (includesAny(text, ["why", "grade", "quality", "setup", "rating", "b+", "a-", "a "])) {
    return `${market.asset} is a ${market.quality} in ${state.tradingStyle.toLowerCase()} mode, using ${market.currentPrice} as the current reference price on the ${market.chartTimeframe} chart. Plain English: ${market.gradeWhy} The score is not just “bullish or bearish”; it’s trend ${market.confidenceBreakdown.Trend}, volume ${market.confidenceBreakdown.Volume}, news ${market.confidenceBreakdown.News}, risk ${market.confidenceBreakdown.Risk}, and structure ${market.confidenceBreakdown.Structure}. Data basis: ${market.dataBasis}`;
  }
  if (includesAny(text, ["buy", "sell", "entry", "enter", "trigger"])) {
    return `For ${state.tradingStyle.toLowerCase()}, ${market.asset} is currently a ${market.action} idea. Market status: ${market.marketStatus}. Current price used: ${market.currentPrice}. I would not just press the button anywhere. I’d wait for ${market.entry}. The risk line is ${market.stop}. First target is ${market.target1}; second target is ${market.target2}. If this happens, leave it alone: ${market.noTrade}`;
  }
  if (includesAny(text, ["exit", "target", "take profit"])) {
    return `${market.asset} exits for ${state.tradingStyle.toLowerCase()}: first decision point is ${market.target1}. If price reacts badly there, take the win. If momentum is still clean, leave a runner toward ${market.target2}. The planned risk/reward is ${market.rr}, but the trade should be managed around price reaction, not hope.`;
  }
  if (includesAny(text, ["risk", "wrong", "invalid", "stop", "avoid", "not take"])) {
    return `Here’s the risk-first answer for ${market.asset}: ${market.invalidation} Also, ${market.noTrade} Reversal risk is ${market.reversalRisk}. If you feel tempted to enter late, that’s usually the moment to wait for the next setup instead.`;
  }
  return `${market.asset} in ${state.tradingStyle.toLowerCase()} mode: ${market.action}, ${market.bias}, ${market.quality}, ${market.confidence}% confidence. Market status is ${market.marketStatus}; current price used is ${market.currentPrice}; data basis is ${market.dataBasis} My practical read is: wait for ${market.entry}, respect ${market.stop}, look for ${market.target1} first and ${market.target2} only if the move still has strength.`;
}

function isMarketQuestion(text) {
  return [
    "market",
    "stock",
    "news",
    "nasdaq",
    "nq",
    "s&p",
    "es",
    "bitcoin",
    "btc",
    "ethereum",
    "eth",
    "litecoin",
    "ltc",
    "gold",
    "silver",
    "oil",
    "nvidia",
    "nvda",
    "tesla",
    "airbnb",
    "eur",
    "aud",
    "usd",
    "entry",
    "exit",
    "target",
    "stop",
    "risk",
    "setup",
    "trade",
    "scalp",
    "scalping",
    "backtest",
    "win rate",
    "buy",
    "sell",
    "bias",
    "confidence",
    "volume",
    "fed",
    "cpi",
    "nfp",
    "fomc",
    "yield",
    "earnings",
    "price",
  ].some((term) => text.includes(term));
}

function findMentionedMarket(text, sourceMarkets = markets) {
  const aliases = [
    ["BTC/USD", ["btc", "bitcoin"]],
    ["ETH/USD", ["eth", "ethereum"]],
    ["LTC/USD", ["ltc", "litecoin"]],
    ["NASDAQ 100", ["nasdaq", "nq", "tech"]],
    ["S&P 500", ["s&p", "sp500", "es"]],
    ["XAU/USD", ["xau", "gold"]],
    ["XAG/USD", ["xag", "silver"]],
    ["EUR/USD", ["eur", "euro"]],
    ["AUD/USD", ["aud", "aussie"]],
    ["NVIDIA", ["nvidia", "nvda"]],
    ["TESLA", ["tesla", "tsla"]],
    ["AIRBNB", ["airbnb", "abnb"]],
    ["WTI OIL/USD", ["oil", "wti", "crude"]],
  ];
  const match = aliases.find(([, terms]) => terms.some((term) => text.includes(term)));
  if (!match) return null;
  return sourceMarkets.find((market) => market.asset === match[0]) || { asset: match[0], watchlistOnly: true };
}

function drawAllCharts() {
  styledMarkets().forEach((market) => {
    drawTradeChart(`home-${slug(market.asset)}-chart`, market);
    drawTradeChart(`setup-${slug(market.asset)}-chart`, market);
  });
}

function drawTradeChart(canvasId, market) {
  const canvas = byId(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = { top: 24, right: 96, bottom: 30, left: 24 };
  const prices = chartPricesForMarket(market);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const xFor = (index) => padding.left + (index / (prices.length - 1)) * (width - padding.left - padding.right);
  const yFor = (price) => padding.top + ((max - price) / range) * (height - padding.top - padding.bottom);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#080808";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 4; i += 1) {
    const y = padding.top + i * ((height - padding.top - padding.bottom) / 3);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right + 44, y);
    ctx.stroke();
  }
  ctx.strokeStyle = market.bias === "Bearish" ? "#ff4d5e" : market.action === "No Trade" ? "#7d7d7d" : "#21d07a";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.beginPath();
  prices.forEach((price, index) => {
    const x = xFor(index);
    const y = yFor(price);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  const markers = markerIndexesForStyle();
  drawMarker(ctx, xFor(markers.entry), yFor(prices[markers.entry]), "Entry", "#21d07a");
  drawMarker(ctx, xFor(markers.stop), yFor(prices[markers.stop]), "Stop", "#ff4d5e");
  drawMarker(ctx, xFor(markers.exit), yFor(prices[markers.exit]), "Exit", "#d8b96c");
}

function chartPricesForMarket(market) {
  const price = market.currentPriceValue;
  if (!price) return market.chart;
  const direction = market.action === "Sell" ? -1 : market.action === "No Trade" ? 0 : 1;
  const volatility =
    state.tradingStyle === "Scalping"
      ? 0.0018
      : state.tradingStyle === "Intraday"
        ? 0.006
        : state.tradingStyle === "Day Trading"
          ? 0.012
          : 0.045;
  const shape = [-0.8, -0.45, -0.62, -0.22, 0.05, -0.08, 0.32, 0.58, 0.2, 0.75, 1.0];
  if (direction === 0) {
    return shape.map((point, index) => price * (1 + Math.sin(index) * volatility * 0.35 + point * volatility * 0.12));
  }
  return shape.map((point) => price * (1 + direction * point * volatility));
}

function markerIndexesForStyle() {
  if (state.tradingStyle === "Swing") return { entry: 5, stop: 1, exit: 10 };
  if (state.tradingStyle === "Day Trading") return { entry: 6, stop: 2, exit: 10 };
  if (state.tradingStyle === "Scalping") return { entry: 8, stop: 7, exit: 10 };
  return { entry: 8, stop: 5, exit: 10 };
}

function drawMarker(ctx, x, y, label, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 54, y - 22);
  ctx.stroke();
  ctx.font = "700 22px system-ui, -apple-system, sans-serif";
  ctx.fillText(label, x + 60, y - 26);
}

function drawPulse() {
  const canvas = byId("pulseCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, width, height);
  for (let x = 0; x < width; x += 36) {
    ctx.strokeStyle = "rgba(255,255,255,0.045)";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 32) {
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  drawWave(ctx, width, height, "#21d07a", 0.72, 12);
  drawWave(ctx, width, height, "#ff4d5e", 0.35, 42);
}

function drawWave(ctx, width, height, color, strength, offset) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  for (let x = 0; x < width; x += 10) {
    const y =
      height * strength +
      Math.sin((x + Date.now() / 20 + offset) / 42) * 24 +
      Math.sin((x + offset) / 19) * 9;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function rotateMarketScores() {
  markets.forEach((market) => {
    const change = Math.round(Math.random() * 8 - 4);
    market.confidence = clamp(market.confidence + change, 42, 94);
    market.buyerControl = clamp(market.buyerControl + change, 20, 95);
    market.volume = clamp(market.volume + Math.round(Math.random() * 10 - 5), 20, 95);
    market.newsImpact = clamp(market.newsImpact + Math.round(Math.random() * 10 - 5), 20, 95);
    market.reversalRisk = clamp(market.reversalRisk + Math.round(Math.random() * 10 - 5), 15, 85);
  });
}

function nextOnboarding() {
  if (state.onboardingStep >= 2) {
    finishOnboarding();
    return;
  }
  state.onboardingStep += 1;
  document.querySelectorAll(".onboarding-step").forEach((step) => {
    step.classList.toggle("active", Number(step.dataset.step) === state.onboardingStep);
  });
  byId("nextOnboarding").textContent = state.onboardingStep === 2 ? "Start" : "Next";
}

function finishOnboarding() {
  byId("onboarding").classList.add("hidden");
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatR(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}R`;
}

function ratioFromR(value) {
  return ratioFromValue(value);
}

function ratioFromValue(value) {
  if (!Number.isFinite(value) || value <= 0) return "Unavailable";
  if (value >= 1) return `1:${formatRatioNumber(value)}`;
  return `${formatRatioNumber(1 / value)}:1`;
}

function formatRatioNumber(value) {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value) return null;
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatPriceForMarket(market, value) {
  if (!Number.isFinite(value)) return "Unavailable";
  if (["EUR/USD", "AUD/USD"].includes(market.asset)) return `$${value.toFixed(5)}`;
  if (["LTC/USD", "WTI OIL/USD", "XAG/USD", "TESLA", "AIRBNB"].includes(market.asset)) {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (value >= 1000) return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

init();
