// add math menu
function addMathMenu(mnu,m,n,sel) {
  var stbl = ['<table><tbody align="center" valign="middle">'];
  for (var i = 0; i < m; i++) {
    stbl.push('<tr>');
    for (var j = 0; j < n; j++) {
      if(i*n+j>=mnu.length || mnu[i*n+j].length==0) {
        stbl.push('<td></td>');
      } else {
        var tex = mnu[i*n+j].split('##');
        var t = tex.length==2 ? tex[1] : ('$'+tex[0]+'$');
        stbl.push('<td><button type="button" class="btn btn-default" value="'+tex[0]+'">'+t+'</button></td>');
      }
    }
    stbl.push('</tr>');
  }
  stbl.push('</tbody></table>');
  $(stbl.join('')).appendTo(sel);
}

//
var mnucommon = [
  '\\pi ',
  '{\\mathbb R}',
  '=',
  '\\sin ',
  '_{  }##$\\square_\\blacksquare$',
  '\\theta ',
  '{\\mathbb Z}',
  '\\pm ',
  '\\cos ',
  '^{  }##$\\square^\\blacksquare$',
  '\\in ',
  '{\\mathbb C}',
  '\\langle  ,  \\rangle##$\\langle\\ \\rangle$',
  'e^{i\\theta}',
  '_{  }^{  }##$\\square_\\blacksquare^\\blacksquare$',
  '\\to ',
  '{\\mathbb Q}',
  '(  )##$(\\ )$',
  '\\left(  \\right)##$(\\square)$',
  '\\sum_{  }^{  }{  } ##$\\sum_\\square^\\square$',
  '\\infty ',
  '{\\mathbb N}',
  '[  ]##$[\\ ]$',
  '\\left[  \\right]##$[\\square]$',
  '\\sqrt{  }##$\\sqrt{\\square}$',
  '\\partial ',
  '\\Omega ',
  '\\{  \\}##$\\{\\ \\}$',
  '\\left\\{  \\right\\}##$\\{{\\small\\square}\\}$',
  '{  \\over  }##${\\square\\over\\square}$'
];

addMathMenu(mnucommon,6,5,'#mnu-common');

var mnurelation = [
  '+','-','\\times ','\\div ','\\cdot ',
  '\\lt ','\\gt ','\\leq ','\\geq ','=',
  '\\prec ','\\preceq ','\\succ ','\\succeq ','\\neq ',
  '\\sim ','\\approx ','\\simeq ','\\cong ','\\equiv ',
  '\\propto ','\\ll ','\\doteq ','\\gg ','\\triangleq '
];

addMathMenu(mnurelation,5,5,'#mnu-relation');

var mnuderivative = [
  '{\\rm d} x ',
  '\\dot{x}##$\\dot x$',
  '{{\\rm d}  \\over {\\rm d}  }##${{\\rm d}\\square \\over {\\rm d}\\square}$',
  '{\\partial{  } \\over \\partial  }##${\\partial \\square \\over \\partial \\square}$',
  '{\\rm d} y ',
  '\\ddot{x}##$\\ddot x$',
  '{{\\rm d} y \\over {\\rm d} x}##${{\\rm d}y \\over {\\rm d}x}$',
  '{\\partial^2 u \\over \\partial x^2}',
  '\\partial x ',
  '\\dddot{x}',
  '{\\Delta y \\over \\Delta x}',
  '{\\partial^2 u \\over \\partial y^2}',
  '\\partial y ',
  '\'',
  '{\\delta y \\over \\delta x}',
  '{\\partial^2 u \\over \\partial x \\partial y}'
];

addMathMenu(mnuderivative,4,4,'#mnu-derivative');

var mnuintegral = [
  '\\int {  } {\\,\\rm d} ##$\\int$',
  '\\int_{  } {  } {\\,\\rm d} ##$\\int_\\square$',
  '\\int_{  }^{  } {  } {\\,\\rm d} ##$\\int_\\square^\\square$',
  '\\oint {  } {\\,\\rm d}##$\\oint$',
  '\\oint_{  } {  } {\\,\\rm d} ##$\\oint_\\square$',
  '{\\,\\rm d} ##${\\rm d}$',
  '\\iint {  } {\\,\\rm d} ##$\\iint$',
  '\\iint_{  } {  } {\\,\\rm d} ##$\\iint_\\square$',
  '{\\,\\rm d}  {\\,\\rm d} ##${\\rm dd}$',
  '\\iiint {  } {\\,\\rm d} ##$\\iiint$',
  '\\iiint_{  } {  } {\\,\\rm d} ##$\\iiint_\\square$',
  '{\\,\\rm d}  {\\,\\rm d}  {\\,\\rm d} ##${\\rm ddd}$'
];

addMathMenu(mnuintegral,4,3,'#mnu-integral');

