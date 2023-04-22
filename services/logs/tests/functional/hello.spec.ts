import { test } from '@japa/runner';

test('display root endpoint', async ({ client }) => {
	const response = await client.get('/');

	response.assertStatus(404);
});
