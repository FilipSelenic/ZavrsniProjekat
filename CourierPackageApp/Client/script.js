var host = "https://localhost:";
var port = "44302/";
var paketiEndpoint = "api/paketi/";

var kurirEndpoint = "api/kuriri/";

var loginEndpoint = "api/authentication/login";
var registerEndpoint = "api/authentication/register";
var pretragaEndpoint = "api/pretraga"
var formAction = "Create";
var editingId;
var jwt_token;

function odustanak(){
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("logout").style.display = "none";
	document.getElementById("logRegBtns").style.display = "block";
	document.getElementById("pretragaDiv").style.display = "none";

	cleanRegistrationForm();
	cleanLoginForm();
}
function showLogin() {
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("loginForm").style.display = "block";
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("logout").style.display = "none";
	document.getElementById("logRegBtns").style.display = "none";
	document.getElementById("pretragaDiv").style.display = "none";

    cleanRegistrationForm();

}

function validateRegisterForm(username, email, password, confirmPassword) {
	if (username.length === 0) {
		alert("Username field can not be empty.");
		return false;
	} else if (email.length === 0) {
		alert("Email field can not be empty.");
		return false;
	} else if (password.length === 0) {
		alert("Password field can not be empty.");
		return false;
	} else if (confirmPassword.length === 0) {
		alert("Confirm password field can not be empty.");
		return false;
	} else if (password !== confirmPassword) {
		alert("Password value and confirm password value should match.");
		return false;
	}
	return true;
}

function registerUser() {
	var username = document.getElementById("usernameRegister").value;
	var email = document.getElementById("emailRegister").value;
	var password = document.getElementById("passwordRegister").value;
	var confirmPassword = document.getElementById("confirmPasswordRegister").value;

	if (validateRegisterForm(username, email, password, confirmPassword)) {
		var url = host + port + registerEndpoint;
		var sendData = { "Username": username, "Email": email, "Password": password };
		fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
			.then((response) => {
				if (response.status === 200) {
					console.log("Successful registration");
					alert("Successful registration");
					showLogin();
				} else {
					console.log("Error occured with code " + response.status);
					console.log(response);
					alert("“Greška prilikom registracije!");
				}
			})
			.catch(error => console.log(error));
	}
	return false;
}

function showRegistration() {
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("registerForm").style.display = "block";
	document.getElementById("logout").style.display = "none";
	document.getElementById("logRegBtns").style.display = "none";
	document.getElementById("pretragaDiv").style.display = "none";

    cleanLoginForm();
}


function validateLoginForm(username, password) {
	if (username.length === 0) {
		alert("Username field can not be empty.");
		return false;
	} else if (password.length === 0) {
		alert("Password field can not be empty.");
		return false;
	}
	return true;
}

function loginUser() {
	var username = document.getElementById("usernameLogin").value;
	var password = document.getElementById("passwordLogin").value;

	if (validateLoginForm(username, password)) {
		var url = host + port + loginEndpoint;
		var sendData = { "Username": username, "Password": password };
		fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
			.then((response) => {
				if (response.status === 200) {
					console.log("Successful login");
					alert("Successful login");
					response.json().then(function (data) {
						console.log(data);
						document.getElementById("info").innerHTML = "Currently logged in user: <i>" + data.username + "<i/>.";
						document.getElementById("logout").style.display = "block";
						document.getElementById("loginForm").style.display = "none";
						document.getElementById("registerForm").style.display = "none";
						document.getElementById("formDiv").style.display = "block";
						document.getElementById("pretragaDiv").style.display = "block";

						jwt_token = data.token;
						loadKurirData();
						loadData();
						cleanLoginForm();
						cleanLoginForm();
						cleanRegistrationForm();
					});
				} else {
					console.log("Error occured with code " + response.status);
					console.log(response);
					alert("Greška prilikom prijave!");
				}
			})
			.catch(error => console.log(error));
	}
	return false;
}


