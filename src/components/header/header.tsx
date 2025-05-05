import styles from './header.module.css';
import ThemeButton from './theme-button/theme-button';

export default function Header() {
	return (
		<header className={styles.header}>
			<a href="/" className={styles.brand}>
				<span className={styles.logo}>
					<img src="/logo.png" alt="Logo" />
				</span>
				<span className={styles.brand__text}>Memory Card</span>
			</a>

			<ThemeButton />
		</header>
	);
}
