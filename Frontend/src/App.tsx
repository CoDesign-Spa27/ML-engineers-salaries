import { useRef } from "react";
import { motion } from "framer-motion";
import Chart from "./Chart/page";
import LandingPage from "./Pages/LandingPage";
import MainPage from "./Salaries/page";
import ChatAi from "./AiChat/page";

function App() {
  const mainPageRef = useRef<HTMLDivElement>(null);
  const chatAiRef = useRef<HTMLDivElement>(null);

  const scrollToMainTable = () => {
    if (mainPageRef.current) {
      mainPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToChatAi = () => {
    if (chatAiRef.current) {
      chatAiRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-grow">
        <LandingPage onClickAsk={scrollToChatAi} onClickSeeData={scrollToMainTable} />
      </div>

      <motion.div
        ref={mainPageRef}
        className="flex-grow relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <MainPage />
      </motion.div>

      <div className="flex-grow">
        <Chart />
      </div>

       <motion.div   ref={chatAiRef}
        className="flex-grow relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <ChatAi />
      </motion.div>
    </div>
  );
}

export default App;
