function obtenerMarcasDisponibles(tipoSeleccionado) {
    const marcas = {
        acustica: ['fender', 'martin', 'taylor'],
        electrica: ['gibson', 'fender', 'ibanez'],
        clasica: ['yamaha', 'cordoba', 'alhambra']
    };
    
    return marcas[tipoSeleccionado] || [];
}


function actualizarOpcionesMarca() {
    const tipoSelect = document.getElementById('tipoSelect');
    const marcaSelect = document.getElementById('marcaSelect');
    const tipoSeleccionado = tipoSelect.value;
    const marcasDisponibles = obtenerMarcasDisponibles(tipoSeleccionado);

    // limpiar opciones anteriores
    marcaSelect.innerHTML = '';

    // nuevas opciones
    marcasDisponibles.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        marcaSelect.appendChild(option);
    });
}

// calculo del costo de la compra
function calcularCostoTotal(tipo, marca, cantidad) {
    const precios = {
        acustica: { fender: 300, martin: 250, taylor: 400 },
        electrica: { gibson: 800, fender: 700, ibanez: 600 },
        clasica: { yamaha: 200, cordoba: 150, alhambra: 180 }
    };
    
    return precios[tipo][marca] * cantidad || 0;
}

// aplicar el descuento
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

    // calculo costo total y descuento
    const costoTotal = calcularCostoTotal(tipo, marca, cantidad);
    const { costoTotal: costoFinal, descuento } = aplicarDescuento(costoTotal, cantidad);


    const resultadoContainer = document.getElementById('resultadoContainer');
    resultadoContainer.innerHTML = `
        <p>El costo total de la compra es $${costoTotal}.</p>
        ${descuento > 0 ? `<p>Con el descuento aplicado, el costo final es $${costoFinal}.</p>` : ''}
    `;

    // local storage
    localStorage.setItem('ultimaCompra', JSON.stringify({ tipo, marca, cantidad, costoTotal, descuento }));
});


window.addEventListener('load', actualizarOpcionesMarca);


window.addEventListener('load', function() {
    const ultimaCompra = localStorage.getItem('ultimaCompra');
    if (ultimaCompra) {
        const { tipo, marca, cantidad, costoTotal, descuento } = JSON.parse(ultimaCompra);
        const resultadoContainer = document.getElementById('resultadoContainer');
        resultadoContainer.innerHTML = `
            <p>Última compra:</p>
            <p>Tipo: ${tipo}</p>
            <p>Marca: ${marca}</p>
            <p>Cantidad: ${cantidad}</p>
            <p>Costo total: $${costoTotal}</p>
            ${descuento > 0 ? `<p>Descuento aplicado: ${descuento * 100}%</p>` : ''}
        `;
    }
});

document.getElementById('tipoSelect').addEventListener('change', actualizarOpcionesMarca);



