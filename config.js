exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/jiu-jitsu' :
                            'mongodb://localhost/jiu-jitsu-dev');
exports.PORT = process.env.PORT || 8080;