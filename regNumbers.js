module.exports = function(models) {

        const added = function(req, res, next) {
                var regNum = {
                        numberPlate: req.body.regNum
                }
                console.log(regNum);

                models.Plates.create({
                        numberPlate: req.body.regNum
                }, function(err, results) {
                        if (err) {
                                return next(err)
                        }

                        if (!results) {
                                models.Plates.findOne({
                                        numberPlate: req.body.regNum
                                }, function(err, results) {

                                        if (err) {
                                                return next(err)
                                        }
                                        console.log(results);
                                        var data = {
                                                regNumbers: results.numberPlate
                                        }
                                        res.render('regNumbers', results)
                                })
                        }
                        else {
                                res.render('regNumbers')
                        }

                })
        }


        return {
                added
        }
}

