//Hook Para formatear patentes
export const formatPatente = (patente: string) => {
    const patenteArray = patente.split('');
    const patenteFormated = `${patenteArray[0]}${patenteArray[1]}-${patenteArray[2]}${patenteArray[3]}-${patenteArray[4]}${patenteArray[5]}`;
    return patenteFormated;
}
