document.addEventListener('DOMContentLoaded', () => {
const tutorialShown = localStorage.getItem('tutorialShown');
if (!tutorialShown) {
Swal.fire({
title: '¡Parece que eres nuevo por aquí 👀',
text: '¿Quieres que te ayude a cómo armar tu primera quiniela? 📋🔥',
imageUrl: 'tutorial.png',
imageWidth: 200,
imageHeight: 150,
showCancelButton: true,
confirmButtonColor: '#28a745',
cancelButtonColor: '#C00030',
confirmButtonText: 'Sí, por favor',
cancelButtonText: 'No, gracias'
}).then((result) => {
if (result.isConfirmed) {
startTutorial();
localStorage.setItem('tutorialShown', 'true');
} else {
localStorage.setItem('tutorialShown', 'true');
}
});
}
});
function startTutorial() {
Swal.fire({
title: 'Paso1️⃣: Tu nombre, crack 😎',
text: 'Comienza ingresando tu nombre 🧾',
confirmButtonText: 'Siguiente &rarr;',
imageUrl: 'tutorial.png',
imageWidth: 200,
imageHeight: 150,
}).then(() => {
Swal.fire({
title: 'Paso2️⃣: Selecciona tus predicciones⚽',
text: 'Marca tus predicciones en los nombres o en los logotipos 🎯',
confirmButtonText: 'Siguiente &rarr;',
imageUrl: 'tutorial.png',
imageWidth: 200,
imageHeight: 150,
}).then(() => {
Swal.fire({
title: 'Paso3️⃣: Guarda tu quiniela⚽',
text: 'Cuando termines de elegir tu pronóstico y tengas tu quiniela lista, toca “Guardar quiniela 💾',
confirmButtonText: 'Siguiente &rarr;',
imageUrl: 'tutorial.png',
imageWidth: 200,
imageHeight: 150,
}).then(() => {
Swal.fire({
title: 'Paso4️⃣: Envía tu quiniela📋🔥',
text: 'Presiona "Enviar quiniela" para compartir tus quiniela por WhatsApp ⚽💥',
confirmButtonText: 'Siguiente &rarr;',
imageUrl: 'tutorial.png',
imageWidth: 200,
imageHeight: 150,
}).then(() => {
Swal.fire({
title: 'Paso5️⃣: ¡Listo, crack!😎',
html: 'Ya sabes cómo armar tu primera quiniela ✅<br><br>' +
'💖 ¡Mil gracias por participar y mucha suerte! 🍀',
confirmButtonText: '¡Entendido!',
imageUrl: 'tutorial.png',
imageWidth: 200,
imageHeight: 150,
});
});
});
});
});
}
const partidos = [
  "Tigres vs Toluca",
  "Chelsea vs Everton",
  "Liverpool vs Brighton",
  "Barcelona vs Osasuna",
  "Crystal vs Man City",
  "Forest vs Tottenham",
  "Genoa vs Inter",
  "Alavés vs Real M",
  "Toluca vs Tigres"
];
const topPositions = ["28.0%", "36.4%", "45.0%", "53.3%", "62.0%", "70.3%", "78.7%", "87.5%", "96.0%"];
const circuloContenedores = document.querySelectorAll('.circulo-contenedor');
circuloContenedores.forEach(contenedor => {
contenedor.addEventListener('click', () => {
const circulo = contenedor.querySelector('.circulo');
const isSelected = circulo.classList.contains('selected');
circulo.classList.toggle('selected');
let doubles = 0;
let triples = 0;
const topPositions = ["28.0%", "36.4%", "45.0%", "53.3%", "62.0%", "70.3%", "78.7%", "87.5%", "96.0%"];
topPositions.forEach(top => {
const filaContenedores = document.querySelectorAll(`.circulo-contenedor[style*="top: ${top}"]`);
const selectedInRow = Array.from(filaContenedores)
.filter(c => c.querySelector('.circulo').classList.contains('selected'));
if (selectedInRow.length === 2) {
doubles++;
} else if (selectedInRow.length === 3) {
triples++;
}
});
let error = false;
if (doubles > 3) {
error = true;
Swal.fire({
title: 'Tarjeta roja 🟥',
text: '❌ Máximo 3 dobles. ❌',
imageUrl: 'tarjetaroja.png',
imageWidth: 150,
imageHeight: 150,
background: '#fff',
color: '#000',
confirmButtonColor: '#C00030',
confirmButtonText: '¡Entendido!'
});
} else if (triples > 3) {
error = true;
Swal.fire({
title: 'Tarjeta roja 🟥',
text: '❌ Máximo 3 triples. ❌',
imageUrl: 'tarjetaroja.png',
imageWidth: 150,
imageHeight: 150,
background: '#fff',
color: '#000',
confirmButtonColor: '#C00030',
confirmButtonText: '¡Entendido!'
});
}
if (error) {
circulo.classList.toggle('selected');
}
updatePrice();
});
});
document.getElementById('saveQuinielaBtn').addEventListener('click', () => {
const selectionsMade = document.querySelectorAll('.circulo.selected').length > 0;
if (!selectionsMade) {
Swal.fire({
title: 'Tarjeta roja 🟥',
text: '❌ No seleccionaste nada. ❌',
imageUrl: 'tarjetaroja.png',
imageWidth: 150,
imageHeight: 150,
imageAlt: 'Tarjeta Roja',
background: '#fff',
color: '#000',
confirmButtonColor: '#C00030',
confirmButtonText: '¡Entendido!'
});
return;
}
const nameInput = document.getElementById('nameInput');
const name = nameInput.value.trim();
if (!name) {
Swal.fire({
title: 'Tarjeta roja 🟥',
text: '❌ Debes ingresar tu nombre❌',
imageUrl: 'tarjetaroja.png',
imageWidth: 150,
imageHeight: 150,
imageAlt: 'Tarjeta Roja',
background: '#fff',
color: '#000',
confirmButtonColor: '#C00030',
confirmButtonText: '¡Entendido!'
});
return;
}
const selections = [];
for (let i = 0; i < partidos.length; i++) {
const top = topPositions[i];
const filaContenedores = document.querySelectorAll(`.circulo-contenedor[style*="top: ${top}"]`);
const selectedInRow = Array.from(filaContenedores)
.filter(c => c.querySelector('.circulo').classList.contains('selected'))
.map(c => {
if (c.classList.contains('izquierda')) return 'L';
if (c.classList.contains('centro')) return 'E';
if (c.classList.contains('derecha')) return 'V';
});
if (selectedInRow.length === 0) {
Swal.fire({
title: 'Tarjeta roja 🟥',
text: '❌ Faltan partidos por seleccionar. ❌',
imageUrl: 'tarjetaroja.png',
imageWidth: 150,
imageHeight: 150,
imageAlt: 'Tarjeta Roja',
background: '#fff',
color: '#000',
confirmButtonColor: '#C00030',
confirmButtonText: '¡Entendido!'
});
return;
}
selections.push(selectedInRow);
}
const combinations = generateCombinations(selections);
combinations.forEach(combination => {
let predictionString = '';
combination.forEach((result, i) => {
predictionString += `${partidos[i]} = ${result}<br>`;
});
const savedQuinielasContainer = document.getElementById('savedQuinielasContainer');
const quinielaId = `quiniela-${Date.now()}-${Math.random()}`;
const quinielaElement = document.createElement('div');
quinielaElement.classList.add('saved-quiniela');
quinielaElement.id = quinielaId;
quinielaElement.innerHTML = `
<div class="quiniela-info">
<p class="name">Nombre: ${name}</p>
<p class="prediction">${predictionString}</p>
</div>
<button class="delete-btn" onclick="deleteQuiniela('${quinielaId}')">
<i class="fas fa-trash-alt"></i>
</button>
`;
savedQuinielasContainer.appendChild(quinielaElement);
});
saveQuinielasToLocalStorage();
nameInput.value = '';
document.querySelectorAll('.circulo.selected').forEach(c => c.classList.remove('selected'));
updatePrice();
});
function deleteQuiniela(quinielaId) {
document.getElementById(quinielaId).remove();
updatePrice();
saveQuinielasToLocalStorage();
}
function saveQuinielasToLocalStorage() {
const savedQuinielas = [];
document.querySelectorAll('.saved-quiniela').forEach(quinielaElement => {
const name = quinielaElement.querySelector('.quiniela-info .name').textContent.replace('Nombre: ', '').trim();
const predictionHTML = quinielaElement.querySelector('.quiniela-info .prediction').innerHTML;
savedQuinielas.push({
name: name,
prediction: predictionHTML
});
});
localStorage.setItem('savedQuinielas', JSON.stringify(savedQuinielas));
}
function loadQuinielasFromLocalStorage() {
const savedQuinielas = JSON.parse(localStorage.getItem('savedQuinielas'));
if (savedQuinielas && savedQuinielas.length > 0) {
const savedQuinielasContainer = document.getElementById('savedQuinielasContainer');
savedQuinielas.forEach(quinielaData => {
const quinielaId = `quiniela-${Date.now()}-${Math.random()}`;
const quinielaElement = document.createElement('div');
quinielaElement.classList.add('saved-quiniela');
quinielaElement.id = quinielaId;
quinielaElement.innerHTML = `
<div class="quiniela-info">
<p class="name">Nombre: ${quinielaData.name}</p>
<p class="prediction">${quinielaData.prediction}</p>
</div>
<button class="delete-btn" onclick="deleteQuiniela('${quinielaId}')">
<i class="fas fa-trash-alt"></i>
</button>
`;
savedQuinielasContainer.appendChild(quinielaElement);
});
updatePrice();
}
}
function updatePrice() {
let combinationsCount = 1;
let hasSelection = false;
for (let i = 0; i < partidos.length; i++) {
const top = topPositions[i];
const filaContenedores = document.querySelectorAll(`.circulo-contenedor[style*="top: ${top}"]`);
const selectedInRow = Array.from(filaContenedores)
.filter(c => c.querySelector('.circulo').classList.contains('selected'));  
if (selectedInRow.length > 0) {
combinationsCount *= selectedInRow.length;
hasSelection = true;
}
}
if (!hasSelection) {
combinationsCount = 0;
}
const savedQuinielasCount = document.querySelectorAll('.saved-quiniela').length;
const totalQuinielas = savedQuinielasCount + combinationsCount;
const pricePerCombination = totalQuinielas >= 10 ? 25 : 30;
const currentPrice = combinationsCount * pricePerCombination;
const currentSelectionInfo = document.getElementById('currentSelectionInfo');
if (combinationsCount > 0) {
currentSelectionInfo.style.display = 'block';
document.getElementById('currentCombinations').textContent = combinationsCount;
document.getElementById('currentPrice').textContent = currentPrice;
} else {
currentSelectionInfo.style.display = 'none';
}
const savedQuinielasInfo = document.getElementById('savedQuinielasInfo');
let savedCombinationsCount = 0;
if (savedQuinielasCount > 0) {
savedQuinielasInfo.style.display = 'block';
document.querySelectorAll('.saved-quiniela').forEach(quiniela => {
const predictionText = quiniela.querySelector('.prediction').innerHTML;
const predictionLines = predictionText.split('<br>').filter(line => line.trim() !== '');
const savedSelections = predictionLines.map(line => {
const parts = line.split(' = ');
return parts.length > 1 ? parts[1].split(',') : [];
}).filter(arr => arr.length > 0);
if (savedSelections.length === partidos.length) {
savedCombinationsCount += generateCombinations(savedSelections).length;
}
});
const pricePerSavedCombination = (savedCombinationsCount + combinationsCount) >= 10 ? 25 : 30;
const savedPrice = savedCombinationsCount * pricePerSavedCombination;
document.getElementById('savedCombinations').textContent = savedCombinationsCount;
document.getElementById('savedPrice').textContent = savedPrice;
} else {
savedQuinielasInfo.style.display = 'none';
}
}
function generateCombinations(arr) {
if (arr.length === 0) {
return [[]];
}
const first = arr[0];
const rest = arr.slice(1);
const restCombinations = generateCombinations(rest);
const combinations = [];
first.forEach(item => {
restCombinations.forEach(combination => {
combinations.push([item].concat(combination));
});
});
return combinations;
}
document.getElementById('randomQuinielaBtn').addEventListener('click', () => {
document.querySelectorAll('.circulo.selected').forEach(c => c.classList.remove('selected'));
const topPositions = ["28.0%", "36.4%", "45.0%", "53.3%", "62.0%", "70.3%", "78.7%", "87.5%", "96.0%"];  
topPositions.forEach(top => {
const rand = Math.random() * 100;
const filaContenedores = Array.from(document.querySelectorAll(`.circulo-contenedor[style*="top: ${top}"]`));    
let choices = [];
if (rand < 75) { 
choices.push(filaContenedores[Math.floor(Math.random() * filaContenedores.length)]);
} else if (rand < 95) {
let indices = [0, 1, 2];
let randomIndex1 = Math.floor(Math.random() * indices.length);
choices.push(filaContenedores[indices.splice(randomIndex1, 1)[0]]);
let randomIndex2 = Math.floor(Math.random() * indices.length);
choices.push(filaContenedores[indices.splice(randomIndex2, 1)[0]]);
} else { 
choices = filaContenedores;
}   
choices.forEach(contenedor => {
if (contenedor) {
contenedor.querySelector('.circulo').classList.add('selected');
}
});
});
updatePrice();
});
loadQuinielasFromLocalStorage();
document.getElementById('sendQuinielaBtn').addEventListener('click', sendAllQuinielas);
async function sendAllQuinielas() {
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyL6sQSHcd_B_SnLQi4oQJbHeE7-MnNowVUzFNtluxU1YUeC5m1Mkz3qU310nhQyb5c/exec';
const savedQuinielas = document.querySelectorAll('.saved-quiniela');
if (savedQuinielas.length === 0) {
Swal.fire({
title: 'Tarjeta roja 🟥',
text: '❌No tienes ninguna quiniela guardada para enviar❌',
imageUrl: 'tarjetaroja.png',
imageWidth: 150,
imageHeight: 150,
imageAlt: 'Tarjeta Roja',
background: '#fff',
color: '#000',
confirmButtonColor: '#C00030',
confirmButtonText: '¡A Jugar!'
});
return;
}
const totalSaved = savedQuinielas.length;
const pricePerQuiniela = totalSaved >= 10 ? 25 : 30;
const sendButton = document.getElementById('sendQuinielaBtn');
const spinnerContainer = document.getElementById('spinner-container');
const spinnerMessage = spinnerContainer.querySelector('.spinner-message');
sendButton.disabled = true;
sendButton.textContent = 'Enviando...';
spinnerContainer.style.display = 'flex';
spinnerMessage.textContent = `Enviando ${totalSaved} quinielas... ⚽🔥`;
const conversionMap = { 'L': 1, 'E': 2, 'V': 3 };
const quinielaDataForWhatsapp = [];
try {
const allQuinielasData = Array.from(savedQuinielas).map(quinielaElement => {
const name = quinielaElement.querySelector('.quiniela-info .name').textContent.replace('Nombre: ', '').trim();
const predictionHTML = quinielaElement.querySelector('.quiniela-info .prediction').innerHTML;
const textWithSeparators = predictionHTML.replace(/<br\s*\/?>/gi, '|||');
const strippedText = textWithSeparators.replace(/<[^>]+>/g, '').trim();
const predictions = strippedText.split('|||').filter(line => line.trim() !== '');
quinielaDataForWhatsapp.push({ name, predictions });
const quinielaPayload = {
nombre: name,
pago: pricePerQuiniela
};
predictions.forEach((pred, index) => {
let result = pred.split(' = ')[1];
if (result in conversionMap) {
result = conversionMap[result];
}
quinielaPayload[`partido${index + 1}`] = result;
});
return quinielaPayload;
});
const response = await fetch(SCRIPT_URL, {
method: 'POST',
headers: {
'Content-Type': 'text/plain;charset=utf-8',
},
body: JSON.stringify({ quinielas: allQuinielasData })
});
const result = await response.json();
if (result.result !== 'success') {
throw new Error(result.message || 'Hubo un error al procesar las quinielas en el servidor.');
}
let whatsappMessage = '“Te dejo mis quinielas 🔥⚽”\n\n';
quinielaDataForWhatsapp.forEach((quiniela, index) => {
whatsappMessage += `${index + 1}-${quiniela.name}\n`;
quiniela.predictions.forEach((pred, predIndex) => {
const result = pred.split(' = ')[1];
whatsappMessage += `P${predIndex + 1}: ${result.replace(/<br>/g, '')}\n`;
});
whatsappMessage += '\n';
});
const totalPrice = totalSaved * pricePerQuiniela;
whatsappMessage += `Mis quinielas: ${totalSaved}\n`;
whatsappMessage += `Precio: ${totalPrice}\n`;
whatsappMessage += 'En unos momentos te envío el comprobante 📩';
const whatsappUrl = `https://wa.me/528281142074?text=${encodeURIComponent(whatsappMessage)}`;
document.getElementById('whatsapp-redirect-btn').href = whatsappUrl;
document.getElementById('success-overlay').style.display = 'flex';
document.getElementById('savedQuinielasContainer').innerHTML = '';
localStorage.removeItem('savedQuinielas');
updatePrice();
} catch (error) {
console.error('Error:', error);
Swal.fire({
title: 'Ups...',
text: 'parece que algo falló 😅 Intenta más tarde y revisa tu conexión 🔥',
imageUrl: 'tarjetaroja.jpg',
imageWidth: 150,
imageHeight: 150,
imageAlt: 'Tarjeta Roja',
background: '#fff',
color: '#000',
confirmButtonColor: '#C00030',
confirmButtonText: 'Reintentar'
});
} finally {
sendButton.disabled = false;
sendButton.textContent = 'Enviar quiniela';
spinnerContainer.style.display = 'none';
spinnerMessage.textContent = 'Tus quinielas están entrando a la cancha ⚽🔥';
}
}
