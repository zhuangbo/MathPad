

var phone = $(window).width()<576;
var mathInput = null;


var Preview = {
  delay: (phone ? 300 : 200), // delay after keystroke before updating
  preview: null,     // filled in by Init below
  buffer: null,      // filled in by Init below
  timeout: null,     // store setTimout id
  mjRunning: false,  // true when MathJax is processing
  mjPending: false,  // true when a typeset has been queued
  oldText: null,     // used to check if an update is needed
  //
  //  Get the preview and buffer DIV's
  //
  Init: function () {
    this.preview = document.getElementById("MathPreview");
    this.buffer = document.getElementById("MathBuffer");
  },
  //
  //  Switch the buffer and preview, and display the right one.
  //  (We use visibility:hidden rather than display:none since
  //  the results of running MathJax are more accurate that way.)
  //
  SwapBuffers: function () {
    var buffer = this.preview, preview = this.buffer;
    this.buffer = buffer; this.preview = preview;
    buffer.style.visibility = "hidden"; buffer.style.position = "absolute";
    preview.style.position = ""; preview.style.visibility = "";
  },
  //
  //  This gets called when a key is pressed in the textarea.
  //  We check if there is already a pending update and clear it if so.
  //  Then set up an update to occur after a small delay (so if more keys
  //    are pressed, the update won't occur until after there has been
  //    a pause in the typing).
  //  The callback function is set up below, after the Preview object is set up.
  //
  Update: function () {
    if (this.timeout) {clearTimeout(this.timeout)}
    this.timeout = setTimeout(this.callback,this.delay);
  },
  //
  //  Creates the preview and runs MathJax on it.
  //  If MathJax is already trying to render the code, return
  //  If the text hasn't changed, return
  //  Otherwise, indicate that MathJax is running, and start the
  //    typesetting.  After it is done, call PreviewDone.
  //
  autosave: function(text){}, // placeholder for auto save function
  CreatePreview: function () {
    Preview.timeout = null;
    if (this.mjPending) return;
    // var text = document.getElementById("MathInput").value;
    var text = mathInput.summernote('code');
    if (text === this.oldtext) return;
    if (this.mjRunning) {
      this.mjPending = true;
      MathJax.Hub.Queue(["CreatePreview",this]);
    } else {
      this.buffer.innerHTML = this.oldtext = text;
      this.mjRunning = true;
      MathJax.Hub.Queue(
        ["resetEquationNumbers",MathJax.InputJax.TeX],
        ["Typeset",MathJax.Hub,this.buffer],
        ["PreviewDone",this],
        ["ResizePreview",this]
      );
      // auto save
      this.autosave(text);
    }
  },
  //
  //  Indicate that MathJax is no longer running,
  //  and swap the buffers to show the results.
  //
  PreviewDone: function () {
    this.mjRunning = this.mjPending = false;
    this.SwapBuffers();
  }
};
//
//  Cache a callback to the CreatePreview action
//
Preview.callback = MathJax.Callback(["CreatePreview",Preview]);
Preview.callback.autoReset = true;  // make sure it can run more than once




//
// fitting view structure for mobile and desktop
//
if(phone) {
  // horizontal scroll for small media
  // change sections to slides
  $('#page-welcome,#page-edit,#page-preview')
    .removeClass('section')
    .addClass('slide');
  // #fullpage as section, #mobile-wapper as new fullpage
  $('#fullpage')
    .addClass('section')
    .addClass('fp-noscroll');
  // prevent scroll bar for edit to avoiding
  // lose-focus-problem caused by window resing
  $('#page-welcome').removeClass('fp-noscroll');
} else {
  // keep initial settings
}

// show sliding mode indicator
var slidingfa = phone ? 'fa-arrows-h' : 'fa-arrows-v';
$('#sliding-mode-indicator').attr('class',
  'fa fa-lg text-info ' + slidingfa);
$('#modal-sliding-mode .'+slidingfa).parent().addClass('text-info');

// change themes
var themes = {
  "default":
  "https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css",
  "cerulean" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/cerulean/bootstrap.min.css",
  "cosmo" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/cosmo/bootstrap.min.css",
  "cyborg" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/cyborg/bootstrap.min.css",
  "darkly" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/darkly/bootstrap.min.css",
  "flatly" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/flatly/bootstrap.min.css",
  "journal" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/journal/bootstrap.min.css",
  "lumen" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/lumen/bootstrap.min.css",
  "paper" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/paper/bootstrap.min.css",
  "readable" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/readable/bootstrap.min.css",
  "sandstone" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/sandstone/bootstrap.min.css",
  "simplex" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/simplex/bootstrap.min.css",
  "slate" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/slate/bootstrap.min.css",
  "spacelab" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/spacelab/bootstrap.min.css",
  "superhero" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/superhero/bootstrap.min.css",
  "united" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/united/bootstrap.min.css",
  "yeti" :
  "https://cdn.bootcss.com/bootswatch/3.3.7/yeti/bootstrap.min.css"
}
$(function(){
   var themesheet = $('<link href="'+themes['default']+'" rel="stylesheet" />');
    themesheet.appendTo('head');
    $('.theme-link').click(function(){
       var themeurl = themes[$(this).attr('data-theme')];
        themesheet.attr('href',themeurl);
    });
});



