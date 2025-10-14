import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './style.css';

const appData = {
    languages: {
        en: {
            name: "English",
            nav: {
                dashboard: "Dashboard",
                yield: "Yield Prediction",
                recommendations: "Recommendations", 
                disease: "Disease Detector",
                weather: "Weather",
                market: "Market",
                schemes: "Gov Schemes",
                community: "Community"
            },
            chatbot: {
                title: "AI Assistant",
                online: "Online",
                greeting: "Hello! I'm your AI farming assistant. How can I help you today?",
                disease: "Disease Help",
                irrigation: "Irrigation",
                fertilizer: "Fertilizer",
                weather: "Weather",
                responses: {
                    "crop disease": "I can help identify crop diseases from photos. Upload an image and I'll analyze it for you with 94% accuracy using advanced AI models.",
                    "irrigation": "For optimal irrigation, consider soil moisture, weather forecast, and crop growth stage. Most crops need 2-3 inches of water per week during growing season.",
                    "fertilizer": "Fertilizer needs vary by crop and soil type. Rice needs high nitrogen (120kg/ha), while legumes fix their own nitrogen. Soil testing recommended every 2-3 years.",
                    "weather": "I can provide 14-day weather forecasts and farming advice. Current conditions show good weather for field operations in your area."
                }
            }
        },
        hi: {
            name: "हिंदी",
            nav: {
                dashboard: "डैशबोर्ड",
                yield: "उत्पादन पूर्वानुमान",
                recommendations: "सिफारिशें",
                disease: "रोग परीक्षक",
                weather: "मौसम",
                market: "बाजार",
                schemes: "सरकारी योजनाएं",
                community: "समुदाय"
            },
            chatbot: {
                title: "AI सहायक",
                online: "ऑनलाइन",
                greeting: "नमस्ते! मैं आपका AI कृषि सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
                disease: "रोग सहायता",
                irrigation: "सिंचाई",
                fertilizer: "उर्वरक",
                weather: "मौसम",
                responses: {
                    "crop disease": "मैं तस्वीरों से फसल की बीमारियों की पहचान कर सकता हूँ। एक तस्वीर अपलोड करें और मैं 94% सटीकता के साथ इसका विश्लेषण करूंगा।",
                    "irrigation": "बेहतर सिंचाई के लिए मिट्टी की नमी, मौसम पूर्वानुमान और फसल की अवस्था को देखें। अधिकांश फसलों को बढ़ते मौसम में सप्ताह में 2-3 इंच पानी चाहिए।",
                    "fertilizer": "उर्वरक की जरूरत फसल और मिट्टी के प्रकार के अनुसार अलग होती है। धान को अधिक नाइट्रोजन (120 किग्रा/हेक्टेयर) चाहिए। हर 2-3 साल में मिट्टी परीक्षण कराएं।",
                    "weather": "मैं 14 दिन का मौसम पूर्वानुमान और कृषि सलाह दे सकता हूँ। वर्तमान स्थितियां आपके क्षेत्र में खेती के काम के लिए अच्छी हैं।"
                }
            }
        },
        or: {
            name: "ଓଡ଼ିଆ",
            nav: {
                dashboard: "ଡ୍ୟାସବୋର୍ଡ",
                yield: "ଅମଳ ପୂର୍ବାନୁମାନ",
                recommendations: "ପରାମର୍ଶ",
                disease: "ରୋଗ ଚିହ୍ନାକାରୀ",
                weather: "ପାଣିପାଗ",
                market: "ବଜାର",
                schemes: "ସରକାରୀ ଯୋଜନା",
                community: "ସମ୍ପ୍ରଦାୟ"
            },
            chatbot: {
                title: "AI ସହାୟକ",
                online: "ଅନଲାଇନ",
                greeting: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI କୃଷି ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାୟ୍ୟ କରିପାରିବି?",
                disease: "ରୋଗ ସହାୟତା",
                irrigation: "ଜଳସେଚନ",
                fertilizer: "ସାର",
                weather: "ପାଣିପାଗ",
                responses: {
                    "crop disease": "ମୁଁ ଫଟୋରୁ ଫସଲର ରୋଗ ଚିହ୍ନଟ କରିପାରିବି। ଏକ ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ ଏବଂ ମୁଁ 94% ସଠିକତା ସହିତ ଏହାର ବିଶ୍ଳେଷଣ କରିବି।",
                    "irrigation": "ସର୍ବୋତ୍ତମ ଜଳସେଚନ ପାଇଁ ମାଟିର ଆର୍ଦ୍ରତା, ପାଣିପାଗ ପୂର୍ବାନୁମାନ ଏବଂ ଫସଲର ଅବସ୍ଥା ଦେଖନ୍ତୁ। ଅଧିକାଂଶ ଫସଲ ବୃଦ୍ଧି ସମୟରେ ସପ୍ତାହକୁ 2-3 ଇଞ୍ଚ ପାଣି ଆବଶ୍ୟକ କରନ୍ତି।",
                    "fertilizer": "ସାର ଆବଶ୍ୟକତା ଫସଲ ଏବଂ ମାଟି ପ୍ରକାର ଅନୁଯାୟୀ ଭିନ୍ନ ହୋଇଥାଏ। ଧାନକୁ ଅଧିକ ନାଇଟ୍ରୋଜେନ୍ (120 କିଗ୍ରା/ହେକ୍ଟର) ଦରକାର। ପ୍ରତି 2-3 ବର୍ଷରେ ମାଟି ପରୀକ୍ଷା କରାନ୍ତୁ।",
                    "weather": "ମୁଁ 14 ଦିନର ପାଣିପାଗ ପୂର୍ବାନୁମାନ ଏବଂ କୃଷି ପରାମର୍ଶ ଦେଇପାରିବି। ବର୍ତ୍ତମାନ ସ୍ଥିତି ଆପଣଙ୍କ ଅଞ୍ଚଳରେ କୃଷି କାମ ପାଇଁ ଭଲ।"
                }
            }
        }
    },
    
    weather_14_days: {
        "Bhubaneswar": [
            {date: "2025-09-17", high: "32°C", low: "24°C", rain: "20%", humidity: "78%", advice: "Good for pesticide application", icon: "⛅"},
            {date: "2025-09-18", high: "30°C", low: "23°C", rain: "60%", humidity: "82%", advice: "Perfect for rice transplanting", icon: "🌧️"},
            {date: "2025-09-19", high: "28°C", low: "22°C", rain: "80%", humidity: "85%", advice: "Avoid field operations", icon: "🌧️"},
            {date: "2025-09-20", high: "31°C", low: "24°C", rain: "40%", humidity: "79%", advice: "Resume irrigation activities", icon: "⛅"},
            {date: "2025-09-21", high: "33°C", low: "25°C", rain: "15%", humidity: "75%", advice: "Monitor crop water stress", icon: "☀️"},
            {date: "2025-09-22", high: "34°C", low: "26°C", rain: "10%", humidity: "72%", advice: "Increase irrigation frequency", icon: "☀️"},
            {date: "2025-09-23", high: "32°C", low: "25°C", rain: "30%", humidity: "76%", advice: "Good conditions for growth", icon: "⛅"},
            {date: "2025-09-24", high: "31°C", low: "24°C", rain: "45%", humidity: "80%", advice: "Ideal for plant development", icon: "⛅"},
            {date: "2025-09-25", high: "29°C", low: "23°C", rain: "70%", humidity: "84%", advice: "Check drainage systems", icon: "🌧️"},
            {date: "2025-09-26", high: "30°C", low: "24°C", rain: "55%", humidity: "81%", advice: "Monitor for fungal diseases", icon: "🌧️"},
            {date: "2025-09-27", high: "32°C", low: "25°C", rain: "25%", humidity: "77%", advice: "Apply fertilizers if needed", icon: "⛅"},
            {date: "2025-09-28", high: "33°C", low: "26°C", rain: "20%", humidity: "74%", advice: "Good for harvesting operations", icon: "☀️"},
            {date: "2025-09-29", high: "34°C", low: "27°C", rain: "15%", humidity: "71%", advice: "Continue field activities", icon: "☀️"},
            {date: "2025-09-30", high: "32°C", low: "25°C", rain: "35%", humidity: "78%", advice: "Prepare for next crop cycle", icon: "⛅"}
        ]
    },
    
    diseases_database: [
        {
            name: "Bacterial Leaf Blight",
            crop: "Rice",
            confidence: "94%",
            severity: "High",
            symptoms: ["Yellow to white stripes on leaves", "Wilting of younger leaves", "Water-soaked lesions"],
            treatment: ["Apply Streptomycin 500ppm", "Remove infected plants immediately", "Improve field drainage"],
            prevention: ["Use resistant varieties like IR-64", "Avoid mechanical injury", "Maintain field hygiene"]
        },
        {
            name: "Brown Spot",
            crop: "Rice", 
            confidence: "91%",
            severity: "Medium",
            symptoms: ["Small brown spots on leaves", "Spots with dark margins", "Premature leaf drying"],
            treatment: ["Apply Mancozeb 75% WP", "Improve nutrition with potash", "Maintain proper water management"],
            prevention: ["Use certified seeds", "Balanced fertilization", "Proper plant spacing"]
        },
        {
            name: "Late Blight",
            crop: "Potato",
            confidence: "96%", 
            severity: "Very High",
            symptoms: ["Dark water-soaked spots", "White mold underneath leaves", "Rapid leaf death"],
            treatment: ["Apply Copper Oxychloride", "Remove infected plants", "Improve air circulation"],
            prevention: ["Use disease-free seeds", "Avoid overhead irrigation", "Crop rotation"]
        },
        {
            name: "Healthy Plant",
            crop: "General",
            confidence: "98%",
            severity: "None",
            symptoms: ["Green healthy leaves", "Normal growth pattern", "No disease symptoms"],
            treatment: ["Continue current practices", "Regular monitoring", "Preventive measures"],
            prevention: ["Maintain good practices", "Regular inspection", "Balanced nutrition"]
        }
    ],
    
    market_prices: [
        {crop: "Rice", price: "₹2,850", unit: "/quintal", change: "+5.2%", trend: "up"},
        {crop: "Wheat", price: "₹2,125", unit: "/quintal", change: "-2.1%", trend: "down"},
        {crop: "Maize", price: "₹1,980", unit: "/quintal", change: "+3.8%", trend: "up"},
        {crop: "Cotton", price: "₹6,500", unit: "/quintal", change: "-1.2%", trend: "down"},
        {crop: "Sugarcane", price: "₹350", unit: "/quintal", change: "+2.5%", trend: "up"},
        {crop: "Soybean", price: "₹4,200", unit: "/quintal", change: "+7.5%", trend: "up"},
        {crop: "Groundnut", price: "₹5,800", unit: "/quintal", change: "+4.3%", trend: "up"},
        {crop: "Sunflower", price: "₹6,200", unit: "/quintal", change: "-0.8%", trend: "down"}
    ],
    
    government_schemes: [
        {
            name: "PM-KISAN",
            description: "Direct income support of ₹6,000 per year to small and marginal farmers",
            eligibility: "Small and marginal farmers with cultivable land",
            amount: "₹6,000/year",
            application: "Online/CSC",
            category: "income",
            state: "all"
        },
        {
            name: "Pradhan Mantri Fasal Bima Yojana",
            description: "Comprehensive crop insurance against natural calamities, pests and diseases",
            eligibility: "All farmers including sharecroppers and tenant farmers",
            amount: "2% premium for Kharif, 1.5% for Rabi",
            application: "Banks/Insurance companies",
            category: "insurance",
            state: "all"
        },
        {
            name: "Soil Health Card Scheme",
            description: "Free soil testing and nutrient recommendations every 3 years",
            eligibility: "All farmers",
            amount: "Free",
            application: "Agriculture Office/Online",
            category: "subsidy",
            state: "all"
        },
        {
            name: "KALIA Scheme",
            description: "Odisha state scheme providing comprehensive livelihood support to farmers",
            eligibility: "Small and marginal farmers in Odisha",
            amount: "₹25,000 for 5 seasons",
            application: "Online/Block offices",
            category: "income",
            state: "Odisha"
        }
    ],
    
    farmer_stories: [
        {
            name: "Rajesh Kumar",
            location: "Cuttack, Odisha",
            crop: "Rice",
            improvement: "18% yield increase",
            story: "Using CropAI's AI predictions and weather alerts, I optimized my irrigation schedule and achieved the best harvest in 5 years! The disease detection feature saved my crop from bacterial blight.",
            avatar: "👨‍🌾",
            income_increase: "₹15,000"
        },
        {
            name: "Priya Sharma", 
            location: "Ludhiana, Punjab",
            crop: "Wheat",
            improvement: "₹25,000 savings",
            story: "The multilingual chatbot helped me identify wheat rust early and get the right treatment. CropAI's recommendations reduced my input costs significantly while maintaining quality.",
            avatar: "👩‍🌾",
            income_increase: "₹25,000"
        },
        {
            name: "Mohan Patel",
            location: "Rajkot, Gujarat", 
            crop: "Cotton",
            improvement: "30% water savings",
            story: "Smart irrigation recommendations and soil health monitoring helped me reduce water usage by 30% while improving cotton quality. The government scheme finder helped me get ₹50,000 subsidy.",
            avatar: "👨‍🌾",
            income_increase: "₹18,500"
        },
        {
            name: "Sunita Devi",
            location: "Bhubaneswar, Odisha",
            crop: "Vegetables",
            improvement: "45% profit increase", 
            story: "CropAI's market price tracking helped me sell my vegetables at the right time for maximum profit. The Odia language support made it easy for me to use all features.",
            avatar: "👩‍🌾",
            income_increase: "₹22,000"
        }
    ]
};

