(this["webpackJsonpemail-analyser"]=this["webpackJsonpemail-analyser"]||[]).push([[0],{325:function(e,t,a){e.exports=a(508)},330:function(e,t,a){},332:function(e,t,a){},508:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(58),i=a.n(l),o=(a(330),a(331),a(332),a(520)),s=a(530),c=a(50),u=function(){return r.a.createElement(s.a,{as:"h1",icon:!0,textAlign:"center"},r.a.createElement(c.a,{name:"mail",circular:!0}),r.a.createElement(s.a.Content,null,"Email Analyser"),r.a.createElement(s.a.Subheader,null,"Parse an email headers to get more insights into its metadata."))},m=function(){return r.a.createElement("a",{href:"https://github.com/juliendoutre/email-analyser",className:"github-corner","aria-label":"View source on GitHub"},r.a.createElement("svg",{width:"80",height:"80",viewBox:"0 0 250 250",style:{fill:"#151513",color:"#fff",position:"absolute",top:"0",border:"0",right:"0"},"aria-hidden":"true"},r.a.createElement("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}),r.a.createElement("path",{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{transformOrigin:"130px 106px"},className:"octo-arm"}),r.a.createElement("path",{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor",className:"octo-body"})))},d=a(271),h=a(43),p=a(44),f=a(45),E=a(46),v=a(521),g=a(529),b=a(528),y=a(527),C=a(162),w=a(525),k=function(e,t){return function(){var a=document.createElement("a"),n=new Blob([e],{type:"application/json"});a.href=URL.createObjectURL(n),a.download=t,a.click()}},j=function(e){var t=document.createElement("textarea");t.innerText=e,document.body.appendChild(t),t.select(),t.setSelectionRange(0,99999),document.execCommand("copy"),t.remove()},O=function(e){return r.a.createElement(C.a,{basic:!0},r.a.createElement(g.a,{icon:!0,labelPosition:"right",onClick:(t=e.results,a="email-analyzer-metadata-headers.csv",function(){var e="";Object.keys(t).forEach((function(a){e+="".concat(a,',"').concat(Array.isArray(t[a])?t[a].join("\n"):t[a],'"\n')}));var n=document.createElement("a"),r=new Blob([e],{type:"text/csv"});n.href=URL.createObjectURL(r),n.download=a,n.click()})},"Download CSV",r.a.createElement(c.a,{name:"download"})),r.a.createElement(w.a,{selectable:!0,basic:"very"},r.a.createElement(w.a.Body,null,Object.keys(e.results).map((function(t){return r.a.createElement(w.a.Row,{key:t},r.a.createElement(w.a.Cell,null,t),r.a.createElement(w.a.Cell,null,r.a.createElement(C.a,{basic:!0,style:{overflow:"auto",width:"45vw",whiteSpace:"nowrap"}}," ",Array.isArray(e.results[t])?e.results[t].join("\n"):e.results[t])))})))));var t,a},x=a(59),S=function(e,t){null!=e.name&&(e.name in t?Array.isArray(t[e.name])?t[e.name].push(e.contents):t[e.name]=[t[e.name],e.contents]:t[e.name]=e.contents)},T=function(e){var t={},a={name:null,contents:null};return e.split("\n").forEach((function(e){if(""!==e){var n=e.match(/^[-\w]*:/);null!=n&&n.length>0?(S(a,t),a.name=n[0].replace(":",""),a.contents=e.replace(n[0],"").trim()):(""!==a.contents&&(a.contents+="\n"),a.contents+=e.trim())}})),S(a,t),t},A=function(e,t){for(var a=0,n=Object.keys(t);a<n.length;a++){var r=n[a];if(r.toLowerCase()===e.toLowerCase())return t[r]}return""},I=function(e,t){for(var a=/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,n=0,r=Object.keys(t);n<r.length;n++){var l=r[n];if(l.toLowerCase()===e.toLowerCase()){var i=t[l].match(a);return null!==i?i:[]}}return[]},L=function(e){var t=e.match(/[\s(,;[](?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\s),;\]]/),a=e.match(/([0-9a-f]|:){1,4}(:([0-9a-f]{0,4})*){1,7}/i),n=e.match(/((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/gi),r={};if(null!==t&&t.length>0&&t){var l=t[0].replace(/^[\s(,;[]/,"").replace(/[\s),;\]]$/,"");"127.0.0.1"!==l&&(r.ipv4=l)}return null!==a&&a.length>0&&(r.ipv6=a[0]),null!==n&&n.length>0&&(r.dns=n[0]),r},R=function(e){var t,a=[],n=Object(x.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value,l={},i=(r=r.replace("\n"," ").replace("\t"," ")).indexOf(";");-1!==i&&(l.timestamp=r.substring(i+1,r.length).trim(),r=r.substring(0,i));var o=r.indexOf("by ");if(-1!==o){var s=L(r.substring(o+3,r.length));0!==Object.keys(s).length&&(l.target=s),r=r.substring(0,o)}var c=r.indexOf("from ");if(-1!==c){var u=L(r.substring(c+5,r.length));0!==Object.keys(u).length&&(l.source=u)}a.push(l)}}catch(m){n.e(m)}finally{n.f()}return a},H=function(e){var t=JSON.stringify(e.results,null,2);return r.a.createElement(C.a,{basic:!0},r.a.createElement(g.a,{icon:!0,labelPosition:"right",onClick:k(t,"email-analyzer-metadata-headers.json")},"Download JSON",r.a.createElement(c.a,{name:"download"})),r.a.createElement("pre",{style:{overflowX:"auto"}},t))},N=a(23),M=a(295),P=a(524),z=a(526),D=function(e){Object(E.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={popupVisible:!1},e.handleOpen=function(){e.setState({popupVisible:!0}),e.timeout=setTimeout((function(){return e.handleClose()}),600)},e.handleClose=function(){e.setState({popupVisible:!1}),clearTimeout(e.timeout)},e}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(P.a,{inverted:!0,content:"Copied to clipboard!",on:"click",open:this.state.popupVisible,onClose:this.handleClose,onOpen:this.handleOpen,trigger:r.a.createElement(z.a.Item,{onClick:function(){return j(e.props.description)}},r.a.createElement(z.a.Content,null,r.a.createElement(z.a.Header,null,this.props.header),r.a.createElement(z.a.Description,null,this.props.description)))})}}]),a}(n.Component),B=function(e){return void 0!==e?r.a.createElement(z.a,{relaxed:!0,selection:!0},"dns"in e?r.a.createElement(D,{header:"Domain name",description:e.dns}):null,"ipv4"in e?r.a.createElement(D,{header:"IPv4",description:e.ipv4}):null,"ipv6"in e?r.a.createElement(D,{header:"IPv6",description:e.ipv6}):null):null},V=function(e){e.id="dns"in e?e.dns:"ipv4"in e?e.ipv4:"ipv6"in e?e.ipv6:parseInt(1e3*Math.random(),10).toString()},J=function(e,t){"dns"in e&&!("dns"in t)&&(t.dns=e.dns),"ipv4"in e&&!("ipv4"in t)&&(t.ipv4=e.ipv4),"ipv6"in e&&!("ipv6"in t)&&(t.ipv6=e.ipv6),V(t)},F=function(e,t){var a,n,r,l=!1,i=Object(x.a)(e);try{for(i.s();!(a=i.n()).done;){var o=a.value;if(r=o,"dns"in(n=t)&&"dns"in r&&n.dns.toLowerCase()===r.dns.toLowerCase()||"ipv4"in n&&"ipv4"in r&&n.ipv4===r.ipv4||"ipv6"in n&&"ipv6"in r&&n.ipv6===r.ipv6){J(t,o),l=!0;break}}}catch(c){i.e(c)}finally{i.f()}if(!l){var s={};"dns"in t&&(s.dns=t.dns),"ipv4"in t&&(s.ipv4=t.ipv4),"ipv6"in t&&(s.ipv6=t.ipv6),V(s),e.push(s)}},U=function(e,t,a){var n,r=Object(x.a)(e);try{for(r.s();!(n=r.n()).done;){var l=n.value;if(l[t]===a)return l.id}}catch(i){r.e(i)}finally{r.f()}return"-1"},W=function(e,t){var a;return"dns"in t&&(a=U(e,"dns",t.dns)),"-1"!==a?a:("ipv4"in t&&(a=U(e,"ipv4",t.ipv4)),"-1"!==a||"ipv6"in t&&(a=U(e,"ipv6",t.ipv6)),a)},Z=function(e){Object(E.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).state={enabled:"Received"in n.props.results,selectedNode:{}},n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=this;if(this.state.enabled){var t=function(e){var t,a={nodes:[],links:[]},n=R(e),r=Object(x.a)(n);try{for(r.s();!(t=r.n()).done;){var l=t.value;"source"in l&&F(a.nodes,l.source),"target"in l&&F(a.nodes,l.target)}}catch(c){r.e(c)}finally{r.f()}var i,o=Object(x.a)(n);try{for(o.s();!(i=o.n()).done;){var s=i.value;"source"in s&&"target"in s&&a.links.push({source:W(a.nodes,s.source),target:W(a.nodes,s.target),timestamp:s.timestamp})}}catch(c){o.e(c)}finally{o.f()}return a}(this.props.results.Received),a=document.getElementsByClassName("eleven wide column")[0].offsetWidth,n=.5*a,r=N.e(t.nodes).force("link",N.c(t.links).id((function(e){return e.id}))).force("charge",N.d().strength(-400)).force("x",N.f()).force("y",N.g()),l=N.j("#canvas").attr("viewBox",[-a/2,-n/2,a,n]).style("font","12px sans-serif"),i=function(e){return N.h(N.i)(e.group)};l.append("defs").selectAll("marker").data(["standard"]).join("marker").attr("id",(function(e){return"arrow-".concat(e)})).attr("viewBox","0 -5 10 10").attr("refX",15).attr("refY",-.5).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto").append("path").attr("fill",i).attr("d","M0,-5L10,0L0,5");var o=function(e){var t=Math.hypot(e.target.x-e.source.x,e.target.y-e.source.y);return"\n          M".concat(e.source.x,",").concat(e.source.y,"\n          A").concat(t,",").concat(t," 0 0,1 ").concat(e.target.x,",").concat(e.target.y,"\n        ")},s=l.append("g").attr("id","nodes-container").attr("fill","#1f77b4").attr("stroke-linecap","round").attr("stroke-linejoin","round").selectAll("g").data(t.nodes).join("g").attr("isClicked","false").call(function(e){return N.a().on("start",(function(t){N.b.active||e.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y})).on("drag",(function(e){e.fx=N.b.x,e.fy=N.b.y})).on("end",(function(t){N.b.active||e.alphaTarget(0),t.fx=null,t.fy=null}))}(r));function c(e){e.style("fill","orange"),e.select("text").style("fill","orange").style("font-weight","bold")}s.append("circle").attr("stroke","white").attr("stroke-width",1.5).attr("r",10),s.append("text").attr("dx",20).attr("dy","0.31em").style("fill","black").text((function(e){return e.id})),s.on("mouseover",(function(){c(N.j(this))})),s.on("mouseout",(function(){var e=N.j(this);"false"===e.attr("isClicked")&&function(e){e.style("fill","#1f77b4"),e.select("text").style("fill","black").style("font-weight","normal")}(e)}));var u=function(t){return e.setState({selectedNode:t})};u.bind(this),s.on("click",(function(e){var t=N.j(this);"false"===t.attr("isClicked")?(u(e),N.j("#nodes-container").selectAll("g").attr("isClicked","false").style("fill","#1f77b4").select("text").style("fill","black").style("font-weight","normal"),c(t),t.attr("isClicked","true")):(t.attr("isClicked","false"),u({}))}));var m=l.append("g").attr("fill","none").attr("stroke-width",1.5).selectAll("path").data(t.links).join("path").attr("stroke",(function(e){return i(e)})).attr("marker-end","url(".concat(new URL("#arrow-standard",document.location),")"));r.on("tick",(function(){m.attr("d",o),s.attr("transform",(function(e){return"translate(".concat(e.x,",").concat(e.y,")")}))}))}}},{key:"render",value:function(){return this.state.enabled?r.a.createElement(C.a,{basic:!0},r.a.createElement(M.a,null,r.a.createElement(M.a.Column,{width:5},r.a.createElement(s.a,{as:"h3",disabled:0===Object.keys(this.state.selectedNode).length,textAlign:"center"},0!==Object.keys(this.state.selectedNode).length?r.a.createElement(c.a,{name:"server"}):null,r.a.createElement(s.a.Content,null,0===Object.keys(this.state.selectedNode).length?"Click on a node to begin!":"Selected server")),B(this.state.selectedNode)),r.a.createElement(M.a.Column,{width:11},r.a.createElement("svg",{id:"canvas"})))):r.a.createElement(C.a,{basic:!0,disabled:!0},r.a.createElement(s.a,{as:"h4"},"Nothing to display."))}}]),a}(n.Component),G=a(519),Y=function(e){Object(E.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={popupVisible:!1},e.handleOpen=function(){e.setState({popupVisible:!0}),e.timeout=setTimeout((function(){return e.handleClose()}),600)},e.handleClose=function(){e.setState({popupVisible:!1}),clearTimeout(e.timeout)},e}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(P.a,{inverted:!0,content:"Copied to clipboard!",on:"click",open:this.state.popupVisible,onClose:this.handleClose,onOpen:this.handleOpen,trigger:r.a.createElement(z.a.Item,{onClick:function(){return j(e.props.email)}},r.a.createElement(z.a.Content,{floated:"right"},r.a.createElement(P.a,{inverted:!0,style:{opacity:.8},content:"Check if this email address has been compromised on HaveIBeenPwned",trigger:r.a.createElement(g.a,{icon:"zoom",circular:!0,onClick:function(){return document.location.href="https://haveibeenpwned.com/"}})})),r.a.createElement(z.a.Content,null,r.a.createElement(z.a.Header,null,this.props.email),r.a.createElement(z.a.Description,null,this.props.header)))})}}]),a}(n.Component),_=function(e){var t,a=(t=e.results,{users:{From:I("From",t),To:I("To",t),Cc:I("Cc",t),"Return-Path":I("Return-Path",t)},contents:{"Message-Id":A("Message-Id",t),Date:A("Date",t),Subject:A("Subject",t),"MIME-Version":A("MIME-Version",t),"Content-Type":A("Content-Type",t),"Content-Language":A("Content-Language",t)},routing:R("Received"in t?t.Received:[])});return r.a.createElement(C.a,{basic:!0},r.a.createElement(g.a,{icon:!0,labelPosition:"right",onClick:k(JSON.stringify(a,null,2),"email-metadata-analyzer-summary.json")},"Download JSON",r.a.createElement(c.a,{name:"download"})),r.a.createElement(s.a,{as:"h2"},r.a.createElement(c.a,{name:"users"}),r.a.createElement(s.a.Content,null,"Stakeholders")),r.a.createElement(s.a,{as:"h4",disabled:0===a.users.From.length&&0===a.users["Return-Path"].length},"Sender"),r.a.createElement(z.a,{relaxed:!0,selection:!0},a.users.From.map((function(e){return r.a.createElement(Y,{email:e,header:"From"})})),a.users["Return-Path"].map((function(e){return r.a.createElement(Y,{email:e,header:"Return-Path"})}))),r.a.createElement(G.a,null),r.a.createElement(s.a,{as:"h4",disabled:0===a.users.To.length&&0===a.users.Cc.length},"Recipient(s)"),r.a.createElement(z.a,{relaxed:!0,selection:!0},a.users.To.map((function(e){return r.a.createElement(Y,{email:e,header:"To"})})),a.users.Cc.map((function(e){return r.a.createElement(Y,{email:e,header:"Cc"})}))),r.a.createElement(G.a,null),r.a.createElement(s.a,{as:"h2",disabled:0===Object.keys(a.contents).length},r.a.createElement(c.a,{name:"file alternate"}),r.a.createElement(s.a.Content,null,"Contents")),r.a.createElement(w.a,{basic:"very",selectable:!0},r.a.createElement(w.a.Body,null,Object.keys(a.contents).map((function(e){return r.a.createElement(w.a.Row,{disabled:""===a.contents[e]},r.a.createElement(w.a.Cell,{width:3},r.a.createElement("b",null,e)),r.a.createElement(w.a.Cell,{width:11},a.contents[e]),r.a.createElement(w.a.Cell,{width:2,textAlign:"center"},r.a.createElement(P.a,{inverted:!0,style:{opacity:.8},content:"Copy to clipboard",trigger:r.a.createElement(g.a,{icon:"copy",circular:!0,disabled:""===a.contents[e],onClick:function(){return j(a.contents[e])}})})))})))),r.a.createElement(G.a,null),r.a.createElement(s.a,{as:"h2",disabled:0===Object.keys(a.contents).length},r.a.createElement(c.a,{name:"globe"}),r.a.createElement(s.a.Content,null,"Routing")),a.routing.length>0?r.a.createElement(w.a,null,r.a.createElement(w.a.Header,null,r.a.createElement(w.a.HeaderCell,null,"Timestamp"),r.a.createElement(w.a.HeaderCell,null,"Source"),r.a.createElement(w.a.HeaderCell,null,"Target")),r.a.createElement(w.a.Body,null,a.routing.map((function(e){return r.a.createElement(w.a.Row,{key:e},"timestamp"in e?r.a.createElement(w.a.Cell,null,e.timestamp):r.a.createElement(w.a.Cell,null),"source"in e?r.a.createElement(w.a.Cell,null,B(e.source)):r.a.createElement(w.a.Cell,null),"target"in e?r.a.createElement(w.a.Cell,null,B(e.target)):r.a.createElement(w.a.Cell,null))})))):null)},X=function(e){Object(E.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={email:"",results:{},messageHidden:!0,activeIndex:0},e.handleChange=function(t,a){var n=a.name,r=a.value;return e.setState(Object(d.a)({},n,r))},e.handleSubmit=function(){e.setState({results:{},messageHidden:!0,activeIndex:0});var t=T(e.state.email);e.setState({results:t}),e.setState({messageHidden:0!==Object.keys(t).length})},e.handleDismiss=function(){e.setState({messageHidden:!0})},e.handleClear=function(){e.setState({email:"",loading:!1,results:{},messageHidden:!0})},e.handleTabChange=function(t,a){var n=a.activeIndex;return e.setState({activeIndex:n})},e}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(v.a,{style:{textAlign:"center",marginTop:"3em"}},r.a.createElement(v.a.TextArea,{placeholder:"Email contents",name:"email",value:this.state.email,onChange:this.handleChange,rows:15}),r.a.createElement(g.a,{onClick:this.handleSubmit},"Analyse"),r.a.createElement(g.a,{onClick:this.handleClear,color:"orange",disabled:0===this.state.email.length},"Clear")),r.a.createElement(b.a,{warning:!0,hidden:this.state.messageHidden,onDismiss:this.handleDismiss},r.a.createElement(b.a.Header,null,"Could not parse any header..."),r.a.createElement("p",null,"Please enter an other input to parse.")),r.a.createElement(y.a,{activeIndex:this.state.activeIndex,onTabChange:this.handleTabChange,panes:[{menuItem:"Summary",render:function(){return r.a.createElement(y.a.Pane,null,r.a.createElement(_,{results:e.state.results}))}},{menuItem:"Routing Graph",render:function(){return r.a.createElement(y.a.Pane,null,r.a.createElement(Z,{results:e.state.results}))}},{menuItem:"Table",render:function(){return r.a.createElement(y.a.Pane,null,r.a.createElement(O,{results:e.state.results}))}},{menuItem:"JSON",render:function(){return r.a.createElement(y.a.Pane,null,r.a.createElement(H,{results:e.state.results}))}}],hidden:0===Object.keys(this.state.results).length,style:{marginTop:"3em"}}))}}]),a}(n.Component),$=a(522),q=function(){return r.a.createElement($.a,{trigger:r.a.createElement(g.a,{basic:!0,size:"huge",style:{position:"absolute",top:"0",border:"0",left:"0",width:"3.2em",marginLeft:"3em",marginTop:"2em"},icon:"info"})},r.a.createElement(s.a,{as:"h1",icon:"info circle",content:"Info"}),r.a.createElement($.a.Content,null,r.a.createElement(o.a,{text:!0,textAlign:"justified"},r.a.createElement(s.a,{size:"medium"},"What is this website?"),r.a.createElement("p",null,"Emails are sent with a few extra information other than their plain contents. They can be useful to assess a message's origin, its path from an email server to an other, the protocols used, its content nature, etc."),r.a.createElement("p",null,"These metadata are rarely displayed by email clients and are not easy for a human to read. This website purpose is to help oneself to extract meaningful information from them."),r.a.createElement(s.a,{size:"medium"},"How can I use it?"),r.a.createElement("p",null,"Just copy/paste an email metadata string in the form text area and click on",r.a.createElement("i",null,"Analyse"),"."),r.a.createElement("p",null,"Currently, four views are available:"),r.a.createElement(z.a,{bulleted:!0},r.a.createElement(z.a.Item,null,r.a.createElement("b",null,"Summary")," ","displays the most common parsed headers"),r.a.createElement(z.a.Item,null,r.a.createElement("b",null,"Graph")," ","displays a network chart of the message trip through email servers"),r.a.createElement(z.a.Item,null,r.a.createElement("b",null,"Table")," ","and"," ",r.a.createElement("b",null,"JSON")," ","dispays the raw headers under CSV and JSON formats.")),r.a.createElement(s.a,{size:"medium"},"I don't feel comfortable with entering personal email data on a website, is it safe?"),r.a.createElement("p",null,"This is a legitimate concern!"),r.a.createElement("p",null,"This website does not perform any call to a backend that would process the results. Everything is computed inside your browser."),r.a.createElement("p",null,"You can read the code on GitHub if you want to check it:",r.a.createElement("a",{href:"https://github.com/juliendoutre/email-analyser"},"https://github.com/juliendoutre/email-analyser")),r.a.createElement("p",null,"You can even deploy the website from the code on your machine (just follow the",r.a.createElement("a",{href:"https://github.com/juliendoutre/email-analyser/blob/master/README.md"},"README")," ","instructions to get started)."),r.a.createElement(s.a,{size:"medium"},"How do I find an email headers?"),r.a.createElement("p",null,"They are usually avaible in an email client message",r.a.createElement("i",null,"Details")," ","panel."),r.a.createElement("p",null,"The following page can help you to get them from various clients :",r.a.createElement("a",{href:"https://support.google.com/mail/answer/29436?hl=en"},"https://support.google.com/mail/answer/29436?hl=en"),"."))))},K=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(m,null),r.a.createElement(q,null),r.a.createElement(o.a,{style:{paddingTop:"3em",paddingBottom:"3em"},textAlign:"left"},r.a.createElement(u,null),r.a.createElement(X,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[325,1,2]]]);
//# sourceMappingURL=main.22ca9247.chunk.js.map