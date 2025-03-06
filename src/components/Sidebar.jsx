import { FaPlus } from 'react-icons/fa';

export const Sidebar = ({ startNewChat, messages }) => {
  return (
    <aside className='w-64 bg-gray-800 p-4 space-y-4'>
      <button
        className='flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md w-full'
        onClick={startNewChat}
      >
        <FaPlus /> New Chat
      </button>
      <div className='space-y-2'>
        <p className='text-gray-400'>Previous Chats</p>
        {messages.slice(-5).map((msg, idx) => (
          <button
            key={idx}
            className='block w-full text-left px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600'
          >
            {msg.text}{' '}
            <span className='text-xs text-gray-400'>({msg.timestamp})</span>
          </button>
        ))}
      </div>
    </aside>
  );
};
