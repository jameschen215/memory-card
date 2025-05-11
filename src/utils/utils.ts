export function shuffle<T>(array: T[]) {
	// Creates a shallow copy of the original array,
	// so you don’t accidentally change the original.
	const shuffled = [...array];

	// This loop starts from the end of the array and moves backwards
	// — very important for randomness.
	for (let i = shuffled.length - 1; i > 0; i--) {
		// Picks a random index between 0 and i.
		// So every item has an equal chance to be swapped.
		const j = Math.floor(Math.random() * (i + 1));

		// Swaps the current item with a randomly selected item from
		// the part of the array that hasn’t been shuffled yet.
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}

export function getRandomItem<T>(array: T[]): T {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}
