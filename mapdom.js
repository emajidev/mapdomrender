// funcion para obtener los Atributos de las estiquetas
var getAttributes = function (attributes) {
	return Array.prototype.map.call(attributes, function (attribute) {
		return {
			att: attribute.name,
			value: attribute.value
		};
	});
};
// funcion para obtener los ComputedStyle del css
var getCssComputedStyle = function(element){
	var cssObj = getComputedStyle(element, null)
	var styles=[]
	for (i = 0; i < cssObj.length; i++) { 
		
		var cssObjProp = cssObj.item(i)
		var valueCssPro = cssObj.getPropertyValue(cssObjProp) 
		styles.push({
			"pro":cssObjProp,
			"value":valueCssPro
		});
	
	}
	return styles
}
// Crea un mapa del arbol del dom para cada elemento

var DOMMap = function (element) {

	return Array.prototype.map.call(element.childNodes, (function (node) {
		var data = {
            tag: node.tagName,
			atts: node.nodeType !== 1 ? [] : getAttributes(node.attributes),
			ComputedStyle:getCssComputedStyle(element),
			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
			
		};
		data.children = DOMMap(node);
		return data;
	}));
};

// obtiene todos los elementos contenido dentro del html
var app = document.querySelector('html');

// crea un mapa de los elementos
var map = DOMMap(app);
// se transforma el objeto map en formato json
var jDom=JSON.stringify(map,null, 2)
// visualizacion del json por consola en el navegador
console.log(jDom);
