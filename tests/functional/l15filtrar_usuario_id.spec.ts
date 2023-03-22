import {test} from '@japa/runner'


test('15. Filtrar usuario por id', async ({client, assert}) => { 
    
    const response = await client.get('api/v1/user/getUser/1')
        
    response.assertStatus(200)
    assert.isObject(response.body())
})