function loadData() {
	document.getElementById("data").style.display = "block";

	var requestUrl = host + port + paketiEndpoint;
	console.log("URL zahteva: " + requestUrl);
	var headers = {};
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;			// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	console.log(headers);
	fetch(requestUrl, { headers: headers })
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setData);
			} else {
				console.log("Error occured with code " + response.status);
				showError();
			}
		})
		.catch(error => console.log(error));
}

function loadKurirData() {

	var requestUrl = host + port + kurirEndpoint;
	console.log("URL zahteva: " + requestUrl);
	var headers = {};
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;			// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	console.log(headers);
	fetch(requestUrl, { headers: headers })
		.then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					var select = document.getElementById("kurirInput");
					select.innerHTML = "";
					for(var d of data){
						let option = document.createElement("option");
						option.value = d.id;
						option.textContent = d.ime;
						select.appendChild(option);
					}
				});
			} else {
				console.log("Error occured with code " + response.status);
				showError();
			}
		})
		.catch(error => console.log(error));
}

function showError() {
	var container = document.getElementById("data");
	container.innerHTML = "";

	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var errorText = document.createTextNode("Greska prilikom preuzimanja podataka!");

	h1.appendChild(errorText);
	div.appendChild(h1);
	container.append(div);
}

function setData(data) {
	var container = document.getElementById("data");
	container.innerHTML = "";

	console.log(data);

	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var headingText = document.createTextNode("Paketi");
	h1.appendChild(headingText);
	div.appendChild(h1);

	var table = document.createElement("table");
    table.classList.add("table");
	table.classList.add("table-bordered");
	var header = createHeader();
	table.append(header);

	var tableBody = document.createElement("tbody");

	for (var d of data)
	{
		var row = document.createElement("tr");

		row.appendChild(createTableCell(d.posiljalac));
		row.appendChild(createTableCell(d.primalac));
		row.appendChild(createTableCell(d.tezina));
		row.appendChild(createTableCell(d.kurirIme));

		var stringId = d.id.toString();

		if(jwt_token){
			row.appendChild(createTableCell(d.cenaPostarine));

			var buttonDelete = document.createElement("button");
			buttonDelete.name = stringId;
			buttonDelete.addEventListener("click", deletePaketi);
			buttonDelete.textContent = "Obrisi";
			buttonDelete.classList.add("btn");
			buttonDelete.classList.add("btn-danger");
			var buttonDeleteCell = document.createElement("td");
			buttonDeleteCell.appendChild(buttonDelete);
			row.appendChild(buttonDeleteCell);
		}
		
		tableBody.appendChild(row);		
	}

	table.appendChild(tableBody);
	div.appendChild(table);


	container.appendChild(div);
};

function createHeader() {
	var thead = document.createElement("thead");
	var row = document.createElement("tr");

	row.style.backgroundColor= "#f08080";
	row.appendChild(createTableCell("Posiljalac"));
	row.appendChild(createTableCell("Primalac"));
	row.appendChild(createTableCell("Tezina(kg)"));
	row.appendChild(createTableCell("Kurir"));
	if(jwt_token){
		row.appendChild(createTableCell("Postarina(din)"));
		row.appendChild(createTableCell("Akcija"));
	}
	thead.appendChild(row);
	return thead;
}

function createTableCell(text) {
	var cell = document.createElement("td");
	var cellText = document.createTextNode(text);
	cell.appendChild(cellText);
	return cell;
}

