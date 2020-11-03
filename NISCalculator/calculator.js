function p_clear(form){
    document.getElementById("p-input").reset();
    document.getElementById("p-output-frequency").reset();
    document.getElementById("p-output-time").reset();
    document.getElementById("p-output-length").reset();
    document.getElementById("p-output-velocity").reset();
    hide_element("p-output-test-section");
}

function p_compute(form){
/* （1）document.forms：表示获取当前页面的所有表单 
（2）document.forms[0]：表示获取当前页面的第一个表单 
（3）document.forms['exportServlet']：表示获取当前页面的name="exportServlet"的表单  */
    var ne = Math.abs(document.forms['p-input'].ne.value);
    var Te = Math.abs(document.forms['p-input'].Te.value);
    var Ti = Math.abs(document.forms['p-input'].Ti.value);
    var A = Math.abs(document.forms['p-input'].Ai.value);
    var Z = document.forms['p-input'].Zi.value;
    var B = 1.0e-3*document.forms['p-input'].B.value;
    // 输入值单位为mT，此处转为SI单位做计算
    
    var en = 2; // 输出小数位数
	var omega_pe;
	var omega_pi;
	var v_te;
	var v_ti;
	var omega_ce;
	var omega_ci;
	const epsilon0=8.854e-12;
	const echarge=1.6022e-19;
	const me=9.1094e-31;
	const mproton=1.6726e-27;
    // Frequency
	omega_pe=5.641*10*Math.sqrt(ne);
	// omega_pe=5.641*10*Math.sqrt(ne)*0; //for test assert_equal
    document.forms['p-output-frequency'].omega_pe.value = (omega_pe).toExponential(en);
    document.forms['p-output-frequency'].omega_pe_Hz.value = (omega_pe/2/Math.PI).toExponential(en);
    // omega_pi=1.316*Math.abs(Z)*Math.sqrt(ne/A); //精度达不到千分之一
    // omega_pi=Z*echarge*Math.sqrt(ne/(epsilon0*A*mproton)) // 精度丢失，传递到omega_pi_Hz
    // console.log(echarge*Math.sqrt(1/(epsilon0*mproton))/2/Math.PI);
    // 在Matlab中为0.2095396，在JS中为0.2095420
    omega_pi=1.316576*Math.abs(Z)*Math.sqrt(ne/A); 
    document.forms['p-output-frequency'].omega_pi.value = (omega_pi).toExponential(en);
    omega_pi_Hz=0.2095396*Math.abs(Z)*Math.sqrt(ne/A); 
    document.forms['p-output-frequency'].omega_pi_Hz.value = (omega_pi/2/Math.PI).toExponential(en);
    omega_ce=1.759e11*Math.abs(B);
	document.forms['p-output-frequency'].omega_ce.value = (omega_ce).toExponential(en);
	document.forms['p-output-frequency'].omega_ce_Hz.value = (omega_ce/2/Math.PI).toExponential(en);
    omega_ci=9.579e7*Math.abs(B*Z)/A
	document.forms['p-output-frequency'].omega_ci.value = (omega_ci).toExponential(en);
	document.forms['p-output-frequency'].omega_ci_Hz.value = (omega_ci/2/Math.PI).toExponential(en);
    // Time
    document.forms['p-output-time'].inverse_omega_pe.value = (2*Math.PI/omega_pe).toExponential(en);
    document.forms['p-output-time'].T_ce.value = (2*Math.PI/omega_ce).toExponential(en);
	document.forms['p-output-time'].T_ci.value = (2*Math.PI/omega_ci).toExponential(en);
	// Velocity
	v_te=4.194e5*Math.sqrt(Te);
    document.forms['p-output-velocity'].v_te.value = (v_te).toExponential(en);
    document.forms['p-output-velocity'].v_e.value = (1.414*v_te).toExponential(en);
    document.forms['p-output-velocity'].v_rmse.value = (1.596*v_te).toExponential(en);
    document.forms['p-output-velocity'].v_meane.value = (1.732*v_te).toExponential(en);
    document.forms['p-output-velocity'].v_bohm.value = (Math.sqrt(echarge*Te/A/mproton)).toExponential(en);
	v_ti=9.786e3*Math.sqrt(Ti/A);
    document.forms['p-output-velocity'].v_ti.value = (v_ti).toExponential(en);
    // Length
    document.forms['p-output-length'].lambda_d.value = (7.439e3*Math.sqrt(Te/ne)).toExponential(en);
    document.forms['p-output-length'].r_ce.value = (1.0e3*(v_te/omega_ce)).toExponential(en); //转换成单位mm后输出
    document.forms['p-output-length'].r_ci.value = (1.0e3* (v_ti/omega_ci)).toExponential(en);
    return true;
} 

