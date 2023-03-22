import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypeDocuments extends BaseSchema {
  protected tableName = 'type_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_doctype').primary()
      table.string('name',90).notNullable()
      table.boolean('state').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
