import { test } from '@japa/runner'
test('8. Crear Pregunta', async ({client, assert}) => { 
    
    let body = {
        "question": "¿que dia es hoy?",
        "options": [ 
            {
                "opcion":"esta es correcta",
                "iscorrect":true
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            } ]
    }
    
    const response = await client.post('api/v1/questions/create').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})