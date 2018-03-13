// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    same: false,
    errIndex: 0
  },
  // 文字输入
  inputValue (e) {
    app.inputValue(e, this, function (that) {
      if (that.data.pwd && that.data.pwd2) {
        that.setData({
          same: that.data.pwd === that.data.pwd2 ? 0 : 1
        })
      }
    })
  },
  setErr (index) {
    this.setData({
      errIndex: index
    })
    setTimeout(() => {
      this.setData({
        errIndex: 0
      })
    }, 2000)
  },
  // 注册
  loginBtn () {
    let that = this
    if (!this.data.name) {
      this.setErr(1)
      return app.setToast(that, {content: '请输入您的姓名'})
    } else if (!this.data.idCard) {
      this.setErr(2)
      return app.setToast(that, {content: '请输入您的身份证号码'})
    } else if (!this.data.phone || this.data.phone.length !== 11) {
      this.setErr(3)
      return app.setToast(that, {content: '请输入您的11位手机号码'})
    } else if (!this.data.pwd) {
      this.setErr(4)
      return app.setToast(that, {content: '请输入密码'})
    } else if (!this.data.pwd2) {
      this.setErr(5)
      return app.setToast(that, {content: '请输入确认密码'})
    } else if (this.data.same === 1) return app.setToast(that, {content: '请检查密码的一致性'})
    app.wxrequest({
      url: `${useUrl.registered}?SESSIONID=${app.gs()}&username=${this.data.name}&idcard=${this.data.idCard}&telephone=${this.data.phone}&password=${this.data.pwd}`,
      // data: {
      //   username: this.data.name,
      //   idcard: this.data.idCard,
      //   telephone: this.data.phone,
      //   password: this.data.pwd
      // },
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          wx.showToast({
            title: '注册成功'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
