const { fetch , fetchAll } = require('../../lib/connectdb')
const path = require('path')
const { GET_ALL}  =require('./model')

class CategoryModel {
    async getAllCategory(){
        try{
            let category = await fetchAll(GET_ALL)
            return category
        }
        catch(e){
            throw new Error(e)
        }
    }

    
    
}

module.exports = new CategoryModel()