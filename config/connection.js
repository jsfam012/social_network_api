const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.01:27017/social_network_db')

module.exports = mongoose.connection;