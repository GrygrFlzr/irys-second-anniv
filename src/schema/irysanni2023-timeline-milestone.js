import { CollectionConfig } from 'payload/types';

export const TimelineMilestones: CollectionConfig = {
	slug: 'irysanni2023-timeline-milestone',
	fields: [
		{
			name: 'date',
			type: 'date',
			required: true,
		},
		{
			title: 'title',
			type: 'text',
			required: true,
		},
        {
			name: 'photo',
			type: 'upload',
			required: true,
            relationTo: 'irysanni2023-imagestore',
            filterOptions: {
                mimeType: { 
                    or: [
                        { equals: "image/jpeg" },
                        { equals: "image/png" },
                        { equals: "image/bmp" },
                    ]
                }
            },
		},
        {
			name: 'content',
			type: 'rich-text',
			required: true,
		}
	],
};