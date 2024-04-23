import * as yup from "yup";

export const serviceSchema = yup.object().shape({
    fecha: yup.date()
    .required('La fecha es requerida'),
    comentarios_ingreso: yup.string().max(45, 'Los comentarios deben tener como máximo 45 caracteres'),
    comentarios_salida: yup.string().max(45, 'Los comentarios deben tener como máximo 45 caracteres'),
    patente: yup.string().matches(/^([A-Z]{2,3}\d{3}[A-Z]{2})|([A-Z]{3}\d{3})$/, 'Seleccione una patente')

});