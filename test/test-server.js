global.DATABASE_URL = 'mongodb://localhost/jiu-jitsu-test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var mongoose = require('mongoose');
var Video = require('../models/video');

var should = chai.should();
var app = server.app;


chai.use(chaiHttp);

describe('jiu-jitsu-test', function() {
    Video.collection.drop();
    
    before(function(done) {
        server.runServer(function() {
            done();
        });
    });
    
    it('should return HTML on GET', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
    
    it('should return 0 videos on GET', function(done) {
        chai.request(app)
            .get('/videos')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                console.log(res.body);
                should.equal(res.body.length, 0);
                done();
            });
    });
    
    it('should add video on POST', function(done) {
        chai.request(app)
            .post('/videos')
            .send({id: "UNr5uyJ5fKM",
                title: "Daily BJJ: No Gi Mount Basics + Armbar",
                channelTitle: "Carnage BJJ",
                thumbnail: "https://i.ytimg.com/vi/UNr5uyJ5fKM/mqdefault.jpg",
                description: "description text 1",
                tags: ['tag1', 'tag2', 'tag3']})
            .end(function(err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                // console.log(res.body);
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('channelTitle');
                res.body.should.have.property('thumbnail');
                res.body.should.have.property('description');
                done();
            });
    });
    
    it('should return 1 video on GET', function(done) {
        chai.request(app)
            .get('/videos')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                should.equal(res.body.length, 1);
                done();
            });
    });
    
    it('should edit the description on PUT', function(done) {
        chai.request(app)
            .put('/videos/UNr5uyJ5fKM/description')
            .send({ description: 'the test description'})
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.status(201);
                res.should.be.json;
                should.equal(res.body.updated, true);
                done();
            });
        
    });
    
    it('should delete video on DELETE', function(done) {
        chai.request(app)
            .delete('/videos/UNr5uyJ5fKM')
            .send({id: 'UNr5uyJ5fKM'})
            .end(function(err, res) {
                console.log(res.body);
                res.should.be.json;
                should.equal(res.body.ok, 1);
                should.equal(res.body.n, 1);
                done();
            });
    });
    
    it('should return 0 videos on GET after DELETE', function(done) {
        chai.request(app)
            .get('/videos')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                should.equal(res.body.length, 0);
                done();
            });
    });
});    

    
    /*
    Test Cases:

1. Create the basic server.
2. Test for the number of videos.
3. The video count should return 0.
4. Use the POST /new endpoint to create a new video.
5. The result should be positive (JSON Output, HTTP 200, Success Message, etc.)
6. Check the list of videos again.
7. Count should return 1.
8. Edit the video - description.
9. Test for the updated description.
10. Delete the vide0.
11. Count should be returning 0.
*/
 


