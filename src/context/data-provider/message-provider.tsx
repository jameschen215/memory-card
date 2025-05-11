import { ReactNode, useState } from 'react';
import { MessageContext } from '../context/message-context';
import { MessageType } from '../../types/message-type';

export default function MessageProvider({ children }: { children: ReactNode }) {
	const [message, setMessage] = useState<MessageType | null>(null);

	return (
		<MessageContext.Provider value={{ message, setMessage }}>
			{children}
		</MessageContext.Provider>
	);
}
