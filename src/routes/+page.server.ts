import process from 'node:process';

import fetchAllFromCMS from '$lib/js/FetchFromCMS';
import getImaginaryProxyImageURL from '$lib/js/ImaginaryImageProxyTools';
import type { Image, TimelineDataObj } from '$lib/js/Types';

import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config({ path: `.env.local` });
	dotenv.config();
}

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
const cmsRestUrl = process.env.CMS_REST_API_URL;
const eventSlug = 'events';
async function loadDataFromCMS(): Promise<TimelineDataObj> {
	let data = await fetchAllFromCMS(`${cmsRestUrl}/${eventSlug}`);
	let retData = data.map((element: any) => {
		return {
			date: new Date(element.date),
			title: element.title,
			backgroundImage: element.backgroundImage
				? getImageObject(element.backgroundImage)
				: undefined,
			images: element.images.map((img: any) => getImageObject(img)),
			content: element.content
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
