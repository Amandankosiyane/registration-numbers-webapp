//create a factory function that is going to return an object literal
module.exports = function(models) {

        const index = function(req, res, next) {
                models.Plates.find({}, function(err, result) {
                        if (err) {
                                return next(err);
                        } else {
                                res.render('regNumbers', {
                                        result

                                });
                        }
                });
        }

        const added = function(req, res, next) {
                var regNum = req.body.regNum.toUpperCase()
                console.log(regNum);
                if (!regNum) {
                        req.flash('error', 'Please enter the registration number!');
                        res.render('regNumbers');
                } else {


                        models.Plates.findOne({
                                numberPlate: regNum
                        }, function(err, results) {
                                if (err) {
                                        return next(err)
                                } else

                                if (results) {
                                        req.flash("error", "Plate already exist!")
                                        res.redirect('/');
                                } else {
                                        models.Plates.create({
                                                numberPlate: regNum
                                        }, function(err, results) {

                                                if (err) {
                                                        return next(err)
                                                }

                                                models.Plates.find({}, function(err, carReg) {
                                                        if (err) {
                                                                return next(err)
                                                        }
                                                        var data = {
                                                                regNumbers: carReg
                                                        }
                                                        res.render('regNumbers', data)
                                                })

                                        })
                                }
                        })
                }
        }


        const filterAdd = function(req, res, next) {
                var loc = req.body.loc;
                models.Plates.find({
                        numberPlate: {
                                '$regex': '.*' + loc
                        }
                }, function(err, place) {
                        if (err) {
                                return next(err);

                        } else {

                                res.render('regNumbers', {
                                        filter: place
                                })
                        }

                })


        }
        const resetRegs = function(req, res, next) {
                models.Plates.remove({}, function(err) {
                        if (err) {
                                return next(err);
                        }
                        res.render('regNumbers');
                })
        }
        const showRegs = function(req, res, next) {
                models.Plates.find({}, function(err, regPlate) {
                        if (err) {
                                return next(err)
                        }
                        res.render('regNumbers', {
                                show: regPlate
                        })

                })
        }

        return {
                index,
                added,
                filterAdd,
                resetRegs,
                showRegs
        }
}
