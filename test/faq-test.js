import * as chaiModule from "chai";
import { expect } from 'chai';

import chaiHttp from "chai-http";
import { app } from '../index.js';
import '../config/db.js';

const chai = chaiModule.use(chaiHttp);

process.env.NODE_ENV = 'test'


const request = chai.request.execute;  

describe('FAQ API Tests', function () {
  // Fetch FAQs (GET /api/faqs)
  it('should GET all FAQs', function (done) {
    request(app)  
      .get('/api/faqs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Fetch FAQs in Hindi (GET /api/faqs?lang=hi)
  it('should GET FAQs in Hindi', function (done) {
    request(app)
      .get('/api/faqs?lang=hi')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        if (res.body.length > 0) {
          expect(res.body[0]).to.have.property('question');
          expect(res.body[0]).to.have.property('answer');
        }
        done();
      });
  });

  // Create a new FAQ (POST /api/faqs)
  it('should POST a new FAQ', function (done) {
    const faq = { question: 'What is Mocha?', answer: 'A testing framework for Node.js' };

    request(app)
      .post('/api/faqs')
      .send(faq)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('question').equal(faq.question);
        expect(res.body).to.have.property('answer').equal(faq.answer);
        done();
      });
  });

  // Delete an FAQ (DELETE /api/faqs/:id)
  it('should DELETE an FAQ', function (done) {
    const sampleId = '679e276e21f1c6b9a12668a8'; // Replace with actual ID

    request(app)
      .delete(`/api/faqs/${sampleId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('FAQ deleted');
        done();
      });
  });
});
