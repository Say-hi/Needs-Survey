// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  // 提交信息
  goConfirm () {
    let that = this
    let ds = []
    for (let v of this.data.content) {
      if (v.account >= 1) {
        let addData = {
          commodityid: v.id,
          price: v.commodityprice,
          number: v.account
        }
        ds.push(addData)
      }
    }
    app.wxrequest({
      url: `${app.getUrl().addOrder}/${that.data.id}?SESSIONID=${app.gs()}`,
      // data: {
      //   ds
      // },
      data: JSON.stringify(ds),
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          wx.showToast({
            title: '提交成功'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 2
            })
          }, 1000)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 减少
  delGoods (e) {
    let that = this
    wx.showModal({
      title: '删除产品',
      content: `是否删除${this.data.content[e.currentTarget.dataset.index].commodityname}`,
      success (res) {
        if (res.confirm) {
          that.data.content.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            content: that.data.content
          })
          that.calculate()
        }
      }
    })
  },
  // 价格计算
  calculate () {
    let goods = this.data.content
    let allPrice = 0
    for (let v of goods) {
      if (v.account) {
        allPrice += v.account * v.commodityprice
      }
    }
    this.setData({
      allPrice: allPrice.toFixed(2)
    })
    if (allPrice * 1 === 0) {
      app.setToast(this, {content: '无确认产品,即将返回选择'})
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1200)
    }
  },
  // 设置顶部文字
  setBar (str) {
    app.setBar(str + '订单详情')
    this.setData({
      content: app.gs('goodsDetail')
    })
    this.calculate()
  },
  // 跳转发送
  goSend () {
    wx.navigateTo({
      url: `../senderOrder/senderOrder?id=${this.data.detailArr.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      id: options.id
    })
    this.setBar(options.name)
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
