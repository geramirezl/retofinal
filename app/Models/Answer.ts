import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id_answer: number
  @column() public answer:string
  @column() public is_correct:boolean
  @column() public question_id:number
  @column() public state:boolean

  @hasMany(() => Question, {
    localKey: 'question_id',
    foreignKey: 'id_question',
  })
  public questiontoAnswer: HasMany<typeof Question>

  @column.dateTime({ autoCreate: true }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
}
