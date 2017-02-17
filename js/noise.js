function hash(x) {
    var nx = x*1.380251;
	var n = Math.floor(nx);
  	var f = nx - n;
  	var h = 355.347391*f+n*5.3794610581+41.53823;
  	h = h*h+f*h+f*f*37.3921539+0.3861203;
    var nf = Math.floor(h);
  	return h - nf;
}

function smoothNoise(x) {
  	var n = Math.floor(x);
  	var f = x - n;
  	var n2 = n + 1;
   	var h1 = hash(n);
  	var h2 = hash(n2);
  	smooth = f*f*(3-2*f);
 	return h1*(1-smooth)+h2*smooth;
}

function fractalNoise(x) {
	
  	var p = x + 11.3951031;
	var amp = 0.7;
  	var scale = 10.0;
  	var result = 0.0;
  	for (var i = 0; i<6; i++) {
    	result += amp*smoothNoise(p*scale);
    	amp *= 0.5;
      	scale *= 2.0;
    }
  
	return result;
}