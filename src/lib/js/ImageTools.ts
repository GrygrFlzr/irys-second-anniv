import { env } from '$env/dynamic/private';
import getImaginaryProxyImageURL from './ImaginaryImageProxyTools';
import type { Image } from '$lib/types/Types';

function getProxyImageURL(src: string, width: number, height: number, quality = 90): string {
	if (env.BYPASS_IMAGINARY_PROXY && env.BYPASS_IMAGINARY_PROXY === 'true') {
		return new URL(src, env.CMS_REST_API_URL).toString();
	} else {
		return getImaginaryProxyImageURL(src, width, height, quality);
	}
}

function getDownscaledProxyImageURL(cmsImage: any): string {
	const width = 800;
	const height = Math.round((width * cmsImage.height) / cmsImage.width);

	return getProxyImageURL(cmsImage.url, width, height);
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
		smallSrc:
			cmsImage.width > 800 || cmsImage.height > 800
				? getDownscaledProxyImageURL(cmsImage)
				: undefined,
		alt: cmsImage.alt ?? '',
		height: cmsImage.height,
		width: cmsImage.width
	};
}

export default getImageObject;
