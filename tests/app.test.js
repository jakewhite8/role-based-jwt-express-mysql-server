const request = require('supertest');
const app = require('../app.js');

describe('Test the root path', () => {
  test('It should response the GET method with a status of 200', async () => {
    const response = await request(app).get('/');
    // console.log(`response: ${JSON.stringify(response)}`);
    expect(response.statusCode).toBe(200);
  });
  test('It should response the GET method with a string', async () => {
    const response = await request(app).get('/');
    expect(response.text).toEqual('Server can serve data');
  });
});
