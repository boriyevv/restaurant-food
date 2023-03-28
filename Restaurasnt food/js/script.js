let headerList = document.querySelector('.header-list')
let foodList = document.querySelector('.food-list')
let wrRight = document.querySelector('.wrapper-right')
let orderList = document.querySelector('.order-list')
let priceResult = document.querySelector('.price-result')
let select = document.querySelector('select')
let serachInput = document.querySelector('.header-inp')


let count = 1

async function menu() {
    let data = await fetch('http://localhost:5000/category')
    let parseData = await data.json()
    for (let i of parseData) {
        let li = document.createElement('li')
        li.setAttribute('class', 'header-item')
        li.textContent = i.name

        headerList.append(li)

        li.addEventListener('click', function () {
            count = i.id
            getFood(count)
        })
    }

}

menu()


let result = []

async function getFood(id = 1) {

    foodList.innerHTML = null

    let data = await fetch('http://localhost:5000/food/' + id)
    let parseData = await data.json()

    renderFood(parseData)
    return parseData




}

function renderFood (dataItem){
    foodList.innerHTML = null
    for (let i of dataItem) {
        let li = document.createElement('li')
        li.setAttribute('class', 'food-item')
        li.innerHTML = `
        <img class="food-img" width="132" height="132"
        src="http://localhost:5000/${i.images}">
        <div class="food-box">
        <h3 class="food-title ">${i.name}</h3>
        <p class="price">$ ${i.price}</p>
        <span class="food-desk">${i.bowls} bowls avialble</span>
        </div>
        `

        li.addEventListener('click', function () {
            wrRight.classList.add('wrapper-right-active')

            let find = result.findIndex(item => item.id == i.id)

            if (find >= 0) {
                result[find].count += 1
                // result[find].result += +i.price
            }
            else {
                result.push({ ...i, count: 1 })
            }

            orderRender(result)

            priceResult.textContent = result.reduce((a,b) => a + (b.price * b.count), 0)


        })

        foodList.append(li)

    }
}



function orderRender() {
    orderList.innerHTML = null

    for (let i of result) {
        let li = document.createElement('li')
        let div = document.createElement('div')
        let p = document.createElement('p')
        let btn = document.createElement('button')

        div.setAttribute('class', 'order-right')
        p.setAttribute('class', 'order-total-price')
        btn.setAttribute('class', 'order-remove')

        p.textContent = `${i.price * i.count}`
        btn.textContent = 'X'

        li.setAttribute('class', 'order-item d-flex jst')
        li.innerHTML = `
                    <div class="order-left  ">
                    <div class="order-wrapper jst row">
                    <div class="order-item-top row  ">
                    <img class="order-item-img"
                    src="http://localhost:5000/${i.images}"
                    width="30px" height="30px" alt="">
                    <div class="order-desk">
                    <h3 class="order-name">${i.name.slice(0, 25)} ...</h3>
                    <p class="order-price">$ ${i.price}</p>
                    </div>
                    </div>
                    <span class="order-count">${i.count}</span>
                    </div>
                    <input type="text" class="order-inp" placeholder="Please just a little bit spicy only">
                    </div>
                
                        `
        btn.addEventListener("click", function(){
            let index = result.findIndex(item=> item.id == i.id)
            if(result[index].count == 1){
                li.remove()
                result = result.filter(item=> item.id != i.id)
            }
            else{
                result[index].count -=1
            }
            orderRender()
            priceResult.textContent = result.reduce((a,b) => a + (b.price * b.count), 0)
            if(!result.length){
                wrRight.classList.remove('wrapper-right-active')
            }

        }
        )
        div.append(p, btn)
        li.append(div)
        orderList.append(li)
    }

}


getFood()


// getFood()
select.addEventListener('change', function(){
    getFood(count).then(item => {
        if(select.value == "higher"){
            let higherSort = item.sort((a,b) => b.price - a.price)
            foodList.innerHTML = null
            renderFood(higherSort)
        }
        else if(select.value == "lower"){
            let lowerSort = item.sort((a,b) => a.price - b.price)
            foodList.innerHTML = null
            renderFood(lowerSort)
        }
        else if(select.value == "default"){
            renderFood(item)
        }
    })
})

function serchFood(){

}
serachInput.addEventListener('input', function(){
    getFood(count).then(item => {
        let filteredFood = item.filter(e => e.name.toLowerCase().includes(serachInput.value.toLowerCase()))
        foodList.innerHTML = null
        renderFood(filteredFood)
    })
})


