import * as yup from "yup";

export const clienteSchema = yup.object().shape({
    cuit: yup.string().required('El cuit es requerido').matches(/^[0-9]{11}$/, 'El cuit debe tener 11 dígitos'),
    razon_social: yup.string().required('La razón social es requerida')
    .trim()
    .min(1, 'La razón social debe tener al menos 1 de longitud')
    .max(45, 'La razón social debe tener como máximo 45 de longitud'),
});