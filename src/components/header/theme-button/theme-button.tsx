import { useState } from 'react';
import styles from './theme-button.module.css';

import { Sun, Moon } from 'lucide-react';

export default function ThemeButton() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	return (
		<>
			<button
				className={styles.btn}
				onClick={() => setIsDarkMode((prev) => !prev)}>
				{isDarkMode || <Sun strokeWidth={1.5} />}
				{isDarkMode && <Moon strokeWidth={1.5} />}
			</button>
		</>
	);
}
