'use strict';

const fs = require('fs');
const request = require('supertest');
const expect = require('expect');

const UploadController = require('./../controllers/uploads');
const {app} = require('./../../../server/index');

// module.exports = (app) => {
//   describe('POST /images', () => {
//     it('should save a new jpg image in webp format', (done) => {
//       let file = fs.readFileSync('public/blog.jpg');
//       let x_test = "name";
//
//       request(app)
//         .post('/images')
//         .send(`images=${file}`)
//         .set('x-test', x_test)
//         .expect(200)
//         .expect(res => {
//           expect(res.body.data).toBe(`${x_test}`);
//         })
//         .end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//         })
//     });
//   })
// };


describe('POST /images', () => {
  it('should save a new jpg image in webp format', (done) => {
    let file = fs.readFileSync('public/blog.jpg');
    let x_test = "name";

    request(app)
      .post('/images')
      .send(`images=${file}`)
      .set('x-test', x_test)
      .expect(200)
      .expect(res => {
        expect(res.body.data).toBe(`${x_test}`);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done(res);
      })
  });
});
