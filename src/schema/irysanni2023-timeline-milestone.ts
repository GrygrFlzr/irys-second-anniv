import { CollectionConfig } from 'payload/types';

const TimelineMilestone: CollectionConfig = {
	slug: 'IRySAnni2023-Timeline-Milestone',
	labels: {
		singular: 'Timeline Milestone',
		plural: 'Timeline Milestones'
	},
	fields: [
		{
			name: 'date',
			type: 'date',
			required: true
		},
		{
			name: 'title',
			type: 'text',
			required: true
		},
		{
			name: 'photo',
			type: 'upload',
			required: true,
			relationTo: 'IRySAnni2023-Image',
			filterOptions: {
				mimeType: {
					or: [{ equals: 'image/jpeg' }, { equals: 'image/png' }, { equals: 'image/bmp' }]
				}
			}
		},
		{
			name: 'content',
			type: 'richText',
			required: true
		}
	]
};

export default TimelineMilestone;
