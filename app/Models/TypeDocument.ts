import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TypeDocument extends BaseModel {
  @column({ isPrimary: true }) public id_doctype: number

  @column() public name: string
  
  @column() public state:boolean

  @column.dateTime({ autoCreate: true }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
}
