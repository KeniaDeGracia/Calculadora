/*=============================================
PROPIEDADES 
=============================================*/
var p = {
	botones: document.querySelectorAll("#calculadora ul li"),
	action: null,
	digit: null,
	calculos: document.querySelector("#consola"),
	cantidadSignos: 0,
	cantidadDecimal: false,
	resultado: false
}
/*=============================================
MÉTODOS
=============================================*/
var m = {
	inicio: function(){
		for(var i = 0; i < p.botones.length; i++){
			p.botones[i].addEventListener("click", m.oprimirBoton)
			/*cuenta las teclas y acciona oprimir tecla */
		}
		document.addEventListener("keydown", m.teclear);
	},
	/*keyboard: function(){
		document.addEventListener("keydown", m.teclear);
	}*/
	teclear: function(tecla){
		console.log(tecla.keyCode)
		if (tecla.keyCode == 48 || tecla.keyCode == 96) {
			p.accion = "numero";
			p.digito = 0;
		}
		else if (tecla.keyCode == 49 || tecla.keyCode == 97) {
			p.accion = "numero";
			p.digito = 1;
		}
		else if (tecla.keyCode == 50 || tecla.keyCode == 98) {
			p.accion = "numero";
			p.digito = 2;
		}
		else if (tecla.keyCode == 51 || tecla.keyCode == 99) {
			p.accion = "numero";
			p.digito = 3;
		}
		else if (tecla.keyCode == 52 || tecla.keyCode == 100) {
			p.accion = "numero";
			p.digito = 4;
		}
		else if (tecla.keyCode == 53 || tecla.keyCode == 101) {
			p.accion = "numero";
			p.digito = 5;
		}
		else if (tecla.keyCode == 54 || tecla.keyCode == 102) {
			p.accion = "numero";
			p.digito = 6;
		}
		else if (tecla.keyCode == 55 || tecla.keyCode == 103) {
			p.accion = "numero";
			p.digito = 7;
		}
		else if (tecla.keyCode == 56 || tecla.keyCode == 104) {
			p.accion = "numero";
			p.digito = 8;
		}
		else if (tecla.keyCode == 57 || tecla.keyCode == 105) {
			p.accion = "numero";
			p.digito = 9;
		}
		else if (tecla.keyCode == 187 || tecla.keyCode == 107) {
			p.accion = "signo";
			p.digito = "+";
		}
		else if (tecla.keyCode == 189 || tecla.keyCode == 109) {
			p.accion = "signo";
			p.digito = "-";
		}
		else if (tecla.keyCode == 88 || tecla.keyCode == 106) {
			p.accion = "signo";
			p.digito = "*";
		}
		else if (tecla.keyCode == 111) {
			p.accion = "signo";
			p.digito = "/";
		}
		else if (tecla.keyCode == 190 || tecla.keyCode == 110) {
			p.accion = "decimal";
			p.digito = ".";
		}
		else if (tecla.keyCode == 13) {
			p.accion = "igual";
		}
		else if (tecla.keyCode == 8) {
			p.accion = "";
			m.borrarCalculadora();
		}else{
			p.accion = "";
			p.digito = "";
		}
		m.calculadora(p.accion, p.digito);
	},
	oprimirBoton: function(boton){
		p.action = boton.target.getAttribute("class");
		/*target trae el li y su valor correspondiente 
		get atribute permite traer el atributo clase del li 
		el valor del li se almacena en la propiedad action */
		p.digit = boton.target.innerHTML;
		/*captura el contenido html del li */
		m.calculadora(p.action, p.digit);
	},
	calculadora: function(action,digit){
		switch(action){
			case "numero":
				p.cantidadSignos = 0;
				/*al precionar un numero se puede volver a ingresar un signo */

				if (p.calculos.innerHTML == "0") {
					p.calculos.innerHTML = digit;
					/*reemplza el 0 */
				} else {
					if (p.resultado){
						p.resultado = false;
						/*para que vuelva a registrarse como falso y no entre hasta que se oprima el igual */
						p.calculos.innerHTML = digit;
						/*reemplaza por los siguientes digitos despues del resultado de un calculo */
					}else{
						p.calculos.innerHTML += digit;
						/*va agregando los numeros */
					}
				}
				break;
			case "signo":
				p.cantidadSignos ++
				/*signos =  1 */
				if (p.cantidadSignos == 1) {
					/*puede entrar solo si hay un signo */
					if (p.calculos.innerHTML == "0") {
						p.calculos.innerHTML = "0";
						/*se vuelve a agregar un cero porque no se ha ingresado numeros */
					} else {
						p.calculos.innerHTML += digit;
						/*no es 0 y ya se puede agregar un signo */
						p.cantidadDecimal = false; 		
						/*para volver a usar decimales */
						p.resultado = false;
					}
				}
				break;
			case "decimal":
				if (!p.cantidadDecimal && p.cantidadSignos!=1) {
					/*correcion 11.1+.11 */
					p.calculos.innerHTML += digit;	
					p.cantidadDecimal = true; 		
					p.resultado = false;	
				}
			break;
			case "igual":
				p.calculos.innerHTML = eval(p.calculos.innerHTML)
				var expresion=/./g;
				/*expresion reglar para que encuentre el punto (.) si lo encuentra no dejara poner mas  */
				if(!expresion.test(p.calculos.innerHTML)){
					p.cantidadDecimal = true;
				}
				p.resultado = true;
			break;
		}
	},
	borrarConsola: function() {
		p.resultado=false;
		p.calculos.innerHTML = 0;
		/*reinicia */
	}
}
m.inicio();