const Header = ({ showPage, currentLanguage, setCurrentLanguage, appData, currentPage }) => (
    <header className="header">
        <div className="logo" onClick={() => showPage('hero')}>
            <span className="logo-icon">🌾</span>
            <span className="logo-text">CropAI</span>
        </div>
        <nav className="nav-links">
            {Object.entries(appData.languages[currentLanguage].nav).map(([key, value]) => (
                <a
                    href={`#${key}`}
                    key={key}
                    className={currentPage === key ? 'active' : ''}
                    onClick={(e) => {
                        e.preventDefault();
                        showPage(key);
                    }}
                >
                    {value}
                </a>
            ))}
        </nav>
        <div className="header-actions">
            <select
                id="globalLanguageSelect"
                className="language-select"
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
            >
                {Object.entries(appData.languages).map(([key, lang]) => (
                    <option key={key} value={key}>
                        {lang.name}
                    </option>
                ))}
            </select>
            <button className="mobile-nav-toggle" onClick={() => {}}>
                <i className="fas fa-bars"></i>
            </button>
        </div>
    </header>
);

const Hero = ({ showPage, openChatbot }) => (
    <div className="hero">
        <div className="hero-content">
            <h1 className="hero-title">
                Welcome to <span className="highlight">CropAI</span>
            </h1>
            <p className="hero-subtitle">
                AI-Powered Agricultural Intelligence for Modern Indian Farming
            </p>
            <div className="hero-buttons">
                <button className="btn btn--primary" onClick={() => showPage('yield-prediction')}>
                    Get Yield Prediction
                </button>
                <button className="btn btn--outline" onClick={openChatbot}>
                    Ask AI Assistant
                </button>
            </div>
        </div>
    </div>
);

