import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Target,
  Zap,
  Brain,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Activity,
  Filter,
  Search,
  Bell,
  Download,
  Settings,
  RefreshCw,
  Volume2,
  PieChart,
  Shield,
  TrendingUp as ChartLine,
  Users,
  DollarSign,
  Globe,
  Smartphone,
  Maximize2,
  Minimize2,
} from "lucide-react";

const ICTAdvancedAnalyzer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMarket, setSelectedMarket] = useState("Stocks");
  const [sortBy, setSortBy] = useState("Total Score");
  const [expandedAsset, setExpandedAsset] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedSector, setSelectedSector] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedChartType, setSelectedChartType] = useState("candlestick");
  const [performanceStats, setPerformanceStats] = useState({
    dailyProfit: "+2.4%",
    weeklyProfit: "+8.7%",
    winRate: "76.2%",
    sharpeRatio: "2.1",
  });
  const mainRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // NEW: Simulate live price updates
  const [priceUpdates, setPriceUpdates] = useState({});

  // NEW: Generate sectors for filtering
  const sectors = [
    "All",
    "AI/Semiconductors",
    "Cloud/AI",
    "FinTech",
    "Biotech",
    "Clean Energy",
    "EV/Energy",
    "Social/VR",
  ];

  // Simulated real-time data with 2025 features
  const generateAdvancedData = () => {
    const top21Stocks = [
      { symbol: "NVDA", name: "NVIDIA", sector: "AI/Semiconductors" },
      { symbol: "MSFT", name: "Microsoft", sector: "Cloud/AI" },
      { symbol: "GOOGL", name: "Alphabet", sector: "AI/Search" },
      { symbol: "META", name: "Meta Platforms", sector: "Social/VR" },
      { symbol: "AAPL", name: "Apple", sector: "Consumer Tech" },
      { symbol: "PLTR", name: "Palantir", sector: "AI/Defense" },
      { symbol: "SNOW", name: "Snowflake", sector: "Cloud Data" },
      { symbol: "AI", name: "C3.ai", sector: "Enterprise AI" },
      { symbol: "AVGO", name: "Broadcom", sector: "Semiconductors" },
      { symbol: "V", name: "Visa", sector: "FinTech" },
      { symbol: "MA", name: "Mastercard", sector: "FinTech" },
      { symbol: "BLK", name: "BlackRock", sector: "Asset Mgmt" },
      { symbol: "COIN", name: "Coinbase", sector: "Crypto Exchange" },
      { symbol: "TSLA", name: "Tesla", sector: "EV/Energy" },
      { symbol: "NEE", name: "NextEra Energy", sector: "Clean Energy" },
      { symbol: "ENPH", name: "Enphase", sector: "Solar" },
      { symbol: "LLY", name: "Eli Lilly", sector: "Biotech" },
      { symbol: "ISRG", name: "Intuitive Surgical", sector: "MedTech" },
      { symbol: "VRTX", name: "Vertex Pharma", sector: "Biotech" },
      { symbol: "AMD", name: "AMD", sector: "Semiconductors" },
      { symbol: "QCOM", name: "Qualcomm", sector: "5G/Mobile" },
    ];

    return top21Stocks.map((stock, idx) => {
      const basePrice = 100 + idx * 50;
      const priceChange = (Math.random() - 0.5) * 10;
      const newPrice = basePrice + priceChange;
      const changePercent = ((priceChange / basePrice) * 100).toFixed(2);

      return {
        ...stock,
        rank: idx + 1,
        price: newPrice.toFixed(2),
        change: changePercent,
        volume: Math.floor(Math.random() * 10000000).toLocaleString(),
        totalScore: (95 - idx * 2 + Math.random() * 5).toFixed(1),
        aiScore: (85 + Math.random() * 15).toFixed(1),
        ictScore: (80 + Math.random() * 20).toFixed(1),
        sentimentScore: (70 + Math.random() * 30).toFixed(1),
        volumeProfile: ["Very High", "High", "Medium"][
          Math.floor(Math.random() * 3)
        ],
        signal: idx < 7 ? "🟢 STRONG BUY" : idx < 14 ? "🟢 BUY" : "🟡 HOLD",
        trend: Math.random() > 0.3 ? "🟢 BULLISH" : "🔴 BEARISH",
        riskScore: (3 + Math.random() * 4).toFixed(1),
        nextOptimal: ["NY Kill Zone", "London Kill Zone", "Silver Bullet"][
          Math.floor(Math.random() * 3)
        ],
        institutionalFlow: Math.random() > 0.5 ? "Buying" : "Selling",
        darkPoolActivity: (Math.random() * 100).toFixed(1) + "M",
        shortInterest: (Math.random() * 15).toFixed(1) + "%",
        optionsFlow: Math.random() > 0.5 ? "Bullish" : "Neutral",
        earningsDate: new Date(
          Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        whaleActivity: Math.random() > 0.7 ? "Detected" : "Normal",
        marketCap: (Math.random() * 1000).toFixed(1) + "B",
        peRatio: (Math.random() * 50).toFixed(1),
        dividendYield: (Math.random() * 3).toFixed(2) + "%",
      };
    });
  };

  const [assets, setAssets] = useState(generateAdvancedData());

  // NEW: Filter assets based on search and filters
  const filteredAssets = assets
    .filter(
      (asset) => selectedSector === "All" || asset.sector === selectedSector
    )
    .filter((asset) => {
      if (riskFilter === "All") return true;
      if (riskFilter === "Low") return parseFloat(asset.riskScore) <= 4;
      if (riskFilter === "Medium")
        return (
          parseFloat(asset.riskScore) > 4 && parseFloat(asset.riskScore) <= 6
        );
      if (riskFilter === "High") return parseFloat(asset.riskScore) > 6;
      return true;
    })
    .filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "Total Score":
          return parseFloat(b.totalScore) - parseFloat(a.totalScore);
        case "AI Score":
          return parseFloat(b.aiScore) - parseFloat(a.aiScore);
        case "Risk Score":
          return parseFloat(a.riskScore) - parseFloat(b.riskScore);
        case "Volume Profile":
          return b.volumeProfile.localeCompare(a.volumeProfile);
        case "Price Change":
          return parseFloat(b.change) - parseFloat(a.change);
        default:
          return a.rank - b.rank;
      }
    });

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setAssets(generateAdvancedData());

      // Generate random alerts
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          message: `Price alert: ${
            assets[Math.floor(Math.random() * assets.length)].symbol
          } moved ${Math.random() > 0.5 ? "up" : "down"} ${(
            Math.random() * 5
          ).toFixed(2)}%`,
          type: Math.random() > 0.5 ? "info" : "warning",
          time: new Date().toLocaleTimeString(),
        };
        setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // NEW: Simulated market sentiment data
  const marketSentiment = {
    overall: "Bullish",
    sp500: "+0.8%",
    nasdaq: "+1.2%",
    fearGreedIndex: "75 (Extreme Greed)",
    putCallRatio: "0.68",
    vix: "15.2",
  };

  // NEW: Trading sessions with enhanced data
  const sessions = [
    {
      name: "Asian KZ",
      active: false,
      time: "6:30-9:30 AM IST",
      priority: 3,
      volatility: "Medium",
      volume: "Low",
    },
    {
      name: "London KZ",
      active: true,
      time: "12:30-3:30 PM IST",
      priority: 5,
      volatility: "High",
      volume: "High",
    },
    {
      name: "NY KZ",
      active: true,
      time: "5:30-8:30 PM IST",
      priority: 5,
      volatility: "High",
      volume: "Very High",
    },
    {
      name: "Silver Bullet",
      active: false,
      time: "8:30-9:30 PM IST",
      priority: 4,
      volatility: "Low",
      volume: "Medium",
    },
  ];

  const marketStats = {
    totalAssets: assets.length,
    strongSignals: assets.filter((a) => a.signal.includes("STRONG")).length,
    averageAccuracy: "87.3%",
    activeSession: "London + NY Overlap",
    marketRegime: "TRENDING",
    totalMarketCap: "45.2T",
    advancingStocks: Math.floor(assets.length * 0.65),
    decliningStocks: Math.floor(assets.length * 0.35),
  };

  // NEW: Top gainers and losers
  const topGainers = [...assets]
    .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
    .slice(0, 3);
  const topLosers = [...assets]
    .sort((a, b) => parseFloat(a.change) - parseFloat(b.change))
    .slice(0, 3);

  // NEW: Toggle watchlist
  const toggleWatchlist = (symbol) => {
    setWatchlist((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  // NEW: Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // NEW: Export data
  const exportData = () => {
    const dataStr = JSON.stringify(assets, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `trading-data-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
  };

  return (
    <div
      ref={mainRef}
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100"
      } text-white p-4 transition-all duration-300 ${
        isFullscreen ? "p-0" : ""
      }`}
    >
      {/* NEW: Alert Banner */}
      {alerts.length > 0 && (
        <div className="mb-4 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="font-semibold">
                Latest Alert: {alerts[0].message}
              </span>
            </div>
            <button
              onClick={() => setAlerts([])}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Header */}
      <div
        className={`mb-6 border-b ${
          darkMode ? "border-blue-500" : "border-blue-300"
        } pb-4`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className={`text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}
            >
              📈 ICT Advanced Market Analyzer 2025
            </h1>
            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              AI-Powered Trading Intelligence | Real-time Market Analysis |
              Institutional Grade Tools
            </p>
          </div>

          {/* NEW: Header Controls */}
          <div className="flex items-center space-x-4">
            <div
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg px-4 py-2 border ${
                darkMode ? "border-blue-500" : "border-blue-200"
              }`}
            >
              <div className="text-xl font-mono text-blue-400">
                {currentTime.toLocaleTimeString("en-IN")}
              </div>
              <div
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-100"
                } border ${darkMode ? "border-blue-500" : "border-blue-200"}`}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-100"
                } border ${darkMode ? "border-blue-500" : "border-blue-200"}`}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={exportData}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-100"
                } border ${darkMode ? "border-blue-500" : "border-blue-200"}`}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* NEW: Navigation Tabs */}
        <div className="flex space-x-2 mb-4">
          {["dashboard", "watchlist", "analysis", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                activeView === tab
                  ? "bg-blue-600 text-white"
                  : `${
                      darkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`
              }`}
            >
              {tab === "dashboard" && "📊 "}
              {tab === "watchlist" && "⭐ "}
              {tab === "analysis" && "📈 "}
              {tab === "settings" && "⚙️ "}
              {tab}
            </button>
          ))}
        </div>

        {/* Enhanced Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            {
              label: "Total Assets",
              value: marketStats.totalAssets,
              icon: BarChart3,
              color: "blue",
              change: "+2",
            },
            {
              label: "Strong Signals",
              value: marketStats.strongSignals,
              icon: Zap,
              color: "green",
              change: "+3",
            },
            {
              label: "Avg Accuracy",
              value: marketStats.averageAccuracy,
              icon: Target,
              color: "purple",
              change: "+1.2%",
            },
            {
              label: "Active Session",
              value: marketStats.activeSession,
              icon: Clock,
              color: "orange",
              change: "Live",
            },
            {
              label: "Market Regime",
              value: marketStats.marketRegime,
              icon: Activity,
              color: "red",
              change: "Trending",
            },
            {
              label: "Win Rate",
              value: performanceStats.winRate,
              icon: TrendingUp,
              color: "green",
              change: "↑ 2.1%",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`${
                darkMode ? "bg-gray-800 bg-opacity-50" : "bg-white"
              } backdrop-blur-sm border ${
                darkMode ? "border-blue-500" : "border-blue-200"
              } rounded-lg p-3`}
            >
              <div className="flex items-center justify-between mb-1">
                <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                <span
                  className={`text-xs font-semibold ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-lg font-bold">{stat.value}</div>
                <span
                  className={`text-xs ${
                    stat.change.includes("+") || stat.change.includes("↑")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Market Sentiment Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Left: Market Overview */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg p-4 border ${
            darkMode ? "border-blue-500" : "border-blue-200"
          }`}
        >
          <h3 className="font-bold mb-3 flex items-center">
            <Globe className="mr-2" /> Market Overview
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Overall Sentiment
              </span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  marketSentiment.overall === "Bullish"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {marketSentiment.overall}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                S&P 500
              </span>
              <span className="text-green-400 font-semibold">
                {marketSentiment.sp500}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                NASDAQ
              </span>
              <span className="text-green-400 font-semibold">
                {marketSentiment.nasdaq}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Fear & Greed Index
              </span>
              <span className="text-yellow-400 font-semibold">
                {marketSentiment.fearGreedIndex}
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Top Movers */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg p-4 border ${
            darkMode ? "border-blue-500" : "border-blue-200"
          }`}
        >
          <h3 className="font-bold mb-3 flex items-center">
            <TrendingUp className="mr-2" /> Top Movers
          </h3>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-400 mb-1">
              Top Gainers
            </div>
            {topGainers.map((stock, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span className="font-medium">{stock.symbol}</span>
                <span className="text-green-400 font-semibold">
                  +{stock.change}%
                </span>
                <span className="text-gray-400 text-sm">${stock.price}</span>
              </div>
            ))}
            <div className="text-sm font-semibold text-gray-400 mt-3 mb-1">
              Top Losers
            </div>
            {topLosers.map((stock, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span className="font-medium">{stock.symbol}</span>
                <span className="text-red-400 font-semibold">
                  {stock.change}%
                </span>
                <span className="text-gray-400 text-sm">${stock.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Performance */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg p-4 border ${
            darkMode ? "border-blue-500" : "border-blue-200"
          }`}
        >
          <h3 className="font-bold mb-3 flex items-center">
            <ChartLine className="mr-2" /> Your Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Today's P&L
              </span>
              <span className="text-green-400 font-bold">
                {performanceStats.dailyProfit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Weekly P&L
              </span>
              <span className="text-green-400 font-bold">
                {performanceStats.weeklyProfit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Win Rate
              </span>
              <span className="text-green-400 font-bold">
                {performanceStats.winRate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Sharpe Ratio
              </span>
              <span className="text-blue-400 font-bold">
                {performanceStats.sharpeRatio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Kill Zones */}
      <div
        className={`mb-6 ${
          darkMode ? "bg-gray-800 bg-opacity-50" : "bg-white"
        } backdrop-blur-sm rounded-lg p-4 border ${
          darkMode ? "border-blue-500" : "border-blue-200"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <Clock className="mr-2" /> Trading Sessions (Kill Zones)
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-2 rounded ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              } ${autoRefresh ? "text-green-400" : "text-gray-400"}`}
            >
              <RefreshCw
                className={`w-4 h-4 ${autoRefresh ? "animate-spin" : ""}`}
              />
            </button>
            <span className="text-xs text-gray-400">
              Auto-refresh: {autoRefresh ? "ON" : "OFF"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sessions.map((session, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border-2 ${
                session.active
                  ? "border-green-500 bg-green-900 bg-opacity-30"
                  : "border-gray-600 bg-gray-700 bg-opacity-30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold">{session.name}</span>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded mr-2 ${
                        session.active ? "bg-green-500" : "bg-gray-600"
                      }`}
                    >
                      {session.active ? "ACTIVE" : "CLOSED"}
                    </span>
                    <span
                      className={`text-xs ${
                        session.volatility === "High"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      ⚡ {session.volatility}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {session.priority}/5
                  </div>
                  <div className="text-xs text-gray-400">Priority</div>
                </div>
              </div>
              <div className="text-sm text-gray-300">{session.time}</div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>📊 {session.volume}</span>
                <span>🎯 {session.volatility}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search symbols or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            } border ${
              darkMode ? "border-blue-500" : "border-blue-200"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Filters */}
        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
          className={`px-4 py-2 rounded-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } border ${
            darkMode ? "border-blue-500" : "border-blue-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option>Stocks</option>
          <option>Crypto</option>
          <option>Forex</option>
          <option>Futures</option>
          <option>Options</option>
        </select>

        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className={`px-4 py-2 rounded-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } border ${
            darkMode ? "border-blue-500" : "border-blue-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } border ${
            darkMode ? "border-blue-500" : "border-blue-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option>All Risk</option>
          <option>Low Risk (≤4)</option>
          <option>Medium Risk (4-6)</option>
          <option>High Risk (>6)</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`px-4 py-2 rounded-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } border ${
            darkMode ? "border-blue-500" : "border-blue-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option>Total Score</option>
          <option>AI Score</option>
          <option>Risk Score</option>
          <option>Volume Profile</option>
          <option>Price Change</option>
        </select>
      </div>

      {/* Enhanced Assets Table */}
      <div
        className={`${
          darkMode ? "bg-gray-800 bg-opacity-50" : "bg-white"
        } backdrop-blur-sm rounded-lg border ${
          darkMode ? "border-blue-500" : "border-blue-200"
        } overflow-hidden mb-6`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`${
                darkMode ? "bg-blue-900 bg-opacity-50" : "bg-blue-50"
              }`}
            >
              <tr>
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Change</th>
                <th className="p-3 text-left">Total Score</th>
                <th className="p-3 text-left">AI Score</th>
                <th className="p-3 text-left">Signal</th>
                <th className="p-3 text-left">Risk</th>
                <th className="p-3 text-left">Watch</th>
                <th className="p-3 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, idx) => (
                <React.Fragment key={idx}>
                  <tr
                    className={`border-b ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    } hover:${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    } hover:bg-opacity-50 transition-colors ${
                      idx < 7
                        ? darkMode
                          ? "bg-green-900 bg-opacity-20"
                          : "bg-green-50"
                        : ""
                    }`}
                  >
                    <td className="p-3">
                      <span
                        className={`font-bold ${
                          idx < 3
                            ? "text-yellow-400"
                            : idx < 7
                            ? "text-green-400"
                            : ""
                        }`}
                      >
                        #{asset.rank}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-blue-400">
                        {asset.symbol}
                      </div>
                      <div className="text-xs text-gray-400">{asset.name}</div>
                      <div className="text-xs text-gray-500">
                        {asset.sector}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold">${asset.price}</div>
                      <div className="text-xs text-gray-400">
                        Vol: {asset.volume}
                      </div>
                    </td>
                    <td className="p-3">
                      <div
                        className={`font-bold ${
                          parseFloat(asset.change) >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {parseFloat(asset.change) >= 0 ? "+" : ""}
                        {asset.change}%
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-lg font-bold text-green-400">
                        {asset.totalScore}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Brain className="w-4 h-4 mr-1 text-purple-400" />
                        <span className="font-semibold">{asset.aiScore}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          asset.signal.includes("STRONG")
                            ? "bg-green-600"
                            : asset.signal.includes("BUY")
                            ? "bg-green-700"
                            : "bg-yellow-600"
                        }`}
                      >
                        {asset.signal}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <span
                          className={`font-semibold ${
                            parseFloat(asset.riskScore) < 4
                              ? "text-green-400"
                              : parseFloat(asset.riskScore) < 6
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {asset.riskScore}/10
                        </span>
                        <Shield
                          className={`w-4 h-4 ml-1 ${
                            parseFloat(asset.riskScore) < 4
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleWatchlist(asset.symbol)}
                        className={`p-2 rounded ${
                          watchlist.includes(asset.symbol)
                            ? "text-yellow-400 bg-yellow-900 bg-opacity-30"
                            : "text-gray-400 hover:text-yellow-400"
                        }`}
                      >
                        {watchlist.includes(asset.symbol) ? "★" : "☆"}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() =>
                          setExpandedAsset(expandedAsset === idx ? null : idx)
                        }
                        className="p-2 hover:bg-blue-600 rounded transition-colors"
                      >
                        {expandedAsset === idx ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedAsset === idx && (
                    <tr
                      className={
                        darkMode ? "bg-gray-900 bg-opacity-80" : "bg-gray-50"
                      }
                    >
                      <td colSpan="10" className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-bold mb-3 text-blue-400">
                              📊 Advanced Metrics
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  ICT Score:
                                </span>
                                <span className="font-semibold">
                                  {asset.ictScore}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Sentiment:
                                </span>
                                <span className="font-semibold">
                                  {asset.sentimentScore}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Market Cap:
                                </span>
                                <span className="font-semibold">
                                  {asset.marketCap}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  P/E Ratio:
                                </span>
                                <span className="font-semibold">
                                  {asset.peRatio}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold mb-3 text-purple-400">
                              🏦 Institutional Data
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Dark Pool:
                                </span>
                                <span className="font-semibold">
                                  {asset.darkPoolActivity}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Short Interest:
                                </span>
                                <span className="font-semibold">
                                  {asset.shortInterest}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Whale Activity:
                                </span>
                                <span
                                  className={`font-semibold ${
                                    asset.whaleActivity === "Detected"
                                      ? "text-yellow-400"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {asset.whaleActivity}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Dividend Yield:
                                </span>
                                <span className="font-semibold">
                                  {asset.dividendYield}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold mb-3 text-green-400">
                              💡 Trading Insights
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Target className="w-4 h-4 mr-2" />
                                <span>
                                  Next optimal entry: {asset.nextOptimal}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Activity className="w-4 h-4 mr-2" />
                                <span>
                                  Institutional flow: {asset.institutionalFlow}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>Earnings date: {asset.earningsDate}</span>
                              </div>
                              <div className="flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                <span>
                                  Risk level:{" "}
                                  {parseFloat(asset.riskScore) < 4
                                    ? "Low"
                                    : parseFloat(asset.riskScore) < 6
                                    ? "Medium"
                                    : "High"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW: Quick Actions & Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div
          className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}
        >
          <p>
            ⚡ Live Data Updates Every 5 Seconds | 🧠 AI-Powered Analysis | 🎯
            ICT Strategy Optimized
          </p>
          <p className="mt-1">
            📊 {filteredAssets.length} assets filtered | ⭐ {watchlist.length}{" "}
            in watchlist
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setAssets(generateAdvancedData())}
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-medium flex items-center`}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
          </button>
          <div className="text-xs text-gray-400">
            Last update:{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICTAdvancedAnalyzer;
