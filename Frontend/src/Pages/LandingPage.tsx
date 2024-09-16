import { motion } from "framer-motion";
import Lottie from 'react-lottie-player'
import HeroJson from '../assets/Assest1.json'

interface ContentProps {
  onClickAsk: () => void;
  onClickSeeData: () => void;
}
const LandingPage =({ onClickAsk, onClickSeeData }: ContentProps) => {
  return (
    <div className="relative overflow-hidden">
      <Content onClickAsk={onClickAsk} onClickSeeData={onClickSeeData}/>
      <FuzzyOverlay />
    </div>
  );
};

const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        backgroundImage: 'url("/black-noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
  );
};



const Content = ({ onClickAsk, onClickSeeData }: ContentProps) => {
  return (
    <div className="relative grid h-screen  place-content-center space-y-6 bg-neutral-950 p-8">
      <div>

      <p className="text-center uppercase  text-6xl font-black text-neutral-50">
      Data is the future.
      </p>
      </div>
      <div className="lg:block absolute top-10 hidden  right-80 ">
      <Lottie
      loop
      animationData={HeroJson}
      play
      style={{ width:300, height:300 }}
    />
      </div>
      
      <p className="text-center text-neutral-400">
      Machine Learning Engineer Salary in 2024
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
        onClick={onClickAsk}
        className="text-neutral-20 w-fit px-4 py-2 font-semibold text-neutral-200 transition-colors hover:bg-neutral-800">
          Ask
        </button>
        <button 
        onClick={onClickSeeData}
        className="w-fit bg-neutral-200 px-4 py-2 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
          See Data
        </button>
        
      </div>
    
    </div>
  );
};

export default LandingPage;