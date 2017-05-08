/*高德地图API*/

var map = new AMap.Map('container', {
    resizeEnable: true,  //是否监控地图容器尺寸变化
    zoom:15,  //地图的缩放级别
    center: [116.353747,25.834119]    //确定中心点   
});
var centerPosition = new AMap.LngLat(116.353747,25.834119);  //设置限制中心点范围
//城市范围
var southWest = new AMap.LngLat(116.001583,25.432591);   //西南方经纬度
var northEast = new AMap.LngLat(116.777492,26.020241);   //东北方经纬度
var citybounds = new AMap.Bounds(southWest,northEast);   //城市范围
map.setLimitBounds(citybounds);

//首页处理
var eventStr = '';
var viewMenuStrArr = [];
var navDiv = document.getElementById('nav_all');
var li;
var viewMenu;
var i;
var len = positionArr.length
//标记
var oncli = function(){
	console.log(this.getExtData());
    dialog.open(this.getExtData());
};
for(i = 0;i<len;i++){
	var marker;
	var now = positionArr[i];
	marker = new AMap.Marker({
	    position: now.position,
	    extData:now,
	    map: map
	});
	li = '<li class="viewBtn"><a href="javascript:;" data-id="'+now.id+'">'+now.areaName+'</a></li>';
	viewMenuStrArr.push(li);
	AMap.event.addListener(marker,'click',oncli);
}

navDiv.innerHTML = viewMenuStrArr.join(''); 


if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  
    eventStr = 'touchstart';
} else if (/(Android)/i.test(navigator.userAgent)) {  
   	eventStr = 'touchstart';
} else {  
    eventStr = 'mousedown'; 
};  

function getViewObj(id){
	var obj = {};
	for(var j=0;j<len;j++){
		var now = positionArr[j];
		if(now.id.toString() === id){
			return obj = now;
		}
	}
}

navDiv.addEventListener(eventStr,function(e){
	var ev = ev || window.event;
　　var target = ev.target || ev.srcElement;
	if(target.nodeName.toLowerCase() == 'a'){
		var id = target.getAttribute('data-id');
		var obj=getViewObj(id);
		dialog.open(obj);
	}
	
})