const Page = ({ id, currentPage, children }) => (
    <div id={`${id}-page`} className={`page ${currentPage === id ? '' : 'hidden'}`}>
        {children}
    </div>
);

const Dashboard = () => {
    const regionalCanvasRef = useRef(null);

    useEffect(() => {
        if (regionalCanvasRef.current) {
            const ctx = regionalCanvasRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Odisha', 'West Bengal', 'Punjab', 'Tamil Nadu'],
                    datasets: [
                        {
                            label: '2023 Yield (t/ha)',
                            data: [4.2, 4.5, 4.8, 3.9],
                            backgroundColor: '#1FB8CD',
                            borderColor: '#1FB8CD',
                            borderWidth: 1
                        },
                        {
                            label: '2022 Yield (t/ha)', 
                            data: [3.8, 4.2, 4.6, 3.7],
                            backgroundColor: '#FFC185',
                            borderColor: '#FFC185',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Yield (tonnes/hectare)'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Rice Yield Comparison by State'
                        }
                    }
                }
            });
            return () => chart.destroy();
        }
    }, []);

    return (
        <section className="section-container">
            <h2 className="section-title">Farmer Dashboard</h2>
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-value" id="totalFarmers">45,321</div>
                    <div className="metric-label">Farmers Helped</div>
                </div>
                <div className="metric-card">
                    <div className="metric-value" id="avgYieldIncrease">18.5%</div>
                    <div className="metric-label">Avg. Yield Increase</div>
                </div>
                <div className="metric-card">
                    <div className="metric-value" id="diseasesDetected">2,845</div>
                    <div className="metric-label">Diseases Detected</div>
                </div>
                <div className="metric-card">
                    <div className="metric-value" id="totalSavings">₹24.5L</div>
                    <div className="metric-label">Input Costs Saved</div>
                </div>
            </div>
            <div className="dashboard-charts">
                <div className="chart-container">
                    <h3 className="chart-title">Regional Yield Performance</h3>
                    <canvas id="regionalYieldChart" ref={regionalCanvasRef}></canvas>
                </div>
            </div>
        </section>
    );
};

