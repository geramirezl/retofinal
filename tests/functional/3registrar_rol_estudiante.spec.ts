import { test } from '@japa/runner'
test('3. Registrar rol Estudiante', async ({client, assert}) => { 
    
    let body = {"rol":"Estudiante"}
    const response = await client.post('configure/registrarRoles').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})