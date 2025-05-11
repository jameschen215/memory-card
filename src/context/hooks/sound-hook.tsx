import { useContext } from 'react';
import { SoundContext } from '../context/sound-context';

export default function useSound() {
	const data = useContext(SoundContext);

	if (!data) {
		throw new Error('Please put your component into the sound provider.');
	}
	return data;
}
