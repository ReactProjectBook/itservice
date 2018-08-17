const moment = require('moment')

exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)

        var repair = req.query.repair
        sqlWhere = (repair === '1') ? " where work.status < 2" : ''
        sql = `SELECT work.id, work.status,
        work.doc_date, work.doc_time, work.detail,
        location.name as location_name FROM work 
        INNER JOIN location ON work.location_id = location.id ${sqlWhere} 
        order by work.doc_date desc, work.doc_time desc`
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        connection.query("select * from work where id=?", [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}

exports.create = (req, res, next) => {
    var { body } = req
    var post = {
        doc_date: moment().format('YYYY-MM-DD'),
        doc_time: moment().format('HH:mm'),
        location_id: body.location_id,
        detail: body.detail,
        phone: body.phone,
        status: 0,
        user_id: req.user.id,
    }

    req.getConnection(function (err, connection) {
        connection.query("insert into work set ? ", post, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.update = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        location_id: body.location_id,
        detail: body.detail,
        phone: body.phone,
    }

    req.getConnection(function (err, connection) {
        connection.query("update work set ? where id=?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.updateRepair = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        status: body.status,
        status_date: moment().format('YYYY-MM-DD'),
        status_time: moment().format('HH:mm'),
        work_detail: body.work_detail,
        work_user_id: req.user.id,
    }

    req.getConnection(function (err, connection) {
        connection.query("update work set ? where id=?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.delete = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        connection.query("delete from work where id=?", [id], (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}