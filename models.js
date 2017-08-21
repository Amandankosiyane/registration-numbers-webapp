const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
        mongoose.connect(mongoUrl);
        const Plates = mongoose.model('Plates', {
                numberPlate: String
        });

        return{
                Plates
        }
}
