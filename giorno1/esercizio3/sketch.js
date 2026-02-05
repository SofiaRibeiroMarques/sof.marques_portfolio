let flamingos = [];
let lastFlamingoTime = 0;
let topBar;
let topBarHeight = 0;

function setup() {
	createCanvas(windowWidth, windowHeight)
	// Seleziona la top-bar per calcolarne l'altezza e usarla per centrare il testo
    topBar = select('.top-bar');
    if (topBar) {
        topBarHeight = topBar.height;
    }
}

function draw() {
	background(255, 220, 230) // Rosa chiaro
	noFill()
	stroke(255, 0, 255) // Fucsia
	strokeWeight(2) //spessore bordo

	// Rende la dimensione della scritta responsive in base alla larghezza della finestra
	let s = width / 85;
	// Calcolo la larghezza e l'altezza totali della scritta per centrarla
	let textWidth = (51 + 6) * s; // 51 è l'ultimo offset, 6 la larghezza dell'ultima lettera
	let textHeight = 10 * s; // 10 è l'altezza massima di una lettera
	let px = (width / 2) - (textWidth / 2)
	// Calcola la posizione Y per centrare il testo, tenendo conto della top-bar
	let py = (height / 2) - (textHeight / 2) - (topBarHeight / 2);
	let letters = [
		[[0,0], [6,0], [6,2], [2,2], [2,4], [5,4], [5,6], [2,6], [2,10], [0,10]], // F
		[[0,0], [2,0], [2,8], [6,8], [6,10], [0,10]], // L
		[[2,0], [6,0], [8,10], [6,10], [5,6], [3,6], [2,10], [0,10]], // A
		[[3,2], [5,2], [4.5,4], [3.5,4]], // A (buco)
		[[0,0], [2,0], [4,4], [6,0], [8,0], [8,10], [6,10], [6,4], [4,8], [2,4], [2,10], [0,10]], // M
		[[0,0], [2,0], [2,10], [0,10]], // I
		[[0,0], [2,0], [6,6], [6,0], [8,0], [8,10], [6,10], [2,4], [2,10], [0,10]], // N
		[[6,2], [2,2], [2,8], [4,8], [4,6], [6,6], [6,10], [0,10], [0,0], [6,0]], // G
		[[0,0], [6,0], [6,10], [0,10]], // O
		[[2,2], [4,2], [4,8], [2,8]] // O (buco)
	]


	let offsets = [0, 7, 14, 14, 23, 32, 35, 44, 51, 51]

	for (let i = 0; i < letters.length; i++) {
		beginShape()
		let shape = letters[i]
		let xOff = offsets[i]
		for (let j = 0; j < shape.length; j++) {
			let vx = shape[j][0]
			let vy = shape[j][1]
			// Disegna il vertice con l'offset e il tremolio (random)
			vertex(px + (xOff + vx) * s + random(-1,1), py + vy * s + random(-1,1))
		}
		endShape(CLOSE)
	}


	if (millis() - lastFlamingoTime > 150) {
		let x, y;
		let isInside = true;
		// Rende il margine attorno al testo responsive
		const margin = s * 5; // Spazio extra attorno al testo

		// Continua a generare coordinate finché non ne trova una fuori dall'area del testo
		while (isInside) {
			x = random(width);
			y = random(height);
			if (x < px - margin || x > px + textWidth + margin || y < py - margin || y > py + textHeight + margin) {
				isInside = false;
			}
		}
		// Rende la dimensione delle emoji responsive
		flamingos.push({ x: x, y: y, size: random(s * 2, s * 10) });
		lastFlamingoTime = millis();
	}

	// Disegna i fenicotteri
	fill(0);
	noStroke();
	textAlign(CENTER, CENTER);
	for (let i = 0; i < flamingos.length; i++) {
		textSize(flamingos[i].size);
		text('🦩', flamingos[i].x, flamingos[i].y);
	}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	// Ricalcola l'altezza della top-bar quando la finestra viene ridimensionata
    if (topBar) {
        topBarHeight = topBar.height;
    }
}
