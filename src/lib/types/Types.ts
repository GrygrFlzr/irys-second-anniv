import type { Element, Text } from 'slate';

type Image = {
	src: string;
	alt: string;
	height: number;
	width: number;
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
	content: Array<RichtextElement | RichtextTextElement>;
};

type RichtextElement = Element & {
	type: string;
	children: Array<RichtextElement | RichtextTextElement>;
};

type RichtextLinkElement = RichtextElement & {
	linkType: string;
	url: string;
	newTab: boolean;
};

type RichtextTextElement = Text & {
	bold: boolean;
	italic: boolean;
	underline: boolean;
	strikethrough: boolean;
};

export type {
	Image,
	TimelineData,
	TimelineDataObj,
	RichtextElement,
	RichtextTextElement,
	RichtextLinkElement
};
