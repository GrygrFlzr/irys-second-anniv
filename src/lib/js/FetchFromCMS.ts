const numObjsPerRequest = 100;
const objDepth = 5;

// TODO: implement authenication, if required
async function fetchAllFromCMS(cmsUrl: string | URL): Promise<any> {
	let data: any[] = [];
	let urlObj = new URL(cmsUrl);
	urlObj.searchParams.set('limit', numObjsPerRequest.toString());
	urlObj.searchParams.set('depth', objDepth.toString());

	let hasAllData = false;
	do {
		let response = await fetch(cmsUrl);
		let respData = await response.json();

		respData.docs.forEach((element: any) => data.push(element));

		if (respData.nextPage != null && respData.totalDocs != data.length) {
			urlObj.searchParams.set('page', respData.nextPage.toString());
		} else {
			hasAllData = true;
		}
	} while (!hasAllData);

	return data;
}

export default fetchAllFromCMS;
