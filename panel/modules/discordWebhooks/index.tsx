import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import {
	DataGrid,
	GridColDef,
	GridFilterModel,
	GridSortItem,
	GridSortModel,
	GridToolbar,
} from '@mui/x-data-grid';
import { Query, Sort, Webhooks } from 'types/query';
import { determinComparator } from 'utils/dataTable';
import Modal from '@mui/material/Modal';
import { api } from 'features/api';
import DiscordWebhooksEdit from './edit';
import Button from '@mui/material/Button';

interface Props {
	items: any[];
	page: number;
	pageSize: number;
	totalRows: number;
	onFilterChange: (query: Query) => void;
	isLoading: boolean;
	availableActions: string[];
}

const DiscordWebhooks = ({
	items,
	page = 1,
	pageSize = 50,
	totalRows,
	onFilterChange,
	isLoading,
	availableActions,
}: Props) => {
	const [editWebhook, setEditWebhook] = React.useState<any>(null);
	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Nom',
			width: 300,
		},
		{
			field: 'url',
			headerName: 'URL',
			width: 200,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 200,
		},
		{
			field: 'fromId',
			headerName: 'De',
			width: 200,
		},
		{
			field: 'toId',
			headerName: 'A',
			width: 200,
		},
	];

	const [updateWebhook] = api.useUpdateWebhookMutation();
	const [deleteWebhook] = api.useDeleteWebhookMutation();
	const [addWebhook] = api.useAddWebhookMutation();

	return (
		<Box sx={{ height: '100%', width: '100%' }}>
			<Box display="flex" justifyContent="center" padding="1em">
				<Button
					variant="outlined"
					onClick={() => setEditWebhook({ name: '', url: '' })}
				>
					Ajouter un webhook
				</Button>
			</Box>
			<DataGrid
				initialState={{
					pagination: {
						paginationModel: { pageSize, page },
					},
				}}
				slots={{
					toolbar: GridToolbar,
				}}
				onRowClick={({ row }: { row: Webhooks }) => setEditWebhook(row)}
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
			<Modal
				open={!!editWebhook}
				onClose={() => setEditWebhook(null)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<DiscordWebhooksEdit
					availableActions={availableActions}
					discordWebhook={editWebhook}
					updateWebhook={webhook => {
						if (webhook.id) updateWebhook(webhook);
						else addWebhook(webhook);
						setEditWebhook(null);
					}}
					deleteWebhook={id => {
						deleteWebhook(id);
						setEditWebhook(null);
					}}
				/>
			</Modal>
		</Box>
	);
};

export default DiscordWebhooks;

export const getServerSideProps = withPageAuthRequired();
