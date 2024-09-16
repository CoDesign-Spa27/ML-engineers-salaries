import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<
    { user: string; ai: string[] }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const userMessage = message;
      setChatHistory([...chatHistory, { user: userMessage, ai: [] }]);

      const response = await axios.post("http://localhost:3000/ask", {
        message: userMessage,
      });
      const aiResponse: string = response.data.response;

      const words = aiResponse.split(" ").filter(Boolean);

      setChatHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1].ai = words;
        return newHistory;
      });
    } catch (error) {
      console.error("Error sending message to the server", error);
    } finally {
      setLoading(false);
    }

    setMessage("");
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const typingAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-4">
      <div className="bg-neutral-900 shadow-md p-5 rounded-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center text-gray-200 my-4">
          Ai Chat
        </h1>

        <div
          className="h-96 p-4 overflow-y-auto my-5 bg-neutral-800 rounded-md"
          ref={chatRef}
        >
          {chatHistory.map((chat, index) => (
            <div key={index} className="mb-4 flex flex-col gap-4">
              {chat.user && (
                <div className="flex justify-start">
                  <div className="bg-pink-400 text-white text-sm p-3 rounded-lg shadow-md max-w-xs">
                    <strong>You:</strong> {chat.user}
                  </div>
                </div>
              )}
              {chat.ai && (
                <div className="flex justify-end">
                  <div className="bg-gray-200 text-gray-800 text-sm p-3 rounded-lg shadow-md max-w-xl flex-wrap">
                    {chat.ai.map((word, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={typingAnimation}
                        className="inline-block mr-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                    {!chat.ai.length && (
                      <div>
                        <Loader />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {!chatHistory.length && (
            <div>
              <p className="text-gray-400 text-center mt-[15%] ">
                Chat is empty.
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 items-center flex">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
            className="text-gray-200"
            required
          />
          <div>
            <button
              type="submit"
              className={`ml-4 px-4 py-3 text-white flex gap-2 items-center font-semibold rounded-lg transition ${
                loading ? "bg-pink-400" : "bg-pink-600 hover:bg-pink-700"
              }`}
              disabled={loading}
            >
              <div className="sm:block hidden">
                {loading ? "Loading..." : "Send"}
              </div>
              <Send className="size-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;

function Loader() {
  return (
    <div >
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-pink-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
 
    </div>
  );
}
