import { z } from 'zod';

const emojiCategoryId = 4; // Animals & Nature
const fetchNumber = 24; //4 times of the number of the cards
const apiEnd = `https://api.emojisworld.fr/v1/random?&categories=${emojiCategoryId}&limit=${fetchNumber}`;

export const EmojiItemSchema = z.object({
	id: z.number(),
	emoji: z.string(),
	name: z.string(),
});

const EmojiApiResponseSchema = z.object({
	total: z.number(),
	results: z.array(EmojiItemSchema),
});

export type EmojiItem = z.infer<typeof EmojiItemSchema>;

export async function fetchEmojis(): Promise<EmojiItem[] | null> {
	try {
		const resp = await fetch(apiEnd);
		const data: unknown = await resp.json();
		const result = EmojiApiResponseSchema.safeParse(data);

		if (!result.success) {
			console.error('Zod validation failed:', result.error.format());
			return null;
		}

		return result.data.results;
	} catch (error) {
		console.log('Fetch failed: ', error);
		return null;
	}
}
