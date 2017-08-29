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
                var displayReg = "";
                var regNum = {
                        numberPlate: req.body.regNum.toUpperCase()
                }
                // console.log(regNum);
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

        const filterAdd = function(req, res, next) {
                var loc = req.body.loc;
                console.log(loc);
                var showLoc = "";
                var locationData = {
                        loc: req.body.loc
                }

                models.Plates.find({
                        numberPlate: {
                                '$regex' : '.*' + loc
                        }
                }, function(err, place) {
                        if (err) {
                                return next(err);
                                // console.log(err);
                        } else {
                                // console.log(place);
                                res.render('regNumbers', {
                                        filter: place
                                })
                        }

                })


        }
        const resetRegs = function(req,res,next){
                models.Plates.remove({}, function(err) {
                                        if (err) {
                                                return next(err);
                                        }
                                        res.render('regNumbers');
                                })
        }

        return {
                index,
                added,
                filterAdd,
                resetRegs
        }
}
