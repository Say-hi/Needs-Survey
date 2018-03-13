// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'user',
    operationArr: [
      {
        c: 'icon-dongtai',
        t: '我的动态',
        url: '../userDynamic/userDynamic'
      },
      {
        c: 'icon-caigoudan',
        t: '我的采购单',
        url: '../userOrder/userOrder'
      },
      {
        c: 'icon-yijianfankui',
        t: '意见反馈',
        url: '../feedback/feedback'
      }
    ]
  },
  // 用户操作
  operation (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  // 退出登陆
  loginOut () {
    wx.removeStorageSync('loginInput')
    wx.removeStorageSync('pwd')
    wx.removeStorageSync('session_key')
    wx.reLaunch({
      url: '../login/login'
    })
  },
  // 获取用户缓存信息
  getUserInfo () {
    this.setData({
      userInfo: app.gs('userInfo')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getUserInfo()
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
