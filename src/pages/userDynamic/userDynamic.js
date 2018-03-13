// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topChoose: 1,
    infoArr: [],
    infoArr2: []
    //   {
    //     img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     name: '拽拽少年',
    //     time: '2017/2/24',
    //     reply: '阿斯顿发生地方撒旦阿斯顿发撒旦法',
    //     imgArr: [
    //       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    //     ],
    //     star: 99,
    //     comment: 5
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
    //     comment: 5
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
    //     comment: 5
    //   }
    // ]
  },
  goIndexDetail (e) {
    wx.navigateTo({
      url: `../indexDetail/indexDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 预览图片
  showImg (e) {
    let that = this
    let showArr = that.data.topChoose * 1 === 1 ? that.data.infoArr : that.data.infoArr2
    wx.previewImage({
      current: showArr[e.currentTarget.dataset.outindex].imgArr[e.currentTarget.dataset.inindex],
      urls: showArr[e.currentTarget.dataset.outindex].imgArr
    })
  },
  // 顶部选择
  topChooses (e) {
    this.setData({
      topChoose: e.currentTarget.dataset.type
    })
  },
  // 我的评论
  getComment () {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().mycommentList}?SESSIONID=${app.gs()}`,
      success (res) {
        wx.hideLoading()
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
  // 我的回复
  getRply () {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().myreply_list}?SESSIONID=${app.gs()}`,
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          that.setData({
            infoArr2: res.data.result || []
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
    this.getComment()
    this.getRply()
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
