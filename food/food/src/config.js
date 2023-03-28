const pgConfig = {
	host: 'localhost',
	port: 5432,
	user:'postgres',
	password: '010203',
	database: 'bookdars'
}


const options = {
	definition:{
		openapi:'3.0.0',
		info:{
			title:'Node js api Food',
			version:'1.0.0'
		},
		servers:[
			{
				url:'http://localhost:5000/'
			}
		]
	},
	apis:['./routes']
}

module.exports = {
    pgConfig,
	options
}