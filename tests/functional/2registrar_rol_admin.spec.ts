import { test } from '@japa/runner'
test('2. Registrar rol Admin', async ({client, assert}) => { 
    
    let body = {"rol":"Administrador"}
    const response = await client.post('configure/registrarRoles').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})