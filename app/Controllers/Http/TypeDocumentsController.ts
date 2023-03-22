import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeDocument from 'App/Models/TypeDocument';

export default class TypeDocumentsController {
    public async registrar({request}: HttpContextContract){
        const {tipo_documento} = request.all();
        const tipoDoc = new TypeDocument();
        tipoDoc.name = tipo_documento;
        tipoDoc.state=true
        await tipoDoc.save();
        return{tipoDoc, "msj": "Tipo Documento registrado"}
    }

    public async getListarDocumentos(): Promise<TypeDocument[]> {
        const tipoDoc = await TypeDocument.all();
        return tipoDoc;
    }
}
