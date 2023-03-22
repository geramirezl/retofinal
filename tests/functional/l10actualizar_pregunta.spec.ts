import { test } from '@japa/runner'
test('10. Actualizar pregunta', async ({client, assert}) => { 
    
    let body = {
        "question": "¿que dia es mañana?"
    }
    const response = await client.put('api/v1/questions/updateQuestion/3').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})