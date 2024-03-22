import * as yup from "yup";

export const trabajoSchema = yup.object().shape({
    fecha_desde: yup.date()
    .required('La fecha de inicio del trabajo es requerida')
    .min(new Date(), 'La fecha de inicio del trabajo debe ser posterior a la fecha actual'),
    fecha_hasta: yup.date().min(yup.ref('fecha_desde'), 'La fecha de fin del trabajo debe ser posterior a la fecha de inicio'),
    kilometraje: yup.number().integer('El kilometraje debe ser un número entero').positive('El kilometraje debe ser un número positivo'),
    patente: yup.string().matches(/^[A-Z0-9]{6,7}$/, 'La patente debe tener 7 caracteres alfanuméricos'),
    id_proyecto: yup.number().required('El id de proyecto es requerido').positive('El id de proyecto debe ser un número positivo'),
    dni_conductor: yup.string().nullable().matches(/^[0-9]{8}$/, 'El dni del conductor debe tener 8 dígitos'),
    cuit_cliente: yup.string().nullable().matches(/^[0-9]{11}$/, 'El cuit del cliente debe tener 11 dígitos'),
});