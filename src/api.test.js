import Supertest from 'supertest';
import Chai from 'chai';
import fs from 'fs'
import __dirname from './utils.js';

const expect = Chai.expect;
const requester = Supertest('http://localhost:8080');

describe('Users testing', () => {
    describe('GETS', () => {
        it('La petición base debe retornar 200', async () => {
            let response = await requester.get('/login')
            expect(response.status).to.be.equal(200)
        })
        it('La petición base debe retornar un arreglo de productos', async () => {
            const response = await requester.get('/verProductos');
            const { _body } = response;
            expect(_body.payload).to.be.an('array')
        })
    })
    describe('POSTS', () => {
        it('Debería poder crear un usuario', async(done) => {
            
            const response = await requester.post('/register').set('Content-Type','application/x-www-form-urlencoded')
            .field('name', 'jorge')
            .field('email', 'maxota@mail.com')
            .field('password', '1234')
            .field('address', 'siempreviva123')
            .field('age', '27')
            .field('phone', '123455')
            .attach('avatar', fs.readFileSync('src/public/img/celularsamsung.PNG'), 'celularsamsung.PNG');
            const { _body } = response;
            console.log(_body);
            expect(_body).to.include.keys('password', '_id')
            done()
        })
    })
})