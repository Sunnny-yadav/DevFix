import { motion } from 'framer-motion';

export default function IntroductionPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Video Background */}
      <video 
        src="https://www.coverr.co/s3/mp4/technology-office-1535506217.mp4" 
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        muted 
        loop
      ></video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg font-[Poppins]">
          Welcome to <span className="text-green-400">DevFix Hub</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-300 font-[Inter] leading-relaxed">
          A collaborative platform where developers share code snippets, report errors,
          and get community-driven solutions. Our mission is to empower developers
          to debug and innovate through shared knowledge.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-green-700 transition-all font-[Poppins]"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}
