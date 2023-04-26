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

const rows = [
	{
		id: 74894,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: null,
		action: 'connection',
		item: null,
		quantity: null,
		itemId: null,
		coords: null,
		message: null,
		createdAt: '2021-11-10T01:00:00.000Z',
	},
	{
		id: 48948,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: null,
		action: 'loadCharacter',
		item: null,
		quantity: null,
		itemId: null,
		coords: null,
		message: null,
		createdAt: '2021-11-10T01:00:30.000Z',
	},
	{
		id: 1,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',

			name: 'Roy Sanchez',
		},
		to: {
			id: 13655,
			sessionId: 1348,
			name: 'Aaron Patrol',
			steamName: 'Yaya',
			discordId: 765618429142568648,
			type: 'player',
		},
		action: 'transfer',
		item: 'argent sale',
		quantity: 5005,
		itemId: null,
		coords: null,
		message: '',
		createdAt: '2021-11-10T01:05:00.000Z',
	},
	{
		id: 2,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: null,
		action: 'crash',
		item: null,
		quantity: null,
		itemId: null,
		coords: null,
		message:
			'd3d11.dll!CContext::TID3D11DeviceContextSetShaderResources<1,4> (0x161)',
		createdAt: '2021-11-10T01:10:00.000Z',
	},
	{
		id: 7485994,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: null,
		action: 'connection',
		item: null,
		quantity: null,
		itemId: null,
		coords: null,
		message: null,
		createdAt: '2021-11-10T01:13:00.000Z',
	},
	{
		id: 489448,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: null,
		action: 'loadCharacter',
		item: null,
		quantity: null,
		itemId: null,
		coords: null,
		message: null,
		createdAt: '2021-11-10T01:13:32.000Z',
	},
	{
		id: 3,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: {
			id: 46,
			sessionId: null,
			name: 'Hen House',
			discordId: null,
			type: 'job',
		},
		action: 'startService',
		message: 'prise de service (Hen House)',
		createdAt: '2021-11-10T01:15:32.000Z',
	},
	{
		id: 4,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: {
			id: 46,
			sessionId: null,
			name: 'Hen House',
			discordId: null,
			type: 'job',
		},
		action: 'endService',
		message: 'fin de service (Hen House)',

		createdAt: '2021-11-10T02:25:32.000Z',
	},

	{
		id: 5,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: {
			id: null,
			sessionId: null,
			name: null,
			discordId: null,
			type: null,
		},
		action: 'startGofast',
		message: "Lancement d'une mission go-fast",
		createdAt: '2021-11-10T02:35:32.000Z',
	},
	{
		id: 6,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			name: 'Roy Sanchez',
		},
		to: {
			id: null,
			sessionId: null,
			name: null,
			discordId: null,
			type: null,
		},
		action: 'winGofast',
		quantity: 2454,
		item: 'argent sale',
		message: 'Gofast terminé, récompense de 2454$',
		createdAt: '2021-11-10T02:39:32.000Z',
	},

	{
		id: 7,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: {
			id: 13655,
			sessionId: 1348,
			steamName: 'Yaya',
			name: 'Aaron Patrol',
			discordId: 765618429142568648,
			type: 'player',
		},
		action: 'banPlayer',
		createdAt: '2021-11-10T03:43:32.000Z',
		message: 'Troll + double voc',
	},
	{
		id: 8,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: {
			id: 13655,
			sessionId: 1348,
			steamName: 'Yaya',
			name: 'Aaron Patrol',
			discordId: 765618429142568648,
			type: 'player',
		},
		action: 'unbanPlayer',
		createdAt: '2021-11-13T14:35:32.000Z',
		message: 'deban vu en bda',
	},
	{
		id: 9,
		from: {
			id: 153245,
			sessionId: 145,
			discordId: 835618429142171648,
			steamName: '_ZeAaron',
			name: 'Roy Sanchez',
		},
		to: {
			id: 37887,
			type: 'property',
		},
		coords:
			'{"x":-1379.609619140625,"y":-499.2943115234375,"z":32.16740203857422}',
		action: 'remove',
		createdAt: '2021-11-14T14:35:32.000Z',
		message: 'A supprimé la propriété 37887',
	},
];

const Logs = () => {
	console.log('ok');
	return (
		<Box sx={{ height: '100%', width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				experimentalFeatures={{ newEditingApi: true }}
				totalRows={rows.length}
			/>
		</Box>
	);
};

export default Logs;

export const getServerSideProps = withPageAuthRequired();
