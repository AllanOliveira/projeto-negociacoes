var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade')
];

document.querySelector('.form').addEventListener('submit',function(event){
    
    event.preventDefault();

    var linha = document.createElement('tr');
    campos.forEach(function(campo){
        var coluna = document.createElement('td');
        coluna.textContent = campo.value;
        linha.appendChild(coluna);
    });

    var tdVolume =  document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    linha.appendChild(tdVolume);

    document.querySelector('table tbody').appendChild(linha);

    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    campos[0].focus();
});