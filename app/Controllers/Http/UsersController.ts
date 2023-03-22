

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User';
import Role from 'App/Models/Role';
const bcryptjs = require('bcryptjs')

export default class UsersController {
    public async registrar({request}: HttpContextContract){
        const {firstName,secondName,surname,secondSurName,typeDocument,documentNumber,email,password,rol,phone} = request.all();
        try {
            const salt = bcryptjs.genSaltSync();
            const usuario = new User();
            usuario.first_name = firstName;
            usuario.second_name = secondName;
            usuario.surname_name = surname;
            usuario.second_sur_name = secondSurName;
            usuario.type_document = typeDocument;
            usuario.document_number = documentNumber;
            usuario.email = email;
            usuario.password = bcryptjs.hashSync( password, salt );
            usuario.rol_id=rol;
            usuario.phone = phone;
            usuario.state=true;

            await usuario.save();
            return{ "state":true,
                     "message": "Estudiante creado correctamente"}
            
        } catch (error) {
            return{ "state":false,
                "message":"Fallo en la creación del estudiante"}
        }
        
      }

      public async login({request}: HttpContextContract){
        const email = request.input('email');
        const password = request.input('password');
        try {
          //consultar si existe usuario con ese correo
          const user = await User.findBy('email', email)
          if(!user){
            return{ "state":false,
                "message":"contraseña o email invalido"}
          }
    
          const validPassword = bcryptjs.compareSync( password, user.password );
          if ( !validPassword ) {
            return{ "state":false,
                "message":"contraseña o email invalido"}
          }
          //Validar si la contraseña ingresada es igual a la del usaurio
          const rol = await Role.findBy('id_roles',user.rol_id)
          /* const payload ={
            'name': user.first_name +" "+ user.second_name+" "+user.surname_name+" "+user.second_sur_name,
            'id': user.id_user,
            'document_number': user.document_number,
            'rol':rol?.name
          }*/
          
          //const token:string = this.generarToken(payload);
    
          return{ "state":true,
                "id":user.id_user,
                "name":user.first_name +" "+ user.second_name+" "+user.surname_name+" "+user.second_sur_name,
                "role":rol?.name,
                "message":"Ingreso exitoso"
            }
        } catch (error) {
            return{ "state":false,
            "message":"contraseña o email invalido"}
        }
      }
    
      public generarToken(payload: any):string{
        const opciones = {
          expiresIn: "5 mins"
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)    
      }
    
      public verificarToken(authorizationHeader:string){
        let token = authorizationHeader.split(' ')[1]
        token = jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error)=>{
            if(error){
                throw new Error("Token expirado");
                
            }
        })
        return true
      }
      
      public obtenerPayload (authorizationHeader:string) {
        let token = authorizationHeader.split(' ')[1]
        const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {complete: true}).payload
        console.log(payload)
        return payload
      }

      public async getUserbyID({request}: HttpContextContract){
        const id = request.param('id');
        try {
            const user = await User.findBy('id_user',id);
            if(!user){
                return{"state":false,"message":"Error al consultar el detalle del usuario"}
            }
            else{
                return {
                    "firstName": user.first_name,
                    "secondName": user.second_name,
                    "surname": user.surname_name,
                    "secondSurName": user.second_sur_name,
                    "typeDocument":user.type_document,
                    "documentNumber": user.document_number,
                    "email": user.email,
                    "phone": user.phone
                };

            }
            
            
        } catch (error) {
            return{"state":false,"message":"Error al consultar el detalle del usuario"}
        }
        
      }
      
      
      public async getUsers({request}: HttpContextContract){

        const req= request.only([
          'perPage','page','filter'
        ])
       try {
            let query = User.query()
          
            if(req.filter && req.filter.name){
              query = query.where('first_name', 'LIKE', `%${req.filter.name}%`)
            }
              
            const usersPaginated = await query.paginate(req.page, req.perPage)
            const users = usersPaginated.all().map((user) => ({
              firstName: user.first_name,
              secondName: user.second_name,
              surname: user.surname_name,
              secondSurName: user.second_sur_name,
              typeDocument: user.type_document,
              documentNumber: user.document_number,
              email: user.email,
              phone: user.phone,
          }));
          return {
              state: true,
              message: 'Listado de estudiantes',
              users: users
          };
        
       } catch (error) {
        return {
          state: false,
          message: 'Fallo en el listado de estudiantes'
      };
       }
       
      }

      public async update({request}:HttpContextContract){
        
        const id = request.param('id');
        try {
          const user = await User.findOrFail(id)
          const datos = request.all();
        
          user.first_name=datos.firstName;
          user.second_name=datos.secondName;
          user.surname_name=datos.surname;
          user.second_sur_name=datos.secondSurName;
          user.document_number=datos.documentNumber;
          user.email=datos.email;
          user.phone=datos.phone;


          await user.save()
        
          return{
            "state": true,
            "message": "Se actualizo correctamente"
          };
        
        } catch (error) {
          return {
            "state": false,
            "message": "Error al actualizar"
          };
        
        }
        
      
    }
      
}
