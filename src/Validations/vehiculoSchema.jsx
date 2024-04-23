import * as yup from "yup";

export const vehiculoSchema = yup.object().shape({
    kilometraje: yup.number().integer('El kilometraje debe ser un número entero').positive('El kilometraje debe ser un número positivo'),
    patente: yup.string().matches(/^([A-Z]{2,3}\d{3}[A-Z]{2})|([A-Z]{3}\d{3})$/, 'La patente debe ser del formato "ABC123" o "AB123CD"'),
    anio: yup.number()
    .required('El año del vehículo es requerido').min(1000, 'El año debe tener al menos 4 dígitos').max(9999, 'El año no puede tener más de 4 dígitos'),
    id_tipo_vehiculo: yup.number(),
    estado: yup.string().nullable()
});