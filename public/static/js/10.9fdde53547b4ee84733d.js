webpackJsonp([10],{1012:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("canvas",{attrs:{id:t.canvasId,width:t.width,height:t.height}})])},staticRenderFns:[]}},507:function(t,i,s){s(771);var h=s(201)(s(558),s(994),"data-v-2ed62da2",null);t.exports=h.exports},558:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var h=s(991),a=s.n(h);i.default={components:{Schart:a.a},data:function(){return{data1:[{name:"2012",value:1141},{name:"2013",value:1499},{name:"2014",value:2260},{name:"2015",value:1170},{name:"2016",value:970},{name:"2017",value:1450}],data2:[{name:"短袖",value:1200},{name:"休闲裤",value:1222},{name:"连衣裙",value:1283},{name:"外套",value:1314},{name:"羽绒服",value:2314}],options1:{title:"某商店近年营业总额",bgColor:"#009688",titleColor:"#ffffff",fillColor:"#e0f2f1",axisColor:"#ffffff",contentColor:"#999"},options2:{title:"某商店各商品年度销量",bgColor:"#607d8b",titleColor:"#ffffff",legendColor:"#ffffff"}}}}},576:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var h=s(970),a=s.n(h);i.default={data:function(){return{}},props:{canvasId:{type:String,default:""},width:{type:[String,Number],default:500},height:{type:[String,Number],default:400},type:{type:String,default:"bar"},data:{type:Array,default:[]},options:{type:Object,required:!1}},mounted:function(){this.renderChart()},methods:{renderChart:function(){var t=this;new a.a(t.canvasId,t.type,t.data,t.options)}},watch:{data:function(){this.renderChart()},options:function(){this.renderChart()},type:function(){this.renderChart()},width:function(){var t=this;t.$nextTick(function(){t.renderChart()})},height:function(){var t=this;t.$nextTick(function(){t.renderChart()})}}}},668:function(t,i,s){i=t.exports=s(504)(!1),i.push([t.i,".schart[data-v-2ed62da2]{width:600px;display:inline-block}.content-title[data-v-2ed62da2]{clear:both;font-weight:400;line-height:50px;margin:10px 0;font-size:22px;color:#1f2f3d}",""])},771:function(t,i,s){var h=s(668);"string"==typeof h&&(h=[[t.i,h,""]]),h.locals&&(t.exports=h.locals);s(505)("071a876a",h,!0)},970:function(t,i,s){var h;/*!
 * sChart JavaScript Library v1.0.2
 * http://test.omwteam.com/sChart/ | Released under the MIT license
 * Date: 2017-07-12T18:59Z
 */
!function(a,e){void 0!==(h=function(){return e(a)}.call(i,s,i,t))&&(t.exports=h)}(this,function(t){"use strict";function i(t,i,s,h){this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.type=i,this.data=s,this.dataLength=this.data.length,this.width=this.canvas.width,this.height=this.canvas.height,this.padding=50,this.yEqual=5,this.yLength=0,this.xLength=0,this.yFictitious=0,this.yRatio=0,this.bgColor="#ffffff",this.fillColor="#1E9FFF",this.axisColor="#666666",this.contentColor="#eeeeee",this.titleColor="#000000",this.title="",this.titlePosition="top",this.looped=null,this.current=0,this.radius=100,this.innerRadius=70,this.colorList=["#1E9FFF","#13CE66","#F7BA2A","#FF4949","#72f6ff","#199475","#e08031","#726dd1"],this.legendColor="#000000",this.legendTop=40,this.totalValue=this.getTotalValue(),this.init(h)}return function(){window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,window.requestAnimationFrame||(window.requestAnimationFrame=function(t){return window.setTimeout(t,1e3/60)}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),i.prototype={init:function(t){if(0===this.dataLength)return!1;if(t)for(var i in t)"colorList"===i&&Array.isArray(t[i])?this[i]=t[i].concat(this[i]):this[i]=t[i];"bar"===this.type||"line"===this.type?(this.yLength=Math.floor((this.height-2*this.padding-10)/this.yEqual),this.xLength=Math.floor((this.width-1.5*this.padding-10)/this.dataLength),this.yFictitious=this.getYFictitious(this.data),this.yRatio=this.yLength/this.yFictitious,this.looping()):this.drawPieUpdate()},looping:function(){this.looped=window.requestAnimationFrame(this.looping.bind(this)),this.current<100?(this.current=this.current+3>100?100:this.current+3,this.drawAnimation()):(window.cancelAnimationFrame(this.looped),this.looped=null)},drawAnimation:function(){for(var t=0;t<this.dataLength;t++){var i=Math.ceil(this.data[t].value*this.current/100*this.yRatio),s=this.height-this.padding-i;this.data[t].left=this.padding+this.xLength*(t+.25),this.data[t].top=s,this.data[t].right=this.padding+this.xLength*(t+.75),this.data[t].bottom=this.height-this.padding,this.drawBarUpdate()}},drawBarUpdate:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.width,this.height),this.drawAxis(),this.drawPoint(),this.drawTitle(),this.drawBarChart()},drawPieUpdate:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.width,this.height),this.drawLegend(),this.drawTitle(),this.drawPieChart()},drawBarChart:function(){this.ctx.fillStyle=this.fillColor,this.ctx.strokeStyle=this.fillColor;for(var t=0;t<this.dataLength;t++)"line"===this.type?(this.ctx.beginPath(),this.ctx.arc(this.data[t].left+this.xLength/4,this.data[t].top,2,0,2*Math.PI,!0),this.ctx.fill(),t!==this.dataLength-1&&(this.ctx.moveTo(this.data[t].left+this.xLength/4,this.data[t].top),this.ctx.lineTo(this.data[t+1].left+this.xLength/4,this.data[t+1].top)),this.ctx.stroke()):"bar"===this.type&&this.ctx.fillRect(this.data[t].left,this.data[t].top,this.data[t].right-this.data[t].left,this.data[t].bottom-this.data[t].top),this.ctx.font="12px Arial",this.ctx.fillText(this.data[t].value*this.current/100,this.data[t].left+this.xLength/4,this.data[t].top-5)},drawPieChart:function(){for(var t=this.width/2,i=this.height/2,s=0,h=0,a=0;a<this.dataLength;a++)this.ctx.beginPath(),this.ctx.fillStyle=this.colorList[a],this.ctx.moveTo(t,i),this.data[a].start=0===a?-Math.PI/2:this.data[a-1].end,this.data[a].end=this.data[a].start+this.data[a].value/this.totalValue*2*Math.PI,this.ctx.arc(t,i,this.radius,this.data[a].start,this.data[a].end),this.ctx.closePath(),this.ctx.fill(),this.data[a].middle=(this.data[a].start+this.data[a].end)/2,s=Math.ceil(Math.abs(this.radius*Math.cos(this.data[a].middle))),h=Math.floor(Math.abs(this.radius*Math.sin(this.data[a].middle))),this.ctx.strokeStyle=this.colorList[a],this.data[a].middle<=0?(this.ctx.textAlign="left",this.ctx.moveTo(t+s,i-h),this.ctx.lineTo(t+s+10,i-h-10),this.ctx.moveTo(t+s+10,i-h-10),this.ctx.lineTo(t+s+this.radius/2,i-h-10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t+s+5+this.radius/2,i-h-5)):this.data[a].middle>0&&this.data[a].middle<=Math.PI/2?(this.ctx.textAlign="left",this.ctx.moveTo(t+s,i+h),this.ctx.lineTo(t+s+10,i+h+10),this.ctx.moveTo(t+s+10,i+h+10),this.ctx.lineTo(t+s+this.radius/2,i+h+10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t+s+5+this.radius/2,i+h+15)):this.data[a].middle>Math.PI/2&&this.data[a].middle<Math.PI?(this.ctx.textAlign="right",this.ctx.moveTo(t-s,i+h),this.ctx.lineTo(t-s-10,i+h+10),this.ctx.moveTo(t-s-10,i+h+10),this.ctx.lineTo(t-s-this.radius/2,i+h+10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t-s-5-this.radius/2,i+h+15)):(this.ctx.textAlign="right",this.ctx.moveTo(t-s,i-h),this.ctx.lineTo(t-s-10,i-h-10),this.ctx.moveTo(t-s-10,i-h-10),this.ctx.lineTo(t-s-this.radius/2,i-h-10),this.ctx.stroke(),this.ctx.fillText(this.data[a].value,t-s-5-this.radius/2,i-h-5));"ring"===this.type&&(this.ctx.beginPath(),this.ctx.fillStyle=this.bgColor,this.ctx.arc(t,i,this.innerRadius,0,2*Math.PI),this.ctx.fill())},drawAxis:function(){this.ctx.beginPath(),this.ctx.strokeStyle=this.axisColor,this.ctx.moveTo(this.padding+.5,this.height-this.padding+.5),this.ctx.lineTo(this.padding+.5,this.padding+.5),this.ctx.moveTo(this.padding+.5,this.height-this.padding+.5),this.ctx.lineTo(this.width-this.padding/2+.5,this.height-this.padding+.5),this.ctx.stroke()},drawPoint:function(){this.ctx.beginPath(),this.ctx.font="12px Microsoft YaHei",this.ctx.textAlign="center",this.ctx.fillStyle=this.axisColor;for(var t=0;t<this.dataLength;t++){var i=this.data[t].name,s=this.xLength*(t+1);this.ctx.moveTo(this.padding+s+.5,this.height-this.padding+.5),this.ctx.lineTo(this.padding+s+.5,this.height-this.padding+5.5),this.ctx.fillText(i,this.padding+s-this.xLength/2,this.height-this.padding+15)}this.ctx.stroke(),this.ctx.beginPath(),this.ctx.font="12px Microsoft YaHei",this.ctx.textAlign="right",this.ctx.fillStyle=this.axisColor,this.ctx.moveTo(this.padding+.5,this.height-this.padding+.5),this.ctx.lineTo(this.padding-4.5,this.height-this.padding+.5),this.ctx.fillText(0,this.padding-10,this.height-this.padding+5);for(var t=0;t<this.yEqual;t++){var h=this.yFictitious*(t+1),a=this.yLength*(t+1);this.ctx.beginPath(),this.ctx.strokeStyle=this.axisColor,this.ctx.moveTo(this.padding+.5,this.height-this.padding-a+.5),this.ctx.lineTo(this.padding-4.5,this.height-this.padding-a+.5),this.ctx.stroke(),this.ctx.fillText(h,this.padding-10,this.height-this.padding-a+5),this.ctx.beginPath(),this.ctx.strokeStyle=this.contentColor,this.ctx.moveTo(this.padding+.5,this.height-this.padding-a+.5),this.ctx.lineTo(this.width-this.padding/2+.5,this.height-this.padding-a+.5),this.ctx.stroke()}},drawTitle:function(){this.title&&(this.ctx.beginPath(),this.ctx.textAlign="center",this.ctx.fillStyle=this.titleColor,this.ctx.font="16px Microsoft YaHei","bottom"===this.titlePosition&&this.padding>=40?this.ctx.fillText(this.title,this.width/2,this.height-5):this.ctx.fillText(this.title,this.width/2,this.padding/2))},drawLegend:function(){for(var t=0;t<this.dataLength;t++)this.ctx.fillStyle=this.colorList[t],this.ctx.fillRect(10,this.legendTop+20*t,20,11),this.ctx.fillStyle=this.legendColor,this.ctx.font="12px Microsoft YaHei",this.ctx.textAlign="left",this.ctx.fillText(this.data[t].name,35,50+20*t)},getYFictitious:function(t){var i=t.slice(0);i.sort(function(t,i){return-(t.value-i.value)});var s=Math.ceil(i[0].value/this.yEqual),h=s.toString().length-1;return h=h>2?2:h,Math.ceil(s/Math.pow(10,h))*Math.pow(10,h)},getTotalValue:function(){for(var t=0,i=0;i<this.dataLength;i++)t+=this.data[i].value;return t}},i})},991:function(t,i,s){var h=s(201)(s(576),s(1012),null,null);t.exports=h.exports},994:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("div",{staticClass:"crumbs"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",[s("i",{staticClass:"el-icon-date"}),t._v(" 图表")]),t._v(" "),s("el-breadcrumb-item",[t._v("基础图表")])],1)],1),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"schart"},[s("div",{staticClass:"content-title"},[t._v("柱状图")]),t._v(" "),s("schart",{attrs:{canvasId:"bar",width:"500",height:"400",data:t.data1,type:"bar",options:t.options1}})],1),t._v(" "),s("div",{staticClass:"schart"},[s("div",{staticClass:"content-title"},[t._v("折线图")]),t._v(" "),s("schart",{attrs:{canvasId:"line",width:"500",height:"400",data:t.data1,type:"line",options:t.options1}})],1),t._v(" "),s("div",{staticClass:"schart"},[s("div",{staticClass:"content-title"},[t._v("饼状图")]),t._v(" "),s("schart",{attrs:{canvasId:"pie",width:"500",height:"400",data:t.data2,type:"pie",options:t.options2}})],1),t._v(" "),s("div",{staticClass:"schart"},[s("div",{staticClass:"content-title"},[t._v("环形图")]),t._v(" "),s("schart",{attrs:{canvasId:"ring",width:"500",height:"400",data:t.data2,type:"ring",options:t.options2}})],1)])},staticRenderFns:[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"plugins-tips"},[t._v("\n        vue-schart：vue.js封装sChart.js的图表组件。\n        访问地址："),s("a",{attrs:{href:"https://github.com/lin-xin/vue-schart",target:"_blank"}},[t._v("vue-schart")])])}]}}});