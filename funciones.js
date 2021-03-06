/*-----------------MÉTODO DIRECTO-----------------*/
/*------------------------------------------------*/
function dibujarLinea(xi,yi,xf,yf) 
{
	var v = validados(xi,yi,xf,yf);
	var m = (v.yf-v.yi)/(v.xf-v.xi);
	var b = v.yi - m*v.xi;

	for (var i = v.xi ; i <= v.xf; i++) {
		var y = (m*i)+b;
		ctx.putImageData(imgData, i, Math.round(y));
		console.log(i);
	}

}
/*------------------------------------------------*/
/*-----------------ADD SIMPLE-----------------*/
/*------------------------------------------------*/
function dibujarLineaAddSimple(xi,yi,xf,yf)
{
	var m = (yf-yi)/(xf-xi);
	if ( ((Math.abs(m))<1 && xi>xf) ||  ((Math.abs(m))<1 && yi>yf) ) 
	{
		var aux;
			aux = xf;
			xf = xi;
			xi = aux;
			aux = yf;
			yf = yi;
			yi = aux;
	}
	ctx.putImageData(imgData, xi, yi);
	if ((Math.abs(m))<1) 
	{
		var yr = yi;
		for (var i = xi-1; i <= xf-1; i++) 
		{
			yr = yr+m;
			ctx.putImageData(imgData, i, Math.round(yr));
		}
	}
	else
	{
		var xr = xi;
		var im = 1/m;
		for (var i = yi+1; i <= yf-1; i++) {
			xr = xr+im;
			ctx.putImageData(imgData,Math.round(xr),i);
		}
	}
	ctx.putImageData(imgData, xf, yf);

}

/*------------------------------------------------*/
/*-----------------ADD ENTERO-----------------*/
/*------------------------------------------------*/

function dibujarLineaADDEntero(xi,yi,xf,yf)
{
	var dy= yf-yi;
	var dx= xf-xi;
	console.log(xi,yi,xf,yf);
	if( (Math.abs(dy) > Math.abs(dx) && yi>yf) || (Math.abs(dy) < Math.abs(dx) && xi>xf) )
	{
		var aux,
			aux = xf;
			xf = xi;
			xi = aux;
			aux = yf;
			yf = yi;
			yi = aux;
	}
	console.log(xi,yi,xf,yf);
	var x = xi;
	var y = yi;
	var e = 0;
	dy= yf-yi;
	dx= xf-xi;
	ctx.putImageData(imgData,x,y); // dibuja primer punto
	if ( Math.abs(dy) < Math.abs(dx) ) //caso 1 y 3 x es mas grande que y //diagonal (0,0) (300,300)
	{

		if ( dy<0 ) //caso 1 dy negativo
		{
			for (var i = 1; i <=dx-1; i++) {
				if(e<0){
					x=x+1;
					y=y-1;
					ctx.putImageData(imgData,x,y);
					e=e-dy;
				}
				else // if (e>=0) 
				{
					x=x+1;
					ctx.putImageData(imgData,x,y);
					e=e-dy-dx;
				}
			}
		}
		else// if (dy>=0)  // caso 3 dy positivo
		{
			for(i=1;i<=dx-1;i++)
			{
				if (e<0) 
				{
					x=x+1;
					y=y+1;
					ctx.putImageData(imgData,x,y);
					e=e-dy+dx;
				}
				else // if (e>=0) 
				{
					x=x+1;
					ctx.putImageData(imgData,x,y);
					e=e-dy;
				}
			}
		} 		
	}			//end caso 1 y 3
	else if ( Math.abs(dy) >= Math.abs(dx) )  //caso 2 y 4
	{
		if (dx<0) 	// caso 2 dx negativo
		{
			for (var i = 1; i <=dy-1; i++) 
			{
				if (e<0) 
				{
					y=y+1;
					x=x-1;
					ctx.putImageData(imgData,x,y);
					e=e+dx+dy;
					//console.log(x,y); //asdfasdfasdfs
				}
				else // if (e>=0) 
				{
					y=y+1;
					ctx.putImageData(imgData,x,y);
					e=e+dx;
				}
			}
		}
		else // if (dx>0)  //caso 4 dx positivo
		{
			for (var i = 1; i <=dy-1; i++) 
			{
				if (e<0) 
				{
					y=y+1;
					x=x+1;
					ctx.putImageData(imgData,x,y);
					e=e-dx+dy;
				}
				else // if (e>=0) 
				{
					y=y+1;
					ctx.putImageData(imgData,x,y);
					e=e-dx;
				}
			}
		}

		//añadido
			if ( (Math.abs(dy)===Math.abs(dx)) && ((dy<0&&dx>0)||(dy<0&&dx<0)))
			{
				if (dy<0&&dx>0) 
				{
					for (var i = 1; i <=Math.abs(dy)-1; i++) {
						x=x+1;
						y=y-1;
						ctx.putImageData(imgData,x,y);
					}
				}
				else if (dy<0&&dx<0) 
				{
					for (var i = 1; i <=Math.abs(dy)-1; i++) {
						x=x-1;
						y=y-1;
						ctx.putImageData(imgData,x,y);
					}
				}
			}
	}


	ctx.putImageData(imgData,xf,yf); //dibuja ultimo punto
}


/*TRAZADO DE CIRCULOS*/


/*----------------------------------------------------------*/
/*-----------------1. REPRESENTACIÓN IMPLÍCITA-----------------*/
/*----------------------------------------------------------*/


