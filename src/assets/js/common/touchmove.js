/**
 * @name touchmove
 * @description 滑动事件
 * @param { String } target 被点击对象
 */
export default class Touch {
    constructor (target, filterTarget) {
        this.target =  document.querySelector(target)
        this.filterTarget = document.querySelector(filterTarget)
        this.touches = null
        this.startX = null
        // this.initElementMove()
    }
    // 初始化init
    initElementMove () {
        this.target.addEventListener('touchstart', this.startTouchEvent)
        this.target.addEventListener('touchmove', this.moveTouchEvent)
        // remove Element BODY EventListener
        this.endTouchEvent()
    }
    // 开始点击
    startTouchEvent (e) {
        this.touches = e.touches[0]
        this.startX = this.touches.pageX
        // console.log(this.startX)
    }
    // 开始滑动
    moveTouchEvent (e) {
        console.log(that)
        // document.querySelector('.filterTarget')
        // console.log(document.querySelector('.swiper-views'))
        // this.filterTarget.left = e.touches[0].pageX - this.starX + 'px'
        // document.body.addEventListener('touchend', this.endTouchEvent)
    }
    // 结束欢动
    endTouchEvent (e) {
        document.body.removeEventListener('touchstart', this.startTouchEvent)
        document.body.removeEventListener('touchmove', this.moveTouchEvent)
    }

}