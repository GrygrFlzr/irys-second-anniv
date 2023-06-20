import process from 'node:process';

import { env } from '$env/dynamic/private';
import fetchAllFromCMS from '$lib/js/FetchFromCMS';
import getImaginaryProxyImageURL from '$lib/js/ImaginaryImageProxyTools';
import type {
	Image,
	RichtextElement,
	RichtextTextElement,
	TimelineDataObj
} from '$lib/types/Types';
import type { Event } from '$lib/types/HefCmsTypes';

import qs from 'qs';

function getProxyImageURL(src: string, width: number, height: number, quality = 90): string {
	if (process.env.BYPASS_IMAGINARY_PROXY) {
		return src;
	} else {
		return getImaginaryProxyImageURL(src, width, height, quality);
	}
}

function getImageObject(cmsImageObj: any): Image {
	let cmsImage;
	if ('image' in cmsImageObj) {
		cmsImage = cmsImageObj.image;
	} else {
		cmsImage = cmsImageObj;
	}
	return {
		src: getProxyImageURL(cmsImage.url, cmsImage.width, cmsImage.height),
		alt: cmsImage.alt,
		height: cmsImage.height,
		width: cmsImage.width
	};
}

// TODO: move to dotfiles
const cmsRestUrl = env.CMS_REST_API_URL;
const eventSlug = 'events';
const projectSlug = '';
async function loadDataFromCMS(): Promise<TimelineDataObj> {
	// TODO: modify to only grab events from a specific project, pull in the qs lib for readability
	let query = qs.stringify(
		{
			where: {
				'project.slug': {
					equals: projectSlug
				}
			}
		},
		{ addQueryPrefix: true }
	);
	let data = await fetchAllFromCMS<Event>(`${cmsRestUrl}/api/${eventSlug}?${query}`);
	let retData = data.map((element: Event) => {
		return {
			date: new Date(element.date),
			title: element.title,
			backgroundImage: element.backgroundImage
				? getImageObject(element.backgroundImage)
				: undefined,
			images: element.images.map((img: any) => getImageObject(img)),
			// Not 100% sure if this aggressive type checking is required.
			content: element.content.map((element: { [k: string]: unknown }) => {
				if (Object.hasOwn(element, 'type')) {
					return element as unknown as RichtextElement;
				} else if (Object.hasOwn(element, 'text')) {
					return element as unknown as RichtextTextElement;
				} else {
					throw new Error(
						`Unexpected element ${element}, does not conform to RichtextElement or RichtextTextElement.`
					);
				}
			})
		};
	});

	retData.sort((a: any, b: any) => {
		return a.date.valueOf() - b.date.valueOf();
	});

	return {
		data: retData
	};
}

export { loadDataFromCMS as load };
