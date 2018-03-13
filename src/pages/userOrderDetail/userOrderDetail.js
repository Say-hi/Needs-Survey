// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // detailArr: {
    //   id: 2,
    //   content: [
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5',
    //       account: 2
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子',
    //       weight: '225g',
    //       money: '23.5',
    //       account: 2
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5',
    //       account: 2
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子',
    //       weight: '225g',
    //       money: '23.5',
    //       account: 2
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5',
    //       account: 2
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子',
    //       weight: '225g',
    //       money: '23.5',
    //       account: 2
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5',
    //       account: 2
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子一个小胖子',
    //       weight: '225g',
    //       money: '23.5',
    //       account: 2
    //     }
    //
    //   ]
    // }
  },
  // 获取详情数据
  getData (id) {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().orderDetails}?SESSIONID=${app.gs()}&purchaseid=${id}`,
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          that.setData({
            id,
            detailArr: res.data.result
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 跳转发送
  goSend () {
    wx.navigateTo({
      url: `../senderOrder/senderOrder?id=${this.data.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getData(options.id)
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
