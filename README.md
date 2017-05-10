# bk_notify
在网页中显示通知信息

需导入jquery

## 初始设置
```
$.notify.options.class_name=
$.notify.options.time=
$.notify.options.fade_in_speed=
$.notify.options.fade_out_speed=
$.notify.options.position=
```
## 添加通知
```
$.notify.add({
	title:标题,
	text:内容,
	image:图片src,
	position:出现位置，默认右上，可选择：top-left,bottom-right,bottom-left&&如果要出现在正中央，设置class_name:notify-center,此时需注意每次提醒覆盖问题，需要清除上次提醒
	fade_in_speed:淡入时间,
	time:停留时间,
	fade_out_speed:淡出时间,
	fade_out_speed_close:关闭情况下淡出时间,
	fade_out_speed_mouse:鼠标离开后淡出时间,
	sticky:是否有静止,
	class_name:样式
})
```
## 删除通知
```
$.notify.remove(id,item)参数为id和对象，填id即可
```

**没有X关闭是由于未导入font-awesome.min.css
