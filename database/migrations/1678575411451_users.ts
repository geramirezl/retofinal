import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_user').primary()
      table.string('first_name', 90).notNullable()
      table.string('second_name', 90).notNullable()
      table.string('surname_name', 90).notNullable()
      table.string('second_sur_name', 90).notNullable()
      table.integer('type_document').notNullable().references('id_doctype').inTable('type_documents')
      table.string('document_number').notNullable().unique()
      table.string('email',250).notNullable()
      table.string('password',255).notNullable()
      table.integer('rol_id').notNullable().references('id_roles').inTable('roles')
      table.string('phone',30).notNullable()
      table.boolean('state').notNullable()
      table.timestamps(true)//.defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
