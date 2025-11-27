import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, ArrowLeft, Search, FileText, AlertCircle, CheckCircle2, Wallet, Loader2, ArrowLeftRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import BugList from '../../components/BugList';
import SpecModal from '../../components/SpecModal';
import BugDiscoveryAnimation from '../../components/BugDiscoveryAnimation';
import AchievementUnlocked from '../../components/AchievementUnlocked';
import { useGameProgress } from '../../hooks/useGameProgress';
import { useAchievements } from '../../hooks/useAchievements';
import { useBugAnimation } from '../../hooks/useBugAnimation';
import { useDevTools } from '../../context/DevToolsContext';
import BugReportModal from '../../components/BugReportModal';
import { celebrateCompletion } from '../../utils/confetti';
import { practiceSpecs } from '../../data/practiceSpecs';
import { getBugsForModule } from '../../data/bugs';

export default function Banking() {
    const { foundBugs, addBug, resetProgress, getBugDifficulty, xp, getBugPoints, deductXP } = useGameProgress();
    const { newAchievement, checkAchievements } = useAchievements();
    const { showAnimation, animationData, triggerBugAnimation } = useBugAnimation();
    const { addLog, addRequest } = useDevTools();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('other');
    const [currency, setCurrency] = useState('AZN');
    const [balance, setBalance] = useState(500);

    const [showSpec, setShowSpec] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [transactions, setTransactions] = useState([
        { id: 1, amount: 50, recipient: 'Başqa şəxs', date: '2024-01-20', status: 'completed' },
        { id: 2, amount: 100, recipient: 'Başqa şəxs', date: '2024-01-19', status: 'completed' }
    ]);

    // Get bugs from centralized file
    const bugs = getBugsForModule('banking');

    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [selectedBugId, setSelectedBugId] = useState(null);

    const handleBugClick = (bugId) => {
        if (foundBugs.includes(bugId)) return;
        setSelectedBugId(bugId);
        setReportModalOpen(true);
    };

    const handleBugDetected = (bugId) => {
        const result = addBug(bugId);
        if (result.isNew) {
            const bug = bugs.find(b => b.id === bugId);

            triggerBugAnimation({
                ...result,
                bugName: bug.description
            });
            checkAchievements({
                foundBugs: [...foundBugs, bugId],
                totalBugs: bugs.length,
                moduleBugs: { banking: bugs },
                getBugDifficulty
            });
        }
    };

    const handleReportSubmit = ({ severity, priority }) => {
        const bug = bugs.find(b => b.id === selectedBugId);
        let bonus = 0;
        if (severity === bug.severity) bonus += 5;
        if (priority === bug.priority) bonus += 5;

        const basePoints = getBugPoints(getBugDifficulty(selectedBugId));
        const totalPoints = basePoints + bonus;

        addBug(selectedBugId);
        triggerBugAnimation({
            isNew: true,
            points: totalPoints,
            bugName: bug.description
        });
        setReportModalOpen(false);
        setSelectedBugId(null);

        if (bonus > 0) {

        }

        checkAchievements({
            foundBugs: [...foundBugs, selectedBugId],
            totalBugs: bugs.length,
            moduleBugs: { banking: bugs },
            getBugDifficulty
        });
    };

    const validateTransfer = () => {
        const newErrors = {};
        let detectedBugs = [];
        const numAmount = parseFloat(amount);

        // Amount validation
        if (!amount) {
            newErrors.amount = 'Məbləğ tələb olunur';
        } else {
            if (numAmount < 0) {
                detectedBugs.push('neg_amount');
                newErrors.amount = 'Mənfi məbləğ göndərilə bilməz';
            }
            if (numAmount === 0) {
                detectedBugs.push('zero_amount');
                newErrors.amount = '0 AZN göndərilə bilməz';
            }
            if (numAmount > balance) {
                detectedBugs.push('balance_limit');
                newErrors.amount = `Balansınızda kifayət qədər vəsait yoxdur (Balans: ${balance} AZN)`;
            }

            // Check decimal places
            const decimalPart = amount.split('.')[1];
            if (decimalPart && decimalPart.length > 10) {
                detectedBugs.push('decimal_places');
                newErrors.amount = 'Məbləğ çox uzun onluq hissəyə malikdir';
            }
        }

        // Recipient validation
        if (recipient === 'self') {
            detectedBugs.push('self_transfer');
            newErrors.recipient = 'Öz kartınıza köçürmə edə bilməzsiniz';
        }

        // Currency validation
        if (currency === 'USD') {
            detectedBugs.push('currency_mix');
            newErrors.currency = 'AZN hesabdan USD köçürmə mümkün deyil';
        }

        // XSS check in description
        if (description.includes('<script>') || description.includes('</script>')) {
            detectedBugs.push('desc_xss');
            newErrors.description = 'Təsvirdə icazəsiz simvollar var';
        }

        // Always trigger these bugs
        detectedBugs.push('loading_indicator');

        setErrors(newErrors);
        return { isValid: Object.keys(newErrors).length === 0, detectedBugs };
    };

    const handleTransferClick = () => {
        const { isValid, detectedBugs } = validateTransfer();

        // Report all detected bugs
        let foundNew = false;
        detectedBugs.forEach(bugId => {
            handleBugDetected(bugId);
            if (!foundBugs.includes(bugId)) {
                foundNew = true;
            }
        });

        if (!isValid) {
            const firstError = Object.values(errors)[0];
            if (!foundNew) {

            }
            return;
        }

        // Bug: No confirmation dialog
        if (!showConfirmation) {
            handleBugDetected('no_confirmation');
        }

        // Show confirmation (but bug is already triggered)
        setShowConfirmation(true);
    };

    const confirmTransfer = async () => {
        setShowConfirmation(false);
        setIsProcessing(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsProcessing(false);

        const numAmount = parseFloat(amount);

        // Bug: Balance doesn't update
        const oldBalance = balance;
        // setBalance(balance - numAmount); // This line is commented out - the bug!

        if (oldBalance === balance) {
            handleBugDetected('balance_static');
        }

        // Bug: Always show success message
        handleBugDetected('success_msg');


        // Clear form
        setAmount('');
        setDescription('');
        setErrors({});
        setTouched({});
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };



    // Filter bugs for this page
    const pageBugs = bugs;
    const foundPageBugs = foundBugs.filter(id => pageBugs.some(b => b.id === id));

    useEffect(() => {
        if (foundPageBugs.length === pageBugs.length && pageBugs.length > 0) {
            celebrateCompletion();
        }
    }, [foundPageBugs.length, pageBugs.length]);

    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen">


            <SpecModal
                isOpen={showSpec}
                onClose={() => setShowSpec(false)}
                spec={practiceSpecs.banking}
            />

            <AnimatePresence>
                {showAnimation && animationData && (
                    <BugDiscoveryAnimation
                        bugName={animationData.bugName}
                        points={animationData.points}
                        onComplete={() => { }}
                    />
                )}
            </AnimatePresence>

            {newAchievement && (
                <AchievementUnlocked
                    achievement={newAchievement}
                    onClose={() => { }}
                />
            )}

            {/* Confirmation Dialog */}
            <AnimatePresence>
                {showConfirmation && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setShowConfirmation(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl p-5 shadow-2xl w-full max-w-sm"
                            >
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Köçürməni təsdiqləyin</h3>
                                <div className="space-y-2 mb-5 text-sm text-slate-600">
                                    <p><strong className="text-slate-900">Məbləğ:</strong> {amount} {currency}</p>
                                    <p><strong className="text-slate-900">Alıcı:</strong> {recipient === 'self' ? 'Özünüzə' : 'Başqa şəxs'}</p>
                                    {description && <p><strong className="text-slate-900">Təsvir:</strong> {description}</p>}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowConfirmation(false)}
                                        className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors text-sm"
                                    >
                                        Ləğv et
                                    </button>
                                    <button
                                        onClick={confirmTransfer}
                                        className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors text-sm"
                                    >
                                        Təsdiq et
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <header className="mb-8">
                <Link to="/practice" className="inline-flex items-center text-slate-500 mb-4 hover:text-slate-800 transition-colors">
                    <ArrowLeft size={20} className="mr-1" />
                    Geri qayıt
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Köçürmələr</h1>
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                            <Search size={18} />
                            <p>Bu səhifədə {bugs.length} baq gizlənib.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowSpec(true)}
                        className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors"
                    >
                        <FileText size={24} />
                    </button>
                </div>
            </header>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-200/50 border border-slate-100 relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

                <div
                    className="bg-slate-900 text-white p-6 rounded-2xl mb-8 relative overflow-hidden cursor-pointer"
                    onClick={() => {
                        handleBugClick('balance_color', 'Balans rəngi oxunması çətindir (ağ fonda ağ)');
                        addLog('error', 'Uncaught ReferenceError: WalletConfig is not defined', { component: 'BalanceCard', line: 42 });
                    }}
                >
                    <div className="relative z-10">
                        <p className="text-slate-400 text-sm mb-1">Cari Balans</p>
                        <h2 className="text-3xl font-bold text-white">{balance.toFixed(2)} AZN</h2>
                    </div>
                    <Wallet className="absolute right-4 bottom-4 text-slate-800" size={64} />
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleTransferClick(); }} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Kimə (Kart nömrəsi)</label>
                        <select
                            className={`w-full p-3 border-2 rounded-xl outline-none focus:border-emerald-500 cursor-pointer bg-white transition-colors ${touched.recipient && errors.recipient ? 'border-red-300' : 'border-slate-200'
                                }`}
                            value={recipient}
                            onChange={(e) => {
                                setRecipient(e.target.value);
                                if (e.target.value === 'other') {
                                    handleBugClick('card_format', 'Kart nömrəsi formatı yoxlanılmır');
                                }
                            }}
                            onBlur={() => handleBlur('recipient')}
                        >
                            <option value="other">Başqa şəxs</option>
                            <option value="self">Özümə (Cari Kart)</option>
                        </select>
                        {touched.recipient && errors.recipient && (
                            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                <AlertCircle size={16} />
                                <span>{errors.recipient}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            className="block text-sm font-bold text-slate-700 mb-2 cursor-pointer"
                            onClick={() => handleBugClick('amount_label', 'Məbləğ labelində hərf səhvi: "Məbləğ" əvəzinə "Mebleg"')}
                        >
                            Mebleg
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0,00"
                                    className={`w-full p-3 border-2 rounded-xl outline-none focus:border-red-500 transition-colors ${touched.amount && errors.amount ? 'border-red-300' : 'border-slate-200'
                                        }`}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    onBlur={() => handleBlur('amount')}
                                    onClick={() => {
                                        handleBugClick('placeholder_typo', 'Placeholder səhvi: "0.00" əvəzinə "0,00"');
                                        handleBugClick('border_inconsistent', 'Input border qalınlığı fərqlidir');
                                        handleBugClick('focus_color', 'Focus border rəngi qırmızıdır (yaşıl olmalı)');
                                    }}
                                />
                                {touched.amount && errors.amount && (
                                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                        <AlertCircle size={16} />
                                        <span>{errors.amount}</span>
                                    </div>
                                )}
                            </div>
                            <select
                                className={`w-24 p-3 border-2 rounded-xl outline-none focus:border-emerald-500 cursor-pointer bg-white transition-colors ${touched.currency && errors.currency ? 'border-red-300' : 'border-slate-200'
                                    }`}
                                value={currency}
                                onChange={(e) => {
                                    setCurrency(e.target.value);
                                    handleBugClick('icon_missing', 'Valyuta seçimində ikon yoxdur');
                                }}
                                onBlur={() => handleBlur('currency')}
                            >
                                <option value="AZN">AZN</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                        {touched.currency && errors.currency && (
                            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                <AlertCircle size={16} />
                                <span>{errors.currency}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Təsvir (İstəyə görə)</label>
                        <textarea
                            className={`w-full p-3 border-2 rounded-xl outline-none focus:border-emerald-500 resize-none transition-colors ${touched.description && errors.description ? 'border-red-300' : 'border-slate-200'
                                }`}
                            rows="3"
                            placeholder="Köçürmə haqqında qeyd..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={() => handleBlur('description')}
                        />
                        {touched.description && errors.description && (
                            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                <AlertCircle size={16} />
                                <span>{errors.description}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors flex items-center justify-start pl-8 gap-2 cursor-pointer disabled:opacity-50"
                        onClick={() => {
                            handleBugClick('btn_alignment', 'Köçürmə düyməsi sola yönəlib (mərkəzdə olmalı)');
                        }}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Emal edilir...</span>
                            </>
                        ) : (
                            <>
                                <ArrowLeftRight size={20} />
                                <span>Köçürmə et</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Transaction History - Bug: Missing */}
                <div
                    className="mt-8 pt-8 border-t border-slate-100 cursor-pointer opacity-0"
                    onClick={() => handleBugClick('history_missing', 'Köçürmə tarixçəsi göstərilmir')}
                >
                    <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <Clock size={16} />
                        Son köçürmələr
                    </h3>
                    {/* History is hidden - this is the bug */}
                </div>
            </div>

            <BugList
                bugs={pageBugs}
                foundBugs={foundPageBugs}
                onReset={resetProgress}
                xp={xp}
                getBugPoints={getBugPoints}
                getBugDifficulty={getBugDifficulty}
                deductXP={deductXP}
            />
        </PageTransition>
    );
}
