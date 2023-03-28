const GET_ONE = `
    select id, name , price , images, bowls from food where category_id = $1 ORDER BY id ASC;
`
const GET_CATEGORY_BY_ID = `
    select * from category where id = $1;
`

const CREATE_FOOD = `
    insert into food (name,price , image , bowls, category_id) values ($1,$2,$3,$4, $5) RETURNING *
`
const UPDATE_FOOD = `
    update food set name = $1 , price = $2 , image = $3 , bowls = $4 , category_id = $5  where id = $6
`

const FIND_FOOD = `
    select * from food where id = $1
`

const DELETE_FOOD = `
    delete from food where id  = $1
`

module.exports = {
    GET_ONE,
    GET_CATEGORY_BY_ID,
    CREATE_FOOD,
    UPDATE_FOOD,
    FIND_FOOD,
    DELETE_FOOD
}

