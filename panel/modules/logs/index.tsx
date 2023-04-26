import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import format from 'date-fns/format';

const columns: GridColDef[] = [
	{
		field: 'createdAt',
		headerName: 'Date',
		width: 150,
		valueGetter: (params: GridValueGetterParams) =>
			`${format(new Date(params.row.createdAt), 'dd/MM/yyyy hh:mm:ss')}`,
	},
	{
		field: 'from',
		headerName: 'From',
		width: 150,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.row.from.name} (${params.row.from.id}) `,
	},
	{
		field: 'action',
		headerName: 'Action',
		width: 150,
	},
	{
		field: 'to',
		headerName: 'To',
		width: 200,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.row?.to?.type ? `${params.row?.to?.type} - ` : ''} ${
				params.row?.to?.name || ''
			} ${params.row?.to?.id ? `(${params.row?.to?.id})` : ''}`,
	},
	{
		field: 'item',
		headerName: 'Item',
		width: 150,
		valueGetter: (params: GridValueGetterParams) =>
			` ${params.row?.quantity || ''} ${params.row?.item || ''}`,
	},
	{
		field: 'message',
		headerName: 'Message',
		width: 300,
	},
];

interface Props {
	items: any[];
	page: number;
	totalRows: number;
	totalPages: number;
	onFilterChange: (query: Query) => void;
}

const Logs = ({
	items,
	page = 1,
	totalRows,
	totalPages,
	onFilterChange,
}: Props) => {
	console.log('ok');
	return (
		<Box sx={{ height: '100%', width: '100%' }}>
			<DataGrid
				rows={items}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				experimentalFeatures={{ newEditingApi: true }}
				totalRows={totalRows}
				page={page}
				totalPages={totalPages}
				paginationMode="server"
			/>
		</Box>
	);
};

export default Logs;

export const getServerSideProps = withPageAuthRequired();
