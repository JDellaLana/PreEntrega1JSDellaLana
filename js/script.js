// marcas de guitarras
function obtenerMarcasDisponibles(tipoSeleccionado) {
    const marcas = {
        acustica: ['fender', 'martin', 'taylor'],
        electrica: ['gibson', 'fender', 'ibanez'],
        clasica: ['yamaha', 'cordoba', 'alhambra']
    };
    
    return marcas[tipoSeleccionado] || [];
}

// actualiza las opciones de marcas en el formulario
function actualizarOpcionesMarca() {
    const tipoSelect = document.getElementById('tipoSelect');
    const marcaSelect = document.getElementById('marcaSelect');
    const tipoSeleccionado = tipoSelect.value;
    const marcasDisponibles = obtenerMarcasDisponibles(tipoSeleccionado);

    // limpia opciones anteriores
    marcaSelect.innerHTML = '';

    // agrega nuevas
    marcasDisponibles.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        marcaSelect.appendChild(option);
    });
}


document.getElementById('tipoSelect').addEventListener('change', actualizarOpcionesMarca);

// funcion para calcular el costo de la compra
function calcularCostoTotal(tipo, marca, cantidad) {
    const precios = {
        acustica: { fender: 300, martin: 250, taylor: 400 },
        electrica: { gibson: 800, fender: 700, ibanez: 600 },
        clasica: { yamaha: 200, cordoba: 150, alhambra: 180 }
    };
    
    return precios[tipo][marca] * cantidad || 0;
}

// funcion para aplicar el descuento
function aplicarDescuento(costoTotal, cantidad) {
    const descuento = cantidad >= 5 ? 0.1 : 0;
    const costoFinal = costoTotal * (1 - descuento);
    return { costoTotal: costoFinal, descuento: descuento };
}


document.getElementById('guitarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const cantidad = parseInt(document.getElementById('cantidadInput').value);
    const tipo = document.getElementById('tipoSelect').value;
    const marca = document.getElementById('marcaSelect').value;

    // calcular costo total y descuento
    const costoTotal = calcularCostoTotal(tipo, marca, cantidad);
    const { costoTotal: costoFinal, descuento } = aplicarDescuento(costoTotal, cantidad);

    // mostrar resultado
    let mensaje = `El costo total de la compra es $${costoTotal}.`;
    if (descuento > 0) {
        mensaje += ` Pero con el descuento aplicado el costo final es $${costoFinal}.`;
    }
    alert(mensaje);
});

