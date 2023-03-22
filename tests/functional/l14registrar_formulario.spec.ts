import { test } from '@japa/runner'
test('14. Registrar formulario de estudiante y respuestas', async ({client, assert}) => { 
    
    let body = {
        "estudianteId": 1,
        "answers": [11, 2,3]
 }
    
    const response = await client.post('api/v1/form/postquestions').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})