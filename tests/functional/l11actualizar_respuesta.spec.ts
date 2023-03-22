import { test } from '@japa/runner'
test('11. Actualizar respuesta', async ({client, assert}) => { 
    
    let body = {
        "opcion": "correcta",
        "iscorrect":true
     }
    
    const response = await client.put('api/v1/questions/updateAnswer/2').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})