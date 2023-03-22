import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Form from 'App/Models/Form';
import Question from 'App/Models/Question';

export default class FormsController {
    public async getListarPreguntasyRespuestas() {
        const preguntas = await Question.all();
        let response:{
            state:boolean,
            questions:{
                question:string,
                id:number,
                options:{id: number, option: string }[]}[]

        } = {
            state: false,
            questions: []
          };
        
        for(let i = 0; i < preguntas.length; i++){
            let pregunta: {
                question: string;
                id: number;
                options: { id: number, option: string }[];
              }
              ={
                "question":preguntas[i].question,
                "id":preguntas[i].id_question,
                "options":[]
                
            }
            const pregId= preguntas[i].id_question
            
            const answers =await Answer.query().where("question_id",pregId);
            for(let j=0; j< answers.length;j++){
                
                let answer={
                  "id":  answers[j].id_answer,
                  "option": answers[j].answer
                }
                pregunta.options.push(answer)
            }
            response.state=true
            response.questions.push(pregunta)
            
        }
        return response;
    }
    
    public async registrar({request}: HttpContextContract){
        const {estudianteId,answers} = request.all();
        try {
            for(let i = 0; i < answers.length; i++){
                const formato = new Form();
                
                formato.id_user=estudianteId;
                formato.id_answer=answers[i];
                formato.state=true
                
                await formato.save();
                return{"state":true,
                     "message": "Respuestas almacenadas con exito"}
            }
            
            
            
        } catch (error) {
            
            return{
                "state": false,
                "message": "No se pudieron almacenar las respuestas"

            }
           
        }
       
    }
}
