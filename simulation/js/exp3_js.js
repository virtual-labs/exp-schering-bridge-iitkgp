
var w,check=0;


function add(x,y)
{ 
	var z=[];
	z[0]=x[0] + y[0];
	z[1]=x[1] + y[1];
	return z;
}
function mult(x,y)
{ 
	var z=[];
	z[0]=(x[0] * y[0]) - (x[1] * y[1]);
	z[1]=(x[0] * y[1]) + (x[1] * y[0]);
	return z;
}
function div(x,y)
{ 
	var z=[]; var t=[];
	t[0]=(y[0]) / ((y[0] * y[0]) + (y[1] * y[1]));
	t[1]=(-1 * y[1]) / ((y[0] * y[0]) + (y[1] * y[1]));
	z=mult(x,t);
	return z;
}

/////////////////////////////// The code starts from here/////////////////////////////////////
function Set_c()
{
	var image = document.getElementById('myImage');
	if (image.src.match("s2")) 
	{
		alert('Switch off the circuit first.');
	}
	else
	{
		document.f1.r1.value= 20;
		document.f1.c1.value= parseFloat(document.getElementById('c33').value);
	}
}
function simulate_rc()
{
	if(check==1)
	{
		
		var f1=parseFloat(document.getElementById('f1').value);
		w= 2*3.14*f1;
		var c2=parseFloat(document.getElementById('C2').value);
		var r3=parseFloat(document.getElementById('R3').value);
		var r4=parseFloat(document.getElementById('R4').value);
		document.f1.c333.value = (((r4*c2)/r3) * 1000000).toPrecision(5);
		var c4=parseFloat(document.getElementById('C4').value);
		document.f1.r333.value = ((r3*c4)/c2).toPrecision(5);
		document.f1.rd33.value = (w * ((r4*c2)/r3) * ((r3*c4)/c2)).toPrecision(5);
	}
	else
	{
		alert("Please Switch on the supply to verify the milivoltmeter reading first.");
	}

}
function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;	 
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
}
function changeImage() {
	
		var image = document.getElementById('myImage');
		var im5= document.getElementById('v1');
		var im6= document.getElementById('f1');
		if (image.src.match("s1")) {
			image.src = "./images/s2.png"; cf3=1;
			im5.setAttribute('readonly', 'readonly'); im6.setAttribute('readonly', 'readonly');
			check=1;
			execute_ckt();
		} else {
			image.src = "./images/s1.png"; cf3=0;
			im5.removeAttribute('readonly'); im6.removeAttribute('readonly');
			document.f1.A1.value = 0; check=0;
			perform_meter();
			document.f1.A2.value='';
			document.f1.c333.value='';
			document.f1.r333.value='';
			document.f1.rd33.value='';
			
		}
	}
	function execute_ckt()
	{
		if(check==1)
		{
			document.f1.A1.value=0;
			var r1=[], r3=[], r4=[], v1=[], c1=[], c2=[], c4=[], f1;
			var  z1=[], z2=[], z3=[], z4=[], i2=[], i1=[], dv=[], dvv;
			f1=parseFloat(document.getElementById('f1').value);
			w= 2*3.141*f1;
			r3[0]=parseFloat(document.getElementById('R3').value); r3[1]=0;
			r1=[20,0];
			r4[0]=parseFloat(document.getElementById('R4').value); r4[1]=0; 
			c2[1]=(-1 / (w * parseFloat(document.getElementById('C2').value))); c2[0]=0; 
			c4[1]=(-1 / (w * parseFloat(document.getElementById('C4').value))); c4[0]=0; 
			c1[1]=(-1 / (w * (parseFloat(document.getElementById('c33').value))/1000000)); c1[0]=0; 
			v1[0]=parseFloat(document.getElementById('v1').value); v1[1]=0; 
			
			z1=add(c1,r1);
			z2=c2;
			z3=r3;
			z4=div(mult(c4,r4),add(c4,r4));
			i1= div(v1, add(z1,z3));
		    i2= div(v1, add(z2,z4));
			dv=add(mult(i1,z1),(mult([-1,0], mult(i2,z2))));
			//z=div(mult(z1,z2),add(z1,z2));
			//i=div(v1,z); alert(i);
			//i1=div(mult(div(v1,z),z2), add(z1,z2)); 
			//i2=div(mult(div(v1,z),z1), add(z1,z2)); 
			//dv=add(mult(i1,r3),( mult(i2,div(mult(c4,r4),add(c4,r4)))));
			//alert(dv[0]); alert(dv[1]);
			dvv=(Math.sqrt((dv[0] * dv[0]) + (dv[1] * dv[1])))*1000 ;
			document.f1.A1.value= dvv.toPrecision(10);
			document.f1.A2.value= dvv.toPrecision(10);
			perform_meter();
		}
		
	}





