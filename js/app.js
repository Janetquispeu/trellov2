window.addEventListener("load",function(){
	var addList=document.getElementById("addList");

	addList.addEventListener("click", function(){
		desaparecerElemento(this);
		aparecerFormulario();
	});			
});
var contador=1;

function desaparecerElemento(elemento){
	elemento.style.display="none";
}

function aparecerFormulario(){
	var form=document.getElementById("form");
	var inputText=document.createElement("input");
	var boton=document.createElement("button");
	var btnRemove=document.createElement("button")

	form.appendChild(inputText);
	form.appendChild(boton);
	form.appendChild(btnRemove);

	form.classList.add("fondoForm")
	form.style.background="#E2E4E6"; 
	boton.textContent= "Save";
	inputText.classList.add("inputText");
	inputText.setAttribute("placeholder","Add a List...")
	boton.setAttribute("type","button")
	boton.classList.add("boton");
	btnRemove.classList.add("icon-cross");
	inputText.focus();

	boton.addEventListener("click",function(){
		imprimir(this.previousSibling, this.parentElement);
		desapareceFormulario(this, this.parentElement);
		agregarLista();
	});		
}	

function imprimir(inputText, form){
	var inputValor=inputText.value;
	var divContent=document.createElement("div");
	var contenedor=document.getElementById("contenedor");
	var divClass=document.createElement("div");
	var divEnlace=document.createElement("div");
	var cardEnlace=document.createElement("a");

	contenedor.insertBefore(divContent,form);
	divContent.appendChild(divClass);
	divContent.appendChild(divEnlace);
	divEnlace.appendChild(cardEnlace);

	divClass.textContent=inputValor;
	inputText.value="";

	divContent.classList.add("createList");
	divClass.classList.add("divClass");
	divEnlace.classList.add("divEnlace");
	cardEnlace.classList.add("cardEnlace");
	cardEnlace.textContent="Add a card...";

	divEnlace.addEventListener("click",eliminarDivEnlace);

	divContent.addEventListener("dragover", arrastrarSobre);
	divContent.addEventListener("dragend", terminaArrastrar);
	divContent.addEventListener("drop", soltar);

	function arrastrarSobre(e) {
		e.preventDefault();
	}

	function soltar(e) {
		var idArrastrado = e.dataTransfer.getData("text");
		var elementoArrastrado = document.getElementById(idArrastrado);
		this.insertBefore(elementoArrastrado,this.lastElementChild);
	}
	function terminaArrastrar(e) {
		this.style.opacity = null;
	}
	
}
		
function eliminarDivEnlace(){
	this.style.display="none";
	var divTextArea=document.createElement("form");
	var textArea=document.createElement("textarea");
	var botonAdd=document.createElement("button");
	var btnRemovep=document.createElement("button");

	this.parentElement.appendChild(divTextArea);
	divTextArea.appendChild(textArea);
	divTextArea.appendChild(botonAdd);
	divTextArea.appendChild(btnRemovep);
	botonAdd.textContent="Add";
	textArea.focus();

	divTextArea.classList.add("divTextArea");
	textArea.classList.add("textArea");
	botonAdd.classList.add("botonAdd");
	btnRemovep.classList.add("icon-cross");

	botonAdd.addEventListener("click", eliminarTextArea)
}

function eliminarTextArea(ev){
	ev.preventDefault();
	// this.parentElement.style.display="none";
	var formulario = this.parentElement;
	var divCard=document.createElement("div");
	formulario.parentElement.insertBefore(divCard,formulario.previousSibling);
	formulario.previousSibling.style.display="block";
	divCard.classList.add("divCard");
	divCard.draggable="true";
	divCard.id=contador;
	divCard.textContent=this.previousSibling.value;
	this.previousSibling.value="";
	formulario.remove();
	contador++;

	divCard.addEventListener("dragstart", empiezaArrastrar);

	function empiezaArrastrar(e) {
	e.dataTransfer.setData("text", this.id);
	this.style.opacity = "0.4";
	}
}

function eliminarFormTextarea(){
	document.querySelector("divTextArea").classList.remove("textArea"); 
}

function desapareceFormulario(boton, form){
	boton.previousSibling.remove()// inputText
	boton.nextSibling.remove(); // btnRemove
	boton.remove();
	form.style.background="none"; // form

}

function agregarLista(){
	var addList=document.getElementById("addList");
	addList.style.display="block";
}