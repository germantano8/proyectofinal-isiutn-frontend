import * as yup from "yup";

export const proyectoSchema = yup.object().shape({
    ubicacion: yup.string().required('La ubicación es requerida')
                    .min(3, 'La ubicación debe tener al menos 3 caracteres')
                    .max(45, 'La ubicación debe tener como máximo 45 caracteres'),
    nombre: yup.string().required('El nombre es requerido')
                .min(3, 'El nombre debe tener al menos 3 caracteres')
                .max(20, 'El nombre debe tener como máximo 20 caracteres'),
    fecha_inicio: yup.date()
                .required('La fecha de inicio del proyecto es requerida'),
    fecha_fin_estimada: yup.date().min(yup.ref('fecha_inicio'), 'La fecha de fin estimada del proyecto debe ser posterior a la fecha de inicio'),
    fecha_fin_real: yup.date().nullable().default(null).min(yup.ref('fecha_inicio'), 'La fecha de fin real del proyecto debe ser posterior a la fecha de inicio'),
    observaciones: yup.string().
                    min(1, 'Las observaciones deben tener al menos 1 caracteres').
                    max(45, 'Las observaciones deben tener como máximo 45 caracteres'),
})