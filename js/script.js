// precios de las guitarras por tipo y marca
const precios = {
    acustica: {
        fender: 300,
        martin: 250,
        taylor: 400
    },
    electrica: {
        gibson: 800,
        fender: 700,
        ibanez: 600
    },
    clasica: {
        yamaha: 200,
        cordoba: 150,
        alhambra: 180
    }
};

// calculo del costo total
function calcularCostoTotal(tipo, marca, cantidad) {
    const precioUnitario = precios[tipo][marca];
    const costoTotal = precioUnitario * cantidad;
    return costoTotal;
}

// funcion para el descuento
function aplicarDescuento(costoTotal, cantidad) {
    let descuento = 0;
    if (cantidad >= 5) {
        descuento = 0.1 * costoTotal; // 10% de descuento si compra 5 o más guitarras
    }
    return {
        costoTotal: costoTotal,
        descuento: descuento,
        costoFinal: costoTotal - descuento
    };
}

// mostrar marcas disponibles segun el tipo de guitarra
function obtenerMarcasDisponibles(tipo) {
    return Object.keys(precios[tipo]);
}

// ingresar cantidad y tipo de guitarra
let cantidad = parseInt(prompt("Ingrese la cantidad de guitarras que desea comprar:"));
let tipo = prompt("Ingrese el tipo de guitarra que desea comprar (acustica, electrica o clasica):");


let marcasDisponibles = obtenerMarcasDisponibles(tipo);


let marca = prompt(`Ingrese la marca de la guitarra que desea comprar (${marcasDisponibles.join(', ')}):`);

// calculo del costo total, el descuento y el costo final
let { costoTotal, descuento, costoFinal } = aplicarDescuento(calcularCostoTotal(tipo, marca, cantidad), cantidad);


let mensaje = `El costo total de la compra es $${costoTotal}.`;
if (descuento > 0) {
    mensaje += ` Pero con el descuento aplicado el costo final es $${costoFinal}.`;
}

// mostrar el resultado final al usuario
alert(mensaje);
