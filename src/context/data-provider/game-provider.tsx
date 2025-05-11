import { ReactNode } from 'react';
import { ScoreProvider } from './score-provider';
import MessageProvider from './message-provider';
import EmojiProvider from './emoji-provider';
import SoundProvider from './sound-provider';

export default function GameProvider({ children }: { children: ReactNode }) {
	return (
		<EmojiProvider>
			<SoundProvider>
				<ScoreProvider>
					<MessageProvider>{children}</MessageProvider>
				</ScoreProvider>
			</SoundProvider>
		</EmojiProvider>
	);
}
