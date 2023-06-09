import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import TypeDocument from './TypeDocument'
import Role from './Role'

export default class User extends BaseModel {

  @column({ isPrimary: true }) public id_user: number
  @column() public first_name:string
  @column() public second_name: string
  @column() public surname_name: string
  @column() public second_sur_name: string
  @column() public type_document: number
  @column() public document_number: string
  @column() public email: string
  @column() public password: string
  @column() public rol_id: number
  @column() public phone: string
  @column() public state: boolean
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime

  @hasMany(() => Role, {
    localKey: 'rol_id',
    foreignKey: 'id_roles',
  })
  public perfilUsuario: HasMany<typeof Role>

  @hasMany(() => TypeDocument, {
    localKey: 'type_document',
    foreignKey: 'id_doctype',
  })
  public documentoUsuario: HasMany<typeof TypeDocument>
}
