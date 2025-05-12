import { useEffect } from 'react';

export default function useVisibleHeightUnit() {
	useEffect(() => {
		function setVisibleHeightUnit() {
			// This makes 1vh equals 1% of the height of the visible area,
			// not 100vh that includes the header and footer of a web browser.
			const vh = window.innerHeight * 0.01;

			// This sets a custom CSS variable called --vh that you can use in your CSS.
			// It stores the actual visible viewport height, unlike 100vh which
			// lies on mobile.
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}

		setVisibleHeightUnit();

		// Whenever the screen resizes (e.g. rotate phone, keyboard opens),
		// we recalculate the --vh value so it always stays correct.
		window.addEventListener('resize', setVisibleHeightUnit);

		// Removes the resize event listener when the component is unmounted,
		// to prevent memory leaks.
		return () => {
			window.removeEventListener('resize', setVisibleHeightUnit);
		};
	}, []);
}
