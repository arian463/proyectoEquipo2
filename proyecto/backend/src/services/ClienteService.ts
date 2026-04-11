import ClienteModel from "@models/ClienteModel";

class ClienteService {
    static async getAllClientes() {
        try {
            const clientes = await ClienteModel.getAll();
            return clientes;
        } catch (error) {
            throw error;
        }
    }

    static async getClienteById(id: number) {
        try {
            const cliente = await ClienteModel.getById(id);
            if (!cliente) {
                throw new Error('Cliente no encontrado');
            }
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    static async createCliente(datos: {
        nombre: string;
        apellido: string;
        correo: string;
        telefono?: string;
        fecha_nacimiento?: string;
        notas?: string;
    }) {
        try {
            // Verificar si ya existe un cliente con ese correo
            const clienteExistente = await ClienteModel.getByEmail(datos.correo);
            if (clienteExistente) {
                throw new Error('Ya existe un cliente con este correo electrónico');
            }

            // Validar fecha de nacimiento si se proporciona
            if (datos.fecha_nacimiento) {
                const fechaNacimiento = new Date(datos.fecha_nacimiento);
                const hoy = new Date();
                const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

                if (edad < 0 || edad > 120) {
                    throw new Error('Fecha de nacimiento inválida');
                }
            }

            const cliente = await ClienteModel.create(datos);
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    static async updateCliente(id: number, datos: {
        nombre?: string;
        apellido?: string;
        correo?: string;
        telefono?: string;
        fecha_nacimiento?: string;
        notas?: string;
    }) {
        try {
            // Verificar que el cliente existe
            const clienteExistente = await ClienteModel.getById(id);
            if (!clienteExistente) {
                throw new Error('Cliente no encontrado');
            }

            // Si se está cambiando el correo, verificar que no exista otro cliente con ese correo
            if (datos.correo && datos.correo !== clienteExistente.correo) {
                const clienteConCorreo = await ClienteModel.getByEmail(datos.correo);
                if (clienteConCorreo) {
                    throw new Error('Ya existe otro cliente con este correo electrónico');
                }
            }

            // Validar fecha de nacimiento si se proporciona
            if (datos.fecha_nacimiento) {
                const fechaNacimiento = new Date(datos.fecha_nacimiento);
                const hoy = new Date();
                const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

                if (edad < 0 || edad > 120) {
                    throw new Error('Fecha de nacimiento inválida');
                }
            }

            const cliente = await ClienteModel.update(id, datos);
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCliente(id: number) {
        try {
            // Verificar que el cliente existe
            const cliente = await ClienteModel.getById(id);
            if (!cliente) {
                throw new Error('Cliente no encontrado');
            }

            // Aquí podríamos verificar si el cliente tiene citas pendientes
            // pero por simplicidad, permitimos la eliminación

            const clienteEliminado = await ClienteModel.delete(id);
            return clienteEliminado;
        } catch (error) {
            throw error;
        }
    }

    static async searchClientes(query: string) {
        try {
            if (!query || query.trim().length < 2) {
                throw new Error('La búsqueda debe tener al menos 2 caracteres');
            }

            const clientes = await ClienteModel.search(query.trim());
            return clientes;
        } catch (error) {
            throw error;
        }
    }
}

export default ClienteService;