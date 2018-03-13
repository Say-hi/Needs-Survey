// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {
      name: '阿斯为',
      id: 2,
      src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    },
    // info: {
    //   src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //   name: '阿斯顿发',
    //   text: '阿斯顿发生地方撒旦',
    //   time: '8小时前',
    //   replyCount: 0,
    //   star: '123',
    //   zan: 1,
    //   id: 2
    // },
    // replyArr: [
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '8小时前',
    //     replyCount: 0,
    //     star: '123',
    //     zan: 1,
    //     id: 2
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '2小时前',
    //     replyCount: 0,
    //     star: '11',
    //     zan: 1,
    //     parentName: '大胖子',
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '8小时前',
    //     replyCount: 0,
    //     star: '123',
    //     zan: 1,
    //     id: 2
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '2小时前',
    //     replyCount: 0,
    //     star: '11',
    //     zan: 1,
    //     parentName: '大胖子',
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '8小时前',
    //     replyCount: 0,
    //     star: '123',
    //     zan: 1,
    //     id: 2
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '2小时前',
    //     replyCount: 0,
    //     star: '11',
    //     zan: 1,
    //     parentName: '大胖子',
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '8小时前',
    //     replyCount: 0,
    //     star: '123',
    //     zan: 1,
    //     id: 2
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '2小时前',
    //     replyCount: 0,
    //     star: '11',
    //     zan: 1,
    //     parentName: '大胖子',
    //     id: 123
    //   }
    // ],
    focus: false,
    replyText: '我也说一句'
  },
  getIn () {
    this.setData({
      inputIn: true
    })
  },
  getOut () {
    this.setData({
      inputIn: false,
      focus: false
    })
  },
  // 文字输入
  inputValue (e) {
    app.inputValue(e, this)
  },
  // 用户选择回复
  userReply (e) {
    this.setData({
      replyText: `回复${this.data.info.replyList[e.currentTarget.dataset.index].username}:`,
      replyName: this.data.info.replyList[e.currentTarget.dataset.index].username,
      replyId: this.data.info.replyList[e.currentTarget.dataset.index].userid,
      commentId: this.data.info.replyList[e.currentTarget.dataset.index].commentId,
      focus: true
    })
  },
  // 用户删除回复
  userDel (e) {
    let that = this
    wx.showModal({
      content: '删除后不可恢复哦~',
      success (res) {
        if (res.confirm) {
          that.delReply(e)
          // that.data.info.replyList.splice(e.currentTarget.dataset.index, 1)
          // that.setData({
          //   info: that.data.info
          // })
        }
      }
    })
  },
  // 用户回复
  send () {
    if (this.data.user.id * 1 === this.data.info.userid * 1) return app.setToast(this, {content: '不能回复自己哦'})
    if (!this.data.reply) return app.setToast(this, {content: '您还未填写回复内容'})
    let user = this.data.user
    let that = this
    app.wxrequest({
      url: `${app.getUrl().addReply}?SESSIONID=${app.gs()}&replyId=${that.data.user.id}&toUserId=${that.data.replyId || that.data.info.userid}&commentId=${that.data.commentId || that.data.info.id}&content=${that.data.reply}`,
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          that.data.info.replyList.unshift({
            src: user.src,
            userid: user.id,
            commentId: that.data.commentId,
            time: '一分钟前',
            to_id: that.data.replyId,
            username: user.username,
            to_name: that.data.replyName || that.data.info.username,
            content: that.data.reply
          })
          that.setData({
            info: that.data.info,
            reply: '',
            replyText: '我也说一句',
            replyId: null,
            replyName: null,
            commentId: null
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取缓存评论
  getComment () {
    // let that = this
    let info = app.gs('comment')
    for (let [i, v] of info.replyList.entries()) {
      info.replyList[i]['time'] = app.moment(v.createDate)
    }
    this.setData({
      info
    })
  },
  // 删除留言
  delReply (e) {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().delReply}?SESSIONID=${app.gs()}&id=${that.data.info.replyList[e.currentTarget.dataset.index].id}`,
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          wx.navigateBack({
            delta: 1
          })
          // that.data.info.replyList.splice(e.currentTarget.dataset.index, 1)
          // that.setData({
          //   info: that.data.info
          // })
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
    this.setData({
      user: app.gs('userData')
    })
    this.getComment()
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
