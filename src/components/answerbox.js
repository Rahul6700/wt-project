export default function Answerbox() {
  return (
    <div className="bg-[#0f0f0f] border-t border-[#333] shadow-lg rounded-md w-full p-4">
      <div className="max-w-3xl mx-auto flex items-center gap-2 p-4">
        <textarea
          className="flex-grow h-12 bg-[#1a1a1a] text-white border border-[#333] rounded-md p-2 text-base font-sans resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
          placeholder="Enter your answer here!"
        ></textarea>
        <button className="h-12 px-5 bg-blue-600 text-white rounded-md cursor-pointer text-base transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}

