var fetch = require("node-fetch");
var fs = require('fs');
var Parser = require('simple-text-parser');
var parser = new Parser();

var archivo = "datospagina.txt";

//Definir reglas para extraer los datos necesarios
parser.addRule(/\{"latitude":([\S]+),"l/ig,	function(tag, data_txt) {
	return {latitud: data_txt};
});
parser.addRule(/\ongitude":([\S]+),"m/ig, function(tag, data_txt) {
	return {longitud: data_txt};
});
parser.addRule(/\href="([\S]+)</ig, function(tag, data_txt) {
	var link = "https://clasificados.lostiempos.com" + data_txt;
	return {link: link};
});
parser.addRule(/\$us ([\S]+)</ig, function(tag, data_txt) {
	return {precio: data_txt};
});

/*var re = /\{"latitude":([\S]+),"l/ig;
var str = '{"latitude":-17.390206,"longitude":-66.154655,"markername":"clasificados","offset":1,"text":"\u003Cdiv class=\u0022gmap-popup\u0022\u003E\u003Cdiv class=\u0022content-image\u0022\u003E\n  \u003Cdiv class=\u0022image\u0022\u003E\u003Ca href=\u0022\/anuncio\/inmuebles\/avenida-america-sobre-seguro\/863181\u0022\u003E\u003Cimg class=\u0022image-style-destacado-block\u0022 src=\u0022https:\/\/clasificados.lostiempos.com\/sites\/default\/files\/styles\/destacado_block\/public\/imagenes_clasificados\/img_0006_13.jpg?itok=b8EtimP8\u0022 width=\u0022205\u0022 height=\u0022150\u0022 alt=\u0022\u0022 \/\u003E\u003C\/a\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022precio\u0022\u003E\u003Cspan class=\u0022price\u0022\u003E$us 1200\u003C\/span\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022seccion\u0022\u003ELocal Comercial - Alquiler\u003C\/div\u003E\n\u003C\/div\u003E\u003C\/div\u003E","autoclick":0,"opts":{"title":"","highlight":0,"highlightcolor":"#FF0000","animation":"0"}},{"latitude":-17.370711,"longitude":-66.139956,"markername":"clasificados","offset":2,"text":"\u003Cdiv class=\u0022gmap-popup\u0022\u003E\u003Cdiv class=\u0022content-image\u0022\u003E\n  \u003Cdiv class=\u0022image\u0022\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022precio\u0022\u003E\u003Cspan class=\u0022price\u0022\u003E$us 275000\u003C\/span\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022seccion\u0022\u003ECasa \/ Chalet - Venta\u003C\/div\u003E\n\u003C\/div\u003E\u003C\/div\u003E","autoclick":0,"opts":{"title":"","highlight":0,"highlightcolor":"#FF0000","animation":"0"}}';
var myArray = str.split(re);
console.log(myArray);
*/
console.log(parser.toTree('{"latitude":-17.390206,"longitude":-66.154655,"markername":"clasificados","offset":1,"text":"\u003Cdiv class=\u0022gmap-popup\u0022\u003E\u003Cdiv class=\u0022content-image\u0022\u003E\n  \u003Cdiv class=\u0022image\u0022\u003E\u003Ca href=\u0022\/anuncio\/inmuebles\/avenida-america-sobre-seguro\/863181\u0022\u003E\u003Cimg class=\u0022image-style-destacado-block\u0022 src=\u0022https:\/\/clasificados.lostiempos.com\/sites\/default\/files\/styles\/destacado_block\/public\/imagenes_clasificados\/img_0006_13.jpg?itok=b8EtimP8\u0022 width=\u0022205\u0022 height=\u0022150\u0022 alt=\u0022\u0022 \/\u003E\u003C\/a\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022precio\u0022\u003E\u003Cspan class=\u0022price\u0022\u003E$us 1200\u003C\/span\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022seccion\u0022\u003ELocal Comercial - Alquiler\u003C\/div\u003E\n\u003C\/div\u003E\u003C\/div\u003E","autoclick":0,"opts":{"title":"","highlight":0,"highlightcolor":"#FF0000","animation":"0"}},{"latitude":-17.370711,"longitude":-66.139956,"markername":"clasificados","offset":2,"text":"\u003Cdiv class=\u0022gmap-popup\u0022\u003E\u003Cdiv class=\u0022content-image\u0022\u003E\n  \u003Cdiv class=\u0022image\u0022\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022precio\u0022\u003E\u003Cspan class=\u0022price\u0022\u003E$us 275000\u003C\/span\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022seccion\u0022\u003ECasa \/ Chalet - Venta\u003C\/div\u003E\n\u003C\/div\u003E\u003C\/div\u003E","autoclick":0,"opts":{"title":"","highlight":0,"highlightcolor":"#FF0000","animation":"0"}}'));
//console.log(parser.render('{"latitude":-17.390206,"longitude":-66.154655,"markername":"clasificados","offset":1,"text":"\u003Cdiv class=\u0022gmap-popup\u0022\u003E\u003Cdiv class=\u0022content-image\u0022\u003E\n  \u003Cdiv class=\u0022image\u0022\u003E\u003Ca href=\u0022\/anuncio\/inmuebles\/avenida-america-sobre-seguro\/863181\u0022\u003E\u003Cimg class=\u0022image-style-destacado-block\u0022 src=\u0022https:\/\/clasificados.lostiempos.com\/sites\/default\/files\/styles\/destacado_block\/public\/imagenes_clasificados\/img_0006_13.jpg?itok=b8EtimP8\u0022 width=\u0022205\u0022 height=\u0022150\u0022 alt=\u0022\u0022 \/\u003E\u003C\/a\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022precio\u0022\u003E\u003Cspan class=\u0022price\u0022\u003E$us 1200\u003C\/span\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022seccion\u0022\u003ELocal Comercial - Alquiler\u003C\/div\u003E\n\u003C\/div\u003E\u003C\/div\u003E","autoclick":0,"opts":{"title":"","highlight":0,"highlightcolor":"#FF0000","animation":"0"}},{"latitude":-17.370711,"longitude":-66.139956,"markername":"clasificados","offset":2,"text":"\u003Cdiv class=\u0022gmap-popup\u0022\u003E\u003Cdiv class=\u0022content-image\u0022\u003E\n  \u003Cdiv class=\u0022image\u0022\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022precio\u0022\u003E\u003Cspan class=\u0022price\u0022\u003E$us 275000\u003C\/span\u003E\u003C\/div\u003E\n  \u003Cdiv class=\u0022seccion\u0022\u003ECasa \/ Chalet - Venta\u003C\/div\u003E\n\u003C\/div\u003E\u003C\/div\u003E","autoclick":0,"opts":{"title":"","highlight":0,"highlightcolor":"#FF0000","animation":"0"}}'));
//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const requesturl = "https://clasificados.lostiempos.com/inmuebles-mapa";
fetch(/*proxyurl + */requesturl)
    .then(response => response.text())
    .then(body  => fs.writeFile(archivo, body,
    	(err) => {
	    if (err) throw err;
	    	console.log("Se guardo el archivo correctamente");
	    	//console.log(parser.toTree(body));
		})
    )
