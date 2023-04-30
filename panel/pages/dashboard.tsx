import React from 'react';
import type { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Logs from 'modules/logs';
import { Query } from 'types/query';
import { api } from 'features/api';

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
		},
		isFetching,
		isSuccess,
	} = api.useGetLogsQuery(queryOptions);

	return isSuccess ? (
		<Logs
			isLoading={isFetching}
			{...data}
			onFilterChange={(query: Query) =>
				setQueryOptions(oldQueryOption => ({ ...oldQueryOption, ...query }))
			}
		/>
	) : (
		<span>...Loading</span>
	);
};

export default DashboardPage;

export const getServerSideProps = withPageAuthRequired();
