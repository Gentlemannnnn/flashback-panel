import QueryString from 'qs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Query } from 'types/query';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URI,
	}),
	tagTypes: ['Logs'],
	endpoints: builder => ({
		getLogs: builder.query<
			{
				items: any[];
				totalRows: number;
				page: number;
				totalPages: number;
				pageSize: number;
			},
			Query
		>({
			query: params => ({
				url: `/logs?${QueryString.stringify(params, {
					arrayFormat: 'indices',
				})}`,
			}),
			providesTags: result =>
				result
					? [
							...result.items.map(({ id }) => ({ type: 'Logs', id } as const)),
							{ type: 'Logs', id: 'LIST' },
					  ]
					: [{ type: 'Logs', id: 'LIST' }],
		}),
	}),
});
export { fetchBaseQuery };
