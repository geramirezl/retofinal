import { test } from '@japa/runner'
test('6. Crear un usuario estudiante', async ({client, assert}) => { 
    
    let body = {
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "12345678926",
        "email": "usertest@gmail.co",
        
        "password": "12345",
        "rol":2,
        "phone": "32123122314"
    
    }
    const response = await client.post('api/v1/user/create').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})