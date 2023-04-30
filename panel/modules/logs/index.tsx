import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import {
	DataGrid,
	GridColDef,
	GridFilterModel,
	GridRenderCellParams,
	GridSortItem,
	GridSortModel,
	GridToolbar,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import { Query, Sort } from 'types/query';
import { determinComparator } from 'utils/dataTable';
import Typography from '@mui/material/Typography';

interface Props {
	items: any[];
	page: number;
	pageSize: number;
	totalRows: number;
	onFilterChange: (query: Query) => void;
	isLoading: boolean;
	filterData?: { [key: string]: string[] };
	columns?: string[];
}

const Logs = ({
	items,
	page = 1,
	pageSize = 50,
	totalRows,
	onFilterChange,
	isLoading,
	filterData,
	columns: extraColumns = [],
}: Props) => {
	const columns: GridColDef[] = [
		{
			field: 'createdAt',
			headerName: 'Date',
			width: 150,
			type: 'dateTime',
			valueGetter: (params: GridValueGetterParams) =>
				new Date(params.row.createdAt),
		},
		{
			field: 'from.id',
			headerName: 'De',
			width: 200,
			valueGetter: (params: GridValueGetterParams) =>
				`(${params.row.from.id}) ${params.row.from.name}`,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 200,
			type: 'singleSelect',
			valueOptions: (filterData?.action || []).map((action: string) => ({
				label: action,
				value: action,
			})),
			valueFormatter: ({ value }) => `${value}`,
		},
		{
			field: 'to.id',
			headerName: 'A',
			width: 200,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row?.to?.id ? `(${params.row?.to?.id})` : ''} ${
					params.row?.to?.type ? `${params.row?.to?.type} - ` : ''
				} ${params.row?.to?.name || ''} `,
		},
		{
			field: 'quantity',
			headerName: 'Qté',
			type: 'number',
			width: 70,
		},
		{
			field: 'item.id',
			headerName: 'item ID',
			type: 'string',
			width: 70,
			hideable: true,
		},
		{
			field: 'item.name',
			headerName: 'Item',
			width: 150,
			type: 'singleSelect',
			valueOptions: (filterData?.item || []).map((item: string) => ({
				label: item,
				value: item,
			})),
			renderCell: (params: GridRenderCellParams) => (
				<Typography>{`${params.row?.item?.name || ''} ${
					params.row?.item?.id || ''
				}`}</Typography>
			),
		},
		{
			field: 'message',
			headerName: 'Message',
			width: 500,
			resizable: true,
		},
		...extraColumns.map(col => ({
			field: col,
			headerName: col,
			width: 150,
			resizable: true,
		})),
	];

	return (
		<Box sx={{ height: '100%', width: '100%' }}>
			<DataGrid
				initialState={{
					pagination: {
						paginationModel: { pageSize, page },
					},
					columns: {
						columnVisibilityModel: {
							...Object.fromEntries(extraColumns.map(col => [col, false])),
							'item.id': false,
						},
					},
				}}
				slots={{
					toolbar: GridToolbar,
				}}
				localeText={{
					toolbarFilters: 'Filtres',
					toolbarFiltersLabel: 'Filtres',
					filterOperatorContains: 'contient',
					filterOperatorEquals: 'égale à',
					filterOperatorStartsWith: 'commence par',
					filterOperatorEndsWith: 'terminer par',
					filterOperatorIs: 'est',
					filterOperatorNot: "n'est pas",
					filterOperatorAfter: 'est après',
					filterOperatorOnOrAfter: 'est le ou après',
					filterOperatorBefore: 'est avant',
					filterOperatorOnOrBefore: 'est le ou avant',
					filterOperatorIsEmpty: 'est vide',
					filterOperatorIsNotEmpty: "n'est pas vide",
					filterOperatorIsAnyOf: "est l'un des",
					filterPanelAddFilter: 'ajouter un filtre',
					filterPanelDeleteIconLabel: 'supprimer',
					filterPanelLogicOperator: 'operateur logique',
					filterPanelOperator: 'opérateur',
					filterPanelOperatorAnd: 'et',
					filterPanelOperatorOr: 'ou',
					filterPanelColumns: 'colonnes',
					filterPanelInputLabel: 'valeur',
					filterPanelInputPlaceholder: 'valeur du filtre',
					toolbarColumns: 'Colonnes',
					toolbarColumnsLabel: 'Colonnes',
					toolbarDensity: 'Densité',
					columnsPanelTextFieldLabel: 'Rechercher une colonne',
					columnsPanelTextFieldPlaceholder: 'Titre de la colonne',
					columnsPanelDragIconLabel: 'Réorganiser la colonne',
					columnsPanelHideAllButton: 'Masquer tout',
					columnsPanelShowAllButton: 'Afficher tout',
				}}
				paginationMode="server"
				sortingMode="server"
				filterMode="server"
				rows={items}
				columns={columns}
				rowCount={totalRows}
				pageSizeOptions={[25, 50, 100]}
				loading={isLoading}
				onPaginationModelChange={model =>
					onFilterChange({ ...model, page: model.page + 1 })
				}
				onSortModelChange={(sortModel: GridSortModel) =>
					onFilterChange({
						sort: sortModel.reduce(
							(acc: Sort, curr: GridSortItem) => ({
								...acc,
								[curr.field]: curr.sort,
							}),
							{},
						),
					})
				}
				onFilterModelChange={(filterModel: GridFilterModel) => {
					onFilterChange({
						filter: {
							[`$${filterModel.logicOperator}`]: filterModel.items.map(
								filter => ({
									[filter.field]: determinComparator(
										filter.operator!,
										filter.value,
									),
								}),
							),
						},
					});
				}}
			/>
		</Box>
	);
};

export default Logs;

export const getServerSideProps = withPageAuthRequired();
