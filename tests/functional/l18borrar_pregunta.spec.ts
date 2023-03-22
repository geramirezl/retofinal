import { test } from '@japa/runner'
test('18.Borrar pregunta', async ({client, assert}) => { 
  
    const response = await client.delete('api/v1/questions/deleteQuestion/1')
        
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})