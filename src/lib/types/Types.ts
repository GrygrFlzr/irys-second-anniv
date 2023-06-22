import type { Element, Text } from 'slate';

type Image = {
	src: string;
	alt: string;
	height: number;
	width: number;
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

export type { Image, TimelineData, RichtextElement, RichtextTextElement, RichtextLinkElement };
