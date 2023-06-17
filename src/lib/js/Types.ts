import type { Node } from 'slate';

type Image = {
	src: string;
	alt: string;
};

type TimelineData = {
	date: Date;
	title: string;
	background_image?: Image;
	images: Array<Image>;
	content: Node;
};

export type { Image, TimelineData };
