import { FaRegPaperPlane, FaImage } from 'react-icons/fa';

export const ChatInput = ({
  input,
  setInput,
  handleSendPrompt,
  handleImageUpload,
}) => {
  return (
    <div className='p-4 border-t border-gray-700 flex'>
      <input
        type='text'
        className='flex-1 p-3 bg-gray-800 rounded-l-lg focus:outline-none'
        placeholder='Type a message...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
      />
      <label className='bg-gray-700 px-4 py-3 cursor-pointer'>
        <FaImage />
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleImageUpload}
        />
      </label>
      <button
        className='bg-purple-700 px-4 py-3 rounded-r-lg'
        onClick={handleSendPrompt}
      >
        <FaRegPaperPlane />
      </button>
    </div>
  );
};
