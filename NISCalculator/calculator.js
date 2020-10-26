function p_clear(form){
    document.getElementById("p-input").reset();
    document.getElementById("p-output-frequency").reset();
    document.getElementById("p-output-length").reset();
    document.getElementById("p-output-velocities").reset();
}

function p_compute(form){
/* （1）document.forms：表示获取当前页面的所有表单 
（2）document.forms[0]：表示获取当前页面的第一个表单 
（3）document.forms['exportServlet']：表示获取当前页面的name="exportServlet"的表单  */
    var ne = document.forms['p-input'].ne.value;
    var Te = document.forms['p-input'].Te.value;
    var Ti = document.forms['p-input'].Ti.value;
    var A = document.forms['p-input'].Ai.value;
    var Z = document.forms['p-input'].Zi.value;
    var B = 1.0e-3*document.forms['p-input'].B.value;
    var en = 2; // 小数位数
	var omega_pe;
	var v_te;
	var v_ti;
	var omega_ce;
	var omega_ci;
	const epsilon0=8.854e-12;
	const echarge=1.6e-19;
	const me=9.109e-31;
	const mproton=1.67e-27;
    const pi=3.1415926;
	

    // Frequencies
	omega_pe=5.641*10*Math.sqrt(ne);
    document.forms['p-output-frequency'].omega_pe.value = (omega_pe).toExponential(en);
    omega_ce=1.759e11*B;
	document.forms['p-output-frequency'].omega_ce.value = (omega_ce).toExponential(en);
    omega_ci=9.577e7*B*Z/A
	document.forms['p-output-frequency'].omega_ci.value = (omega_ci).toExponential(en);
	
    // Time
    document.forms['p-output-time'].inverse_omega_pe.value = (1/omega_pe).toExponential(en);
    document.forms['p-output-time'].T_ce.value = (2*pi/omega_ce).toExponential(en);
	document.forms['p-output-time'].T_ci.value = (2*pi/omega_ci).toExponential(en);

	// Velocities
	v_te=4.194e5*Math.sqrt(Te);
    document.forms['p-output-velocity'].v_te.value = (v_te).toExponential(en);
    document.forms['p-output-velocity'].v_e.value = (1.414*v_te).toExponential(en);
    document.forms['p-output-velocity'].v_rmse.value = (1.596*v_te).toExponential(en);
    document.forms['p-output-velocity'].v_meane.value = (1.732*v_te).toExponential(en);
    document.forms['p-output-velocity'].v_bohm.value = (Math.sqrt(echarge*Te/A/mproton)).toExponential(en);
	v_ti=9.786e3*Math.sqrt(Ti/A);
    document.forms['p-output-velocity'].v_ti.value = (v_ti).toExponential(en);
	
	
    // Lengths
    document.forms['p-output-length'].lambda_d.value = (7.439e3*Math.sqrt(Te/ne)).toExponential(en);
    document.forms['p-output-length'].r_ce.value = (1.0e3*(v_te/omega_ce)).toExponential(en);
    document.forms['p-output-length'].r_ci.value = (1.0e3* (v_ti/omega_ci)).toExponential(en);

    return;
} 