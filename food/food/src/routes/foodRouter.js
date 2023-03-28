const Router = require('express')
const router = new Router()

const foodController = require('../controllers/foodController')
const { validateUpdateFood, validateCreateFood } = require('../middleware/validate')



router.get('/:id', foodController.findOneById)
// router.put('/:id' , validateUpdateFood , foodController.updateFood)
// router.post('/' ,validateCreateFood ,foodController.createFood)
// router.delete('/:foodId'  ,foodController.deleteFood)

module.exports = router