//
// Initialize summernote
//
// hints config for latex
// FORMAT: (hint) ## (content) [## [title] ## [phone title]]
//  (...) is required, [...] is optional
var hintsconf = [
  // Greek
  'xa ## \\alpha',
  'xb ## \\beta',
  'xch ## \\chi',
  'xd ## \\delta',
  'xcd ## \\Delta',
  'xe ## \\epsilon',
  'xve ## \\varepsilon',
  'xet ## \\eta',
  'xg ## \\gamma',
  'xcg ## \\Gamma',
  'xio ## \\iota',
  'xl ## \\lambda',
  'xcl ## \\Lambda',
  'xm ## \\mu',
  'xn ## \\nu',
  'xo ## \\omega',
  'xco ## \\Omega',
  'xp ## \\pi',
  'xcp ## \\Pi',
  'xvp ## \\varpi',
  'xph ## \\phi',
  'xcph ## \\Phi',
  'xvph ## \\varphi',
  'xps ## \\psi',
  'xcps ## \\Psi',
  'xs ## \\sigma',
  'xcs ## \\Sigma',
  'xvs ## \\varsigma',
  'xz ## \\zeta',
  'xr ## \\rho',
  'xvr ## \\varrho',
  'xt ## x(t)',
  'xth ## \\theta',
  'xcth ## \\Theta',
  'xvth ## \\vartheta',
  'xu ## \\upsilon',
  'xcu ## \\Upsilon',
  'xx ## \\xi',
  'xcx ## \\Xi',
  'dxa ## \\(\\alpha\\)',
  'dxb ## \\(\\beta\\)',
  'dxch ## \\(\\chi\\)',
  'dxd ## \\(\\delta\\)',
  'dxcd ## \\(\\Delta\\)',
  'dxe ## \\(\\epsilon\\)',
  'dxve ## \\(\\varepsilon\\)',
  'dxet ## \\(\\eta\\)',
  'dxg ## \\(\\gamma\\)',
  'dxcg ## \\(\\Gamma\\)',
  'dxio ## \\(\\iota\\)',
  'dxl ## \\(\\lambda\\)',
  'dxcl ## \\(\\Lambda\\)',
  'dxm ## \\(\\mu\\)',
  'dxn ## \\(\\nu\\)',
  'dxo ## \\(\\omega\\)',
  'dxco ## \\(\\Omega\\)',
  'dxp ## \\(\\pi\\)',
  'dxcp ## \\(\\Pi\\)',
  'dxvp ## \\(\\varpi\\)',
  'dxph ## \\(\\phi\\)',
  'dxcph ## \\(\\Phi\\)',
  'dxvph ## \\(\\varphi\\)',
  'dxps ## \\(\\psi\\)',
  'dxcps ## \\(\\Psi\\)',
  'dxs ## \\(\\sigma\\)',
  'dxvs ## \\(\\varsigma\\)',
  'dxz ## \\(\\zeta\\)',
  'dxr ## \\(\\rho\\)',
  'dxvr ## \\(\\varrho\\)',
  'dxt ## \\(\\tau\\)',
  'dxth ## \\(\\theta\\)',
  'dxcth ## \\(\\Theta\\)',
  'dxvth ## \\(\\vartheta\\)',
  'dxu ## \\(\\upsilon\\)',
  'dxcu ## \\(\\Upsilon\\)',
  'dxx ## \\(\\xi\\)',
  'dxcx ## \\(\\Xi\\)',
  // begin env.
  'barr ## \\begin{array}{ccc}   &   &   \\\\   &   &   \\end{array} ## array',
  'bali ## \\begin{align}   &   \\\\   &   \\end{align} ## align',
  'balis ## \\begin{align*}   &   \\\\   &   \\end{align*} ## align*',
  'baliat ## \\begin{alignat}{ }   &   \\\\   &   \\end{alignat} ## alignat',
  'baliats ## \\begin{alignat*}{ }   &   \\\\   &   \\end{alignat*} ## alignat*',
  'balied ## \\begin{aligned}{ }   &   \\\\   &   \\end{aligned} ## aligned',
  'baliedat ## \\begin{alignedat}    &   \\\\   &   \\end{alignedat} ## alignedat',
  'bbmat ## \\begin{bmatrix}   &   \\\\   &   \\end{bmatrix} ## bmatrix',
  'bbmat2 ## \\begin{Bmatrix}   &   \\\\   &   \\end{Bmatrix} ## Bmatrix',
  'bcase ## \\begin{cases}   &   \\\\   &   \\end{cases} ## cases',
  'bequ ## \\begin{equation}   \\end{equation} ## equation',
  'bequs ## \\begin{equation*}   \\end{equation*} ## equation*',
  'beqn ## \\begin{eqnarray}   &   &   \\\\   &   &   \\end{eqnarray} ## eqnarray',
  'beqns ## \\begin{eqnarray*}   &   &   \\\\   &   &   \\end{eqnarray*} ## eqnarray*',
  'bgath ## \\begin{gather}     \\\\     \\\\    \\end{gather} ## gather',
  'bgaths ## \\begin{gather*}    \\\\    \\\\    \\end{gather*} ## gather*',
  'bgathed ## \\begin{gathered}    \\\\    \\\\    \\end{gathered} ## gathered',
  'bgathedo ## \\begin{gathered}[ ]    \\\\    \\\\    \\end{gathered} ## gathered',
  'bmat ## \\begin{matrix}   &   &   \\\\   &   &   \\end{matrix} ## matrix',
  'bmult ## \\begin{multline}    \\\\    \\\\    \\end{multline} ## multline',
  'bmults ## \\begin{multline*}    \\\\    \\\\    \\end{multline*} ## multline*',
  'bpmat ## \\begin{pmatrix}   &   &   \\\\   &   &   \\end{pmatrix} ## pmatrix',
  'bsplit ## \\begin{split}   &   \\\\   &   \\end{split} ## split',
  'bsubeq ## \\begin{subequations}    \\end{subequations} ## subequations',
  'bvmat ## \\begin{vmatrix}   &   &   \\\\   &   &   \\end{vmatrix} ## vmatrix',
  'bvmat2 ## \\begin{Vmatrix}   &   &   \\\\   &   &   \\end{Vmatrix} ## Vmatrix',
  // useful math
  'dd ## $ ## <i class="fa fa-dollar"></i>',
  'ddd ## $$ ## <i class="fa fa-dollar"></i><i class="fa fa-dollar"></i>',
  'frac ## \\frac{  }{  } ## frac',
  'sqrt ## \\sqrt{  } ## sqrt',
  'sqrto ## \\sqrt[  ]{  } ## sqrto',
  // math fonts
  'mbf ## \\mathbf{  } ## mathbf',
  'mrm ## \\mathrm{  } ## mathrm',
  'mcal ## \\mathcal{  } ## mathcal',
  'msf ## \\mathsf{  } ## mathsf',
  'mtt ## \\mathtt{  } ## mathtt',
  'mit ## \\mathit{  } ## mathit',
  // refs
  'ref ## \\ref{  } ## ref',
  'eqref ## \\eqref{  } ## eqref',
  // useful chars
  'bslash ## \\ ## \\',
  'slash ## / ## /',
  'and ## & ## &',
  'sups ## ^ ## &#x2b1a;&#x2580;',
  'subs ## _ ## &#x2b1a;&#x2584;',
  'bra1 ## (  ) ## ( )',
  'bra2 ## [  ] ## [ ]',
  'bra3 ## {  } ## { }',
  'bra4 ## \\{  \\} ## \\{ \\}',
  'bra5 ## \\langle \\rangle ## < >',
  'pb1 ## (  ) ## ( )',
  'pb2 ## [  ] ## [ ]',
  'pb3 ## {  } ## { }',
  'pb4 ## \\{  \\} ## \\{ \\}',
  'pb5 ## \\langle  \\rangle ## &lt; &gt;',
  // relations
  'lt ## &lt;',
  'gt ## &gt;',
  'plus ## +',
  'minus ## -',
  'sub ## -',
  'pm ## \\pm',
  'mp ## \\mp',
  'star ## *',
  'vl ## |',
  'mul ## \\times ## ## &times;',
  'times ## \\times ## ## &times;',
  'div ## \\div ## ## &divide;',
  'cdot ## \\cdot ## ## &sdot;',
  'le ## \\le ## ## &le;',
  'leq ## \\leq ## ## &le;',
  'ge ## \\ge ## ## &ge;',
  'geq ## \\geq ## ## &ge;',
  'eq ## = ## ## =',
  'neq ## \\neq ## ## &ne;',
  'll ## \\ll ## ## &#x226a;',
  'gg ## \\gg ## ## &#x226b;',
  'equiv ## \\equiv ## ## &equiv;',
  'sim ## \\sim ## ## &#x7e;',
  'simeq ## \\simeq ## ## &#x2243;',
  'approx ## \\approx ## ## &asymp;',
  'approxeq ## \\approxeq ## ## &#x224a;',
  'cong ## \\cong ## ## &cong;',
  'propto ## \\propto ## ## &prop;',
  'doteq ## \\doteq ## ## &#x2a66;',
  'triangleq ## \\triangleq ## ## &#x225c;',
  'infty ## \\infty ## ## &infin;',
  'partial ## \\partial ## ## &part;',
  'sum ## \\sum_{  }^{  } ## ## &sum;',
  'prod ## \\prod_{  }^{  } ## ## &prod;',
  'dfrac ## \\dfrac{  }{  } ## dfrac',
  'eitheta ## e^{i\\theta} ## ## e i &theta;',
  'ejomegat ## e^{j\\omega t} ## ## e i &theta; t',
  'sin ## \\sin ## ## sin',
  'cos ## \\cos ## ## cos',
  // left right
  'left ## \\left ## left',
  'right ## \\right ## right',
  // derivative
  'dd2 ## {\\rm d} ## ## d&#x25a1;',
  'dd3 ## {\\,\\rm d} ## ## d&#x25a1;',
  'dx ## {\\rm d}x ## ## dx',
  'dy ## {\\rm d}y ## ## dy',
  'dz ## {\\rm d}z ## ## dz',
  'du ## {\\rm d}u ## ## du',
  'dt ## {\\rm d}t ## ## dt',
  'dv ## {\\rm d}v ## ## dv',
  'dw ## {\\rm d}w ## ## dw',
  'px ## \\partial x ## ## &part;x',
  'py ## \\partial y ## ## &part;y',
  'pz ## \\partial z ## ## &part;z',
  'pt ## \\partial t ## ## &part;t',
  'pu ## \\partial u ## ## &part;u',
  'pv ## \\partial v ## ## &part;v',
  'pw ## \\partial w ## ## &part;w',
  'dotx ## \\dot{x} ## ## dot x',
  'ddotx ## \\ddot{x} ## ## ddot x',
  'dddotx ## \\dddot{x} ## ## dddot x',
  'hatx ## \\hat{x} ## ## hat x',
  'prime ## \' ## ## &#x2b1a;\'',
  // functions
  'fx ## f(x) ## ## f(x)',
  'gx ## g(x) ## ## g(x)',
  'ft ## f(t) ## ## f(t)',
  'gt2 ## g(t) ## ## g(t)',
  'fz ## f(z) ## ## f(z)',
  'gz ## g(z) ## ## g(z)',
  'fxy ## f(x,y) ## ## f(x,y)',
  'gxy ## g(x,y) ## ## g(x,y)',
  'zxy ## z(x,y) ## ## z(x,y)',
  'ut ## u(t) ## ## u(t)',
  'vt ## v(t) ## ## v(t)',
  // derivative
  'dd4 ## {{\\rm d}  \\over {\\rm d}  } ## ## d&#x25a1;/d&#x25a1;',
  'dydx ## {{\\rm d} y \\over {\\rm d} x } ## ## dy/dx',
  'ddyx ## {{\\rm d} y \\over {\\rm d} x } ## ## dy/dx',
  'dydx2 ## {\\Delta y \\over \\Delta x } ## ## &Delta;y/&Delta;x',
  'ddyx2 ## {\\Delta y \\over \\Delta x } ## ## &Delta;y/&Delta;x',
  'dydx3 ## {\\delta y \\over \\delta x } ## ## &delta;y/&delta;x',
  'ddyx3 ## {\\delta y \\over \\delta x } ## ## &delta;y/&delta;x',
  // partial derivative
  'pp ## {\\partial  \\over \\partial  } ## ## &part;&#x25a1;/&part;&#x25a1;',
  'ppux2 ## {\\partial u \\over \\partial x } ## ## &part;u/&part;x',
  'pupx ## {\\partial u \\over \\partial x } ## ## &part;u/&part;x',
  'ppuy2 ## {\\partial u \\over \\partial y } ## ## &part;u/&part;y',
  'pupy ## {\\partial u \\over \\partial y } ## ## &part;u/&part;y',
  'ppuz2 ## {\\partial u \\over \\partial z } ## ## &part;u/&part;z',
  'pupz ## {\\partial u \\over \\partial z } ## ## &part;u/&part;z',
  'pput2 ## {\\partial u \\over \\partial t } ## ## &part;u/&part;t',
  'pupt ## {\\partial u \\over \\partial t } ## ## &part;u/&part;t',
  'ppzx2 ## {\\partial z \\over \\partial x } ## ## &part;z/&part;x',
  'pzpx ## {\\partial z \\over \\partial x } ## ## &part;z/&part;x',
  'ppzy2 ## {\\partial z \\over \\partial y } ## ## &part;z/&part;y',
  'pzpy ## {\\partial z \\over \\partial y } ## ## &part;z/&part;y',
  'ppzt2 ## {\\partial z \\over \\partial t } ## ## &part;z/&part;t',
  'pzpt ## {\\partial z \\over \\partial t } ## ## &part;z/&part;t',
  'ppux ## {\\partial^2 u \\over \\partial x^2 } ## ## &part;&sup2;u/&part;x&sup2;',
  'ppuy ## {\\partial^2 u \\over \\partial y^2 } ## ## &part;&sup2;u/&part;y&sup2;',
  'ppuz ## {\\partial^2 u \\over \\partial z^2 } ## ## &part;&sup2;u/&part;z&sup2;',
  'pput ## {\\partial^2 u \\over \\partial t^2 } ## ## &part;&sup2;u/&part;t&sup2;',
  'ppzx ## {\\partial^2 z \\over \\partial x^2 } ## ## &part;&sup2;z/&part;x&sup2;',
  'ppzy ## {\\partial^2 z \\over \\partial y^2 } ## ## &part;&sup2;z/&part;y&sup2;',
  'ppzt ## {\\partial^2 z \\over \\partial t^2 } ## ## &part;&sup2;z/&part;t&sup2;',
  'ppuxy ## {\\partial^2 u \\over \\partial x \\partial y} ## ## &part;&sup2;u/&part;x&part;y',
  'ppzxy ## {\\partial^2 z \\over \\partial x \\partial y} ## ## &part;&sup2;z/&part;x&part;y',
  // integration
  'int ## \\int_{ a }^{ b }    {\\,\\rm d} ## ## &int;&#x33b;&#x33b;&#x2e0b;',
  'int2 ## \\int_{ D }    {\\,\\rm d} ## ## &int;&#x33b;',
  'int3 ## \\int ## ## &int;',
  'oint ## \\oint_{ C }    {\\,\\rm d} ## ## &#x222e;&#x33b;',
  'oint2 ## \\oint ## ## &#x222e;',
  'iint ## \\iint_{ D }    {\\,\\rm d} ## ## &#x222c;&#x33b;',
  'iint2 ## \\iint    {\\,\\rm d} ## ## &#x222c;',
  'iiint ## \\iiint_{ V }     {\\,\\rm d} ## ## &#x222d;&#x33b;',
  'iiint2 ## \\iiint     {\\,\\rm d} ## ## &#x222d;',
  // sets
  'emptyset ## \\emptyset',
  'in ## \\in',
  'notin ## \\notin',
  'forall ## \\forall',
  'exists ## \\exists',
  'subset ## \\subset',
  'subseteq ## \\subseteq',
  'supset ## \\supset',
  'supseteq ## \\supseteq',
  'cup ## \\cup',
  'cap ## \\cap',
  'bigcup ## \\bigcup',
  'bigcap ## \\bigcap',
  'mid ## \\mid',
  'nabla ## \\nabla',
  'delta ## \\Delta',
  'land ## \\land',
  'lor ## \\lor',
  'lnot ## \\lnot',
  'lfloor ## \\lfloor',
  'rfloor ## \\rfloor',
  'lceil ## \\lceil',
  'rceil ## \\rceil',
  'lvert ## \\lvert ',
  'rvert ## \\rvert',
  'lvert2 ## \\lVert ',
  'rvert2 ## \\rVert',
  // bigs
  'big ## \\big ## big',
  'big2 ## \\Big ## Big',
  'bigg ## \\bigg  ## bigg',
  'bigg2 ## \\Bigg ## Bigg',
  // dots
  'dots ## \\dots',
  'ldots ## \\ldots',
  'cdots ## \\cdots',
  'vdots ## \\vdots',
  'ddots ## \\ddots',
  // arrows
  'to ## \\to',
  'gets ## \\gets',
  'rarr ## \\Rightarrow',
  'larr ## \\Leftarrow',
  'hookr ## \\hookrightarrow',
  'hookl ## \\hookleftarrow',
  'lrarr ## \\leftrightarrow',
  'lrarr2 ## \\Leftrightarrow',
  'uarr ## \\uparrow',
  'darr ## \\downarrow',
  'nearrow ## \\nearrow',
  'searrow ## \\searrow',
  'arr ## \\to',
  'arl ## \\gets',
  'arrr ## \\Rightarrow',
  'arll ## \\Leftarrow',
  'arhookr ## \\hookrightarrow',
  'arhookl ## \\hookleftarrow',
  'arlr1 ## \\leftrightarrow',
  'arllrr ## \\Leftrightarrow',
  'arlrlr ## \\Leftrightarrow',
  'arup ## \\uparrow',
  'ardown ## \\downarrow',
  'arnearrow ## \\nearrow',
  'arsearrow ## \\searrow',
  // functions
  'ffacos ## \\arccos',
  'ffasin ## \\arcsin',
  'ffatan ## \\arctan',
  'ffarg ## \\arg',
  'ffcos ## \\cos',
  'ffcosh ## \\cosh',
  'ffcot ## \\cot',
  'ffcoth ## \\coth',
  'ffcsc ## \\csc',
  'ffdeg ## \\deg',
  'ffdet ## \\det',
  'ffdim ## \\dim',
  'ffexp ## \\exp',
  'ffgcd ## \\gcd',
  'ffhom ## \\hom',
  'ffinf ## \\inf',
  'ffker ## \\ker',
  'fflg ## \\lg',
  'fflim ## \\lim',
  'ffliminf ## \\liminf',
  'fflimsup ## \\limsup',
  'ffln ## \\ln',
  'fflog ## \\log',
  'ffmax ## \\max',
  'ffmin ## \\min',
  'ffpr ## \\Pr',
  'ffsec ## \\sec',
  'ffsin ## \\sin',
  'ffsinh ## \\sinh',
  'ffsup ## \\sup',
  'fftan ## \\tan',
  'fftanh ## \\tanh',
  'ffdiag ## \\operatorname{diag}',
  'fftr ## \\operatorname{tr}',
  'arccos ## \\arccos',
  'arcsin ## \\arcsin',
  'arctan ## \\arctan',
  'arg ## \\arg',
  'cos ## \\cos',
  'cosh ## \\cosh',
  'cot ## \\cot',
  'coth ## \\coth',
  'csc ## \\csc',
  'deg ## \\deg',
  'det ## \\det',
  'dim ## \\dim',
  'exp ## \\exp',
  'gcd ## \\gcd',
  'hom ## \\hom',
  'inf ## \\inf',
  'ker ## \\ker',
  'lg ## \\lg',
  'lim ## \\lim',
  'liminf ## \\liminf',
  'limsup ## \\limsup',
  'ln ## \\ln',
  'log ## \\log',
  'max ## \\max',
  'min ## \\min',
  'pr ## \\Pr',
  'sec ## \\sec',
  'sin ## \\sin',
  'sinh ## \\sinh',
  'sup ## \\sup',
  'tan ## \\tan',
  'tanh ## \\tanh',
  'diag ## \\operatorname{diag}',
  'tr ## \\operatorname{tr}'
];
// load my hints
var myhints = '';
try {
  var localconf = store.get('MathPad.hintsconf');
  if(localconf != undefined) {
    myhints = localconf;
  }
} catch(err) {
  // no local hints config
}

