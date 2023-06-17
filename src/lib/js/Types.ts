import type { Node } from 'slate';

type Image = {
	src: string;
	alt: string;
};

// because Sveltekit cannot fathom the fact that people would like to return arrays
// instead of objects containing one damn array
type TimelineDataObj = {
	data: Array<TimelineData>;
};

type TimelineData = {
	date: Date;
	title: string;
	background_image?: Image;
	images: Array<Image>;
	content: Node;
};

export type { Image, TimelineData, TimelineDataObj };
