export const determinComparator = (
	keyComparator: string,
	value: string | string[],
) => {
	switch (keyComparator) {
		case 'contains':
			return { $regex: value, $options: 'i' };
		case 'startsWith':
			return { $regex: `^${value}`, $options: 'i' };
		case 'endsWith':
			return { $regex: `${value}$`, $options: 'i' };
		case 'isEmpty':
			return '';
		case 'isNotEmpty':
			return { $nin: [null, ''] };
		case 'isAnyOf':
			return { $in: value };
		default:
			return value;
	}
};