// all hints and items list
var hints = {};  // map of hints { id:[c,t,pt] }
var items = [];  // ids of hints

// clear hints
function clearHints() {
  hints = {};
  items = [];
}
// update hints config
function updateHints(conf) {
  // build hints and item list
  for (var i in conf) {
    var a = conf[i].trim().split(/\s*##\s*/);
    if(a.length>1) {
      a[1] = a[1].replace(/\s{2}/g,'&nbsp;&nbsp;') + '&nbsp;';
      var key = a.shift();
      if(hints[key]==undefined) {
        // add new hint
        hints[key] = a;
        items.push(key);
      } else {
        // override exists hint
        hints[key] = a;
      }
    } else {
      // syntax error: no code or id
      // ignore conf[i]
    }
  }
  // sort item list
  items.sort();
}

function buildMath(id,c,t) {
  var cmath = t;
  if(t.length==0) {
    // wrap the content as a math
    var ml = '\\(', mr = '\\)';
    if(c.indexOf(ml)==0 || c.indexOf('$')==0) {
      ml = mr = ''; // c is already a math
    }
    cmath = '<span id="ht-'+id+'">'+ml+c+mr+'</span>';
  }
  return cmath;
}

function buildHintsTr(id,c,t) {
  return '<tr id="tr-'+id+'">' +
    '<td>'+id+'</td>' +
    '<td><code>'+c+'</code></td>' +
    '<td>'+buildMath(id,c,t)+'</td>' +
    '</tr>';
}

function getHintTitle(id) {
  var t = hints[id].length>1 ? hints[id][1] : ''; // title
  if(phone && hints[id].length>2) {
    t = hints[id][2]; // phone title
  }
  return t;
}

// rebuild hints table
function rebuildHintsTable() {
  // clear hints
  clearHints();
  // update hintsconf
  updateHints(hintsconf);
  // update myhints
  updateHints(myhints.split('\n'));
  // clear hints table
  $('#hints-table').empty();
  // add hints items in hints in order of items
  for (var i = 0; i < items.length; i++) {
    var id = items[i];
    var c = hints[id][0]; // hint content
    var t = getHintTitle(id);
    $(buildHintsTr(id,c,t)).appendTo('#hints-table');
  }
  // typeset update
  // MathJax.Hub.Queue('Typeset',MathJax.Hub,'#hintstmpls');
  MathJax.Hub.Typeset('#hintstmpls');
}

// build the hints table at the first time
rebuildHintsTable();

// hints dialog
$('#hints-filter').show();
$('#hints-btn-close').show();
$('#hints-btn-save').hide();
$('#modal-hints-table a[data-toggle="tab"]').on('shown.bs.tab',
function (e) {
  if($('#tab-hints-all').hasClass('active')) {
    $('#hints-filter').show();
    $('#hints-btn-close').show();
    $('#hints-btn-save').hide();
  } else {
    $('#hints-filter').hide();
    $('#hints-btn-close').hide();
    $('#hints-btn-save').show();
  }
});

// open hints dialog
$('#show-hints-table').click(function() {
  // update hints count
  $('#hints-count').text(items.length);
  // display my hints
  $('#myhints-conf').val(myhints);
  $('#modal-hints-table').show();
});

// save my hints
$('#hints-btn-save').click(function () {
  myhints = $('#myhints-conf').val();
  store.set('MathPad.hintsconf',myhints);
  // refresh hints list
  rebuildHintsTable();
});

// hints filter
$('#hints-filter').bind('input propertychange', function () {
  try {
    var filter = new RegExp($(this).val());
    $('#tab-hints-all').addClass('active');
    for (var i = 0; i < items.length; i++) {
      var id = items[i];
      var tr = $('#tr-'+id);
      if(filter.test(id) || filter.test(hints[id])) {
        tr.show();
      } else {
        tr.hide();
      }
    }
  } catch(err) {
    // ignore bad regexp
  }
});

var thehint = {
  match: /\b(\w{2,6})$/,
  search: function (keyword, callback) {
    callback($.grep(items, function (item) {
      return item.indexOf(keyword)  === 0;
    }));
  },
  template: function (item) {
    // get hint title
    var t = hints[item].length>1 ? hints[item][1] : '';
    if(phone && hints[item].length>2) {
      t = hints[item][2]; // phone title
    }
    return  t.length>0 ? t : $('#ht-'+item).html();
  },
  content: function (item) {
    // Fix: arrange update for hint input
    Preview.Update();
    // return hint content
    return $('<span>'+hints[item][0]+'</span>').text();
  }
};
// Math input object
mathInput = $('#MathInput');
var placeholder = 'Write here, slide # for preview... type dd beq for good luck...';
if(phone) {
  // less toolbar for cell phone
  mathInput.summernote({
    height: 120,
    shortcuts: false,
    hint: thehint,
    placeholder: placeholder.replace('#','right'),
    toolbar: [
      // [groupName, [list of button]]
      ['tools', ['color', 'style','ul', 'ol', 'bold', 'underline', 'clear','codeview']]
    ]
  });
} else {
  mathInput.summernote({
    height: 240,
    hint: thehint,
    dialogsInBody: true,
    placeholder: placeholder.replace('#','down')
  });
}

// summernote.change
mathInput.on('summernote.change',
    function(we, contents, $editable) {
  Preview.Update();
});

// on click for math input buttons and links
$(".math-menu button").click(function() {
  mathInput.summernote('insertText', $(this).val());
});
$("a.math-menu").click(function() {
  mathInput.summernote('insertText', $(this).attr('title'));
  return false;
});

// make the math menu 'others' hover active
$('.nav-tabs > li > a').hover(function() {
  $(this).tab('show');
});

// adjust math-menus dropdown style for desktop
if(!phone) {
  $('#math-menus ul').removeClass('dropdown-menu-right');
}



//
// Initialize fullpage
//

// on leave/enter edit, disable/enable it
function leaveedit(from, to, first) {
    if(first+1==from) {
      mathInput.summernote('disable');
    }
    if(first+1==to) {
      mathInput.summernote('enable');
    }
}

// Initialize fullpage
var fp = phone ? '#mobile-wapper' : '#fullpage';
$(fp).fullpage({
  controlArrows: false,
  scrollOverflow: true,
  loopHorizontal: false,
  verticalCentered: false,
  onLeave: function(index, nextIndex, direction){
    leaveedit(index, nextIndex, 1);
  },
  onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
    leaveedit(slideIndex, nextSlideIndex, 0);
  }
});

