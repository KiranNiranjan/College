var mongoose = require('mongoose');

mongoose.connect('mongodb://kike:kiranleo16@ds053954.mongolab.com:53954/kike');

mongoose.export = mongoose.connection;