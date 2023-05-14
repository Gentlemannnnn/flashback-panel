import React from 'react';
import type { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Query } from 'types/query';
import { api } from 'features/api';
import DiscordWebhooks from 'modules/discordWebhooks';

const DashboardPage: NextPage = () => {
	const [queryOptions, setQueryOptions] = React.useState<Query>({
		sort: {},
		filter: {},
		page: 1,
		pageSize: 50,
	});

	const {
		data = {
			page: 1,
			pageSize: 50,
			items: [],
			totalPages: 1,
			totalRows: 0,
			columns: [],
			filterData: {},
			actions: [],
		},
		isFetching,
		isSuccess,
	} = api.useGetDiscordWebhooksQuery(queryOptions);

	return isSuccess ? (
		<DiscordWebhooks
			isLoading={isFetching}
			availableActions={data.actions}
			{...data}
			onFilterChange={(query: Query) =>
				setQueryOptions((oldQueryOption: Query) => ({
					...oldQueryOption,
					...query,
				}))
			}
		/>
	) : (
		<span>...Loading</span>
	);
};

export default DashboardPage;

export const getServerSideProps = withPageAuthRequired();
