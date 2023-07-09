import fetchAllFromCMS from '$lib/js/FetchFromCMS';
import type { Event } from '$lib/types/HefCmsTypes';
import type {
	RichtextElement,
	RichtextTextElement,
	TimelineData,
	YearlyTimelineData
} from '$lib/types/Types';
import getImageObject from '$lib/js/ImageTools';

import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import qs from 'qs';

const cmsRestUrl = env.CMS_REST_API_URL;
const eventSlug = 'events';
const projectSlug = env.IRYS_2ND_ANNIV_PROJECT_SLUG;
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
		cmsRestUrl.endsWith('/') ? '' : '/'
	}api/${eventSlug}${query}`;
	const data = await fetchAllFromCMS<Event>(formattedUrl);

	const retData: TimelineData[] = data.map((element: Event) => {
		return {
			id: element.id,
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
			}),
			vfx: element.devprops?.find((prop) => prop.key == 'vfx')?.value
		};
	});

	retData.sort((a, b) => {
		return a.date.valueOf() - b.date.valueOf();
	});

	const years = new Map<number, TimelineData[]>();

	for (const item of retData) {
		const year = item.date.getFullYear();
		let yearData = years.get(year);
		if (!yearData) {
			yearData = [];
			years.set(year, yearData);
		}
		yearData.push(item);
	}

	return {
		data: Array.from(years.entries()).map(
			([year, events]): YearlyTimelineData => ({
				year,
				events,
				id: `year_${year}`
			})
		)
	};
} satisfies PageServerLoad;
