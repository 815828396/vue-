/**
* @name canvas - qrcode
* @author xing
* @desc 随机生成二维码
*/

export default class CanvasQRcode {
  /**
   * 
   * @param {String} target 验证码标签框
   * @param {Object} param1 验证码盒子配置
   */
    constructor (target, {width: w, height: h} = {width: 100, height: 100}) {
      this._w = w
      this._h = h
      this._t = document.getElementById(target)
      this._ctx = this._t.getContext('2d')
    }

    // 初始化canvas 宽高
    _initCanvasWidth () {
      let ctx = this._t.getContext('2d')
      let text = this.randomText()
      ctx.fillStyle = this.randomGetColor()
      ctx.fillRect(0, 0, this._w, this._h)
      this.canvasText(text, ctx)
      this.canvasInterere(ctx)
      return text
    }
    // canvas 设置字体
    canvasText (str, ctx) {
      let _str = str.split('')
      for (let i = 0; i < _str.length; i++) {
        ctx.font = `${this.randomNumber(30, 50)}px Arial`
        ctx.fillStyle = this.randomGetColor()
        ctx.fillText(str[i], 10 + 23 * i, 30)
        ctx.restore()
      }
    }
    canvasInterere (ctx) {
      // 绘制干扰线
      for(let i = 0; i < 6; i++){
        ctx.beginPath();
        ctx.moveTo(this.randomNumber(0, this._w),this.randomNumber(0, this._h));
        ctx.lineTo(this.randomNumber(0, this._w),this.randomNumber(0, this._h));
        ctx.strokeStyle=this.randomGetColor();
        ctx.closePath();
        ctx.stroke();
      }
      // 绘制干扰点
      for(let i = 0; i < 40; i++){
        ctx.beginPath();
        ctx.arc(this.randomNumber(0,this._w),this.randomNumber(0,this._h),1,0,2*Math.PI);
        ctx.closePath();
        ctx.fillStyle=this.randomGetColor();
        ctx.fill();
      }
    }
    // 随机text
    randomText () {
      let random_number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      let random_lower = []
      let random_upper = []
      for (let i = 0; i < 26; i++) {
        random_lower.push(String.fromCharCode(65 + i))
        random_upper.push(String.fromCharCode(97 + i))
      }
      let random_all = [...random_number, ...random_upper, ...random_lower]
      let qrcode = ''
      for (let i = 0; i < 4; i++) {
        let random_index = Math.floor(Math.random() * 62)
        qrcode += random_all[random_index]
      }
      return qrcode
    }
    // 随机数字
    randomNumber (min, max) {
      return parseInt(Math.random() * (max - min + 1) + min, 10)
    }
    // 随机 16HEX 进制颜色
    randomGetColor () {
      return '#' + ( '00000' + ( Math.random() * 0x1000000 << 0 ).toString(16) ).substr(-6)
    }
    // 清空画布
    clearRect () {
      this._ctx.clearRect(0, 0, this._w, this._h)
    }
  }
