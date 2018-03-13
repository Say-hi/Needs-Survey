// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // imgUrls: [
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ],
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
    //     id: 3
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
    //     id: 2
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
    //     id: 1
    //   }
    // ],
    current: 0
  },

  goIndexDetail (e) {
    wx.navigateTo({
      url: `../indexDetail/indexDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 预览图片
  showImg (e) {
    let that = this
    wx.previewImage({
      current: that.data.infoArr[e.currentTarget.dataset.outindex].imgArr[e.currentTarget.dataset.inindex],
      urls: that.data.infoArr[e.currentTarget.dataset.outindex].imgArr
    })
  },
  // 点赞
  diazan (e) {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().isLike}?SESSIONID=${app.gs()}&type=1&id=${this.data.infoArr[e.currentTarget.dataset.index].id}`,
      // data: {
      //   type: 1,
      //   id: this.data.infoArr[e.currentTarget.dataset.index].id
      // },
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          that.data.infoArr[e.currentTarget.dataset.index].isLike = that.data.infoArr[e.currentTarget.dataset.index].isLike === '1' ? '2' : '1'
          if (that.data.infoArr[e.currentTarget.dataset.index].isLike === '1') {
            if (that.data.infoArr[e.currentTarget.dataset.index]['numberLike'] >= 1) {
              that.data.infoArr[e.currentTarget.dataset.index].numberLike++
            } else {
              that.data.infoArr[e.currentTarget.dataset.index]['numberLike'] = 1
            }
          } else {
            that.data.infoArr[e.currentTarget.dataset.index].numberLike--
          }
          that.setData({
            infoArr: that.data.infoArr
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 轮播图切换
  swiperchange (e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 获取首页列表数据
  getList () {
    let that = this
    app.wxrequest({
      url: app.getUrl().bannerList + '?SESSIONID=' + app.gs(),
      // data: {},
      success (res) {
        wx.hideLoading()
        setTimeout(() => {
          wx.stopPullDownRefresh()
        }, 500)
        if (res.data.code === '200') {
          // console.log(res)
          that.getArticle()
          that.getUser()
          that.setData({
            imgUrls: res.data.result
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取首页文章列表
  getArticle () {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().articleList}?SESSIONID=${app.gs()}&type=1`,
      // data: {
      //   type: 1
      // },
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
  // 获取用户id
  getUser () {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().getUser}?SESSIONID=${app.gs()}`,
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          app.su('userData', res.data.result)
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
    this.getList()
    // app.wxlogin(this.getList)
    // console.dir(app.data)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    this.getList()
    console.log(' ---------- onPullDownRefresh ----------')
  }
})
