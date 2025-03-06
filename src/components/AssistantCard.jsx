import { FaRocketchat } from 'react-icons/fa';

export const AssistantCard = ({ bot, isSelected, onClick }) => {
  return (
    <div
      className={`p-4 bg-gray-800 rounded-lg text-center hover:bg-gray-700 cursor-pointer ${
        isSelected ? 'border-2 border-purple-500' : ''
      }`}
      onClick={onClick}
    >
      <div className='flex items-center justify-center space-x-2'>
        <FaRocketchat />
        <p className='font-bold'>{bot.name}</p>
      </div>
      <p className='text-sm text-gray-400'>{bot.description}</p>
    </div>
  );
};
