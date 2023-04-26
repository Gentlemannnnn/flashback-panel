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
	});

	const { data = { page: 1, items: [], totalPages: 1, totalRows: 0 } } =
		api.useGetLogsQuery(queryOptions);

	return (
		<Logs {...data} onFilterChange={(query: Query) => setQueryOptions(query)} />
	);
};

export default DashboardPage;

export const getServerSideProps = withPageAuthRequired();
