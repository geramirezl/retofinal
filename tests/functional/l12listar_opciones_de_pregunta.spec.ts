import {test} from '@japa/runner'


test('12. listar opciones de pregunta', async ({client, assert}) => { 
    
    const response = await client.get('api/v1/questions/getOptions/1')
        
    response.assertStatus(200)
    assert.isObject(response.body())
})