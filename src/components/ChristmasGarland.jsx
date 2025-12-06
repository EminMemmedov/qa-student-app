import { motion } from 'framer-motion';

export default function ChristmasGarland() {
    const lights = [
        { color: '#ef4444', delay: 0 },      // red
        { color: '#22c55e', delay: 0.2 },    // green
        { color: '#eab308', delay: 0.4 },    // gold
        { color: '#3b82f6', delay: 0.6 },    // blue
        { color: '#ef4444', delay: 0.8 },    // red
        { color: '#22c55e', delay: 1.0 },    // green
        { color: '#eab308', delay: 1.2 },    // gold
        { color: '#3b82f6', delay: 1.4 },    // blue
        { color: '#ef4444', delay: 1.6 },    // red
        { color: '#22c55e', delay: 1.8 },    // green
    ];

    return (
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
            {/* Garland String */}
            <svg className="w-full h-full" viewBox="0 0 1000 60" preserveAspectRatio="none">
                <path
                    d="M0,30 Q100,10 200,30 T400,30 T600,30 T800,30 T1000,30"
                    fill="none"
                    stroke="#166534"
                    strokeWidth="3"
                    opacity="0.6"
                />
            </svg>

            {/* Twinkling Lights */}
            <div className="absolute top-0 left-0 right-0 flex justify-around items-start pt-4">
                {lights.map((light, index) => (
                    <motion.div
                        key={index}
                        className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg"
                        style={{
                            backgroundColor: light.color,
                            boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
                        }}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [0.8, 1.1, 0.8],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: light.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
