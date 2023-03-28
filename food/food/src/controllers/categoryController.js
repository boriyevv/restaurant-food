const Category = require('../models/categoryModels')


class CategoryController {
    async getAll(req, res) {
        try {
            const category = await Category.getAllCategory()
            return res.status(200).json(category)
        }
        catch (e) {
            return res.status(404).json({ message: "Error" })
        }
    }

}

module.exports = new CategoryController()