function validateSubmitForm(posiljalac, primalac, tezina, postarina, kurir){
	if(posiljalac.length === 0){
		alert("Morate uneti posiljalaca");
		return false;
	}
	if(posiljalac.length > 90 || posiljalac.length < 2){
		alert("Naziv posliljaoca mora imati manje od 90 a vise od 2 karaktera");
		return false;
	}
	if(primalac.length === 0){
		alert("Morate uneti primaoca");
		return false;
	}
	if(primalac.length > 120 || primalac.length < 4){
		alert("Naziv primaoca mora imati manje od 120 a vise od 4 karaktera");
		return false;
	}
	
	if(tezina < 0.1 || tezina > 9.9){
		alert("Tezina paketa mora biti u intervalu 0.1-9.99");
		return false;
	}
	if(postarina < 250 || postarina > 10000){
		alert("Cena postarine mora biti u iz intervala 250-10000");
		return false;
	}
	if(kurir === 0){
		alert("Unesite id kurira");
		return false;
	}
	return true;
}
function submitForm(){

	var posiljalacInput = document.getElementById("posiljalacInput").value;
	var primalacInput = document.getElementById("primalacInput").value;
	var tezinaInput = document.getElementById("tezinaInput").value;
	var postarinaInput = document.getElementById("postarinaInput").value;
	var kurirInput = document.getElementById("kurirInput").value;

	var httpAction;
	var sendData;
	var url;

	if(!validateSubmitForm(posiljalacInput, primalacInput, tezinaInput, postarinaInput,kurirInput)){
		return false;
	}

		httpAction = "POST";
		url = host + port + paketiEndpoint;
		sendData = {
			"posiljalac": posiljalacInput,
			"primalac": primalacInput,
			"tezina": tezinaInput,
			"cenaPostarine": postarinaInput,
			"kurirId": kurirInput
		};
	
	

	console.log("Objekat za slanje");
	console.log(sendData);
	var headers = { 'Content-Type': 'application/json' };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	fetch(url, { method: httpAction, headers: headers, body: JSON.stringify(sendData) })
		.then((response) => {
			if (response.status === 201) {
				console.log("Successful action");
				loadData();
				cleanSubmitForm();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
	return false;
}


function submitPretragaForm(){

	var najmanjeInput = document.getElementById("NajmanjeInput").value;
	var najviseInput = document.getElementById("NajviseInput").value;
	var httpAction;
	var sendData;
	var url;

		httpAction = "POST";
		url = host + port + pretragaEndpoint;
		sendData = {
			"najmanje": najmanjeInput,
			"najvise": najviseInput
		};
	
	

	console.log("Objekat za slanje");
	console.log(sendData);
	var headers = { 'Content-Type': 'application/json' };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	fetch(url, { method: httpAction, headers: headers, body: JSON.stringify(sendData) })
		.then((response) => {
			if (response.status === 200) {
				console.log("Successful action");
				response.json().then(setData);
				document.getElementById("pretragaForm").reset();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Greška prilikom pretrage!");
			}
		})
		.catch(error => console.log(error));
	return false;
}
function deletePaketi() {
	var deleteID = this.name;

	var url = host + port + paketiEndpoint + deleteID.toString();
	var headers = { 'Content-Type': 'application/json' };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	fetch(url, { method: "DELETE", headers: headers})
		.then((response) => {
			if (response.status === 204) {
				console.log("Successful action");
				loadData();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
}





function logout() {
	jwt_token = undefined;
	document.getElementById("info").innerHTML = "";
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("logout").style.display = "none";
	document.getElementById("logRegBtns").style.display = "block";
	document.getElementById("pretragaDiv").style.display = "none";
	document.getElementById("pretragaForm").reset();

	cleanSubmitForm();
	loadData();
}

function cleanRegistrationForm(){
    document.getElementById("usernameRegister").value = "";
	document.getElementById("emailRegister").value = "";
	document.getElementById("passwordRegister").value = "";
	document.getElementById("confirmPasswordRegister").value = "";
}
function cleanLoginForm(){
    document.getElementById("usernameLogin").value = "";
	document.getElementById("passwordLogin").value = "";
}


function cleanSubmitForm(){
	document.getElementById("posiljalacInput").value = "";
	document.getElementById("primalacInput").value = "";
	document.getElementById("tezinaInput").value = "";
	document.getElementById("postarinaInput").value = "";
	document.getElementById("kurirInput").value = 2;
}