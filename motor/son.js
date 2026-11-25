// son.js: WebGL2 son islem. Imza: RENK DALGASI. Guc calisirken kahramandan yayilan halka dunyanin rengini ceker,
// yalnizca filmin vurgu rengi kalir. Bolunmus ton, yumusak omuz, vinyet, kagit dokusu.
import { tuval, rgb } from './temel.js';
const V = `#version 300 es
out vec2 u; void main(){ vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2); u=vec2(p.x,1.-p.y); gl_Position=vec4(p*2.-1.,0,1);} `;
const F = `#version 300 es
precision highp float; in vec2 u; out vec4 o; uniform sampler2D a,b; uniform vec2 mrk; uniform float guc,dalga,vin,parla,tohum,kar; uniform vec3 vurgu,golge,isik;
float h(vec2 p){p=fract(p*vec2(443.897,441.423));p+=dot(p,p.yx+19.19);return fract((p.x+p.y)*p.x);}
vec3 ton(vec3 c){ float m=max(c.r,max(c.g,c.b)),n=min(c.r,min(c.g,c.b)),d=m-n+1e-5; float t=m==c.r?mod((c.g-c.b)/d,6.):m==c.g?(c.b-c.r)/d+2.:(c.r-c.g)/d+4.; return vec3(t/6.,d/(m+1e-5),m);}
void main(){ vec2 q=(u-mrk)*vec2(16./9.,1.); float r=length(q); float R=dalga*2.1; float ic=guc*smoothstep(R,R-.16,r); float hal=guc*exp(-pow((r-R)/.022,2.))*step(dalga,.995);
 vec2 uv=u+normalize(q+1e-4)*vec2(9./16.,1.)*hal*.016; vec3 c=texture(a,uv).rgb; float ks=hal*.006; c.r=texture(a,uv+vec2(ks,0)).r; c.b=texture(a,uv-vec2(ks,0)).b;
 vec3 bl=texture(b,uv).rgb; c=1.-(1.-c)*(1.-bl*parla); float l=dot(c,vec3(.2126,.7152,.0722));
 vec3 t=ton(c),tv=ton(vurgu); float f=abs(fract(t.x-tv.x+.5)-.5); float sec=smoothstep(.055,.022,f)*smoothstep(.4,.62,t.y)*smoothstep(.1,.25,t.z);
 vec3 gri=mix(golge*.55,vec3(.80,.86,.92),smoothstep(0.,1.,l*.92+.02)); c=mix(c,mix(mix(gri,c,.17),c*1.14,sec),ic); c+=vurgu*hal*.75;
 l=dot(c,vec3(.2126,.7152,.0722)); c+=(golge-.5)*.10*(1.-smoothstep(0.,.55,l))+(isik-.5)*.09*smoothstep(.45,1.,l);
 c=mix(c,c*c*(3.-2.*c),.34); c=golge*.055+c*(1.-.055); vec2 w=(u-.5)*vec2(1.,.82); c*=1.-vin*smoothstep(.3,.78,length(w)); c*=1.-kar;
 float k=h(floor(u*vec2(1920.,1080.)/1.5)+tohum)-.5; c+=k*.028; o=vec4(clamp(c,0.,1.),1.);} `;
export class Son {
  constructor(w, h) { this.c = tuval(w, h); const g = this.g = this.c.getContext('webgl2', { preserveDrawingBuffer: true, antialias: false }); if (!g) throw new Error('WebGL2 yok');
    const s = (t, k) => { const x = g.createShader(t); g.shaderSource(x, k); g.compileShader(x); if (!g.getShaderParameter(x, g.COMPILE_STATUS)) throw new Error(g.getShaderInfoLog(x)); return x; };
    const p = this.p = g.createProgram(); g.attachShader(p, s(g.VERTEX_SHADER, V)); g.attachShader(p, s(g.FRAGMENT_SHADER, F)); g.linkProgram(p); if (!g.getProgramParameter(p, g.LINK_STATUS)) throw new Error(g.getProgramInfoLog(p)); g.useProgram(p); g.bindVertexArray(g.createVertexArray());
    this.t = [0, 1].map(i => { const t = g.createTexture(); g.activeTexture(g.TEXTURE0 + i); g.bindTexture(g.TEXTURE_2D, t); for (const [k, v] of [[g.TEXTURE_MIN_FILTER, g.LINEAR], [g.TEXTURE_MAG_FILTER, g.LINEAR], [g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE], [g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE]]) g.texParameteri(g.TEXTURE_2D, k, v); g.uniform1i(g.getUniformLocation(p, 'ab'[i]), i); return t; });
    this.u = n => g.getUniformLocation(p, n); this.k = tuval(w / 4, h / 4); this.k2 = tuval(w / 4, h / 4); }
  ciz(src, b) { const g = this.g, k = this.k.getContext('2d'), y = this.k2.getContext('2d'), w = this.k.width, h = this.k.height;
    k.reset(); y.reset(); k.globalCompositeOperation = 'copy'; k.filter = 'brightness(.92) contrast(2.8) saturate(1.25)'; k.drawImage(src, 0, 0, w, h); k.filter = 'none';
    y.globalCompositeOperation = 'copy'; y.filter = `blur(${w / 130}px)`; y.drawImage(this.k, 0, 0); y.globalCompositeOperation = 'lighter'; y.globalAlpha = .55; y.filter = `blur(${w / 32}px)`; y.drawImage(this.k, 0, 0); y.globalAlpha = 1; y.filter = 'none';
    [src, this.k2].forEach((x, i) => { g.activeTexture(g.TEXTURE0 + i); g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, x); });
    const v = c => rgb(c).map(x => x / 255); g.uniform2fv(this.u('mrk'), b.merkez); for (const [n, x] of [['guc', b.guc], ['dalga', b.dalga], ['vin', .5], ['parla', b.parla ?? .2], ['tohum', b.tohum], ['kar', b.karart || 0]]) g.uniform1f(this.u(n), x); for (const n of ['vurgu', 'golge', 'isik']) g.uniform3fv(this.u(n), v(b[n]));
    g.viewport(0, 0, this.c.width, this.c.height); g.drawArrays(g.TRIANGLES, 0, 3); return this.c; }
}
