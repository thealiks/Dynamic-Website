// Name: Alex Singh
// ID: 687195036
// upi: asin374

function show(id){
	var elements = ['Home', 'Courses', 'People', 'News', 'Notices', 'Guest Book'];
	this.hide(elements);
	// document.getElementById(id).style.visibility = 'visible';
	document.getElementById(id).style.display = 'block';
	document.getElementById('links').innerHTML = id;
}

function hide(elements){
	for (var index = 0; index < elements.length; index++) {
		// document.getElementById(elements[index]).style.visibility = 'hidden';
		document.getElementById(elements[index]).style.display = 'none';
	}
}

//Hybrid function for both Courses and People
function getCP(id){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/" + id;
	xhttp.open("GET", url, true);
	xhttp.onload = function(){
		var json = JSON.parse(xhttp.responseText);
		if (id == 'courses'){
			var j = json.courses.coursePaperSection;
		}
		else if (id == 'people'){
			var j = json.list;
		}
		var output = "";
		for (var i = 0; i < j.length; i++){
			var p = j[i];
			if (id=='courses'){
				output += "<h2>" + p.subject.courseA + "</h2><h3>" + p.title + "</h3><p><b>" + p.subject.points + "</b></p><p>" + p.description + "</p><p><i>" + p.prerequisite + "</i></p><hr class=\"grad\">";
			}
			else if (id == 'people'){
				output += "<h3>";
				if (p.title){
					output += "<i>" + p.title + "</i> ";
				}
				output += p.names[0] + "</h3><p><b>Email:</b> " + p.emailAddresses + "</p><p><b>Position:</b> " + p.jobtitles + "</p><p><b>Department:</b> " + p.orgunitnames + "</p><hr class=\"grad\">";
			}
		}
		document.getElementById(id + 'P').innerHTML = output;
	}
	xhttp.send(null);
}

//Hybrid function for both News and Notices
function getN(link){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/" + link;
	xhttp.open("GET", url, true);
	xhttp.onload = function(){
		var xml = this.responseXML;
		var output = "";
		output += "<p style=\"text-align:center;\">" + xml.getElementsByTagName("description")[0].childNodes[0].nodeValue + "</p><br>";
		for (i = 0; i < xml.getElementsByTagName("item").length; i++){
			output += "<h3>" + xml.getElementsByTagName("title")[i+1].childNodes[0].nodeValue + "</h3><p><b>Description:</b> " + xml.getElementsByTagName("description")[i+1].childNodes[0].nodeValue + "</p><p><a href=\"" + xml.getElementsByTagName("link")[i+1].childNodes[0].nodeValue + "\">Link</a></p><h6>" + xml.getElementsByTagName("pubDate")[i].childNodes[0].nodeValue + "</h6><hr class=\"grad\">";
		}
		document.getElementById(link).innerHTML = output;
	}
	xhttp.send(null);
}

function getGB(){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
	xhttp.open("GET", url, true);
	xhttp.onload = function(){
		var responses = xhttp.responseText;
		var output = "";
		output += "<p style=\"width:80%;overflow:hidden;\">" + responses + "</p><hr class=\"grad\">";
		document.getElementById('gbP').innerHTML = output;
	}
	xhttp.send(null);
}

function postComment(name, comment){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/xml; charset=UTF-8");
	out = "<string xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/\">" + comment + "</string>";
	xhttp.send(out);
}

function recallGB(){
	setTimeout(function(){ getGB(); }, 500);
}


