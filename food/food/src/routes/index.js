const Router = require('express')
const router = new Router()

const foodRouter = require('./foodRouter')
const categoryRouter = require('./categoryRouter')
const swaggerRouter = require('./swagger')


router.use('/food' , foodRouter)
router.use('/category' , categoryRouter)

router.use('/api-docs' , swaggerRouter)


module.exports = router