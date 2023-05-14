import QueryString from 'qs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Query, Webhooks } from 'types/query';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URI,
	}),
	tagTypes: ['Logs', 'DiscordWebhooks'],
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
		getDiscordWebhooks: builder.query<
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
				url: `/webhooks?${QueryString.stringify(params, {
					arrayFormat: 'indices',
				})}`,
			}),
			providesTags: result =>
				result
					? [
							...result.items.map(
								({ id }) => ({ type: 'DiscordWebhooks', id } as const),
							),
							{ type: 'DiscordWebhooks', id: 'LIST' },
					  ]
					: [{ type: 'DiscordWebhooks', id: 'LIST' }],
		}),
		updateWebhook: builder.mutation<
			Webhooks,
			Partial<Webhooks> & Pick<Webhooks, 'id'>
		>({
			query: webhook => ({
				url: `/webhooks/${webhook.id}`,
				method: 'PUT',
				body: webhook,
			}),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: 'DiscordWebhooks', id: 'LIST' },
				{ type: 'DiscordWebhooks', id },
			],
		}),
		deleteWebhook: builder.mutation<void, string>({
			query: id => ({
				url: `/webhooks/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (_result, _error) => [
				{ type: 'DiscordWebhooks', id: 'LIST' },
			],
		}),
		addWebhook: builder.mutation<Webhooks, Webhooks>({
			query: webhooks => ({
				url: '/webhooks',
				method: 'POST',
				body: webhooks,
			}),
			invalidatesTags: [{ type: 'DiscordWebhooks', id: 'LIST' }],
		}),
	}),
});
