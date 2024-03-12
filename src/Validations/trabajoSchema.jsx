import * as yup from "yup";

export const trabajoSchema = yup.object().shape({
    // {
    //     "fecha_desde":"2024-03-12",
    //     "fecha_hasta": "2024-03-15",
    //     "kilometraje":100,
    //     "patente":"A083XOA",
    //     "id_proyecto":7,
    //     "dni_conductor":"28531742",
    //     "cuit_cliente":"30500530852"
    // }

    fecha_desde: yup.date()
    .required('La fecha de inicio del trabajo es requerida')
    .min(new Date(), 'La fecha de inicio del trabajo debe ser posterior a la fecha actual'),
    fecha_hasta: yup.date().required('La fecha de fin del trabajo es requerida').min(yup.ref('fecha_desde'), 'La fecha de fin del trabajo debe ser posterior a la fecha de inicio'),
    kilometraje: yup.number().integer().required('El kilometraje es requerido').positive('El kilometraje debe ser un número positivo'),
    patente: yup.string().required('La patente es requerida').matches(/^[A-Z0-9]{7}$/, 'La patente debe tener 7 caracteres alfanuméricos'),
    id_proyecto: yup.number().required('El id de proyecto es requerido').positive('El id de proyecto debe ser un número positivo'),
    dni_conductor: yup.string().required('El dni del conductor es requerido').matches(/^[0-9]{8}$/, 'El dni del conductor debe tener 8 dígitos'),
    cuit_cliente: yup.string().required('El cuit del cliente es requerido').matches(/^[0-9]{11}$/, 'El cuit del cliente debe tener 11 dígitos'),
});