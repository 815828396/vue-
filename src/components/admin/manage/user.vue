<template>
	<!-- <div class="delete">
		<div class="slider-item" v-for="(v,i) in 10" data-type='0'>
			<div class="content" 
			  @touchstart.capture='touchStart'
			  @touchmove.capture='touchMove'
			  @touchend.capture='touchEnd'
			  :style="deleteSlider"
			>
				<div>info</div>
			</div>
			<div class="remove" ref='remove'>
			  删除
			</div>
		</div> 
	</div> -->

	<div class="container">
	  <div class="page-title">滑动组件</div>
	  <ul>
	    <li class="list-item " v-for="(item,index) in list " data-type="0">
	      <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
	        <img class="list-img" :src="item.imgUrl" alt="">
	        <div class="list-content">
	          <p class="title">{{item.title}}</p>
	          <p class="tips">{{item.tips}}</p>
	          <p class="time">{{item.time}}</p>
	        </div>
	      </div>
	      <div class="delete" @click="deleteItem" :data-index="index">删除</div>
	    </li>
	  </ul>
	</div>
</template>

<!-- 改变多个的滑动效果 -->
<script type="text/javascript">	

export default{
	name: 'index',
	data () {
		return {
		  list : [
			  {
			   title : 'Chrome更新了' ,
			   imgUrl : './static/images/Chrome.png' ,
			   tips : '不再支持Flash视频播放' ,
			   time : '上午 8:30'
			  },
			  {
			   title : '电影新资讯' ,
			   imgUrl : './static/images/Sina.png' ,
			   tips : '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观' ,
			   time : '上午 12:00'
			  },
		    {
			   title : '聚焦两会·共筑中国梦' ,
			   imgUrl : './static/images/video.png' ,
			   tips : '习近平代表的两会故事' ,
			   time : '下午 17:45'
		    },
		    {
			   title : '微信团队' ,
			   imgUrl : './static/images/Wechat.png' ,
			   tips : '您的帐号有异常登录，如非本人操作，请及时修改密码' ,
			   time : '昨天'
		    }
		  ],
		  startX : 0 ,
		  endX : 0 ,
		}
	},
  methods : {
		//跳转
		skip(){
			if( this.checkSlide() ){
				this.restSlide();
		  }else{
				alert('You click the slide!')
		  }
		},
		//滑动开始
		touchStart(e){
			// 记录初始位置
			this.startX = e.touches[0].clientX;
			// console.log(this.startX)
		},
		//滑动结束
		touchEnd(e){
		  // 当前滑动的父级元素
			let parentElement = e.currentTarget.parentElement;
			// 记录结束位置
			this.endX = e.changedTouches[0].clientX;
			// console.log(this.endX)
	    // 左滑
			if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
				this.restSlide();
				// console.log(parentElement.dataset)
				parentElement.dataset.type = 1;
				// console.log(parentElement.dataset)
			}
	    // 右滑
			if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
				// this.restSlide();
				parentElement.dataset.type = 0;
			}
			this.startX = 0;
			this.endX = 0;
		},
		//判断当前是否有滑块处于滑动状态
		checkSlide(){
			let listItems = document.querySelectorAll('.list-item');
			for( let i = 0 ; i < listItems.length ; i++){
				if( listItems[i].dataset.type == 1 ) {
					return true;
		    }
			}
			return false;
		},
		//复位滑动状态
		restSlide(){
			let listItems = document.querySelectorAll('.list-item');
		  // 复位
			for( let i = 0 ; i < listItems.length ; i++){
				listItems[i].dataset.type = 0;
			}
		},
		//删除
		deleteItem(e){
			// 当前索引
			let index = e.currentTarget.dataset.index;
			// 复位
			this.restSlide();   
			// 删除
			this.list.splice(index,1);
		}
	}
}
</script>

