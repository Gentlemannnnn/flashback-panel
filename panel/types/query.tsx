import { GridSortDirection } from '@mui/x-data-grid';

export interface Sort {
	[key: string]: GridSortDirection;
}

export interface Filter {
	[key: string]: any;
}

export interface Query {
	sort?: Sort;
	filter?: Filter;
	page?: number;
	pageSize?: number;
}
