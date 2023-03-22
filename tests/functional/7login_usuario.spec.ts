import { test } from '@japa/runner'
test('7. Login estudiante', async ({client, assert}) => { 
    
    let body = {
        "email": "usertest@gmail.co",
        "password": "12345"
    }
    const response = await client.post('api/v1/user/login').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})