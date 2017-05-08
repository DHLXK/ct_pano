var dialog = (function(doc,win){
	var that = {};
	var dialog_bg =doc.createElement('div');
	dialog_bg.className="dialog-bg";
	var getBox = function(obj){
		var dialog_boxHtml = '<div class="dialog-box" id="dialog"><span class="dialog-close"></span>'
				+'<div class="dialog-box-header"><h4 class="dialog-title">'+obj.title+'</h4></div>'
				+'<div class="dialog-box-body"><p>'+obj.content	
				+'</p></div>'
				+'<div class="dialog-box-footer"><a class="pano-btn" href="pano.html#'+obj.pano_data+'">进入全景视图</a></div>'
				+'</div>';
		dialog_bg.innerHTML = dialog_boxHtml;
	}

	that.open=function(obj){
		getBox(obj);
		doc.body.appendChild(dialog_bg);
	};
	that.close=function(){
		dialog_bg.parentNode.removeChild(dialog_bg);
	}
	doc.body.addEventListener('click',function(e){
		if(e.target.className === "dialog-close"){
			that.close();
		}
		
	},false);
	return that;
})(document,window);
