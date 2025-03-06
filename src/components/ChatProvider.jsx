import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [assistants, setAssistants] = useState([]);
  const [threadId, setThreadId] = useState(`thread-${Date.now()}`);
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/assistants`);
        setAssistants(data);
        if (data.length > 0) {
          setSelectedAssistant(data[0]);
        }
      } catch (err) {
        console.error('Error fetching assistants:', err);
      }
    };
    fetchAssistants();
  }, []);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setMessages(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (input, image = null) => {
    if (!input.trim() && !image) return;

    const timestamp = new Date().toDateString();
    const imageUrl = image ? URL.createObjectURL(image) : null;

    const newMessage = { message: input, image: imageUrl, threadId, timestamp };
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: input, image: imageUrl, timestamp },
    ]);
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/chat`, newMessage);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.aiResponse.message,
          timestamp: new Date().toDateString(),
        },
      ]);
    } catch (err) {
      setError('Failed to send message. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setThreadId(`thread-${Date.now()}`);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        assistants,
        sendMessage,
        loading,
        error,
        setThreadId,
        selectedAssistant,
        setSelectedAssistant,
        startNewChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
