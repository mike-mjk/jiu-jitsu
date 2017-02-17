var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;


chai.use(chaiHttp);

describe('root', function() {
    it('should return HTML on GET', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
    
});

// describe('Shopping List', function() {
//     it('should list items on GET', function(done) {
//         chai.request(app)
//             .get('/items')
//             .end(function(err, res) {
//                 res.should.have.status(200);
//                 done();
//             });
//     });