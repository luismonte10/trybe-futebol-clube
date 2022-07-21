import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import * as chaiHttp from 'chai-http';

import { app } from '../app';
import { expect } from 'chai';
import Teams from '../database/models/teams';

chai.use(chaiHttp);

describe('Testando o endpoint /teams', () => {
  before(() => {
    sinon.stub(Teams, 'findAll')
      .resolves([
        {
          id: 1,
          teamName: 'Flamengo',
        },
        {
          id: 2,
          teamName: 'Flamengo-PI',
        }
      ] as Teams[])
  })


    after(() => {
      (Teams.findAll as sinon.SinonStub).restore();
    });
  it('Ao fazer um GET na rota /teams, retorna todos os times', async () => {  
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([
      {
        id: 1,
        teamName: 'Flamengo',
      },
      {
        id: 2,
        teamName: 'Flamengo-PI',
      }
    ] );
  })
});

describe('Testando o endpoint /teams/:id', () => {
  before(() => {
    sinon.stub(Teams, 'findByPk')
      .resolves({ id: 1, teamName: 'Flamengo' } as Teams)
  })

  after(() => {
    (Teams.findByPk as sinon.SinonStub).restore();
  })

  it('Ao fazer um GET na rota /teams/:id, retorna o time especifico', async () => {
    const response = await chai.request(app).get('/teams/:id');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ id: 1, teamName: 'Flamengo' });
  })
});