function dibujarCirculoImplicita(xc,yc,r)
{
	console.log(xc,yc,r); // esta recibiendo los valores
	var ys,yi,xi,p,xj;
	ys=yi=yc;
	xi=xj=xc;
	for (var i = 0; i <= Math.abs(r); i++) {
		p=Math.sqrt( Math.pow(r,2)-Math.pow((xi-xc),2) );
		ys=yc+p;
		yi=yc-p;
		ctx.putImageData(imgData,xi,ys);
		ctx.putImageData(imgData,xi,yi);
		xi=xi+1;
		ctx.putImageData(imgData,xj,ys);
		ctx.putImageData(imgData,xj,yi);
		xj=xj-1;
	}
}

/*----------------------------------------------------------*/
/*-----------------2. PARAMÉTRICA POLAR---------------------*/
/*----------------------------------------------------------*/

function circ_polar(xc,yc,r)
{
	console.log(xc,yc,r); // esta recibiendo los valores
	var x,y,i;
	for (var i = 1; i <=360; i++) {
		x=xc+r*Math.cos(i/r);
		y=yc+r*Math.sin(i/r);
		ctx.putImageData(imgData,x,y);
		x=x+1;
		y=y+1;
	}
}

/*----------------------------------------------------------*/
/*-----------------3. TRAZADO INCREMENTAL---------------------*/
/*----------------------------------------------------------*/

function circ_incremental(xc,yc,r)
{
	var x,y,i,xtemp;
	const dalfa=1/r;
	const cost = Math.cos(dalfa);
	const sent = Math.sin(dalfa);
	const fi = 1;
	x=0;
	y=r;
	while (y>x) 
	{
		ctx.putImageData(imgData, Math.round(xc+x), Math.round(yc+y*fi));
		ctx.putImageData(imgData, Math.round(xc-x), Math.round(yc+y*fi));
		ctx.putImageData(imgData, Math.round(xc+x), Math.round(yc-y*fi));
		ctx.putImageData(imgData, Math.round(xc-x), Math.round(yc-y*fi));

		// ctx.putImageData(imgData, Math.round(xc+y), Math.round(yc+y*fi));
		// ctx.putImageData(imgData, Math.round(xc-y), Math.round(yc+y*fi));
		// ctx.putImageData(imgData, Math.round(xc+y), Math.round(yc-y*fi));
		// ctx.putImageData(imgData, Math.round(xc-y), Math.round(yc-y*fi));

		// console.log(Math.round(xc+y),Math.round(yc+y*fi));
		xtemp = x;
		x=(x*cost-y*sent);
		y=(y*cost+xtemp*sent);
	}
}




/*----------------------------------------------------------*/
/*-----------------4. SEGMENTOS DE RECTA---------------------*/
/*----------------------------------------------------------*/

function circ_segmento(xc,yc,r)
{
	var x,y,i;
	const dos_pi=2;
	const pi=1;
	const dalfa=dos_pi/16*r;
	const cost=Math.cos(dalfa);
	const sent=Math.sin(dalfa);
	x=0;
	y=r;

	if (ctx) {
		// ctx.lineWidth = 1;
		ctx.strokeStyle = "#000";
		ctx.beginPath();
		ctx.moveTo(xc+x, Math.round(yc+y*pi));
		for (var i = 1; i <=16*r; i++) 
		{
			xtemp=x;
			x=(x*cost-y*sent);
			y=(y*cost+xtemp*sent);
			// ctx.putImageData(imgData, Math.round(xc+x), Math.round(yc+y*pi));
			ctx.lineTo(Math.round(xc+x), Math.round(yc+y*pi));
			console.log(i);

		}
			ctx.stroke();
	}
}

/*----------------------------------------------------------*/
/*-----------------5. CIRCULO BRESENHAM---------------------*/
/*----------------------------------------------------------*/

function circulo_bresenham(xc,yc,r)
{
	console.log('BRESENHAM');
	var x = xc;
	var x2 = xc;
	var y = yc-r;
	var yi = yc+r;
	var dA = 0;
	var dB = 0;
	var s = 0;
	var a,b;
	const rpow2 = Math.pow(r,2);
	const rsqrt2 = Math.round(r/Math.sqrt(2,2));

	ctx.putImageData(imgData, x, y);
	for (var i = 0; i <= rsqrt2; i++) {
		dA = Math.pow(y-yc,2)+Math.pow(x+1-xc,2)-rpow2;
		dB = Math.pow(y+1-yc,2)+Math.pow(x+1-xc,2)-rpow2;
		s = dA + dB;
		if (s>0) 
		{
			a=x+1;
			b=y+1;
			ctx.putImageData(imgData,a,b); //enciende pixel B
			ctx.putImageData(imgData,b,a); //enciende pixel B
			ctx.putImageData(imgData,a,yi-1);
			ctx.putImageData(imgData,yi-1,a);
			ctx.putImageData(imgData,x2-1,b);
			ctx.putImageData(imgData,b,x2-1);
			ctx.putImageData(imgData,x2-1,yi-1);
			ctx.putImageData(imgData,yi-1,x2-1);
			
			y=y+1;
			yi=yi-1;
			x=x+1;
			x2=x2-1;
			console.log('b');
		}
		else{
			a=x+1;
			b=y;
			ctx.putImageData(imgData,a,b); //enciende pixel A
			ctx.putImageData(imgData,b,a); //enciende pixel A
			ctx.putImageData(imgData,a,yi-1);
			ctx.putImageData(imgData,yi-1,a);
			ctx.putImageData(imgData,x2-1,b);
			ctx.putImageData(imgData,b,x2-1);
			ctx.putImageData(imgData,x2-1,yi-1);
			ctx.putImageData(imgData,yi-1,x2-1);

			x=x+1;
			x2=x2-1;
			console.log('a');
		}
	}
}






