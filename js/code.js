/*=============================================
OBJETO CON LAS PROPIEDADES DE LA CALCULADORA
=============================================*/
var p = {
	teclas: document.querySelectorAll("#calculadora ul li"),
	action: null,
	digit: null,
	operaciones: document.querySelector("#consola"),
	cantidadSignos: 0
}

/*=============================================
OBJETO CON LOS MÉTODOS DE LA CALCULADORA
=============================================*/
var m = {
	inicio: function(){
		for(var i = 0; i < p.teclas.length; i++){
			p.teclas[i].addEventListener("click", m.oprimirTecla)
			/*cuenta las teclas y acciona oprimir tecla */
		}
	},
	oprimirTecla: function(tecla){
		p.action = tecla.target.getAttribute("class");
		/*target trae el li y su valor correspondiente */
		/*get atribute permite traer el atributo clase del li */
		/*el valor del li se almacena en la propiedad action */
		p.digit = tecla.target.innerHTML;
		/*captura el contenido html del li */
		m.calculadora(p.action, p.digit);
	},
	calculadora: function(action,digit){
		switch(action){
			case "numero":
				p.cantidadSignos = 0;
				/*al precionar un numero se puede volver a ingresar un signo */

				if (p.operaciones.innerHTML == 0) {
					p.operaciones.innerHTML = digit;
					/*reemplza el 0 */
				} else {
					p.operaciones.innerHTML += digit;
					/*va agregando los numeros */
				}
				break;
			case "signo":
				p.cantidadSignos ++
				/*signos =  1 */
				if (p.cantidadSignos == 1) {
					/*puede entrar solo si hay un signo */
					if (p.operaciones.innerHTML == 0) {
						p.operaciones.innerHTML = 0;
						/*se vuelve a agregar un cero porque no se ha ingresado numeros */
					} else {
						p.operaciones.innerHTML += digit;
						/*no es 0 y ya se puede agregar un signo */
					}
				}
				break;

			case "decimal":

			console.log("decimal");

			break;

			case "igual":

			console.log("igual");

			break;

		}


	},
	borrarCalculadora: function() {
		p.operaciones.innerHTML = 0;
		/*reinicia */

	}

}

m.inicio();


