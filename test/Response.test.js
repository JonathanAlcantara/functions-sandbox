const expect = require('chai').expect;
const Response = require('../lib/Response');

describe('Response', () => {
  describe('create a response successfully', () => {
    let res;
    let codeResponse;

    before((done) => {
      const callback = (err, responseData) => {
        codeResponse = responseData;
        done();
      };
      res = new Response({ callback });
      res.send({ result: 'ok' });
    });

    it('should sends the response with default status of 200', () => {
      expect(codeResponse.body).to.be.eql({ result: 'ok' });
      expect(codeResponse.status).to.be.eql(200);
    });

    it('should sends an empty header object when none is defined', () => {
      expect(codeResponse.headers).to.be.eql({});
    });
  });

  describe('create a response with created status code (201)', () => {
    let res;
    let codeResponse;

    before((done) => {
      const callback = (err, responseData) => {
        codeResponse = responseData;
        done();
      };
      res = new Response({ callback });
      res.status(201).send({ content: { name: 'foobar' } });
    });

    it('should sends the response with status of 201', () => {
      expect(codeResponse.body).to.be.eql({ content: { name: 'foobar' } });
      expect(codeResponse.status).to.be.eql(201);
    });
  });

  describe('set headers to be send as response', () => {
    let res;
    let codeResponse;

    before((done) => {
      const callback = (err, responseData) => {
        codeResponse = responseData;
        done();
      };
      res = new Response({ callback });
      res.set('X-FOO', 'bar');
      res.send({ result: 'ok' });
    });

    it('should sends the response with default status of 200', () => {
      expect(codeResponse.body).to.be.eql({ result: 'ok' });
      expect(codeResponse.status).to.be.eql(200);
    });

    it('should sends the response with the correct header set', () => {
      expect(codeResponse.headers['X-FOO']).to.be.eql('bar');
    });
  });

  describe('chain headers to send as response', () => {
    let res;
    let codeResponse;

    before((done) => {
      const callback = (err, responseData) => {
        codeResponse = responseData;
        done();
      };
      res = new Response({ callback });
      res.set('X-FOO', 'bar').set('X-BAR', 'baz');
      res.send({ result: 'ok' });
    });

    it('should sends the response with default status of 200', () => {
      expect(codeResponse.body).to.be.eql({ result: 'ok' });
      expect(codeResponse.status).to.be.eql(200);
    });

    it('should sends the response with the correct header set', () => {
      expect(codeResponse.headers['X-FOO']).to.be.eql('bar');
      expect(codeResponse.headers['X-BAR']).to.be.eql('baz');
    });
  });
});
