import {test} from '@japa/runner'


test('4. listar documentos', async ({client, assert}) => { 
    
    const response = await client.get('configure/listarDocumentos')
        
    response.assertStatus(200)
    assert.isArray(response.body())
})