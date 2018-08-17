const passport = require('passport')
const passportService = require('./service/passport')

const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

const users = require('./controllers/Users')
const locations = require('./controllers/Locations')
const works = require('./controllers/Works')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send({ message: 'itService' })
    })

    app.post('/signin', requireSignin, users.signin)

    app.get('/users', requireAuth, users.findAll)
    app.post('/users', requireAuth, users.create)
    app.get('/users/:id', requireAuth, users.findById)
    app.put('/users/:id', requireAuth, users.update)
    app.delete('/users/:id', requireAuth, users.delete)

    app.get('/locations', requireAuth, locations.findAll)
    app.post('/locations', requireAuth, locations.create)
    app.get('/locations/:id', requireAuth, locations.findById)
    app.put('/locations/:id', requireAuth, locations.update)
    app.delete('/locations/:id', requireAuth, locations.delete)

    app.get('/works', requireAuth, works.findAll)
    app.post('/works', requireAuth, works.create)
    app.get('/works/:id', requireAuth, works.findById)
    app.put('/works/:id', requireAuth, works.update)
    app.put('/works/:id/repair', requireAuth, works.updateRepair)
    app.delete('/works/:id', requireAuth, works.delete)
}