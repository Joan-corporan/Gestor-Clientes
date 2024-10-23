


export function useValidations(){

    const validarEmail = (email) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      };
      const validarNombre = (nombre) => {
        const regex = /^[a-zA-Zñ��áéíóúÁÉÍÓ��\s]+$/;
        return regex.test(nombre);
      };
    
      const validarSucursal = (sucursal) => {
        const regex = /^[0-9]+$/;
        return regex.test(sucursal);
      };
      const validarTelefono = (telefono) => {
        const regex = /^(\+56)?9[0-9]{8}$/;
        return regex.test(telefono);
      };
      const validarFechaDesde = (fecha) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(fecha);
      };
    
      const validarFechaHasta = (fecha) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(fecha);
      };
      const validarRangoFechas = (fechaDesde, fechaHasta) => {
        return new Date(fechaDesde) <= new Date(fechaHasta);
      };
    return{
validarEmail,
validarFechaDesde,
validarFechaHasta,
validarRangoFechas,
 validarNombre,
 validarSucursal,
 validarTelefono
    }
}