import * as yup from "yup";

export const loginSchema = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido')
                .min(3, 'El nombre debe tener al menos 3 caracteres')
                .max(20, 'El nombre debe tener como máximo 20 caracteres'),
    password: yup.string().required('La contraseña es requerida')
                .min(3, 'La contraseña debe tener al menos 3 caracteres')
                .max(20, 'La contraseña debe tener como máximo 20 caracteres'),
})