// goto edit
function gotoedit() {
  if(phone) {
    $.fn.fullpage.moveSlideRight();
  } else {
    $.fn.fullpage.moveSectionDown();
  }
}



//
// Snippets management
//
var Snippet = {
  // index [{id:xxx, update:xxx, title:"xxx"}]
  snippets : [],
  it : {}, // current {id:xxx, update:xxx, text:xxx}

  // load index, open the last updated
  init: function() {
    // load index
    var idx = store.get('MathPad.snippets');
    this.snippets = idx==undefined ? [] : idx;         // open the last updated
    this.loadnew();
  },
  // create snippet
  create: function() {
    var now = new Date();
    this.it = {id:now.getTime(), update:now.getTime(), text:''};
    return this.it;
  },
  // is it a new one (has not saved)
  isnew: function() {
    return this.it.text.length==0 &&
        store.get('MathPad.'+this.it.id)==undefined;
  },
  // index it
  index: function() {
    var s = this.it;
    var title = '';
    if(s.text.length>0) {
      try {
        title = $(s.text).first().text();
      } catch(err) { }
      if(title.length==0) {
        var n = s.text.indexOf('<');
        if(n==-1) { n = s.text.length; }
        if(n>20) { n = 20; }
        title = s.text.substring(0,n);
      }
    }
    var idx = this.find(s.id);
    if(idx != undefined) { // update index
      idx.update = s.update;
      idx.title = title;
    } else { // create index
      var idx0 = {id:s.id, update:s.update, title:title};
      this.snippets.push(idx0);
    }
    // sort index
    this.sort();
  },
  // sort by update decent
  sort: function() {
    this.snippets.sort(function(a,b){
      return b.update - a.update;
    });
  },
  // find index
  find: function(id) {
    for (var i = 0; i < this.snippets.length; i++) {
      var s = this.snippets[i];
      if(s.id == id) {
        return s;
      }
    }
    return undefined;
  },
  // load it from local storage
  load: function(id) {
    var loaded = store.get('MathPad.'+id);
    if(loaded!=undefined) { // saved object
      return loaded;  // load success
    } else { // not saved
      // try find index
      var idx = Snippet.find(id);
      if(idx!=undefined) {
        // a new one have index but not saved
        return {id:idx.id, update:idx.update, text:''};;
      } else {
        // invalied id
        return undefined;
      }
    }
  },
  // load it
  loadit: function() {
    this.it = this.load(this.it.id);
  },
  // load or new
  loadnew: function() {
    // open last updated or create new one
    if(this.snippets.length > 0) {
      // sort index
      this.sort();
      // select the first (last updated)
      this.it = this.snippets[0];
      // load it
      this.loadit();
     } else {
      // or create a new one
      this.it = this.create();
      // update index
      this.index();
    }
  },
  // save it
  save: function() {
    // update it
    this.it.update = new Date().getTime();
    // update index
    this.index();
    // save it and index to storage
    try {
      store.set('MathPad.'+this.it.id, this.it);
      store.set('MathPad.snippets', this.snippets);
    } catch(err) {
      console.log('save failed.');
    }
  },
  // remove from index
  removeidx: function() {
    // remove from index
    var id = this.it.id;
    this.snippets = $.grep(this.snippets, function(e){
      return e.id != id;
    });
    // save index
    store.set('MathPad.snippets', this.snippets);
  },
  // delete it
  remove: function() {
    var id = this.it.id;
    var isnew = this.isnew();
    // remove from index
    this.removeidx();
    // try to remove from storage
    if(!isnew) {
      store.remove('MathPad.'+id);
    }
    // open last updated or create new one
    this.loadnew();
  }
};



