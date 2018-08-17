exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from location where (code like ? or name like ?)";
        var params = "%" + req.query.term + "%"
        connection.query(sql, [params, params], (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        connection.query("select * from location where id=?", [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}

exports.create = (req, res, next) => {
    var { body } = req
    var post = {
        code: body.code,
        name: body.name,
    }

    req.getConnection(function (err, connection) {
        connection.query("select code from location where code=?", [post.code], function (err, results) {
            if (err) return next(err)

            //Check Duplicat Location Code
            if (results.length > 0) {
                res.send({ status: 201, message: 'Location Code is Duplicate' })
            } else {
                connection.query("insert into location set ? ", post, (err, results) => {
                    if (err) return next(err)
                    res.send(results)
                })
            }
        });
    });
}

exports.update = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        code: body.code,
        name: body.name,
    }

    req.getConnection(function (err, connection) {
        connection.query("select id, code from location where code=?", [post.code], function (err, results) {
            if (err) return next(err)

            var isUpdate = false;
            //Check Duplicat Location Code
            if (results.length > 0) {
                if (results[0].id !== id) {
                    res.send({ status: 201, message: 'Location Code is Duplicate' })
                } else {
                    isUpdate = true
                }
            } else {
                isUpdate = true
            }

            if (isUpdate) {
                connection.query("update location set ? where id=?", [post, id], function (err, results) {
                    if (err) return next(err)
                    res.send(results)
                });
            }
        });
    });
}

exports.delete = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        connection.query("delete from location where id=?", [id], (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}