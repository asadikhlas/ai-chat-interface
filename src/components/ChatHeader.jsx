import { AssistantCard } from './AssistantCard';

export const ChatHeader = ({
  assistants,
  selectedAssistant,
  handleAssistantClick,
}) => {
  return (
    <header className='p-4 border-b border-gray-700 flex space-x-4'>
      {assistants.map((bot, idx) => (
        <AssistantCard
          key={idx}
          bot={bot}
          isSelected={selectedAssistant?.id === bot.id}
          onClick={() => handleAssistantClick(bot)}
        />
      ))}
    </header>
  );
};
