(this["webpackJsonplottery-game"]=this["webpackJsonplottery-game"]||[]).push([[0],{189:function(e){e.exports=JSON.parse('[{"inputs":[{"internalType":"address payable","name":"_token","type":"address"},{"internalType":"uint8","name":"_maxPlayer","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dealer","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"DealerTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"result","type":"uint256"}],"name":"StopGame","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"WinnerTransfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"uint8","name":"value","type":"uint8"},{"internalType":"uint8","name":"salt","type":"uint8"}],"name":"bet","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"bets","outputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bet","type":"uint256"}],"name":"createGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dealer","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gameId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"games","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"bet","type":"uint256"},{"internalType":"enum LotteryGame.State","name":"state","type":"uint8"},{"internalType":"uint256","name":"counter","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"getGame","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"enum LotteryGame.State","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPlayer","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"stopGame","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"winners","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"}]')},190:function(e){e.exports=JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"faucet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]')},202:function(e,t,n){e.exports=n(494)},208:function(e,t,n){},224:function(e,t){},226:function(e,t){},228:function(e,t){},232:function(e,t){},233:function(e,t){},258:function(e,t){},260:function(e,t){},269:function(e,t){},271:function(e,t){},290:function(e,t){},321:function(e,t){},322:function(e,t){},392:function(e,t){},490:function(e,t){},491:function(e,t){},492:function(e,t){},494:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(186),u=n.n(i),s=n(29),o=n(501),l=(n(208),n(209),n(0)),c=n.n(l),p=n(26),m=n(24),y=n(65),d=n.n(y),f=n(79),b=new f.a({supportedChainIds:[1,4,42,56,77,97,99,128,137,256,11112,11110,1337]});var v=function(){var e=Object(s.c)(),t=e.connector,n=e.account,r=e.activate,i=e.deactivate,u=e.active,o=e.error;console.log(o);var l=a.useState(),c=Object(m.a)(l,2),p=c[0],y=c[1];a.useEffect((function(){p&&p===t&&y(void 0)}),[p,t]),function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(s.c)(),n=t.active,r=t.error,i=t.activate;Object(a.useEffect)((function(){var t=window.ethereum;if(t&&t.on&&!n&&!r&&!e){var a=function(){console.log("Handling 'connect' event"),i(b)},u=function(e){console.log("Handling 'chainChanged' event with payload",e),i(b)},s=function(e){console.log("Handling 'accountsChanged' event with payload",e),e.length>0&&i(b)},o=function(e){console.log("Handling 'networkChanged' event with payload",e),i(b)};return t.on("connect",a),t.on("chainChanged",u),t.on("accountsChanged",s),t.on("networkChanged",o),function(){t.removeListener&&(t.removeListener("connect",a),t.removeListener("chainChanged",u),t.removeListener("accountsChanged",s),t.removeListener("networkChanged",o))}}}),[n,r,e,i])}(!function(){var e=Object(s.c)(),t=e.activate,n=e.active,r=Object(a.useState)(!1),i=Object(m.a)(r,2),u=i[0],o=i[1];return Object(a.useEffect)((function(){b.isAuthorized().then((function(e){e?t(b,void 0,!0).catch((function(){o(!0)})):o(!0)}))}),[t]),Object(a.useEffect)((function(){!u&&n&&o(!0)}),[u,n]),u}()||!!p);var d=a.useCallback((function(){y(b),r(b)}),[r]),v=a.useCallback((function(){y(void 0),i()}),[i]);return u?o?a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginBlock:20}},!!o&&a.createElement("h4",{style:{marginTop:"1rem",marginBottom:"0"}},function(e){return e instanceof f.b?"No Metamask Extension detected, install Metamask Extension on desktop or visit from a dApp browser on mobile.":e instanceof s.a?"You're connected to an unsupported network.":(console.error(e),"An unknown error occurred. Check the console for more details.")}(o))):a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"column",alignItems:"center",marginBlock:20}},a.createElement("div",{style:{marginBottom:20}},"Hi ",a.createElement("span",{style:{color:"orange"}},n)," ",a.createElement("br",null)),a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:v},"Disconnect")):a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginBlock:20}},a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:d},"Connect Wallet"))},h=n(189),w=n(190),g=function(){return new Promise(function(){var e=Object(p.a)(c.a.mark((function e(t,n){var a,r,i,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.ethereum){e.next=13;break}return a=new d.a(window.ethereum),e.prev=2,e.next=5,window.ethereum.enable();case 5:t(a),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),n(e.t0);case 11:e.next=14;break;case 13:window.web3?(r=window.web3,console.log("Injected web3 detected."),t(r)):(i=new d.a.providers.HttpProvider("http://127.0.0.1:8545"),u=new d.a(i),console.log("No web3 instance injected, using Local web3."),t(u));case 14:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t,n){return e.apply(this,arguments)}}())};var E=function(){var e=Object(a.useState)(void 0),t=Object(m.a)(e,2),n=t[0],i=t[1],u=Object(a.useState)(void 0),o=Object(m.a)(u,2),l=o[0],y=o[1],d=Object(a.useState)(void 0),f=Object(m.a)(d,2),b=f[0],E=f[1],T=Object(a.useState)(0),x=Object(m.a)(T,2),k=x[0],O=x[1],j=Object(a.useState)(void 0),M=Object(m.a)(j,2),C=M[0],N=M[1],S=Object(a.useState)(),B=Object(m.a)(S,2),G=B[0],F=B[1],I=Object(s.c)().account;function D(){return L.apply(this,arguments)}function L(){return(L=Object(p.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=parseInt,e.next=4,l.methods.gameId().call();case 4:return e.t1=e.sent,t=(t=(0,e.t0)(e.t1))>0?t-1:t,e.next=9,l.methods.getGame(t).call();case 9:n=e.sent,F({id:n[0],bet:n[1],players:n[2],state:n[3]}),e.next=16;break;case 13:e.prev=13,e.t2=e.catch(0),console.log(e.t2.message);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}var _=function(){var e=Object(p.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.methods.allowance(I,l._address).call();case 3:t=e.sent,O(t),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),alert(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(p.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.methods.approve(t).send({from:I});case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0),alert(e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(p.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,n=t.target.elements[0].value,e.next=5,l.methods.createGame(n).send({from:I});case 5:return e.next=7,D();case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0),alert(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(p.a)(c.a.mark((function e(t){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),b){e.next=3;break}return e.abrupt("return");case 3:return a=t.target.elements[0].value.trim(),console.log(b.methods),e.prev=5,r=n.utils.toWei("10000"),e.next=9,b.methods.faucet(a,r).send({from:I});case 9:e.next=15;break;case 11:e.prev=11,e.t0=e.catch(5),console.log(e.t0),alert(e.t0.message);case 15:case"end":return e.stop()}}),e,null,[[5,11]])})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(p.a)(c.a.mark((function e(t){var n,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),G){e.next=4;break}return alert("game not created yet!"),e.abrupt("return");case 4:if(n=t.target.elements[0].value,e.prev=5,!(k<G.bet)){e.next=12;break}return e.next=9,A(G.bet);case 9:if(e.sent){e.next=12;break}return e.abrupt("return");case 12:return a=Math.floor(1e3*Math.random()),e.next=15,l.methods.commitMove(G.id,n,a).send({from:I});case 15:return e.next=17,D();case 17:e.next=23;break;case 19:e.prev=19,e.t0=e.catch(5),console.log(e.t0),alert(e.t0.message);case 23:case"end":return e.stop()}}),e,null,[[5,19]])})));return function(t){return e.apply(this,arguments)}}();function J(){return(J=Object(p.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,l.methods.stopGame(G.id).send({from:I});case 3:return e.next=5,D();case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var V=function(){var e=Object(p.a)(c.a.mark((function e(){var t,n,a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:return t=e.sent,n=new t.eth.Contract(w,"0x6aA4Fd863Ec4dB6Cdb65468c34E2b83De3ba4dCF"),a=new t.eth.Contract(h,"0x510efb5d3C62Ce4455D9836a1C3cCc14a01F8CB0"),e.next=7,a.methods.dealer().call();case 7:r=e.sent,i(t),E(n),y(a),N(r);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){"undefined"!==typeof l&&"undefined"!==typeof b&&"undefined"!==typeof n&&"undefined"!==typeof I&&(D(),_())}),[I]),Object(a.useEffect)((function(){console.log("sfasdfasd",I),I&&V()}),[I]);var z="undefined"!=typeof C&&I==C;return r.a.createElement("div",{className:"container"},r.a.createElement(v,null),r.a.createElement("h1",{className:"text-center"},"Lottery Game"),r.a.createElement((function(){return r.a.createElement("form",{onSubmit:function(e){return W(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"Get Faucet"},"Mint 10000 token from Faucet"),r.a.createElement("input",{placeholder:"Fill player address to get token from faucet",type:"text",className:"form-control",id:"address_faucet"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Mint"))}),null),r.a.createElement("div",{style:{height:50}}),z?r.a.createElement((function(){var e;return G?([2,3].includes(G.state)&&(e=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Bet: ",G.id),r.a.createElement("div",null,r.a.createElement("h2",null,"Players"),r.a.createElement("ul",null,G.players.map((function(e){return r.a.createElement("li",{key:e},e)})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12"},r.a.createElement("h2",null,"Close Game"),r.a.createElement("button",{onClick:function(e){return function(e){return J.apply(this,arguments)}(e)},type:"submit",className:"btn btn-success"},"Close Game"))))}),4===G.state&&(e=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Bet: ",G.id),r.a.createElement("div",null,r.a.createElement("h2",null,"Winners"),r.a.createElement("ul",null,G.winners.map((function(e){return r.a.createElement("li",{key:e},e)}))),r.a.createElement("div",{className:"col-sm-12"},r.a.createElement("h2",null,"Create Game"),r.a.createElement("form",{onSubmit:function(e){return H(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"bet"},"Bet Value"),r.a.createElement("input",{type:"text",className:"form-control",id:"bet"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit")))))})):e=function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12"},r.a.createElement("h2",null,"Create Game"),r.a.createElement("form",{onSubmit:function(e){return H(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"bet"},"Bet Value"),r.a.createElement("input",{type:"text",className:"form-control",id:"bet"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit"))))},r.a.createElement(r.a.Fragment,null,r.a.createElement(e,null))}),null):r.a.createElement((function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12"},r.a.createElement("h2",null,"Bet"),r.a.createElement("form",{onSubmit:function(e){return P(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"bet"},"Bet"),r.a.createElement("input",{type:"text",className:"form-control",id:"bet"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit"))))}),null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var T=3e3;function x(e){var t=new o.a(e);return t.pollingInterval=T,t}u.a.render(r.a.createElement((function(){return r.a.createElement(s.b,{getLibrary:x},r.a.createElement(E,null))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[202,1,2]]]);
//# sourceMappingURL=main.8673c683.chunk.js.map