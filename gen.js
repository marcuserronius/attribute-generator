/* gen.js
**
** All attributes which begin with the 'gen:' prefix contain javascript
** code which generates a value. That value is given to an attribute with
** the same name, with the 'gen:' prefix removed, ie.'gen:d' becomes 'd'.
** There are some convenient functions and data structures made available:
** - _.p is an associative array of the parsed url parameters:
**     _.p['highlight-color']; _.p['leg-count']
** - _.d has output methods for path data:
**     _.d.L(x,y); _.d.a(rx,ry,x-rot,large,sweep,x,y)
** - ...and eventually, convenience methods for complicated path parts:
**     _.d.a({r:-12,angle:120,sweep:90}); // -r is counterclockwise
** - _.r creates/maps over a range with optional stepping:
**     _.r(0,360,0.1,x=>_.d.L(x,Math.sin(x)) )
*/

_ = {NS:"https://marcuserronius.github.io/attribute-generator"};
_.r = function(first, last, ...op){
  op = op instanceof Array ? op : [op]
  var step  = typeof(op[0])=='number' ? op.shift() : 1;
  var callback = op[0] instanceof Function ? op[0] : n=>n;

  values = []
  i = 0;
  var current = ()=>first+step*i; // calculates current value
  while(step>0 ? current()<=last : current()>=last){
    values.push( callback(current()) );
    i = i+1;
  }
  return values;
}
_._m=(x,y)=>`m${x},${y}`;
_._M=(x,y)=>`M${x},${y}`;
_._l=(x,y)=>`l${x},${y}`;
_._L=(x,y)=>`L${x},${y}`;

_.q=Object.fromEntries( document.location.search.slice(1,-1).split('&').map(v=>v.split("=")) );
_.setup = function(event){
  document.querySelectorAll('*').forEach( node=>{
    [...node.attributes].forEach( attr=>{
      if(attr.namespaceURI == _.NS){
        attr.ownerElement.setAttribute(
          attr.localName,
          with(_) eval(attr.value).join()
        )
      }
    })
  })
}
document.addEventListener('DOMContentLoaded',e=>_.setup(e));
