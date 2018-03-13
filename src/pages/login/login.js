// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'login'
  },
  // 文字输入
  inputValue (e) {
    app.inputValue(e, this)
  },
  // 登陆成功后使用
  loginSuccess () {
    app.su('loginInput', this.data.loginInput)
    app.su('pwd', this.data.pwd)
  },
  // 登陆按钮处理
  loginBtn (e) {
    if (this.data.login) return app.setToast(this, {content: '请您授权本小程序后方可继续使用'})
    if (e.currentTarget.dataset.type === 'login') {
      // todo 登陆
      this.login()
    } else {
      wx.navigateTo({
        url: '../register/register'
      })
    }
  },
  // 登陆
  login () {
    let that = this
    if (!this.data.loginInput || !this.data.pwd) return app.setToast(this, {content: '请检查账号密码是否输入'})
    app.wxrequest({
      url: `${useUrl.userLogin}?SESSIONID=${app.gs()}&telephone=${that.data.loginInput}&password=${that.data.pwd}`,
      // data: {
      //   telephone: that.data.loginInput,
      //   password: that.data.pwd
      // },
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          that.loginSuccess()
          wx.switchTab({
            url: '../index/index'
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 自动登陆
  autoLogin () {
    let that = this
    if (app.gs('pwd') && app.gs('loginInput')) {
      that.setData({
        loginInput: app.gs('loginInput'),
        pwd: app.gs('pwd')
      })
      // setTimeout(() => {
      that.login()
      // }, 600)
    }
  },
  // 获取授权
  getUserInfo (res) {
    if (res.detail.iv) {
      this.setData({
        login: false
      })
      app.wxlogin(this.autoLogin, '', this)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    app.wxlogin(this.autoLogin, '', this)
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
