const graReflex = {

	liczbaKafli : 25,	// liczba klocków
	kafleOnRow : 5,		// liczba klocków na rząd
	divTablica : null,	// div z planszą gry
	kafle: [],			// tutaj trafi wymieszana tablica klocków
	przyciskButton : '',
	przyciskKlasa : ' ',
	numerKlocka : null,
	divCzas : null,		// div z odliczanym czasem
	divPunkty : "",		// div z punktami
	dodatkowyPunkt : 0,	// punkt z prawidłowe zaznaczenie
	divLiczbaZyc : null,
	liczbaZyc : 3,
	divIleSekund : null,


	kafelekClick: function(e) {
		if (e.target.dataset.dziala) {
			this.dodatkowyPunkt+=1;
			this.divPunkty.innerHTML = this.dodatkowyPunkt;
		}
		else {
			alert("Straciles zycie");
			this.liczbaZyc--;
			this.divLiczbaZyc.innerHTML= this.liczbaZyc;
			if (this.liczbaZyc <= 0) {
				alert("Gra skonczona");
				this.graSkonczona();
				this.divIleSekund = document.getElementById('ileSekund');
				this.divIleSekund.style.display = 'none';
			}
		}
	
	},

	graSkonczona : function () {
		this.startGame.ileSekund = ' ';
		this.liczbaZyc.innerHTML = 0;
		this.divTablica.innerHTML = ' ';
		this.divTablica.innerHTML = ' ';

	},

	przyznajePunkty : function() {
		this.dodatkowyPunkt+=1;
		console.log("dodatkowy punkt: "+this.dodatkowyPunkt);
		this.divPunkty = document.getElementById("punkty");
		this.divPunkty.innerHTML = this.dodatkowyPunkt;
	},

    startGame : function() {

    	// ukrywamy przycist START
    	document.querySelector('.gra-start').style.display = 'none';

    	// czyścimy tablicę
		this.divTablica = document.querySelector('.gra-tablica');
		this.divTablica.innerHTML = ' ';

		// czyścimy planszę z punktami
		this.divPunkty = document.getElementById("punkty");
		this.divPunkty.innerHTML = 0;

	    // czyścimy zmienne
	    this.kafle = [];

	    // czyścimy liczbę żyć
	    this.divLiczbaZyc = document.getElementById("liczbaZyc");
	    this.divLiczbaZyc.innerHTML = this.liczbaZyc;

	    this.ileSekund = 60;

	    this.divCzas = document.getElementById("ileSekund");
	    this.divCzas.innerHTML = this.ileSekund;


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
		   const kafelek = document.createElement('button');
			kafelek.classList.add("gra-kafle");
			kafelek.setAttribute("id", this.kafle[i]);
		    this.divTablica.appendChild(kafelek);

            kafelek.style.left = 10+(kafelek.offsetWidth+10)*(i%this.kafleOnRow) + 'px';
			kafelek.style.top = 10+(kafelek.offsetHeight+10)*(Math.floor(i/this.kafleOnRow)) + 'px'; 	
			
			kafelek.addEventListener('click', this.kafelekClick.bind(this));
		}


		// podświetlam po kolei klocki które należy wciskać i uruchamiam minutnik
		let j = 0;
		const kolejnyDiv = setInterval(function(){
				this.przyciskButton = document.getElementById(j);
				j++;
				this.przyciskButton.style.background= 'green';
				this.przyciskButton.dataset.dziala = true;
				setTimeout(function() {
					this.przyciskButton.style.background = '#f6da17';
					this.przyciskButton.dataset.dziala = false;
				}, 2000);

			    if (j >= 25) {
		        	clearInterval(kolejnyDiv);
			    }
			}, 3000);

		let ileSekund= 63;	
		const czas = setInterval(function() {				
				ileSekund--;
				if(ileSekund <61){
					this.divCzas = document.getElementById("ileSekund").innerHTML = ileSekund;			
				    
				    if (  ileSekund < 1 ) {
		        		clearInterval(czas);
				    }
		    	}
			}, 1000);
	},



	resetGame : function() {		
		window.location.reload(false); 
	}
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.gra-start').addEventListener('click', function() {
        graReflex.startGame();
    });
});

document.querySelector('.gra-reset').addEventListener('click', function() {
	graReflex.resetGame();
})
