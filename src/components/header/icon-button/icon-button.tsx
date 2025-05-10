import { ReactNode } from 'react';

import styles from './icon-button.module.css';

type IconButtonProps = {
	title: string;
	onClick: () => void;
	ariaPressed?: boolean;
	children: ReactNode;
};

export default function IconButton({
	title,
	onClick,
	ariaPressed,
	children,
}: IconButtonProps) {
	return (
		<button
			type="button"
			aria-pressed={ariaPressed}
			className={styles.btn}
			onClick={onClick}
			title={title}>
			{children}
		</button>
	);
}
