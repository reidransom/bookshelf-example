/* jshint node: true */

var Bookshelf = require('bookshelf'),
    fs        = require('fs'),
    db_file   = './mydb.sqlite'

Bookshelf.conn = Bookshelf.initialize({
    client: 'sqlite3',
    connection: {
        filename: './mydb.sqlite'
    }
})

function db_exists() {
    return fs.existsSync(db_file)
}

function insert_row () {
    Bookshelf.Customer = Bookshelf.conn.Model.extend({
      tableName: 'customers'
    });
    Bookshelf.Customer.forge({name: 'Reid Ransom'}).save().then(function (customer) {
        console.log('Created a customer: ' + customer.get('id'))
        select_row()
    });
}

function select_row () {
    Bookshelf.Customer.collection().fetchOne().then(function (collection) {
        console.log('Created a collection: ' + collection.get('name'))
        process.exit(0)
    })
}

function create_table (next) {
    Bookshelf.conn.knex.schema.createTable('customers', function (customer) {
        customer.string('name')
    }).then(next)
}

if (db_exists()) {
    insert_row()
}
else {
    create_table(insert_row)
}
