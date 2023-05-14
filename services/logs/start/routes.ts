import Route from '@ioc:Adonis/Core/Route';

Route.resource('logs', 'LogsController');

Route.resource('webhooks', 'DiscordWebhooksController');
