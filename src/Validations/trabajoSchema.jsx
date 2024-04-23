import * as yup from "yup";

export const trabajoSchema = yup.object().shape({
    fecha_desde: yup.date()
    .required('La fecha de inicio del trabajo es requerida'),
    fecha_hasta: yup.date().min(yup.ref('fecha_desde'), 'La fecha de fin del trabajo debe ser posterior a la fecha de inicio'),
    kilometraje: yup.number().integer('El kilometraje debe ser un número entero').positive('El kilometraje debe ser un número positivo'),
    patente: yup.string().matches(/^[A-Z0-9]{6,7}$/, 'La patente debe tener 7 caracteres alfanuméricos'),
    id_proyecto: yup.number().nullable(),
    dni_conductor: yup.string().nullable().matches(/^[0-9]{8}$/, 'El dni del conductor debe tener 8 dígitos'),
    cuit_cliente: yup.string().nullable(),
});