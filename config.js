exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/jiu-jitsu' :
                            'mongodb://localhost/jiu-jitsu-dev');
                            exports.DATABASE_URL = 'mongodb://heroku_m7klh9np@ds115071.mlab.com:15071/heroku_m7klh9np';
exports.PORT = process.env.PORT || 8080;
