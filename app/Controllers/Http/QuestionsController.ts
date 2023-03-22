import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';


export default class QuestionsController {
    public async registrarPreguntaYRespuestas({request}: HttpContextContract){
        const {question,options} = request.all();
        
        const trx = await Database.transaction()

        try {
            const state = true;

            const newQuestion = await Question.create({question,state}, trx)

            
            for (const option of options) {
                await Answer.create({
                    answer:option.opcion,
                    question_id:newQuestion.id_question,
                    is_correct:option.iscorrect,
                    state:state

                },
                trx
                );

              }
            
            await trx.commit()
            return{"state":true, "message": "Pregunta creada exitosamente"}
            
            
        } catch (error) {
            await trx.rollback()
            return{"state":false,"message":"Error al crear la pregunta"}
        }
        
    }

    public async getListarPreguntas(){
        try {
            const questions = await Question.query().select('id_question', 'question')
          
      
            const formattedQuestions = questions.map(question => {
            return {
                id: question.id_question,
                question: question.question
            }
            })
        
            return {
            state: true,
            questions: formattedQuestions
            }
            
        } catch (error) {
            return {
                "state": false,
                "message": "Error al listar las preguntas"
                }
        }
        
      }

    public async delete ({request}: HttpContextContract){
        const questionId =request.param('id')

        const question = await Question.find(questionId)

        if(!question){
            return{"state":false,"message":"Error al eliminar la pregunta"}
        }
        const trx = await Database.transaction()

        try {
            
            await Answer.query(trx).delete().where('question_id',questionId);
            await Question.query(trx).delete().where('id_question',questionId);
            await trx.commit()
            return{"state":true,"message":"Pregunta Eliminada con exito"}
            
        } catch (error) {
            await trx.rollback();
            return{"state":false,"message":"Error al eliminar la pregunta"}
        }
    }

    public async updateQuestion({request}:HttpContextContract){
        const id = request.param('id');
        try {
            const question= await Question.findOrFail(id)
            const datos=request.all()
            question.question=datos.question

            await question.save()
            return{"state":true,"message":"Pregunta Editada con exito"}
            
        } catch (error) {
            return{"state":false,"message":"Error al editar la pregunta"}
            
        }



    }

    
}

