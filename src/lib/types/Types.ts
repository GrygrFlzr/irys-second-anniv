import type { Element, Text } from 'slate';

type Image = {
	src: string;
	smallSrc?: string; // Used in cases where we need a smaller version if the base image is too big!
	alt: string;
	height: number;
	width: number;
};

type TimelineData = {
	id: string;
	date: Date;
	title: string;
	background_image?: Image;
	images: Array<Image>;
	content: Array<RichtextElement | RichtextTextElement>;
	vfx?: string;
};

type YearlyTimelineData = {
	year: number;
	events: Array<TimelineData>;
	id: string;
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

type ArtSubmissionData = {
	id: string;
	author: string;
	authorIcon?: Image;
	message: string;
	images: Array<Image>;
};

export type {
	Image,
	TimelineData,
	RichtextElement,
	RichtextTextElement,
	RichtextLinkElement,
	YearlyTimelineData,
	ArtSubmissionData
};
