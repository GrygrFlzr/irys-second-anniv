export const TIMELINE_ID_PREFIX = 'timeline-';

export function toDomId(id: string): string {
	return TIMELINE_ID_PREFIX + id;
}
