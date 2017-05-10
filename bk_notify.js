(function($){
	$.notify={};
	$.notify.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1000,time:6000};
	$.notify.add=function(f){
		try{
			return a.add(f||{})
		}catch(d){
			var c="notice Error: "+d;
			(typeof(console)!="undefined"&&console.error)?console.error(c,f):alert(c)
		}
	};
	$.notify.remove=function(count,c){
		a.removeSpecific(count,c||{})
	};
	$.notify.removeAll=function(c){
		a.stop(c||{})
	};
	var a={
		_custom_timer:0,
		_item_count:0,
		_tpl_close:'<div class="notify-close"></div>',
		_tpl_title:'<span class="notify-title">[[title]]</span>',
		_tpl_item:'<div id="notify-item-[[number]]" class="notify-item-wrapper [[item_class]]" style="display:none"><div class="notify-top"></div><div class="notify-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="notify-bottom"></div></div>',
		_tpl_wrap:'<div id="notify-notice-wrapper"></div>',
		add:function(json){
			if(typeof(json)=="string"){
				json={text:json}
			}
			if(json.text===null){
				throw'You must supply "text" parameter.'
			}
			var title=json.title,
			text=json.text,
			image=json.image||"",
			sticky=json.sticky||false,
			class_name=json.class_name||$.notify.options.class_name,
			position=json.position||$.notify.options.position,
			time=json.time||$.notify.options.time,
			fade_in_speed=json.fade_in_speed||$.notify.options.fade_in_speed,
			fade_out_speed=json.fade_out_speed||$.notify.options.fade_out_speed,
			fade_out_speed_close=json.fade_out_speed_close||$.notify.options.fade_out_speed,
			fade_out_speed_mouse=json.fade_out_speed_mouse||$.notify.options.fade_out_speed;
			this._verifyWrapper();
			this._item_count++;
			var count=this._item_count,i=this._tpl_item;
			this._custom_timer=0;
			if(time){this._custom_timer=time}
			image=(image!="")?'<img src="'+image+'" class="notify-image" />':"";
			var has_image=(image!="")?"notify-with-image":"notify-without-image";
			if(title){
				title=this._str_replace("[[title]]",title,this._tpl_title)
			}else{
				title=""
			}
			i=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[title,text,this._tpl_close,image,this._item_count,has_image,class_name],i);
			$("#notify-notice-wrapper").addClass(position).append(i);
			var o=$("#notify-item-"+this._item_count);
			o.fadeIn(fade_in_speed,function(){});
			if(!sticky){
				this._setFadeTimer(o,count,fade_out_speed)
			}
			$(o).bind("mouseenter mouseleave",function(p){
				if(p.type=="mouseenter"){
					if(!sticky){a._restoreItemIfFading($(this),count)}
				}else{
					if(!sticky){a._setFadeTimer($(this),count,fade_out_speed_mouse)}
				}
				a._hoverState($(this),p.type)
			});
			$(o).find(".notify-close").click(function(){
				a.removeSpecific(count,null,true,fade_out_speed_close)
			});
			return count;
		},
		_countRemoveWrapper:function(d){
			d.remove();
			if($(".notify-item-wrapper").length==0){
				$("#notify-notice-wrapper").remove()
			}
		},
		_fade:function(o,count,fade_mouse_invalid,fade_out_speed,is_fade){
			is_fade=(typeof(is_fade)!="undefined")?is_fade.fade:true,
			speed=fade_out_speed;
			if(fade_mouse_invalid){
				o.unbind("mouseenter mouseleave")
			}
			if(is_fade){
				o.animate({opacity:0},speed,function(){
					o.animate({height:0},300,function(){
						a._countRemoveWrapper(o)
					})
				})
			}else{
				this._countRemoveWrapper(o)
			}
		},
		_hoverState:function(o,type){
			if(type=="mouseenter"){
				o.addClass("hover");
				o.find(".notify-close").show()
			}else{
				o.removeClass("hover");
				o.find(".notify-close").hide()
			}
		},
		removeSpecific:function(count,o,fade_mouse_invalid,fade_out_speed){
			if(!o){
				var o=$("#notify-item-"+count)
			}
			this._fade(o,count,fade_mouse_invalid,fade_out_speed)
		},
		_restoreItemIfFading:function(o,count){
			clearTimeout(this["_int_id_"+count]);
			o.stop().css({opacity:"",height:""})
		},
		_setFadeTimer:function(o,count,fade_out_speed){
			var time=(this._custom_timer)?this._custom_timer:this.time;
			this["_int_id_"+count]=setTimeout(function(){a._fade(o,count,false,fade_out_speed)},time)
		},
		_str_replace:function(v,e,o,n){
			var k=0,h=0,t="",m="",g=0,q=0,l=[].concat(v),c=[].concat(e),u=o,d=c instanceof Array,p=u instanceof Array;
			u=[].concat(u);
			if(n){this.window[n]=0}
			for(k=0,g=u.length;k<g;k++){
				if(u[k]===""){continue}
				for(h=0,q=l.length;h<q;h++){
					t=u[k]+"";
					m=d?(c[h]!==undefined?c[h]:""):c[0];
					u[k]=(t).split(l[h]).join(m);
					if(n&&u[k]!==t){
						this.window[n]+=(t.length-u[k].length)/l[h].length
					}
				}
			}
			return p?u:u[0]
		},
		_verifyWrapper:function(){
			if($("#notify-notice-wrapper").length==0){
				$("body").append(this._tpl_wrap)
			}
		}
	}
})(jQuery);