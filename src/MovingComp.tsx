import { AnimatePresence, motion, MotionGlobalConfig } from 'framer-motion';
import { useState } from 'react';

export default function MovingComp({
  skipAnimations = false,
}: {
  skipAnimations?: boolean;
}) {
  const [show, setShow] = useState(true);
  MotionGlobalConfig.skipAnimations = skipAnimations;
  return (
    <div className="m-10 w-fit items-center">
      <button
        onClick={() => setShow((b) => !b)}
        className="px-4 py-2 mb-10 rounded-md outline outline-orange-300"
      >
        Toggle
      </button>
      <div className="flex gap-10">
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="reg"
            >
              Box
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
