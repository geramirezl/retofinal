import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';

export default class AnswersController {
    public async updateAnswer({request}:HttpContextContract){
        const id = request.param('id');
        try {
            const answer= await Answer.findOrFail(id)
            const datos=request.all()
            answer.answer=datos.opcion
            answer.is_correct=datos.iscorrect

            await answer.save()
            return{"state":true,"message":"opcion Editada con exito"}
            
        } catch (error) {
            return{"state":false,"message":"Error al editar la opcion"}
            
        }



    }

    public async listAnswer({request}:HttpContextContract){
        const id = request.param('id');
        try {
            const answers= await Answer.query().where('question_id', id)
            const options= answers.map(ans => {
                return {
                  id: ans.id_answer,
                  option: ans.answer
                };
              });
                
            
            
            return{
                "state":true,
                "message":"Listado de opciones",
                "options":options
            }
        } catch (error) {
            return   {
                "state": false,
                "message": "Error al obtener el listado de opciones"
            }

        }
    }
}
