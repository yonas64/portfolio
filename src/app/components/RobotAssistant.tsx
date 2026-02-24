import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface RobotAssistantProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const RobotAssistant: React.FC<RobotAssistantProps> = ({ activeSection, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [eyesBlink, setEyesBlink] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyesBlink(true);
      setTimeout(() => setEyesBlink(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMenu(true);
      setTimeout(() => setShowMenu(false), 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sectionMessages: { [key: string]: string } = {
    hero: 'Hey there. I help Yonas explain things. Where should we start?',
    skills: 'He broke things to understand them.',
    projects: 'These survived production.',
    hobbies: 'Still scrolling? Good. He worked hard on this.',
    contact: 'This is where humans can reach him.',
  };

  const navigationItems = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setShowMenu(false);
  };

  if (!isVisible) return null;

  return (
    <div ref={viewportRef} className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="pointer-events-auto absolute bottom-6 right-6 flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="max-w-xs"
            >
              <div className="relative mb-2 border border-zinc-800 bg-zinc-900 px-4 py-3">
                <p className="text-sm text-zinc-300">{sectionMessages[activeSection]}</p>
                <div className="absolute -bottom-2 right-8 h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-zinc-900" />
              </div>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden border border-zinc-800 bg-zinc-900"
                  >
                    {navigationItems.map((item, index) => (
                      <a
                        key={item.id}
                        href={`/#${item.id}`}
                        onClick={() => {
                          handleNavigate(item.id);
                        }}
                        className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                          index !== navigationItems.length - 1 ? 'border-b border-zinc-800' : ''
                        } ${
                          activeSection === item.id
                            ? 'bg-zinc-800 text-zinc-100'
                            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <div className="h-16 w-16" />
          <div className="flex flex-col gap-1">
            <motion.button
              onClick={() => setShowMenu(!showMenu)}
              className="flex h-8 w-8 items-center justify-center border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-600"
              title={showMenu ? 'Hide menu' : 'Show menu'}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            >
              {showMenu ? (
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              ) : (
                <ChevronUp className="h-4 w-4 text-zinc-400" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setIsMinimized(!isMinimized)}
              className="flex h-8 w-8 items-center justify-center border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-600"
              title={isMinimized ? 'Show message' : 'Hide message'}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            >
              <div className="h-0.5 w-3 bg-zinc-400" />
            </motion.button>

            <motion.button
              onClick={() => setIsVisible(false)}
              className="flex h-8 w-8 items-center justify-center border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-600"
              title="Dismiss assistant"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            >
              <X className="h-4 w-4 text-zinc-400" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        drag
        dragConstraints={viewportRef}
        dragMomentum={!shouldReduceMotion}
        dragElastic={0.08}
        dragTransition={{
          power: 0.22,
          timeConstant: 240,
          bounceStiffness: 420,
          bounceDamping: 28,
        }}
        className="pointer-events-auto absolute bottom-6 right-16 touch-none"
        style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative cursor-grab active:cursor-grabbing"
          title="Drag me"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <motion.line
              x1="32"
              y1="8"
              x2="32"
              y2="14"
              stroke="#52525b"
              strokeWidth="2"
              animate={shouldReduceMotion ? undefined : { y1: [8, 6, 8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="32"
              cy="6"
              r="2"
              fill="#3b82f6"
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <rect x="20" y="14" width="24" height="22" fill="#18181b" stroke="#52525b" strokeWidth="2" />

            <motion.rect
              x="26"
              y="22"
              width="4"
              height={eyesBlink ? '1' : '6'}
              fill="#3b82f6"
              animate={{ height: eyesBlink ? 1 : 6 }}
            />
            <motion.rect
              x="34"
              y="22"
              width="4"
              height={eyesBlink ? '1' : '6'}
              fill="#3b82f6"
              animate={{ height: eyesBlink ? 1 : 6 }}
            />

            <line x1="28" y1="31" x2="36" y2="31" stroke="#52525b" strokeWidth="1.5" />

            <rect x="22" y="38" width="20" height="18" fill="#18181b" stroke="#52525b" strokeWidth="2" />
            <circle cx="32" cy="47" r="2" fill="#52525b" />
            <line x1="32" y1="42" x2="32" y2="44" stroke="#52525b" strokeWidth="1" />
            <line x1="32" y1="50" x2="32" y2="52" stroke="#52525b" strokeWidth="1" />

            <rect x="16" y="40" width="4" height="10" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
            <rect x="44" y="40" width="4" height="10" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />

            <rect x="24" y="56" width="6" height="6" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
            <rect x="34" y="56" width="6" height="6" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RobotAssistant;
