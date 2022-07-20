import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import * as chaiHttp from 'chai-http';
import { before } from 'mocha';

import User from '../database/models/users';

import { app } from '../app';
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Testando o endpoint /login', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .resolves({
        id: 2,
        username: "User",
        role: "user",
        email: "user@user.com",
      } as User)
  })

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Se o login for feito com sucesso, retorna status 200 e um token', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "user@user.com",
      "password": "secret_password"
    });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token')
  })

  it('Quando não tem o campo "email"', async () => {
    const response = await chai.request(app).post('/login').send({
      "password": "secret_password"
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.be.equal('All fields must be filled');
  })

  it('Quando não tem o campo "password"', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "user@user.com"
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.be.equal('All fields must be filled');
  })

});