/*
//Original Courses function
function getCourses(){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses";
	xhttp.open("GET", url, true);
	xhttp.onload = function(){
		var json = JSON.parse(xhttp.responseText);
		var j = json.courses.coursePaperSection;
		var output = "";
		for (var i = 0; i < j.length; i++){
			var paper = j[i];
			if (0){
				output += "<h2>" + paper.subject.courseA + "</h2><h3>" + paper.subject.points + "</h3><h3>" + paper.title + "</h3><p>" + paper.description + "</p><p>" + paper.prerequisite[0] + "</p><p>" + paper.prerequisite[1] + "</p><hr class=\"grad\">";
			}
			else{
				output += "<h2>" + paper.subject.courseA + "</h2><h3>" + paper.title + "</h3><p><b>" + paper.subject.points + "</b></p><p>" + paper.description + "</p><p><i>" + paper.prerequisite + "</i></p><hr class=\"grad\">";
			}
		}
		document.getElementById('courseP').innerHTML = output;
	}
	xhttp.send(null);
}

//Original People function
function getPeople(){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people";
	xhttp.open("GET", url, true);
	xhttp.onload = function(){
		var json = JSON.parse(xhttp.responseText);
		var j = json.list;
		var output = "<h3>";
		for (var i = 0; i < j.length; i++){
			var person = j[i];
			var vcard = getVCard(person.personId);
			if (person.title != "undefined"){
				output += "<i>" + person.title + "</i> ";
			}
			output += person.names[0] + "</h3>";
			
			// output+= "<img src=\"" + person.imageId + "\">"
			output+= "<a href=\"" + vcard + "\">Link</a>";
			output+= "<p><b>Email:</b> " + person.emailAddresses + "</p><p><b>Position:</b> " + person.jobtitles + "</p><p><b>Department:</b> " + person.orgunitnames + "</p><hr class=\"grad\">";
		}
		document.getElementById('peopleP').innerHTML = output;
	}
	xhttp.send(null);
}

//whoops this didnt work
function getVCard(id){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/vcard?u=" + id;
	xhttp.open("GET", url, true);
	xhttp.onload = function(){
	return this
	}
	xhttp.send(null);
}
*/
//Original news/notices functions incase hybrid one breaks
/*
function getNews(){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/newsfeed";
	xhttp.open("GET", url, true);
	xhttp.onload = function(){
		var xml = this.responseXML;
		var output = "";
		output += "<p style=\"text-align:center;\">" + xml.getElementsByTagName("description")[0].childNodes[0].nodeValue + "</p><br>";
		for (i = 0; i < xml.getElementsByTagName("item").length; i++){
			// var item = xml.getElementsByTagName("item").getElementsByTagName("title")[i].childNodes[0].nodeValue;
			// output += "<p>" + item + "</p>";
			output += "<h3>" + xml.getElementsByTagName("title")[i+1].childNodes[0].nodeValue + "</h3><p><b>Description:</b> " + xml.getElementsByTagName("description")[i+1].childNodes[0].nodeValue + "</p><p><a href=\"" + xml.getElementsByTagName("link")[i+1].childNodes[0].nodeValue + "\">Link</a></p><h6>" + xml.getElementsByTagName("pubDate")[i].childNodes[0].nodeValue + "</h6><hr>";
		}
		document.getElementById('newsP').innerHTML = output;
	}
	xhttp.send(null);
}

function getNotices(){
	var xhttp;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		// for ie5 and 6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/noticesfeed";
	xhttp.open("GET", url, true);
	xhttp.onload = function(){
		var xml = this.responseXML;
		var output = "";
		output += "<p style=\"text-align:center;\">" + xml.getElementsByTagName("description")[0].childNodes[0].nodeValue + "</p><br>";
		for (i = 0; i < xml.getElementsByTagName("item").length; i++){
			output += "<h3>" + xml.getElementsByTagName("title")[i+1].childNodes[0].nodeValue + "</h3><p><b>Description:</b> " + xml.getElementsByTagName("description")[i+1].childNodes[0].nodeValue + "</p><p><a href=\"" + xml.getElementsByTagName("link")[i+1].childNodes[0].nodeValue + "\">Link</a></p><h6>" + xml.getElementsByTagName("pubDate")[i].childNodes[0].nodeValue + "</h6><hr>";
		}
		document.getElementById('noticesP').innerHTML = output;
	}
	xhttp.send(null);
}*/