const { startServer, stopServer } = require('../../lib/server.js');
const { request } = require('../scripts/helpers');
const generator = require('../scripts/generator');
const mock = require('../scripts/mock-core-registry');

describe('Metrics requests', () => {
    beforeEach(async () => {
        mock.mockAll();
        await startServer();
    });

    afterEach(async () => {
        await stopServer();
        mock.cleanAll();
    });

    test('should return data correctly', async () => {
        const event = await generator.createEvent({});
        await generator.createApplication({ user_id: 1, status: 'accepted' }, event);
        await generator.createApplication({ user_id: 2, status: 'accepted' }, event);
        await generator.createApplication({ user_id: 3, status: 'pending' }, event);


        const res = await request({
            uri: '/metrics',
            method: 'GET',
            json: false
        });

        expect(res.statusCode).toEqual(200);
    });
});