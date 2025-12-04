import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Play, CheckCircle, AlertCircle, Globe, ChevronLeft, Plus, Trash2, Lock, Unlock, Code, History, FileJson, Layout, ChevronDown, Zap, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';
import { useGameProgress } from '../../hooks/useGameProgress';
import { useAchievements } from '../../hooks/useAchievements';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';

// Initial DB State
const initialUsers = [
    { id: 1, name: "Ali", email: "ali@mail.az", role: "admin" },
    { id: 2, name: "Vali", email: "vali@mail.az", role: "user" }
];

export default function API() {
    const { t } = useTranslation();
    const { addXP, xp } = useGameProgress();
    const { checkAchievements } = useAchievements();

    const [level, setLevel] = useState(1);
    const [activeTab, setActiveTab] = useState('request');
    const [toast, setToast] = useState(null);

    // Server State (Dynamic DB)
    const [serverUsers, setServerUsers] = useState(initialUsers);

    // Request State
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('/users');
    const [headers, setHeaders] = useState([{ key: '', value: '' }]);
    const [body, setBody] = useState('');
    const [bodyMode, setBodyMode] = useState('form'); // 'form' or 'json'
    const [showHeaders, setShowHeaders] = useState(false);

    // Form State for Body Builder
    const [formData, setFormData] = useState({ name: '', email: '' });

    // Response & History
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [hasSeenAnswer, setHasSeenAnswer] = useState(false);

    const [completedLevels, setCompletedLevels] = useState(() => {
        const saved = localStorage.getItem('qa_api_completed');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('qa_api_completed', JSON.stringify(completedLevels));
    }, [completedLevels]);

    // Auto-update JSON body when Form data changes
    useEffect(() => {
        if (bodyMode === 'form') {
            setBody(JSON.stringify(formData, null, 2));
        }
    }, [formData, bodyMode]);

    const levels = {
        1: {
            id: 1,
            task: t('api.levels.level1_task', 'Bütün istifadəçiləri əldə edin'),
            hint: t('api.levels.level1_hint') || "Use GET method to retrieve data.",
            answer: { method: 'GET', url: '/users', headers: [], body: '' },
            check: (res, req) => res.status === 200 && req.method === 'GET' && req.url === '/users'
        },
        2: {
            id: 2,
            task: t('api.levels.level2_task', 'Mövcud olmayan istifadəçini əldə etməyə çalışın (404 xətası)'),
            hint: t('api.levels.level2_hint') || "Try to access a resource ID that likely doesn't exist.",
            answer: { method: 'GET', url: '/users/999', headers: [], body: '' },
            check: (res, req) => res.status === 404
        },
        3: {
            id: 3,
            task: t('api.levels.level3_task', 'Yeni istifadəçi yaradın (POST metodu)'),
            hint: t('api.levels.level3_hint') || "POST method requires a body with user details.",
            answer: { method: 'POST', url: '/users', headers: [], body: '{\n  "name": "Test",\n  "email": "test@mail.az"\n}' },
            check: (res, req) => res.status === 201 && req.method === 'POST'
        },
        4: {
            id: 4,
            task: t('api.levels.level4_task', 'Admin panelinə daxil olun (Authorization header)'),
            hint: t('api.levels.level4_hint') || "Protected routes need an Authorization header.",
            answer: { method: 'GET', url: '/admin', headers: [{ key: 'Authorization', value: 'Bearer admin-token' }], body: '' },
            check: (res, req) => res.status === 200 && req.url === '/admin'
        },
        5: {
            id: 5,
            task: t('api.levels.level5_task', 'İstifadəçi məlumatlarını yeniləyin (PUT metodu)'),
            hint: t('api.levels.level5_hint') || "PUT method updates an existing resource by ID.",
            answer: { method: 'PUT', url: '/users/1', headers: [], body: '{\n  "name": "Updated Name"\n}' },
            check: (res, req) => res.status === 200 && req.method === 'PUT'
        }
    };

    const currentLevel = levels[level];

    // Available Routes Helper
    const availableRoutes = [
        { method: 'GET', url: '/users', label: 'Get All Users' },
        { method: 'GET', url: '/users/1', label: 'Get User by ID' },
        { method: 'POST', url: '/users', label: 'Create User' },
        { method: 'PUT', url: '/users/1', label: 'Update User' },
        { method: 'DELETE', url: '/users/1', label: 'Delete User' },
        { method: 'GET', url: '/admin', label: 'Admin Panel (Protected)' },
    ];

    const selectRoute = (route) => {
        setMethod(route.method);
        setUrl(route.url);
        // Auto-open relevant tabs
        if (route.method === 'POST' || route.method === 'PUT') {
            setBodyMode('form');
        }
        if (route.url === '/admin') {
            setShowHeaders(true);
        }
    };

    const sendRequest = async () => {
        setIsLoading(true);
        setResponse(null);
        setActiveTab('response');

        await new Promise(r => setTimeout(r, 600));

        let status = 200;
        let data = null;
        let statusText = "OK";

        // --- SERVER LOGIC ---
        if (url === '/users' && method === 'GET') {
            status = 200; data = serverUsers;
        }
        else if (url.match(/^\/users\/\d+$/) && method === 'GET') {
            const id = parseInt(url.split('/').pop());
            const user = serverUsers.find(u => u.id === id);
            if (user) { status = 200; data = user; }
            else { status = 404; statusText = "Not Found"; data = { error: "User not found" }; }
        }
        else if (url === '/users' && method === 'POST') {
            try {
                const parsed = JSON.parse(body);
                if (parsed.name && parsed.email) {
                    const newUser = { id: serverUsers.length + 1, ...parsed, role: 'user' };
                    setServerUsers(prev => [...prev, newUser]);
                    status = 201; statusText = "Created"; data = newUser;
                } else {
                    status = 400; statusText = "Bad Request"; data = { error: "Validation Error" };
                }
            } catch (e) {
                status = 400; statusText = "Bad Request"; data = { error: "Invalid JSON" };
            }
        }
        else if (url.match(/^\/users\/\d+$/) && method === 'PUT') {
            const id = parseInt(url.split('/').pop());
            const index = serverUsers.findIndex(u => u.id === id);
            if (index !== -1) {
                try {
                    const parsed = JSON.parse(body);
                    const updated = { ...serverUsers[index], ...parsed };
                    setServerUsers(prev => { const n = [...prev]; n[index] = updated; return n; });
                    status = 200; data = updated;
                } catch (e) { status = 400; data = { error: "Invalid JSON" }; }
            } else { status = 404; data = { error: "User not found" }; }
        }
        else if (url === '/admin') {
            const token = headers.find(h => h.key.toLowerCase() === 'authorization')?.value;
            if (token === 'Bearer admin-token') {
                status = 200; data = { message: "Welcome Admin!" };
            } else {
                status = 401; statusText = "Unauthorized"; data = { error: "Missing Token" };
            }
        } else {
            status = 404; statusText = "Not Found"; data = { error: "Endpoint does not exist" };
        }

        const resObj = { status, statusText, data, time: Math.floor(Math.random() * 50) + 20 };
        setResponse(resObj);
        setHistory(prev => [{ method, url, status, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
        setIsLoading(false);

        if (currentLevel.check(resObj, { method, url, headers, body })) {
            if (!completedLevels.includes(level)) {
                const newCompleted = [...completedLevels, level];
                setCompletedLevels(newCompleted);

                if (!hasSeenAnswer) {
                    addXP(200);
                    checkAchievements({ xp: xp + 200, completedLevels: { api: newCompleted }, addXP, foundBugs: [], moduleBugs: {}, getBugDifficulty: () => 'medium' });
                    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                } else {
                    // No XP warning
                    setHistory(prev => [{ method: 'SYSTEM', url: 'XP Denied (Answer Viewed)', status: 0, time: new Date().toLocaleTimeString() }, ...prev]);
                }
            }
        }
    };

    const showAnswer = () => {
        setHasSeenAnswer(true);
        const ans = currentLevel.answer;
        setMethod(ans.method);
        setUrl(ans.url);
        setHeaders(ans.headers.length > 0 ? ans.headers : [{ key: '', value: '' }]);
        if (ans.body) {
            setBody(ans.body);
            setBodyMode('json'); // Switch to JSON mode to show exact answer
        }
        if (ans.headers.length > 0) setShowHeaders(true);
        setActiveTab('request');
    };

    return (
        <PageTransition className="min-h-screen bg-slate-900 text-slate-300 p-6 pt-20 pb-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/practice" className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
                            <ChevronLeft className="text-white" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Globe size={32} className="text-sky-500" />
                                {t('api.title')}
                            </h1>
                            <p className="text-slate-400">{t('api.description')}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            if (window.confirm(t('common.reset_confirm') || "Are you sure you want to reset progress?")) {
                                setCompletedLevels([]);
                                setLevel(1);
                                setServerUsers(initialUsers);
                                setHistory([]);
                            }
                        }}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="Reset Progress"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                {/* Level Selector */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((lvl) => {
                        const isLocked = lvl > 1 && !completedLevels.includes(lvl - 1);
                        const isCompleted = completedLevels.includes(lvl);
                        return (
                            <button
                                key={lvl}
                                onClick={() => !isLocked && setLevel(lvl)}
                                disabled={isLocked}
                                className={`flex-1 min-w-[150px] p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${level === lvl
                                    ? 'border-sky-500 bg-sky-500/10 text-white'
                                    : isLocked
                                        ? 'border-slate-800 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {isLocked ? <Lock size={16} /> : isCompleted ? <CheckCircle size={16} className="text-green-500" /> : <Unlock size={16} />}
                                    <span className="font-bold text-sm">Level {lvl}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 min-h-[800px]">
                    {/* Left: Task & Quick Routes */}
                    <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
                        {/* Task Card */}
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Server className="text-sky-400" />
                                <h2 className="text-xl font-bold text-white">{t('api.task')}</h2>
                            </div>
                            <p className="text-lg text-slate-200 font-medium mb-4">
                                {currentLevel.task}
                            </p>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-sm text-slate-400 mb-4">
                                <p className="font-bold text-slate-500 mb-1">{t('api.hint')}:</p>
                                {currentLevel.hint}
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => { setMethod('GET'); setUrl(''); setHeaders([]); setBody(''); setResponse(null); }} className="flex-1 py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                    <RotateCcw size={14} />
                                    {t('common.reset', 'Sıfırla')}
                                </button>
                                <button onClick={showAnswer} disabled={hasSeenAnswer} className={`flex-1 py-2 px-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-colors ${hasSeenAnswer ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed' : 'bg-sky-900/50 hover:bg-sky-900 border-sky-500/30 text-sky-300'}`}>
                                    <Eye size={14} />
                                    {hasSeenAnswer ? t('common.solution_loaded', 'Göstərilib') : t('common.answer', 'Cavab')}
                                </button>
                            </div>
                            {hasSeenAnswer && (
                                <div className="mt-2 text-xs text-amber-500 text-center font-bold">
                                    {t('api.noXpForAnswer', 'Cavaba baxdığınız üçün XP verilməyəcək!')}
                                </div>
                            )}
                        </div>

                        {/* Quick Routes Card */}
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="text-yellow-400" />
                                <h2 className="text-xl font-bold text-white">Quick Routes</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {availableRoutes.map((r, i) => (
                                    <button
                                        key={i}
                                        onClick={() => selectRoute(r)}
                                        className="text-xs bg-slate-900 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-lg text-slate-300 transition-colors text-left"
                                    >
                                        <span className={`font-bold mr-2 ${r.method === 'GET' ? 'text-green-400' : r.method === 'POST' ? 'text-yellow-400' : r.method === 'DELETE' ? 'text-red-400' : 'text-blue-400'}`}>{r.method}</span>
                                        {r.url}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: API Client Interface */}
                    <div className="lg:col-span-2 flex flex-col gap-4 order-1 lg:order-2">
                        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden min-h-[800px]">
                            {/* Request Bar */}
                            <div className="p-6 border-b border-slate-700 bg-slate-800/80 backdrop-blur-sm">
                                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-3 items-center">
                                    <select
                                        value={method}
                                        onChange={(e) => setMethod(e.target.value)}
                                        className="h-12 bg-slate-900 text-white font-bold rounded-xl px-4 border border-slate-700 outline-none focus:border-sky-500 w-full md:w-auto cursor-pointer"
                                    >
                                        <option>GET</option>
                                        <option>POST</option>
                                        <option>PUT</option>
                                        <option>DELETE</option>
                                    </select>
                                    <div className="relative w-full">
                                        <span className="hidden xl:block absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm select-none">https://api.qa</span>
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="/users"
                                            className="h-12 w-full bg-slate-900 text-white rounded-xl pl-4 xl:pl-32 pr-4 border border-slate-700 outline-none focus:border-sky-500 font-mono"
                                        />
                                    </div>
                                    <button
                                        onClick={sendRequest}
                                        disabled={isLoading}
                                        className="h-12 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl px-6 flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20 active:scale-95 w-full md:w-auto"
                                    >
                                        {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> : <Play size={18} fill="currentColor" />}
                                        <span>{t('api.send', 'Sorğu Göndər')}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-slate-700 bg-slate-900/50">
                                {['request', 'response'].map(tab => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-sm font-bold relative ${activeTab === tab ? 'text-sky-400' : 'text-slate-500'}`}>
                                        {tab === 'request' ? 'Request Body & Headers' : 'Response'}
                                        {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500" />}
                                    </button>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 bg-slate-900/30">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'request' && (
                                        <motion.div key="req" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                            {/* Headers Toggle */}
                                            <div>
                                                <button onClick={() => setShowHeaders(!showHeaders)} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-300 mb-3">
                                                    {showHeaders ? <EyeOff size={14} /> : <Eye size={14} />}
                                                    {showHeaders ? 'Hide Headers' : 'Show Headers (Advanced)'}
                                                </button>

                                                <AnimatePresence>
                                                    {showHeaders && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2">
                                                            {headers.map((h, i) => (
                                                                <div key={i} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-2 items-center">
                                                                    <input
                                                                        placeholder="Key"
                                                                        value={h.key}
                                                                        onChange={e => { const n = [...headers]; n[i].key = e.target.value; setHeaders(n) }}
                                                                        className="w-full col-span-2 sm:col-span-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm h-10"
                                                                    />
                                                                    <input
                                                                        placeholder="Value"
                                                                        value={h.value}
                                                                        onChange={e => { const n = [...headers]; n[i].value = e.target.value; setHeaders(n) }}
                                                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm h-10"
                                                                    />
                                                                    <div className="flex gap-2 shrink-0">
                                                                        {i === headers.length - 1 && (
                                                                            <button
                                                                                onClick={() => setHeaders([...headers, { key: '', value: '' }])}
                                                                                className="p-2 text-sky-400 hover:bg-slate-800 rounded-md transition-colors"
                                                                                title="Add Header"
                                                                            >
                                                                                <Plus size={16} />
                                                                            </button>
                                                                        )}
                                                                        {headers.length > 1 && (
                                                                            <button
                                                                                onClick={() => setHeaders(headers.filter((_, idx) => idx !== i))}
                                                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-md transition-colors"
                                                                                title="Remove Header"
                                                                            >
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {headers.length === 0 && <button onClick={() => setHeaders([{ key: '', value: '' }])} className="text-xs text-sky-400 flex items-center gap-1"><Plus size={12} /> Add Header</button>}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Body Builder */}
                                            {(method === 'POST' || method === 'PUT') ? (
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2"><Code size={14} /> Body</h3>
                                                        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                                                            <button onClick={() => setBodyMode('form')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${bodyMode === 'form' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>Form</button>
                                                            <button onClick={() => setBodyMode('json')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${bodyMode === 'json' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>JSON</button>
                                                        </div>
                                                    </div>

                                                    {bodyMode === 'form' ? (
                                                        <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                                            <div>
                                                                <label className="text-xs text-slate-500 mb-1 block">Name</label>
                                                                <input
                                                                    value={formData.name}
                                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-sky-500 outline-none"
                                                                    placeholder="John Doe"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs text-slate-500 mb-1 block">Email</label>
                                                                <input
                                                                    value={formData.email}
                                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-sky-500 outline-none"
                                                                    placeholder="john@example.com"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <textarea
                                                            value={body}
                                                            onChange={e => setBody(e.target.value)}
                                                            className="w-full h-40 bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm text-emerald-400 focus:border-sky-500 outline-none resize-none"
                                                            spellCheck="false"
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-10 text-slate-600 border-2 border-dashed border-slate-800 rounded-xl px-4">
                                                    <Code size={24} className="mb-2 opacity-50" />
                                                    <p className="text-xs sm:text-sm font-medium text-center">{t('api.body_not_allowed', { method })}</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {activeTab === 'response' && (
                                        <motion.div key="res" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                                            {response ? (
                                                <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                                                    <div className={`px-4 py-3 border-b border-slate-800 flex justify-between items-center ${response.status < 300 ? 'bg-green-900/10' : 'bg-red-900/10'}`}>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-lg font-black ${response.status < 300 ? 'text-green-400' : 'text-red-400'}`}>{response.status}</span>
                                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{response.statusText}</span>
                                                        </div>
                                                        <span className="text-xs font-mono text-slate-600">{response.time}ms</span>
                                                    </div>
                                                    <div className="p-4 overflow-x-auto">
                                                        <pre className="font-mono text-xs sm:text-sm text-slate-300">{JSON.stringify(response.data, null, 2)}</pre>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full py-12 text-slate-600">
                                                    <Layout size={48} className="mb-4 opacity-20" />
                                                    <p className="text-sm">Send a request to see the response</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
