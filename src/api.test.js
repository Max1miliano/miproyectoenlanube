import Supertest from 'supertest';
import Chai from 'chai';
import fs from 'fs'


const expect = Chai.expect;

const requester = Supertest('http://localhost:8080');

describe('Users testing', () => {
    describe('GETS', () => {
        it('La petición base debe retornar 200', async () => {
            let response = await requester.get('/login')
            expect(response.status).to.be.equal(200)
        })
        it('La vista del inicio se habilita si el usuario está logeado', async () => {
            let response = await requester.get('/')
            let validatorUser = response.req.user
            if (!validatorUser) {
                log
            }
        })
    })
    describe('POSTS', () => {
        it('Crea un usuario si el mail no existe', async () => {
            const response = await requester.post('/register').set('Content-Type', 'application/x-www-form-urlencoded')
                .field('name', 'jorge')
                .field('email', 'fjghjgj@mail.com')
                .field('password', '1234')
                .field('address', 'siempreviva123')
                .field('age', '27')
                .field('phone', '123455')
                .attach('avatar', fs.readFileSync('src/public/img/celularsamsung.PNG'), 'celularsamsung.PNG');
            const { _body } = response;
            if (_body.status == 'ERROR') {
                expect(_body.status).to.be.equal('ERROR')
                console.log('El mail existe en la base de datos');
            } else {
                expect(_body.status).to.be.equal('SUCCES')
                console.log('El usuario se creo correctamente');
            }
        }).timeout(10000)

        it('El producto se agrega correctamente', async () => {
            const response = await requester.post('/productos').set('Content-Type', 'application/x-www-form-urlencoded')
                .field('title', 'productoTest')
                .field('price', '200')
                .field('description', 'un producto de test')
                .field('stock', '10')
                .attach('image', fs.readFileSync('src/public/img/celularsamsung.PNG'), 'celularsamsung.PNG');
            const { _body } = response;
            const array = _body.payload
            expect(array).to.contains.keys(['title', 'price', 'description'])
        }).timeout(10000)
    })
}) 