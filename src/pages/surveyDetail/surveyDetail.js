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
    //       money: '23.5'
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5'
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5'
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5'
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5'
    //     },
    //     {
    //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //       t: '一个小胖子',
    //       weight: '225g',
    //       money: '23.5'
    //     }
    //   ]
    // }
  },
  goConfirm () {
    app.su('goodsDetail', this.data.detailArr.content)
    wx.navigateTo({
      url: `../surveyConfirm/surveyConfirm?id=${this.data.detailArr.id}&name=${this.data.name}`
    })
  },
  // 增加
  add (index) {
    let that = this
    let goods = this.data.detailArr.content
    if (!goods[index].account) {
      goods[index]['account'] = 1
    } else {
      goods[index].account += 1
    }
    this.data.detailArr.content = goods
    that.setData({
      detailArr: that.data.detailArr
    })
    this.calculate()
  },
  // 减少
  del (index) {
    let that = this
    let goods = this.data.detailArr.content
    goods[index].account -= 1
    this.data.detailArr.content = goods
    that.setData({
      detailArr: that.data.detailArr
    })
    this.calculate()
  },
  // 价格计算
  calculate () {
    let goods = this.data.detailArr.content
    // console.log(goods)
    let allPrice = 0
    for (let v of goods) {
      if (v.account) {
        allPrice += v.account * v.commodityprice
      }
    }
    this.setData({
      allPrice: allPrice.toFixed(2)
    })
  },
  // 商品数量选择
  shopChoose (e) {
    if (e.currentTarget.dataset.type === 'del') {
      this.del(e.currentTarget.dataset.index)
    } else {
      this.add(e.currentTarget.dataset.index)
    }
  },
  // 设置顶部文字
  setBar (str) {
    app.setBar(str)
  },
  // 跳转发送
  goSend () {
    wx.navigateTo({
      url: `../senderOrder/senderOrder?id=${this.data.detailArr.id}&name=${this.data.name}`
    })
  },
  // 获取团购详情
  getDetail (purchaseid) {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().commodityList}?SESSIONID=${app.gs()}&id=${purchaseid}`,
      // data: {
      //   purchaseid
      // },
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          let detailArr = {
            id: purchaseid
          }
          detailArr['content'] = res.data.result
          that.setData({
            detailArr
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
  onLoad (options) {
    this.setBar(options.name)
    this.setData({
      name: options.name
    })
    this.getDetail(options.id)
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
