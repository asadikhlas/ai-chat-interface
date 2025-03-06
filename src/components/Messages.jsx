import DOMPurify from 'dompurify';

export const Message = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.sender === 'ai' ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`p-3 rounded-lg max-w-lg ${
          message.sender === 'ai' ? 'bg-gray-700' : 'bg-purple-700'
        }`}
      >
        <strong>{message.sender.toUpperCase()}</strong>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(message.text),
          }}
        />
        {message.image && (
          <img
            src={message.image}
            alt='Uploaded'
            className='mt-2 rounded-lg max-w-full'
          />
        )}
        <p className='text-xs text-gray-400 mt-1'>{message.timestamp}</p>
      </div>
    </div>
  );
};
