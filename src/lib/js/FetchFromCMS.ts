const numObjsPerRequest = 100;
const objDepth = 5;

import { env } from '$env/dynamic/private';

// TODO: implement authentication, if required
async function fetchAllFromCMS<T>(cmsUrl: string | URL): Promise<Array<T>> {
	const data: Array<T> = [];
	const urlObj = new URL(cmsUrl);
	urlObj.searchParams.set('limit', numObjsPerRequest.toString());
	urlObj.searchParams.set('depth', objDepth.toString());

	let hasAllData = false;
	do {
		const response = await fetch(cmsUrl, {
			headers: {
				'X-RateLimit-Bypass': env.PAYLOAD_BYPASS_RATE_LIMIT_KEY ?? ''
			} as Record<string, string>
		});
		const respData = await response.json();

		respData.docs.forEach((element: T) => data.push(element));

		if (!respData.hasNextPage && respData.totalDocs != data.length) {
			urlObj.searchParams.set('page', respData.nextPage.toString());
		} else {
			hasAllData = true;
		}
	} while (!hasAllData);

	return data;
}

export default fetchAllFromCMS;
