import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import * as chaiHttp from 'chai-http';
import { before } from 'mocha';

import Matches from '../database/models/matches';

import { app } from '../app';
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Testando o endpoint /matches', () => {
  before(() => {
    sinon.stub(Matches, 'findAll')
      .resolves([
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: false,
          teamHome: { teamName: "São Paulo" },
          teamAway: {
            teamName: "Grêmio"
          }
        },
        {
          id: 2,
          homeTeam: 9,
          homeTeamGoals: 1,
          awayTeam: 14,
          awayTeamGoals: 1,
          inProgress: false,
          teamHome: {
            teamName: "Internacional"
          },
          teamAway: {
            teamName: "Santos"
          }
        }] as any[])
  })

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Ao fazer um GET na rota /matches, retorna todos as partidas', async () => {
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: { teamName: "São Paulo" },
        teamAway: {
          teamName: "Grêmio"
        }
      },
      {
        id: 2,
        homeTeam: 9,
        homeTeamGoals: 1,
        awayTeam: 14,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: "Internacional"
        },
        teamAway: {
          teamName: "Santos"
        }
      }]);
  })
});

  // describe('', () => {
  //   before(() => {
  //     sinon.stub(Matches, 'create')
  //       .resolves({
  //         id: 1,
  //         homeTeam: 16,
  //         homeTeamGoals: 2,
  //         awayTeam: 8,
  //         awayTeamGoals: 2,
  //         inProgress: true,
  //       } as Matches)
  //   })
  
  //   after(() => {
  //     (Matches.create as sinon.SinonStub).restore();
  //   })

  //   it('Ao fazer um POST na rota /matches é possível salvar uma partida', async () => {
  //     const response = await chai.request(app).post('/matches').send({
  //       "homeTeam": 16,
  //       "awayTeam": 8,
  //       "homeTeamGoals": 2,
  //       "awayTeamGoals": 2
  //     });
  
  //     expect(response.status).to.be.equal(201);
  //     expect(response.body).to.be.eql({
  //       id: 1,
  //       homeTeam: 16,
  //       homeTeamGoals: 2,
  //       awayTeam: 8,
  //       awayTeamGoals: 2,
  //       inProgress: true,
  //     });
  //   })
  // });

describe('Testando o endpoint /matches/:id/finish', () => {
  before(() => {
    sinon.stub(Matches, 'update')
      .resolves({ message: 'Finished' } as any)
  })

  after(() => {
    (Matches.update as sinon.SinonStub).restore();
  })

  it('Ao fazer um PATCH na rota /matches/1/finish, é possivel alterar "inProgress" para "false"', async () => {
    const response = await chai.request(app).patch('/matches/1/finish').send({ id: 1 });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ message: 'Finished' });
  })
})

describe('Testando o endpoint /matches/:id', () => {
  before(() => {
    sinon.stub(Matches, 'update')
      .resolves({
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 5,
        "awayTeam": 8,
        "awayTeamGoals": 5,
        "inProgress": false
      } as any)
  })

  after(() => {
    (Matches.update as sinon.SinonStub).restore();
  })

  it('Ao fazer um PATCH na rota /matches/:id, é possiveil alterar o resultado de uma partida', async () => {
    const response = await chai.request(app).patch('/matches/1').send({
      "homeTeamGoals": 5,
      "awayTeamGoals": 5
    });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 5,
      "awayTeam": 8,
      "awayTeamGoals": 5,
      "inProgress": false
    });
  })
})