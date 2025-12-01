import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Error Boundary for individual modules
 * Catches errors and shows a beautiful fallback UI
 */
class ModuleErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Module Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 text-center"
                    >
                        {/* Error Icon */}
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="text-red-600 dark:text-red-400" size={40} />
                        </div>

                        {/* Error Message */}
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                            Oops! Bir xəta baş verdi
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            Bu modul yüklənərkən problem yarandı. Səhifəni yeniləməyi və ya ana səhifəyə qayıtmağı sınayın.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                <RefreshCw size={20} />
                                Yenilə
                            </button>
                            <Link
                                to="/"
                                className="flex-1 flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                <Home size={20} />
                                Ana Səhifə
                            </Link>
                        </div>

                        {/* Error Details (only in development) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="text-sm text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
                                    Texniki detallar
                                </summary>
                                <pre className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs text-red-600 dark:text-red-400 overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ModuleErrorBoundary;
