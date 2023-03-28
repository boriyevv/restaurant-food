const Food = require('../models/foodModels')


class FoodController {
    async findOneById(req, res) {
        try {
            const food = await Food.getOneByCategory(req.params)
            if (food.error) {
                return res.status(404).json({ error: food.message })
            }

            return res.status(200).json(food.message)

        }
        catch (e) {
            return res.status(404).json({ message: e })
        }
    }

    async createFood(req, res) {
        try {
            if (req.files == null) {
                return res.status(404).json({ error: 'Image not found' })
            }
            const food = await Food.createFood(req.files, req.body)
            if (food.error) {
                return res.status(404).json({ error: food.message })
            }
            return res.status(200).json({ message: food.message[0] })
        }
        catch (e) {
            console.log(e)
            return res.status(404).json({ message: 'Error' })
        }
    }


    async updateFood(req, res) {
        try {
            if (req.files == null) {
                return res.status(404).json({ error: 'Image not found' })
            }
            const food = await Food.updateFood(req.files, req.body, req.params)
            if (food.error) {
                return res.status(404).json({ error: 'error ok' })
            }
            return res.status(200).json({ message: 'ok' })
        }
        catch (e) {
            console.log(e)
            return res.status(404).json({ message: 'Error' })
        }
    }

    async deleteFood(req, res) {
        try {
            const food = await Food.deleteFood(req.params)
            if (food.error) {
                return res.status(404).json({ error: food.message })
            }
            return res.status(200).json({ message: food.message })
        }
        catch (e) {
            console.log(e)
            return res.status(404).json({ message: 'Error' })
        }
    }
}

module.exports = new FoodController()