var mnusumprod = [
  '\\sum ',
  '\\sum_{  }##$\\sum_\\square$',
  '\\sum^{  }##$\\sum^\\square$',
  '\\sum_{  }^{  }##$\\sum_\\square^\\square$',
  '\\prod ',
  '\\prod_{  }##$\\prod_\\square$',
  '\\prod^{  }##$\\prod^\\square$',
  '\\prod_{  }^{  }##$\\prod_\\square^\\square$',
  '\\bigcup ',
  '\\bigcup_{  }##$\\bigcup_\\square$',
  '\\bigcup^{  }##$\\bigcup^\\square$',
  '\\bigcup_{  }^{  }##$\\bigcup_\\square^\\square$',
  '\\bigcap ',
  '\\bigcap_{  }##$\\bigcap_\\square$',
  '\\bigcap^{  }##$\\bigcap^\\square$',
  '\\bigcap_{  }^{  }##$\\bigcap_\\square^\\square$'
];

addMathMenu(mnusumprod,4,4,'#mnu-sumprod');

var mnugreek = [
  '\\alpha ','\\beta ','\\gamma ','\\delta ','\\epsilon ','\\varepsilon ',
  '\\zeta ','\\eta ','\\theta ','\\vartheta ','\\iota ','\\kappa ',
  '\\lambda ','\\mu ','\\nu ','\\xi ','o ','\\pi ',
  '\\varpi ','\\rho ','\\varrho ','\\sigma ','\\varsigma ','\\tau ',
  '\\upsilon ','\\phi ','\\varphi ','\\chi ','\\psi ','\\omega ',
  '\\Gamma ','\\Delta ','\\Theta ','\\Lambda ','\\Xi ','\\Pi ',
  '\\Sigma ','\\Upsilon ','\\Phi ','\\Psi ','\\Omega ','\\Re ',
  '\\Im ','\\aleph ','\\wp ','\\ell ','\\imath ','\\jmath '
];

addMathMenu(mnugreek,8,6,'#mnu-greek');

var mnufn = [
  '\\sin ##sin','\\exp ##exp','\\sinh ##sinh','\\deg ##deg','\\arcsin ##arcsin',
  '\\cos ##cos','\\ln ##ln','\\cosh ##cosh','\\det ##det','\\arccos ##arccos',
  '\\tan ##tan','\\lg ##lg','\\tanh ##tanh','\\dim ##dim','\\arctan ##arctan',
  '\\cot ##cot','\\log ##log','\\coth ##coth','\\sup ##sup','\\limsup ##limsup',
  '\\csc ##csc','\\min ##min','\\hom ##hom','\\inf ##inf','\\liminf ##liminf',
  '\\sec ##sec','\\max ##max','\\ker ##ker','\\arg ##arg','\\lim ##lim',
  '\\gcd ##gcd','\\Pr ##Pr'
];

addMathMenu(mnufn,7,5,'#panel-fn');

var mnuop = [
  '+','-','\\times ','\\div ','\\cdot ','\\ast ',
  '\\pm ','\\mp ','\\land ','\\lor ','\\lnot ','\\odot ',
  '\\forall ','\\exists ','\\nabla ','\\Delta ','\\emptyset ','\\oplus ',
  '\\in ','\\subset ','\\subseteq ','\\supset ','\\supseteq ','\\otimes ',
  '\\notin ','\\cup ','\\cap ','\\bigcup ','\\bigcap ','\\mid '
];

addMathMenu(mnuop,5,6,'#panel-op');

var mnude = [
  '(',')','\\langle ','\\rangle ','\\lvert ##$\\lvert\\cdot$','\\rvert ##$\\cdot\\rvert$',
  '[',']','\\lfloor ','\\rfloor ','\\lVert ##$\\lVert\\cdot$','\\rVert ##$\\cdot\\rVert$',
  '\\{','\\}','\\lceil ','\\rceil ','\\left ##\\left','\\right ##\\right'
];

addMathMenu(mnude,3,6,'#panel-de');

var mnuar = [
'\\to ','\\gets ','\\Rightarrow ','\\Leftarrow ',
'\\mathrm{  } ##$\\mathrm{A1}$','\\mathit{  } ##$\\mathit{A1}$',
'\\hookrightarrow ','\\hookleftarrow ','\\uparrow ',
'\\downarrow ','\\mathcal{  } ##$\\mathcal{A1}$',
'\\mathscr{  } ##$\\mathscr{A1}$','\\leftrightarrow ','\\Leftrightarrow ',
'\\nearrow ','\\searrow ','\\mathbb{  } ##$\\mathbb{A1}$',
'\\mathfrak{  } ##$\\mathfrak{A1}$',
];

addMathMenu(mnuar,3,6,'#panel-ar');
