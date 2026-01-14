
// Servicio de IA desactivado según requerimiento del cliente.
// No se realizan llamadas a modelos generativos para mantener la simplicidad y fiabilidad tradicional.

export const getHealthAdvice = async (): Promise<string> => {
  return "Servicio de consulta automática no disponible. Por favor, contacte con nuestro farmacéutico físico.";
};

export const analyzePrescription = async (): Promise<string> => {
  return "El análisis automático de recetas ha sido desactivado. Por favor, traiga su receta física a la tienda.";
};
