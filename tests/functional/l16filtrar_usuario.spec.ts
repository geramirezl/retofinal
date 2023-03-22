import { test } from '@japa/runner'
test('16. Busqueda usuarios por filtros', async ({client, assert}) => { 
    
    let body = {
        "perPage": 2,
        "page": 1,
         "filter": {
            "name": ""
        }
    }
    const response = await client.post('api/v1/user/getUsers').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})