const { fetch, fetchAll } = require('../../lib/connectdb')
const path = require('path')
const fs = require('fs')
const { GET_ONE, GET_CATEGORY_BY_ID, CREATE_FOOD, UPDATE_FOOD, FIND_FOOD, DELETE_FOOD } = require('./model')
const { v4 } = require('uuid')
class FoodModel {
    async getOneByCategory({ id }) {
        try {
            let catId = await fetch(GET_CATEGORY_BY_ID, id)
            if (!catId) {
                return { error: true, message: 'Category not found' }
            }
            let food = await fetchAll(GET_ONE, id)
            return { error: false, message: food }
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async createFood({ food_img }, { name, price, bowls, category_id }) {

        let catId = await fetch(GET_CATEGORY_BY_ID, category_id)
        if (!catId) {
            return { error: true, message: 'Category not found' }
        }
        let foodName = v4() + '.' + food_img.name.replace(/\s/g, " ").split('.')[1]
        let book = await fetchAll(CREATE_FOOD, name, price, foodName, bowls, category_id)
        food_img.mv(path.join(process.cwd(), 'src', "static", foodName), (err) => {
            if (err) {
                console.log(err)
            }
        })
        return { error: false, message: book }
    }


    async updateFood({ food_img }, { name, price, bowls, category_id }, { id }) {

        let findFood = await fetch(FIND_FOOD, id)
        let foodName = v4() + '.' + food_img.name.replace(/\s/g, " ").split('.')[1]
        let book = await fetchAll(UPDATE_FOOD, name, price, foodName, bowls, category_id, id)
        food_img.mv(path.join(process.cwd(), 'src', "static", foodName), (err) => {
            if (err) {
                console.log(err)
            }
        })
        return { error: false, message: 'ok' }
    }


    async deleteFood({ foodId }) {
        let findFood = await fetch(FIND_FOOD, foodId)
        if (!findFood) {
            return { error: true, message: 'Food not found' }
        }
        let food = await fetchAll(DELETE_FOOD, foodId)
        return { error: false, message: 'deleted' }
    }
}

module.exports = new FoodModel()