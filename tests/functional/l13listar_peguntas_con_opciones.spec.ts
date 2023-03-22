import {test} from '@japa/runner'


test('13. listar preguntas con sus opciones', async ({client, assert}) => { 
    
    const response = await client.get('api/v1/form/getquestions')
        
    response.assertStatus(200)
    assert.isObject(response.body())
})