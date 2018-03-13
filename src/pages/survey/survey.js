// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // surveyArr: [
    //   {
    //     content: '阿斯顿发撒旦飞洒地方',
    //     startTime: '2017/2/24',
    //     endTime: '2017/3/24',
    //     id: 2,
    //     choose: true
    //   },
    //   {
    //     content: '阿斯顿发撒旦飞洒地方',
    //     startTime: '2017/2/24',
    //     endTime: '2017/3/24',
    //     id: 2
    //   },
    //   {
    //     content: '阿斯顿发撒旦飞洒地方',
    //     startTime: '2017/2/24',
    //     endTime: '2017/3/24',
    //     id: 2,
    //     choose: true
    //   }
    // ]
  },
  // 去到详情
  goDetail (e) {
    if (e.currentTarget.dataset.choose === 'choose') {
      wx.navigateTo({
        url: `../userOrderDetail/userOrderDetail?id=${e.currentTarget.dataset.id}`
      })
    } else {
      wx.navigateTo({
        url: `../surveyDetail/surveyDetail?id=${e.currentTarget.dataset.id}&name=${e.currentTarget.dataset.name}`
      })
    }
  },
  // 获取团购列表数据
  getData () {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().grouppurchaseList}?SESSIONID=${app.gs()}`,
      data: {},
      success (res) {
        wx.hideLoading()
        setTimeout(() => {
          wx.stopPullDownRefresh()
        }, 500)
        if (res.data.code === '200') {
          that.setData({
            surveyArr: res.data.result
          })
          // console.log('data', res)
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
    this.getData()
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
    this.getData()
    // TODO: onPullDownRefresh
  }
})
