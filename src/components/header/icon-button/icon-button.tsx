import { ReactNode } from 'react';

import styles from './icon-button.module.css';

type IconButtonProps = {
	title: string;
	onClick: () => void;
	children: ReactNode;
};

export default function IconButton({
	title,
	onClick,
	children,
}: IconButtonProps) {
	return (
		<button className={styles.btn} onClick={onClick} title={title}>
			{children}
		</button>
	);
}
