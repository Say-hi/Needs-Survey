// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'feedback'
  },
  // 输入文字
  inputValue (e) {
    app.inputValue(e, this)
  },
  sendFeed () {
    if (!this.data.feedback) return app.setToast(this, {content: '请输入反馈内容'})
    let that = this
    app.wxrequest({
      url: app.getUrl().opinionSave + '?SESSIONID=' + app.gs(),
      data: {
        content: this.data.feedback
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          app.setToast(that, {content: '反馈成功'})
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
