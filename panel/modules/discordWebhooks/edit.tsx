import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { Webhooks } from 'types/query';

interface Props {
	discordWebhook: Webhooks;
	updateWebhook: (discordWebhook: Webhooks) => void;
	deleteWebhook: (id: string) => void;
	availableActions: string[];
}

const DiscordWebhooksEdit = ({
	discordWebhook,
	availableActions = [],
	updateWebhook,
	deleteWebhook,
}: Props) => {
	const [webhook, setWebhook] = React.useState<Webhooks>(discordWebhook);
	console.log(webhook, webhook.action);

	return (
		<Box
			sx={{
				position: 'absolute' as 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 400,
				bgcolor: 'background.paper',
				border: '2px solid #000',
				boxShadow: 24,
				p: 4,
			}}
		>
			<Typography
				id="modal-modal-title"
				variant="h6"
				component="h2"
				marginBottom="2em"
			>
				Mise à jour du webhook
			</Typography>

			<Box display="flex" flexDirection="column" gap="2em">
				<TextField
					id="outlined-basic"
					label="Nom"
					value={webhook.name}
					onChange={e =>
						setWebhook((wh: any) => ({ ...wh, name: e.target.value }))
					}
				/>
				<TextField
					id="outlined-basic"
					label="URL (séparé par des ;)"
					value={webhook.url}
					onChange={e =>
						setWebhook((wh: any) => ({ ...wh, url: e.target.value }))
					}
					multiline
					rows={4}
					sx={{ fontSize: '12px' }}
				/>
				{availableActions && (
					<TextField
						select
						label="Action"
						value={webhook.action}
						SelectProps={{
							native: true,
						}}
						onChange={e =>
							setWebhook((wh: any) => ({ ...wh, action: e.target.value }))
						}
						defaultValue="connection"
					>
						{availableActions.map((action: string) => (
							<option key={action} value={action}>
								{action}
							</option>
						))}
					</TextField>
				)}
				<Box display="flex" gap="10px">
					<TextField
						id="outlined-basic"
						label="De (id)"
						value={webhook.fromId}
						onChange={e =>
							setWebhook((wh: any) => ({ ...wh, fromId: e.target.value }))
						}
					/>
					<TextField
						id="outlined-basic"
						label="A (id)"
						value={webhook.toId}
						onChange={e =>
							setWebhook((wh: any) => ({ ...wh, toId: e.target.value }))
						}
					/>
				</Box>
				<Box display="flex" gap="10px" justifyContent="space-between">
					<Button
						variant="outlined"
						color="error"
						onClick={() => deleteWebhook(discordWebhook.id)}
					>
						Supprimer
					</Button>
					<Button
						variant="contained"
						color="success"
						onClick={() => updateWebhook({ ...discordWebhook, ...webhook })}
					>
						Sauvegarder
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default DiscordWebhooksEdit;

export const getServerSideProps = withPageAuthRequired();
