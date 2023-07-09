import fetchAllFromCMS from '$lib/js/FetchFromCMS';
import type { Submission } from '$lib/types/HefCmsTypes';
import type { ArtSubmissionData } from '$lib/types/Types';
import getImageObject from '$lib/js/ImageTools';

import { env } from '$env/dynamic/private';
import type { PageServerLoad } from '../$types';
import qs from 'qs';

const cmsRestUrl = env.CMS_REST_API_URL;
const eventSlug = 'submissions';
const projectSlug = env.ANNIVERSARYS_2023_PROJECT_SLUG;
export const load = async function loadDataFromCMS() {
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
	const formattedUrl = `${cmsRestUrl}${
		cmsRestUrl?.endsWith('/') ? '' : '/'
	}api/${eventSlug}${query}`;
	const data = await fetchAllFromCMS<Submission>(formattedUrl);

	// technically the submissions collections supports video, but we aren't supposed to
	// get video submissions so this should be fine. if we get video submissions then we
	// can implement video support.
	const retData: ArtSubmissionData[] = data.map((element: Submission) => {
		return {
			id: element.id,
			author: element.author,
			authorIcon: element.srcIcon ? getImageObject(element.srcIcon) : undefined,
			message: element.message ?? '',
			images: element.media.map((mediaElem: any) => getImageObject(mediaElem))
		};
	});

	return {
		data: retData
	};
} satisfies PageServerLoad;
