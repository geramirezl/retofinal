import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';

export default class RolesController {
    public async registrar({request}: HttpContextContract){
        const {rol} = request.all();
        const tiporol = new Role();
        tiporol.name = rol;
        tiporol.state=true
        await tiporol.save();
        return{tiporol, "msj": "Tipo Rol registrado"}
    }

    public async getListarRoles(): Promise<Role[]> {
        const tiporol = await Role.all();
        return tiporol;
    }
}
