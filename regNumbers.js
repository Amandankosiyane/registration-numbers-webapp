//create a factory function that is going to return an object literal
module.exports = function(models) {

        const index = function(req, res, next) {
                models.Plates.find({}, function(err, result) {
                        if (err) {
                                return next(err);
                        }
                        res.render('regNumbers', {
                                result
                        });
                });
        }

        const added = function(req, res, next) {
                var regNum = {
                        numberPlate: req.body.regNum.toUpperCase()
                }
                console.log(regNum);
                if (regNum === undefined) {
                        req.flash('error', 'Please enter the registration number!');
                        res.render('regNumbers');
                }

                models.Plates.create({
                        numberPlate: req.body.regNum.toUpperCase()
                }, function(err, results) {
                        if (err) {
                                return next(err)
                        }

                        if (results) {
                                models.Plates.find({}, function(err, results) {

                                        if (err) {
                                                return next(err)
                                        }
                                        var data = {
                                                regNumbers: results
                                        }
                                        res.render('regNumbers', data)
                                })
                        } else {
                                res.render('regNumbers')
                        }

                })
        }

const filterAdd = function(req,res,next){
var loc = req.body.loc;
var showLoc = "";
var regNum = {
        numberPlate: req.body.regNum
}

if (!regNum) {
        req.flash('error', 'Please select a location');
        req.render('regNumbers');
}
models.Plate.find({}, function(err, filterResults){
        if (err) {
return next(err)
        }
})

}

        return {
                index,
                added,
                filterAdd
        }
}
