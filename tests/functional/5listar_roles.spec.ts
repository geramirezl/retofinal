import {test} from '@japa/runner'


test('5. listar roles', async ({client, assert}) => { 
    
    const response = await client.get('configure/listarRoles')
        
    response.assertStatus(200)
    assert.isArray(response.body())
})