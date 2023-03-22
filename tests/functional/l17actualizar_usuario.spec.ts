import { test } from '@japa/runner'
test('17. Actualizar usuario', async ({client, assert}) => { 
    
    let body = {
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "2345678930",
        "email": "danielc388@gmail.co",
        "phone": "32123122314"
    }
    const response = await client.put('api/v1/user/updateUser/6').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})