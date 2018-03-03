'use strict';

const { expect } = require('chai');
const sinon = require('sinon');
const request = require('super-request');

const userModel = require('../../models/user');
const server = require('../server');

describe('GET', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should login user with valid credentials', async () => {
    const expected = {
      isAuthorized: true,
      uid: 1,
    };
    const users = [{
      password: '$2a$10$IbfPoCGdLLHh1hyQ9b9UROuNJeyTzk5VMVDf5504mcTJsHfugyaJG',
      uid: 1,
    }];
    const username = 'demo';
    const password = 'demo';
    const getUsers = sandbox.stub(userModel, 'getUsers').returns(users);
    await request(server)
      .post('/account/login')
      .form({ username, password })
      .expect(200)
      .expect(expected)
      .end();

    expect(getUsers).to.be.calledOnce;
  });

  it('should not allow login user with invalid credentials', async () => {
    const expected = {
      isAuthorized: false,
      uid: 1,
    };
    const users = [{
      password: '$2a$10$IbfPoCGdLLHh1hyQ9b9UROuNJeyTzk5VMVDf5504mcTJsHfugyaJG',
      uid: 1,
    }];
    const username = 'demo';
    const password = 'd';
    const getUsers = sandbox.stub(userModel, 'getUsers').returns(users);
    await request(server)
      .post('/account/login')
      .form({ username, password })
      .expect(200)
      .expect(expected)
      .end();

    expect(getUsers).to.be.calledOnce;
  });
});