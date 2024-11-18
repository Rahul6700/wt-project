export default function Answerbox() {
  return (
    <div className="w-[95%] flex items-center gap-2 bg-gray-800 p-4 rounded-lg shadow-md transition-transform hover:scale-102">
      <textarea className="w-full h-10 bg-[#333] text-white border-none rounded-md p-2 text-base font-sans resize-none focus:bg-[#444] transition-colors" placeholder="Enter your answer here!"></textarea>
      <button className="h-10 px-4 bg-green-500 text-white rounded-md cursor-pointer text-base ml-2 transition-colors hover:bg-green-600">
        Send
      </button>
    </div>
  );
}