function p_test(form)
{
    p_clear(form);
    p_compute(form);
    display_element("p-output-test-section");
    var test1_result="通过测试。";
    try {
    // Frequency
    assert_equal(document.forms['p-output-frequency'].omega_pe.value,5.679e9*2*Math.PI,"omega_pe");
    assert_equal(document.forms['p-output-frequency'].omega_pe_Hz.value ,5.679e9,"omega_pe_Hz");
    assert_equal(document.forms['p-output-frequency'].omega_pi.value ,8.323e8,"omega_pi"); //[1]中原始系数0.21的小数位数过少
    assert_equal(document.forms['p-output-frequency'].omega_pi_Hz.value ,1.325e8,"omega_pi_Hz");
	assert_equal(document.forms['p-output-frequency'].omega_ce.value ,2.52e8*2*Math.PI,"omega_ce");
	assert_equal(document.forms['p-output-frequency'].omega_ce_Hz.value ,2.52e8,"omega_ce_Hz");
	assert_equal(document.forms['p-output-frequency'].omega_ci.value ,1.37e5*2*Math.PI,"omega_ci");
	assert_equal(document.forms['p-output-frequency'].omega_ci_Hz.value ,1.37e5,"omega_ci_Hz");
    // Time
    assert_equal(document.forms['p-output-time'].inverse_omega_pe.value ,1/5.679e9,"inverse_omega_pe");
    assert_equal(document.forms['p-output-time'].T_ce.value ,1/2.52e8,"T_ce");
	assert_equal(document.forms['p-output-time'].T_ci.value ,1/1.37e5,"T_ci");
	// Velocity
    assert_equal(document.forms['p-output-velocity'].v_te.value ,5.93e5,"v_te");
    assert_equal(document.forms['p-output-velocity'].v_ti.value ,6.92e3,"v_ti");
    assert_equal(document.forms['p-output-velocity'].v_bohm.value ,1.38e4,"v_bohm");
    // assert_equal(document.forms['p-output-velocity'].v_e.value ,,"v_e");
    // assert_equal(document.forms['p-output-velocity'].v_rmse.value ,,"v_rmse");
    // assert_equal(document.forms['p-output-velocity'].v_meane.value,,"v_meane");
    // Length
    assert_equal(document.forms['p-output-length'].lambda_d.value ,1.66e-5,"lambda_d");
    assert_equal(document.forms['p-output-length'].r_ce.value ,3.75e-1,"r_ce");
    assert_equal(document.forms['p-output-length'].r_ci.value ,8.03,"r_ci");
    }
    catch (err) {
        console.error(err);
        test1_result="失败，见浏览器控制台。";
        window.alert(err);
    }
    finally {
        document.forms['p-output-test'].test1_result.value=test1_result;
    }
}


// function plasma_frequency(n,q,m)
// {
	// const epsilon0=8.854e-12;
  // return Math.sqrt(n*q*q/epsilon0/m);
// }

function display_element(element_ID){
var element1=document.getElementById(element_ID);
element1.style.display="";
// element1.style.display=(element1.style.display=="none"?"":"none");
}
function hide_element(element_ID){
var element1=document.getElementById(element_ID);
element1.style.display="none";
}

// js输出 参考https://www.runoob.com/js/js-output.html
// 测试工具 参考https://juejin.im/post/6844903616902332424
// console.log('the word is %s try number %d', 'foo', 123); //写到控制台
// console.assert(2==1+1, "error"); // js自带断言
function assert (condition, msg) //自制工具函数
{
if (!condition) {
  throw new Error(`[test failed] ${msg}`)
}
}
function assert_equal (actual, expected, var_name) //自制工具函数
{
if (Math.abs(actual-expected)>Math.abs(expected/100) || Math.sign(actual)!=Math.sign(expected)) {
  throw new Error(`[test failed] ${var_name} 计算错误`)
}
}
// const assert = require('assert'); // 需要require工具包
// assert.strictEqual(sum(), 0); // 需要node.js