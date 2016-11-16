/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {

  describe('handling a request with valid credentials in body', function() {
    var strategy = new Strategy(function(username, password, url, done) {
      if (username == 'johndoe' && password == 'secret' && url == 'http://localhost') {
        return done(null, { id: '1234' }, { scope: 'read' });
      }
      return done(null, false);
    });

    var user
      , info;

    before(function(done) {
      chai.passport(strategy)
        .success(function(u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.username = 'johndoe';
          req.body.password = 'secret';
          req.body.url = 'http://localhost';
        })
        .authenticate();
    });

    it('should supply user', function() {
      expect(user).to.be.an.object;
      expect(user.id).to.equal('1234');
    });

    it('should supply info', function() {
      expect(info).to.be.an.object;
      expect(info.scope).to.equal('read');
    });
  });

  describe('handling a request with valid credentials in query', function() {
    var strategy = new Strategy(function(username, password, url, done) {
      if (username == 'johndoe' && password == 'secret' &&  url == 'http://localhost') {
        return done(null, { id: '1234' }, { scope: 'read' });
      }
      return done(null, false);
    });

    var user
      , info;

    before(function(done) {
      chai.passport(strategy)
        .success(function(u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query.username = 'johndoe';
          req.query.password = 'secret';
          req.query.url = 'http://localhost';
        })
        .authenticate();
    });

    it('should supply user', function() {
      expect(user).to.be.an.object;
      expect(user.id).to.equal('1234');
    });

    it('should supply info', function() {
      expect(info).to.be.an.object;
      expect(info.scope).to.equal('read');
    });
  });

  describe('handling a request without a body', function() {
    var strategy = new Strategy(function(username, password, url, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an.object;
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });

  describe('handling a request without a body, but no username & password & url', function() {
    var strategy = new Strategy(function(username, password, url, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .req(function(req) {
          req.body = {};
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an.object;
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });

  describe('handling a request without a body, but no password', function() {
    var strategy = new Strategy(function(username, password, url, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.username = 'johndoe';
          req.body.url = 'http://localhost';
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an.object;
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });

  describe('handling a request without a body, but no username', function() {
    var strategy = new Strategy(function(username, password, url, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.password = 'secret';
          req.body.url = 'http://localhost';
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an.object;
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });

  describe('handling a request without a body, but no url', function() {
    var strategy = new Strategy(function(username, password, url, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.username = 'johndoe';
          req.body.password = 'secret';
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an.object;
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });

});
