import { useContext } from 'react';
import { MessageContext } from '../context/message-context';

export default function useMessage() {
	const data = useContext(MessageContext);

	if (!data) {
		throw new Error('Please put your component into the message provider.');
	}

	return data;
}