//
// Snippets operation
//
// show selected item in the snippets list view
function selectSnippetsList(slist) {
  slist.children().each(function(){
    var s = $(this);
    var id = parseInt(s.attr('id'));
    if(id == Snippet.it.id) {
      s.addClass('list-group-item-success');
      s.find('.icon').attr('class', 'icon fa fa-2x fa-edit text-primary');
      s.find('.dtupdate').removeClass('hidden-xs');
    } else {
      s.removeClass('list-group-item-success');
      s.find('.icon').attr('class', 'icon fa fa-lg fa-file-text-o');
      s.find('.dtupdate').addClass('hidden-xs');
    }
  });
}

// resize height of the snippets list in desktop view
function resizeSnippetsList(slist) {
  if(!phone) {
    slist.height($(window).height() - 120);
  }
}

// resize snippets list when window resizing
$(window).resize(function(){
  resizeSnippetsList($('#snippets-list'));
  $.fn.fullpage.reBuild();
});

// refresh snippets list view
function refreshSnippetsList() {
  var slist = $('#snippets-list');
  // clear snippets-list
  slist.empty();
  // append snippets-list
  for (var i = 0; i < Snippet.snippets.length; i++) {
    var s = Snippet.snippets[i];
    var d1 = new Date(s.id);
    var d2 = new Date(s.update);
    var item = '<a href="#" ' +
      'id="'+ s.id + '"' +
      ' class="list-group-item' +
      ' snippet-item">\n' +
      '<span class="list-group-item-text text-muted pull-right prettydate" title="Last update">' +
      d2.toUTCString() + '</span>\n' +
      '<h5 class="list-group-item-heading" title="Title">' +
      '<i class="icon fa fa-lg fa-file-text-o"></i> <b>' +
      s.title + '</b></h5>\n' +
      '<span class="list-group-item-text text-muted dtupdate hidden-xs" style="font-style: italic" title="Date created">' +
      d1.toLocaleString() + '</span>\n' +
    '</a>'
    slist.append(item);
  }
  selectSnippetsList(slist);
  resizeSnippetsList(slist);
  $(".prettydate").prettydate();
  // click to open snippet
  $('.snippet-item').click(function(){
    var id = parseInt(this.id);
    // do not load the current item
    if(id != Snippet.it.id) {
      // load snippet
      var loaded = Snippet.load(id);
      if(loaded!=undefined) {
        Snippet.it = loaded;
        // set text
        mathInput.summernote('code', Snippet.it.text);
        // select
        selectSnippetsList(slist);
      } else {
        // invalied id, neglect it
      }
    }
    // goto edit
    gotoedit();
  });
}