<!-- 改变一个的滑动效果 -->
<!-- <script type="text/javascript">
export default {
	data () {
		return {
			startX:0,   //触摸位置
	    endX:0,     //结束位置
	    moveX: 0,   //滑动时的位置
	    disX: 0,    //移动距离
	    deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
		}
	},
	methods: {
		touchStart(ev) {
      ev= ev || event
  		//tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
  		let parentElement = ev.currentTarget.parentElement
    	if(ev.touches.length == 1){
       	// 记录开始位置
        this.startX = ev.touches[0].clientX;
        parentElement.dataset.type = 1
      }
    },
		touchMove(ev) {
		  ev = ev || event;
		  //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
		  // let wd=this.$refs.remove.offsetWidth;
		  let wd = this.$refs.remove[0].offsetWidth
		  console.log(wd)
      if(ev.touches.length == 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX
        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX;
     		console.log(this.disX)
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if(this.disX < 0 || this.disX == 0) {
          this.deleteSlider = "transform:translateX(0px)";
        	// 大于0，表示左滑了，此时滑块开始滑动 
        }else if (this.disX > 0) {
          //具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
          // 最大也只能等于删除按钮宽度 
          if (this.disX*5 >= wd) {
            this.deleteSlider = "transform:translateX(-" +wd+ "px)";
          }
        }
      }
		},
		touchEnd(ev) {
		  ev = ev || event;
		  let parentElement = ev.currentTarget.parentElement
		  let wd=this.$refs.remove[0].offsetWidth;

		  // console.log(this.checkSlide())
		  // if (ev.changedTouches.length == 1) {
		  // 	let endX = ev.changedTouches[0].clientX;
    //   	this.disX = this.startX - endX;
    //   	console.log(parentElement.dataset.type == 0)
    //   	console.log((this.disX*5) < (wd/2))
			 //  if (parentElement.dataset.type == 1 ) {
			 //  	this.deleteSlider = 'transform:translateX(-'+wd+'px)'
			 //  }
		  // }
		  
		  if (ev.changedTouches.length == 1) {
     	 	let endX = ev.changedTouches[0].clientX;
      	this.disX = this.startX - endX;
      	console.log(this.disX)
	      //如果距离小于删除按钮一半,强行回到起点
	      if ((this.disX*5) < (wd/2)) {
	        this.deleteSlider = "transform:translateX(0px)";
	        console.log(this.deleteSlider)
	      }else{
	        //大于一半 滑动到最大值
	        this.deleteSlider = "transform:translateX(-"+wd+ "px)";
	      	console.log(this.deleteSlider)
	      }
      }
		},
		// 判断当前是否有滑块处于滑动状态
		checkSlide() {
			let slideItem = document.querySelectorAll('.slider-item')
			for (var i = 0; i < slideItem.length; i++) {
				if(slideItem[i].dataset.type == 1) {
					return true
				}
			}
			return false
		},
		// 滑动状态为0
		initSlideState() {
			let slideItem = document.querySelectorAll('.slider-item')
			for (var i = 0; i < slideItem.length; i++) {
				slideItem[i].dataset.type == 0
			}
		}      
	}
}
</script> -->

<style type="text/css">
	.slider-item{
    width: 100%;
    height:50px;
    position: relative;
    user-select: none;
    margin-bottom: 5px;
  }
  .slider-item .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgb(200,200,200);
    z-index: 100;
    transition: 0.3s;   
  }
	.slider-item .remove{
	  position: absolute;
	  width: 99px;
	  height: 49px;
	  margin-bottom: 5px;
	  background:red;
	  right: 0px;
	  top: 0;
	  color:#fff;
	  text-align: center;
	  font-size: 40px;
	  line-height: 200px;
	}

.container{
	width: 100%;
	overflow: hidden;
}
.page-title{
  text-align: center;
  font-size: 17px;
  padding: 10px 15px;
  position: relative;
}
.page-title:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-item{
  position: relative;
  height: auto;
  min-height: 4rem;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.list-item[data-type="0"]{
  transform: translate3d(0,0,0);
}
.list-item[data-type="1"]{
  transform: translate3d(-4rem,0,0);
}
.list-item:after{
  content: " ";
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-box{
  padding: 0.2rem;
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}
.list-item .list-img{
  display: block;
  width: 1rem;
  height: 1rem;
}
.list-item .list-content{
  padding: 0.1rem 0 0.1rem 0.2rem;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}
.list-item .title{
  display: block;
  color: #333;
  overflow: hidden;
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .tips{
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .time{
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0.1rem;
  color: #666;
}
.list-item .delete{
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  background: #ff4949;
  font-size: 17px;
  color: #fff;
  text-align: center;
  position: absolute;
  top:0;
  right: -4rem;
  z-index: -1
}
</style>

<!-- 1.  TouchEvent.touches （表示一 个 TouchList 对象，包含了所有当前接触触摸平面的触点的Touch对象）

2.  TouchEvent.changedTouches （一个 TouchList 对象，包含了代表所有从上一次触摸事件到此次事件过程中，
    状态发生了改变的触点的 Touch 对象。） -->