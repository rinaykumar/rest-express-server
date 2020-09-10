const request = require("supertest");
const app = require('../server/server.js');

describe("Inquire on a listing", () => {
  let id;
  test("Test inquire", done => {
    const testApp = request(app);
    testApp
      .post('/api/createListing')
      .send({
        description: 'This is my item for sale.',
        type: 'gymEquipment',
        price: 123,
        title: 'Gym equipment for sale.',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === true);
        expect(data.items.length === 1);
        expect(data.items[0].type === 'gymEquipment');
        expect(data.items[0].price === '123');
        expect(data.items[0].id.length === 8);
        id = data.items[0].id;
      })
      .then(() => testApp.post(`/api/makeInquiry?listingId=4`)
        .send({
          message: 'Hello I am interested',
        }))
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === false);
      })
      .then(() => testApp.post(`/api/makeInquiry?listingId=${id}`)
        .send({
          message: 'Hello I am interested',
        }))
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === true);
        expect(data.inquiries.length === 1);
        console.log(data);
        expect(data.inquiries[0].id.length === 8);
      })
      .then(() => testApp.get(`/api/getInquiries?listingId=${id}`))
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === true);
        console.log(data);
        expect(data.inquiries.length === 1);
      })
      .then(() => testApp.get('/api/getInquiries?listingId=6'))
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === true);
        console.log(data);
        expect(data.inquiries.length === 0);
        done();
      });
  });
});