// create new snippet
$('#create').click(function(){
  // if current is a new one, then remove from index
  if(Snippet.isnew()) {
    // remove from index
    Snippet.removeidx();
  }
  // create new one
  Snippet.create();
  Snippet.index(); // add to index
  // set text
  mathInput.summernote('code', Snippet.it.text);
  // refresh snippet list
  refreshSnippetsList();
  // goto edit
  gotoedit();
});

// confirm delete
$('#confirm-delete').click(function(){
  $('#item-deleted').html($('#'+Snippet.it.id).clone());
  $('#modal-del-confirm').show();
});

// remove snippet
$('#remove').click(function(){
  // remove it
  Snippet.remove();
  // set text
  mathInput.summernote('code', Snippet.it.text);
  // refresh snippet list
  refreshSnippetsList();
});



//
// Initialize preview
//
// auto save after preview
Preview.autosave = function (text) {
  if(text != Snippet.it.text) {
    // update text first
    Snippet.it.text = text;
    // then save
    Snippet.save();
    // refresh snippet list view
    refreshSnippetsList();
  }
}
// rebuild fullpage for scroll after preview done
Preview.ResizePreview = function() {
  $.fn.fullpage.reBuild();
}

// Initialize preview
Preview.Init();



//
// Initialize Snippet
//
// init
Snippet.init();
// refresh snippet list
refreshSnippetsList();
// set text
mathInput.summernote('code', Snippet.it.text);
