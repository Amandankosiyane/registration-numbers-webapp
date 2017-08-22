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
                        numberPlate: req.body.regNum
                }
                console.log(regNum);
                if (regNum === undefined) {
                        req.flash('error', 'Please enter the registration number!');
                        res.render('regNumbers');
                }

                models.Plates.create({
                        numberPlate: req.body.regNum
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
                        }
                        else {
                                res.render('regNumbers')
                        }

                })
        }


        return {
                index,
                added
        }
}
