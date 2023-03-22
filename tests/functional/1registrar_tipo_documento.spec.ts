import { test } from '@japa/runner'
test('1. Registrar tipo Documento', async ({client, assert}) => { 
    
    let body = {
        "tipo_documento":"cedula"}
    const response = await client.post('configure/registrarDocumentos').json(body)
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})