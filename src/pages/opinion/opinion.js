// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // infoArr: [
    //   {
    //     img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     name: '拽拽少年',
    //     time: '2017/2/24',
    //     content: '阿斯顿发生地方撒旦阿斯顿发撒旦法',
    //     imgArr: [
    //       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    //     ],
    //     star: 99,
    //     comment: 5,
    //     agree: 0,
    //     oppose: 0,
    //     abstention: 0
    //   },
    //   {
    //     img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     name: '拽拽少年',
    //     time: '2017/2/24',
    //     content: '阿斯顿发生地方撒旦阿斯顿发撒旦法',
    //     imgArr: [
    //       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    //     ],
    //     star: 99,
    //     comment: 5,
    //     agree: 5,
    //     oppose: 20,
    //     abstention: 2
    //   },
    //   {
    //     img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     name: '拽拽少年',
    //     time: '2017/2/24',
    //     content: '阿斯顿发生地方撒旦阿斯顿发撒旦法',
    //     imgArr: [
    //       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    //     ],
    //     star: 99,
    //     comment: 5,
    //     agree: 1000,
    //     oppose: 9999,
    //     abstention: 3
    //   }
    // ]
  },
  // 预览图片
  showImg (e) {
    let that = this
    wx.previewImage({
      current: that.data.infoArr[e.currentTarget.dataset.outindex].imgArr[e.currentTarget.dataset.inindex],
      urls: that.data.infoArr[e.currentTarget.dataset.outindex].imgArr
    })
  },
  // 跳转详情
  goDetail (e) {
    wx.navigateTo({
      url: `../opinionDetail/opinionDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 获取意见列表
  getList () {
    let that = this
      // console.log(`${app.getUrl().articleList}?SESSIONID=${app.gs()}&type=2`)
    app.wxrequest({
      url: `${app.getUrl().articleList}?SESSIONID=${app.gs()}&type=2`,
      // data: {
      //   type: 2
      // },
      success (res) {
        wx.hideLoading()
        setTimeout(() => {
          wx.stopPullDownRefresh()
        }, 500)
        if (res.data.code === '200' && res.data.result) {
          for (let [i, v] of res.data.result.entries()) {
            app.WP(i, 'html', v.articlecontent, that, 5)
            res.data.result[i]['node'] = that.data[i]
          }
          that.setData({
            infoArr: res.data.result
          })
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
    // console.log('onLoad')
    this.getList()
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
    this.getList()
    // TODO: onPullDownRefresh
  }
})
