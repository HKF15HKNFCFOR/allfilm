let database=`https://bd.moviegrand.ru/18949-moya-chistaya-zemlya-2017.html
https://bd.moviegrand.ru/18858-moskovskaya-borzaya-2-2018.html
https://bd.moviegrand.ru/18859-operaciya-satana-2018.html`

function isValid(string,regID) {
	let res = string.match(regID)
	return (res !== null)
}
	let mas=[]
	let success=[]
	let arrayurl=[]
function zerostep(){
     arrayurl = database.split('\n')
	for(let k=0;k<arrayurl.length; k++){
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest; 
		var xhr = new XHR(); 
		let url = new URL(arrayurl[k])
		let host = url.hostname
		xhr.open('GET', 'https://cors-anywhere.herokuapp.com/'+url, true); 
		xhr.onload = function() {
			let parser = new DOMParser()
			let xml1 = parser.parseFromString(this.responseText, 'text/html')
			let divs = xml1.querySelectorAll('iframe'); 
			document.getElementById("textar").innerHTML+=this.responseText+'<br>'
			if (divs.length>0) {
				for (let i=0;i<divs.length; i++) {
					let elem=divs[i].getAttribute('src')
					if(elem!=null && !isValid(elem,/(mc.yandex.ru)/g)) {
						if(isValid(elem,/^(http(s)?:)/g)) {
							mas.push('<iframe src="'+elem+'" allowfullscreen="" width="640" height="480" frameborder="0"></iframe>')
						}else{
							mas.push('<iframe src="http://'+host+elem+'" allowfullscreen="" width="640" height="480" frameborder="0"></iframe>')
						}
					}
				}
			}
		success.push('1')
		}		   
		xhr.onerror = function() { alert( 'Ошибка ' + this.status ); } 
		xhr.send();
	}
}
zerostep()
function whatresults(){
	if(success.length==arrayurl.length){
		//document.getElementById("val").innerHTML=mas.join('')
	}else{
		alert(success.length+' <-- '+arrayurl.length)
	}
}