import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import User from './User'


export default class Form extends BaseModel {
  @column({ isPrimary: true }) public id_form: number
  @column() public id_user:number
  @column() public id_answer:number
  @column() public state:boolean

  @hasMany(() => User, {
    localKey: 'id_user',
    foreignKey: 'id_user',
  })
  public usuarioForm: HasMany<typeof User>

  @hasMany(() => Answer, {
    localKey: 'id_answer',
    foreignKey: 'id_answer',
  })
  public answerForm: HasMany<typeof Answer>

  @column.dateTime({ autoCreate: true }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
}