const YieldPrediction = () => {
    const [prediction, setPrediction] = useState(null);
    const [calculating, setCalculating] = useState(false);
    const weatherYieldCanvasRef = useRef(null);

    const calculateYieldPrediction = (city, crop, fieldSize, soilType, irrigation, previousYield) => {
        const baseYield = {
            'Rice': 45,
            'Wheat': 40,
            'Maize': 55,
            'Cotton': 18,
            'Sugarcane': 750
        };
        
        const soilMultiplier = {
            'Alluvial': 1.2,
            'Black Cotton': 1.1,
            'Red Laterite': 0.9,
            'Sandy': 0.8,
            'Clay': 1.0
        };
        
        const irrigationMultiplier = {
            'Drip': 1.3,
            'Sprinkler': 1.2,
            'Flood': 1.0,
            'Rain-fed': 0.85
        };
        
        const cityMultiplier = {
            'Bhubaneswar': 1.1,
            'Mumbai': 0.95,
            'Delhi': 1.0,
            'Chennai': 1.05,
            'Kolkata': 1.08,
            'Bangalore': 1.02,
            'Hyderabad': 0.98,
            'Pune': 1.03,
            'Ahmedabad': 0.92
        };

        let predictedYield = baseYield[crop] *
                            soilMultiplier[soilType] *
                            irrigationMultiplier[irrigation] *
                            (cityMultiplier[city] || 1.0) *
                            fieldSize;

        predictedYield = predictedYield * (0.95 + Math.random() * 0.1);

        const currentPracticeYield = previousYield * fieldSize;
        const productivityIncrease = ((predictedYield - currentPracticeYield) / currentPracticeYield * 100);

        const marketPrice = {
            'Rice': 2850,
            'Wheat': 2125,
            'Maize': 1980,
            'Cotton': 6500,
            'Sugarcane': 350
        };

        const revenue = Math.round(predictedYield * marketPrice[crop]);
        const additionalIncome = Math.round((predictedYield - currentPracticeYield) * marketPrice[crop]);

        return {
            yield: Math.round(predictedYield * 10) / 10,
            fieldSize: fieldSize,
            productivityIncrease: Math.round(productivityIncrease * 10) / 10,
            revenue: revenue,
            additionalIncome: Math.max(0, additionalIncome),
            confidence: Math.round(88 + Math.random() * 8),
            crop: crop,
            city: city
        };
    };

    const handleCalculate = (event) => {
        setCalculating(true);
        const form = event.target.closest('form');
        const city = form.citySelect.value;
        const crop = form.cropType.value;
        const fieldSize = parseFloat(form.fieldSize.value);
        const soilType = form.soilType.value;
        const irrigation = form.irrigationType.value;
        const previousYield = parseFloat(form.previousYield.value);

        setTimeout(() => {
            const result = calculateYieldPrediction(city, crop, fieldSize, soilType, irrigation, previousYield);
            setPrediction(result);
            setCalculating(false);
        }, 2500);
    };

    useEffect(() => {
        if (prediction && weatherYieldCanvasRef.current) {
            const ctx = weatherYieldCanvasRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['25°C', '28°C', '31°C', '34°C', '37°C'],
                    datasets: [{
                        label: 'Yield (quintals/acre)',
                        data: [8.5, 9.2, 9.8, 9.4, 8.1],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Yield (quintals/acre)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Average Temperature'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Temperature vs Yield Correlation'
                        }
                    }
                }
            });
            return () => chart.destroy();
        }
    }, [prediction]);

    return (
        <section className="section-container">
            <h2 className="section-title">AI-Powered Yield Prediction</h2>
            <div className="prediction-container">
                <div className="prediction-form-card">
                    <h3>Enter Your Farm Details</h3>
                    <form id="yieldPredictionForm">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="citySelect">City/Region</label>
                                <select id="citySelect" name="citySelect" defaultValue="Bhubaneswar">
                                    <option value="Bhubaneswar">Bhubaneswar</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Kolkata">Kolkata</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cropType">Crop Type</label>
                                <select id="cropType" name="cropType" defaultValue="Rice">
                                    <option value="Rice">Rice</option>
                                    <option value="Wheat">Wheat</option>
                                    <option value="Maize">Maize</option>
                                    <option value="Cotton">Cotton</option>
                                    <option value="Sugarcane">Sugarcane</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldSize">Field Size (acres)</label>
                                <input type="number" id="fieldSize" name="fieldSize" defaultValue="5" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="soilType">Soil Type</label>
                                <select id="soilType" name="soilType" defaultValue="Alluvial">
                                    <option value="Alluvial">Alluvial</option>
                                    <option value="Black Cotton">Black Cotton</option>
                                    <option value="Red Laterite">Red Laterite</option>
                                    <option value="Sandy">Sandy</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="irrigationType">Irrigation</label>
                                <select id="irrigationType" name="irrigationType" defaultValue="Drip">
                                    <option value="Drip">Drip</option>
                                    <option value="Sprinkler">Sprinkler</option>
                                    <option value="Flood">Flood</option>
                                    <option value="Rain-fed">Rain-fed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="previousYield">Previous Yield (q/acre)</label>
                                <input type="number" id="previousYield" name="previousYield" defaultValue="40" />
                            </div>
                        </div>
                        <button type="button" className="btn btn--primary btn--full" onClick={handleCalculate} disabled={calculating}>
                            {calculating ? 'Calculating...' : 'Calculate AI Prediction'}
                        </button>
                    </form>
                </div>
                {prediction && (
                    <div id="yieldResultsAdvanced" className="prediction-results-card">
                        <h3>AI Prediction Results for {prediction.crop}</h3>
                        <div className="results-grid">
                            <div className="result-item">
                                <div className="result-value">{prediction.yield} quintals</div>
                                <div className="result-label">Predicted Yield</div>
                            </div>
                            <div className="result-item">
                                <div className="result-value">{prediction.confidence}%</div>
                                <div className="result-label">AI Confidence</div>
                            </div>
                            <div className="result-item">
                                <div className="result-value" style={{color: 'green'}}>+{prediction.productivityIncrease}%</div>
                                <div className="result-label">Productivity Increase</div>
                            </div>
                            <div className="result-item">
                                <div className="result-value">₹{prediction.revenue.toLocaleString()}</div>
                                <div className="result-label">Expected Revenue</div>
                            </div>
                        </div>
                        <div className="chart-container" style={{marginTop: '20px'}}>
                            <canvas ref={weatherYieldCanvasRef}></canvas>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const Recommendations = () => (
    <section className="section-container">
        <h2 className="section-title">Smart Recommendations</h2>
    </section>
);

const DiseaseDetector = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [disease, setDisease] = useState(null);

    const analyzeSampleDisease = (diseaseIndex) => {
        setAnalyzing(true);
        setDisease(null);
        setTimeout(() => {
            setDisease(appData.diseases_database[diseaseIndex]);
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <section className="section-container">
            <h2 className="section-title">Crop Disease Detector</h2>
            <div className="detection-container">
                <div className="upload-card">
                    <h3>Upload Crop Image</h3>
                    <p>Upload a photo of the affected crop to get an instant AI-powered diagnosis.</p>
                    <button className="btn btn--primary btn--full" onClick={() => {}}>
                        Upload Photo
                    </button>
                    <div className="sample-images">
                        <h4>Or try a sample image:</h4>
                        <div className="sample-grid">
                            <img src="https://i.imgur.com/fADb314.jpeg" alt="Blight" onClick={() => analyzeSampleDisease(0)} />
                            <img src="https://i.imgur.com/fADb314.jpeg" alt="Rust" onClick={() => analyzeSampleDisease(1)} />
                            <img src="https://i.imgur.com/fADb314.jpeg" alt="Healthy" onClick={() => analyzeSampleDisease(3)} />
                        </div>
                    </div>
                </div>
                <div id="detectionResults" className="results-card">
                    <h3>Detection Results</h3>
                    {analyzing && <div id="analysisProgress" className="progress-bar">Analyzing...</div>}
                    {disease && (
                        <div id="diseaseDiagnosis">
                            <h4>{disease.name}</h4>
                            <p><strong>Confidence:</strong> {disease.confidence}</p>
                            <p><strong>Symptoms:</strong> {disease.symptoms.join(', ')}</p>
                            <h5>Treatment Plan:</h5>
                            <ul>
                                {disease.treatment.map((step, i) => <li key={i}>{step}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const Weather = () => {
    const [city, setCity] = useState("Bhubaneswar");
    const forecast = appData.weather_14_days[city] || appData.weather_14_days["Bhubaneswar"];

    return (
        <section className="section-container">
            <h2 className="section-title">Weather Intelligence</h2>
            <select value={city} onChange={e => setCity(e.target.value)}>
                <option value="Bhubaneswar">Bhubaneswar</option>
            </select>
            <div className="forecast-container">
                {forecast.map((day, i) => (
                    <div className="forecast-day-card" key={i}>
                        <div className="forecast-date">{day.date}</div>
                        <div className="forecast-icon-day">{day.icon}</div>
                        <div className="forecast-temps-day">{day.high} / {day.low}</div>
                        <div className="forecast-rain">{day.rain} rain</div>
                        <div className="forecast-advice">{day.advice}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Market = () => {
    const pricesTrendCanvasRef = useRef(null);

    useEffect(() => {
        if (pricesTrendCanvasRef.current) {
            const ctx = pricesTrendCanvasRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [
                        {
                            label: 'Rice',
                            data: [2700, 2750, 2800, 2850],
                            borderColor: '#1FB8CD',
                        },
                        {
                            label: 'Wheat',
                            data: [2200, 2180, 2150, 2125],
                            borderColor: '#FFC185',
                        },
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Market Price Trends'
                        }
                    }
                }
            });
            return () => chart.destroy();
        }
    }, []);

    return (
        <section className="section-container">
            <h2 className="section-title">Live Market Prices</h2>
            <div className="price-grid">
                {appData.market_prices.map((item, i) => (
                    <div className="price-card-market" key={i}>
                        <div className="crop-name-market">{item.crop}</div>
                        <div className="crop-price-market">{item.price}{item.unit}</div>
                        <div className={`price-change-market ${item.trend}`}>{item.change}</div>
                    </div>
                ))}
            </div>
            <div className="chart-container" style={{marginTop: '20px'}}>
                <canvas ref={pricesTrendCanvasRef}></canvas>
            </div>
        </section>
    );
};

const Schemes = () => (
    <section className="section-container">
        <h2 className="section-title">Government Schemes</h2>
        <div className="schemes-grid">
            {appData.government_schemes.map((scheme, i) => (
                <div className="scheme-card-detailed" key={i}>
                    <h3>{scheme.name}</h3>
                    <p>{scheme.description}</p>
                    <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                </div>
            ))}
        </div>
    </section>
);

const Community = () => (
    <section className="section-container">
        <h2 className="section-title">Farmer Community</h2>
        <div className="stories-grid">
            {appData.farmer_stories.map((story, i) => (
                <div className="story-card" key={i}>
                    <h4>{story.name}, {story.location}</h4>
                    <p>"{story.story}"</p>
                    <p><strong>Improvement:</strong> {story.improvement}</p>
                </div>
            ))}
        </div>
    </section>
);

const Chatbot = ({ chatbotOpen, setChatbotOpen, currentLanguage, appData }) => (
    <div className={`chatbot-container ${chatbotOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
            <h3 data-translate="chatbot.title">{appData.languages[currentLanguage].chatbot.title}</h3>
            <button className="chatbot-close" onClick={() => setChatbotOpen(false)}>
                &times;
            </button>
        </div>
        <div className="chatbot-body" id="chatbotBody">
            <div className="message bot-message">{appData.languages[currentLanguage].chatbot.greeting}</div>
        </div>
        <div className="chatbot-input">
            <input type="text" id="chatInput" placeholder="Ask a question..." />
            <button id="sendMessage">Send</button>
        </div>
    </div>
);

const App = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [currentPage, setCurrentPage] = useState('hero');
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, type = 'info') => {
        const newNotification = { message, type, id: Date.now() };
        setNotifications(prev => [...prev, newNotification]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, 4000);
    };

    const showPage = (pageId) => {
        setCurrentPage(pageId);
        showNotification(`✅ Navigated to ${pageId.replace('-', ' ')} page`, 'success');
    };

    const openChatbot = () => {
        setChatbotOpen(true);
        showNotification('🤖 AI Agricultural Assistant activated! Ask me anything about farming.', 'info');
    };
    
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash && Object.keys(appData.languages.en.nav).includes(hash)) {
            setCurrentPage(hash);
        } else {
            setCurrentPage('hero');
        }
    }, []);

    useEffect(() => {
        window.location.hash = currentPage;
    }, [currentPage]);

    return (
        <div id="app-container">
            <Header
                showPage={showPage}
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
                appData={appData}
                currentPage={currentPage}
            />
            <main>
                {currentPage === 'hero' && <Hero showPage={showPage} openChatbot={openChatbot} />}
                <Page id="dashboard" currentPage={currentPage}><Dashboard /></Page>
                <Page id="yield-prediction" currentPage={currentPage}><YieldPrediction /></Page>
                <Page id="recommendations" currentPage={currentPage}><Recommendations /></Page>
                <Page id="disease-detector" currentPage={currentPage}><DiseaseDetector /></Page>
                <Page id="weather" currentPage={currentPage}><Weather /></Page>
                <Page id="market" currentPage={currentPage}><Market /></Page>
                <Page id="schemes" currentPage={currentPage}><Schemes /></Page>
                <Page id="community" currentPage={currentPage}><Community /></Page>
            </main>
            <div id="notificationsContainer">
                {notifications.map(n => (
                    <div key={n.id} className={`notification notification--${n.type}`}>
                        {n.message}
                    </div>
                ))}
            </div>
            <Chatbot
                chatbotOpen={chatbotOpen}
                setChatbotOpen={setChatbotOpen}
                currentLanguage={currentLanguage}
                appData={appData}
            />
        </div>
    );
};

export default App;