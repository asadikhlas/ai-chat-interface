import { useState } from 'react';
import { ChatProvider, useChat } from './components/ChatProvider';
import { Sidebar } from './components/Sidebar';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';

const ChatDashboard = () => {
  const {
    messages,
    assistants,
    sendMessage,
    loading,
    error,
    selectedAssistant,
    startNewChat,
    setSelectedAssistant,
  } = useChat();
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendPrompt = () => {
    if (!input.trim() && !image) return;
    sendMessage(input, image);
    setInput('');
    setImage(null);
    setImagePreview(null);
  };

  const handleAssistantClick = (assistant) => {
    setSelectedAssistant(assistant);
    startNewChat();
  };

  return (
    <div className='h-screen flex bg-gray-900 text-white'>
      <Sidebar startNewChat={startNewChat} messages={messages} />
      <main className='flex-1 flex flex-col'>
        <ChatHeader
          assistants={assistants}
          selectedAssistant={selectedAssistant}
          handleAssistantClick={handleAssistantClick}
        />
        <ChatMessages
          messages={messages}
          loading={loading}
          error={error}
          selectedAssistant={selectedAssistant}
        />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendPrompt={handleSendPrompt}
          handleImageUpload={handleImageUpload}
        />
        {imagePreview && (
          <div className='p-4'>
            <img
              src={imagePreview}
              alt='Preview'
              className='mt-2 rounded-lg max-w-xs'
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default () => (
  <ChatProvider>
    <ChatDashboard />
  </ChatProvider>
);
