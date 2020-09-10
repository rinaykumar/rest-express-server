const request = require("supertest");
const app = require('../server/server.js');

describe("Default Route Should be failed code 404", () => {
  test("Default response should be 404", done => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === false);
        expect(data.errorCode === 404);
        done();
      });
  });

  test("random endpoint should be 404", done => {
    request(app)
      .get('/asd')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === false);
        expect(data.errorCode === 404);
        done();
      });
  });
});