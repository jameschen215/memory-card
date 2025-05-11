import { ReactNode, useState } from 'react';
import { SoundContext } from '../context/sound-context';

export default function SoundProvider({ children }: { children: ReactNode }) {
	const [soundOn, setSoundOn] = useState(true);
	const toggleSound = () => setSoundOn((prev) => !prev);

	return (
		<SoundContext.Provider value={{ soundOn, toggleSound }}>
			{children}
		</SoundContext.Provider>
	);
}
