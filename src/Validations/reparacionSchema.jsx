import * as yup from "yup";

export const reparacionSchema = yup.object().shape({
    fecha_desde: yup.date()
    .required('La fecha de inicio de la reparación es requerida'),
    fecha_hasta: yup.date().min(yup.ref('fecha_desde'), 'La fecha de fin de la reparación debe ser posterior a la fecha de inicio'),
    comentarios: yup.string().min(1, 'Los comentarios deben tener al menos 1 caracter').max(45, 'Los comentarios deben tener como máximo 45 caracteres'),
        patente: yup.string().matches(/^([A-Z]{2,3}\d{3}[A-Z]{2})|([A-Z]{3}\d{3})$/, 'Seleccione una patente'),

});