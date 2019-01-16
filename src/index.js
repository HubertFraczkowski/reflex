const graReflex = {

	liczbaKafli : 25,	// liczba klocków
	kafleOnRow : 5,		// liczba klocków na rząd
	divTablica : null,	// div z planszą gry
	kafle: [],			// tutaj trafi wymieszana tablica klocków

	resetGame : function() {
		this.divTablica.innerHTML = ' ';

	},
    startGame : function() {
    	// czyścimy tablicę
	    this.divTablica = document.querySelector('.gra-tablica');

	    // czyścimy zmienne
	    this.kafle = [];

	    // generujemy tablicę numerów klocków
	    for (let i= 0; i < this.liczbaKafli; i++){
	    	this.kafle.push(i);
	    }

	    // i ją mieszamy
	    for (let i = this.liczbaKafli-1; i > 0; i--) {
	    	const swap = Math.floor(Math.random()*i);
	    	const tmp = this.kafle[i];
	    	this.kafle[i] = this.kafle[swap];
	    	this.kafle[swap] = tmp;
	    }


	    for ( let i= 0; i < this.liczbaKafli; i++) {
		   const kafelek = document.createElement('div');
		    kafelek.classList.add("gra-kafle");
		    this.divTablica.appendChild(kafelek);

		    kafelek.dataset.cardType = this.kafle[i];  
            kafelek.style.left = 50+(kafelek.offsetWidth+10)*(i%this.kafleOnRow) + 'px';
            kafelek.style.top = 50+(kafelek.offsetHeight+10)*(Math.floor(i/this.kafleOnRow)) + 'px'; 	
	    }

	}
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.gra-start').addEventListener('click', function() {
        graReflex.startGame();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.gra-reset').addEventListener('click', function() {
        graReflex.resetGame();
    });
});