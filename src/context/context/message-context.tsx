import { createContext } from 'react';
import { MessageType } from '../../types/message-type';

type MessageContextType = {
	message: MessageType | null;
	setMessage: (message: MessageType | null) => void;
};

export const MessageContext = createContext<MessageContextType>({
	message: null,
	setMessage: () => {},
});
