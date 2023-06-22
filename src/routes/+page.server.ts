import { env } from '$env/dynamic/private';
import fetchAllFromCMS from '$lib/js/FetchFromCMS';
import getImaginaryProxyImageURL from '$lib/js/ImaginaryImageProxyTools';
import type { Event } from '$lib/types/HefCmsTypes';
import type { Image, RichtextElement, RichtextTextElement, TimelineData } from '$lib/types/Types';
import qs from 'qs';
import type { PageServerLoad } from './$types';

function getProxyImageURL(src: string, width: number, height: number, quality = 90): string {
	if (env.BYPASS_IMAGINARY_PROXY) {
		return new URL(src, env.CMS_REST_API_URL).toString();
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
const projectSlug = env.IRYS_2ND_ANNIV_PROJECT_SLUG;
export const load = async function loadDataFromCMS() {
	// TODO: modify to only grab events from a specific project, pull in the qs lib for readability
	const query = qs.stringify(
		{
			where: {
				'project.slug': {
					equals: projectSlug
				}
			}
		},
		{ addQueryPrefix: true }
	);
	const data = await fetchAllFromCMS<Event>(`${cmsRestUrl}/api/${eventSlug}?${query}`);
	const retData: TimelineData[] = data.map((element: Event) => {
		return {
			date: new Date(element.date),
			title: element.title,
			backgroundImage: element.backgroundImage
				? getImageObject(element.backgroundImage)
				: undefined,
			images: element.images.map((img: any) => getImageObject(img)),
			// Not 100% sure if this aggressive type checking is required.
			content: element.content.map((element: { [k: string]: unknown }) => {
				if (Object.hasOwn(element, 'type') || Object.hasOwn(element, 'children')) {
					return element as unknown as RichtextElement;
				} else if (Object.hasOwn(element, 'text')) {
					return element as unknown as RichtextTextElement;
				} else {
					throw new Error(
						`Unexpected element "${JSON.stringify(
							element
						)}", does not conform to RichtextElement or RichtextTextElement.`
					);
				}
			})
		};
	});

	retData.sort((a, b) => {
		return a.date.valueOf() - b.date.valueOf();
	});

	return {
		data: retData
	};
} satisfies PageServerLoad;
