import DOMPurify from 'dompurify';
import { Message } from './Messages';

export const ChatMessages = ({
  messages,
  loading,
  error,
  selectedAssistant,
}) => {
  return (
    <div className='flex-1 p-6 overflow-y-auto space-y-4'>
      {selectedAssistant && (
        <div className='text-center text-gray-400 mb-4'>
          Chatting with: <strong>{selectedAssistant.name}</strong>
        </div>
      )}
      {messages.map((msg, idx) => (
        <Message key={idx} message={msg} />
      ))}
      {loading && <p className='text-gray-400'>Typing...</p>}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};
