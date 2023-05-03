function obten() {
    let primero = parseInt(prompt("Ingresa el primer número entre 1 y 50:"));
    let segundo = parseInt(prompt("Ingresa el segundo número entre 1 y 50:"));
    pares=[];
    impares=[];
    if (primero >= 1 && primero <= 50 && segundo >= 1 && segundo <= 50) {
        document.getElementById("primer").innerHTML = "Primer valor = " + primero ;
        document.getElementById("segun").innerHTML = "Segundo valor = " + segundo ;
        sumando(primero, segundo);
        comprobarprimos(primero, segundo);
        comprobarpar(primero,segundo);
        escalera(primero,segundo);
        
    } else {
        window.alert("Uno de los valores no esta dentro del rango");
        console.log("Uno de los valores no esta dentro del rango");
        obten();
    };
}
function sumando(a,b){
    const suma= a+b;
    let resultSuma = document.getElementById("sum");
    resultSuma.innerHTML = "La suma de los valores es = " + suma;
    console.log("La suma de los valores es = "+suma);

}
function primo(a){
    if (a===1){
        return a !==1;
        console.log("El número " + a +" es primo.");
    }
    else{
        for (let i=2; i < a; i++){
            if (a % i === 0){
                return false;
            }
        }
        return a !== 1;            
    }

}
function comprobarprimos(a,b){
    let resultPrim = document.getElementById("compri");
    if (a==b){
        if (primo(a)){
        resultPrim.innerHTML = "El número " + a + " es primo.";
        console.log("El número " + a + " es primo.");
        }
        else{
        resultPrim.innerHTML = "El número " + a + " no es primo.";
        console.log("El número " + a + " no es primo.");
        }
    }
    else if(primo(a) && primo(b)){
        resultPrim.innerHTML = "Los números " + a + " y "+ b + " son primos.";
        console.log("Los números " + a + " y "+ b + " son primos.");
    }
    else if (!primo(a) && primo(b)){
        resultPrim.innerHTML = "El número " + a + " no es primo, pero el " + b + " si lo es.";
        console.log("El número " + a + " no es primo, pero el " + b + " si lo es.");
    }
    else if (primo(a) && !primo(b)){
        resultPrim.innerHTML = "El número " + a + " si es primo, pero el " + b + " no lo es.";
        console.log("El número " + a + " si es primo, pero el " + b + " no lo es.");
    }
    else{
        resultPrim.innerHTML = "Los números " + a + " y "+ b + " no son primos.";
        console.log("Los números " + a + " y "+ b + " no son primos.");
    }
}
function par(a){
    if (a % 2===0){
        return true;
    }
    else{
        return false;
    }
}
function comprobarpar(a,b){
    let resultPar = document.getElementById("par");
    if (a==b){
        if (par(a)){
        resultPar.innerHTML = "El número " + a + " es par.";
        console.log("El número " + a + " es par.");
        }
        else{
            resultPar.innerHTML = "El número " + a + " no es par.";
            console.log("El número " + a + " no es par.");
        }
    }
    else if (par(a) && par(b)){
        resultPar.innerHTML = "Los números " + a + " y "+ b + " son pares.";
        console.log("Los números " + a + " y "+ b + " son pares.");
    }
    else if(!par(a) && par(b)){
        resultPar.innerHTML = "El número " + a + " no es par, pero el " + b + " si lo es.";
        console.log("El número " + a + " no es par, pero el " + b + " si lo es.");
    }
    else if(par(a) && !par(b)){
        resultPar.innerHTML = "El número " + a + " es par, pero el " + b + " no lo es.";
        console.log("El número " + a + " es par, pero el " + b + " no lo es.");
    }
    else{
        resultPar.innerHTML = "Los números " + a + " y "+ b + " no son pares.";
        console.log("Los números " + a + " y "+ b + " no son pares.");
    }
}
function escalera(a,b){
    let pares=[];
    let impares=[];
    if (a===b){
        console.log("Los números " + a + " y "+ b + " son iguales.");
    }
    else if (a<b){
        for (let i=a+1; i<b; i++){
            if (par(i)){
                pares.push(i);
            }
        }
        const resultPares = document.getElementById("pares");
        resultPares.innerHTML= "Pares: "+ pares.join(", ");
        const resultImpares = document.getElementById("impares");
        resultImpares.innerHTML= "";
        console.log(pares);
        return pares;
    }
    else if (a>b){
        for (let i=a-1; i>b; i--){
            if (!par(i)){
                impares.push(i);
            }
        }
        const resultPares = document.getElementById("pares");
        resultPares.innerHTML= "";
        const resultImpares = document.getElementById("impares");
        resultImpares.innerHTML= "Impares: "+ impares.join(", ");
        console.log(impares);
        return impares;
    }
}

