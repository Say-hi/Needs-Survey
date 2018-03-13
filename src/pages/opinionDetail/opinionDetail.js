// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    // info: {
    //   title: '元旦活动',
    //   time: '2017/2/5',
    //   agree: 0,
    //   oppose: 0,
    //   abstention: 0,
    //   content: '阿斯顿发生地方撒旦阿斯顿发撒旦法',
    //   imgArr: [
    //     'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //     'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    //   ]
    // },
    // user: {
    //   name: '阿斯为',
    //   id: 2,
    //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    // },
    commentArr: [],
    // commentArr: [
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
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '8小时前',
    //     replyCount: 2,
    //     star: '123',
    //     zan: 1,
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '2小时前',
    //     replyCount: 0,
    //     star: '11',
    //     zan: 1,
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '8小时前',
    //     replyCount: 2,
    //     star: '123',
    //     zan: 1,
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '2小时前',
    //     replyCount: 0,
    //     star: '11',
    //     zan: 1,
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '8小时前',
    //     replyCount: 2,
    //     star: '123',
    //     zan: 1,
    //     id: 123
    //   },
    //   {
    //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    //     name: '阿斯顿发',
    //     text: '阿斯顿发生地方撒旦',
    //     time: '2小时前',
    //     replyCount: 0,
    //     star: '11',
    //     zan: 1,
    //     id: 123
    //   }
    // ],
    focus: false,
    replyText: '我也说一句'
  },
  // 预览图片
  showImg (e) {
    let that = this
    wx.previewImage({
      current: that.data.info.imgArr[e.currentTarget.dataset.inindex],
      urls: that.data.info.imgArr
    })
  },
  // 文字输入
  inputValue (e) {
    app.inputValue(e, this)
  },
  // 用户删除回复
  userDel (e) {
    let that = this
    wx.showModal({
      content: '删除后不可恢复哦~',
      success (res) {
        if (res.confirm) {
          that.delComment(e)
          // that.data.commentArr.splice(e.currentTarget.dataset.index, 1)
          // that.setData({
          //   commentArr: that.data.commentArr
          // })
        }
      }
    })
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
  // 用户选择回复
  userReply (e) {
    // 已有回复跳转回复详情
    if (this.data.commentArr[e.currentTarget.dataset.index].numberReply > 0) {
      app.su('comment', this.data.commentArr[e.currentTarget.dataset.index])
      return wx.navigateTo({
        url: `../indexDetailReply/indexDetailReply?id=${this.data.commentArr[e.currentTarget.dataset.index].id}&articleId=${this.data.info.id}`
      })
    } else {
      if (this.data.commentArr[e.currentTarget.dataset.index].id * 1 === this.data.user.id * 1) return app.setToast(this, {content: '不能回复自己哦~'})
      this.setData({
        replyText: `回复${this.data.commentArr[e.currentTarget.dataset.index].username}:`,
        replyId: this.data.commentArr[e.currentTarget.dataset.index].userid,
        replyIndex: e.currentTarget.dataset.index,
        focus: true
      })
    }
  },
  // 用户回复
  send () {
    let that = this
    if (!this.data.reply) return app.setToast(this, {content: '您还未填写回复内容'})
    let user = this.data.user
    // 回复他人
    if (this.data.replyId) {
      app.wxrequest({
        url: `${app.getUrl().addReply}?SESSIONID=${app.gs()}&replyId=${that.data.user.id}&toUserId=${that.data.replyId}&commentId=${that.data.commentArr[that.data.replyIndex].id}&content=${that.data.reply}`,
        // data: {
        //
        // },
        success (res) {
          wx.hideLoading()
          if (res.data.code === '200') {
            that.getCommentList(that.data.info.id)
            // that.data.commentArr[that.data.replyIndex]['numberReply'] = that.data.commentArr[that.data.replyIndex].numberReply ? that.data.commentArr[that.data.replyIndex].numberReply * 1 + 1 : 1
            that.setData({
              commentArr: that.data.commentArr,
              reply: '',
              replyText: '我也说一句',
              replyId: null
            })
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    } else {
      // 发表评论
      app.wxrequest({
        url: `${app.getUrl().addComment}?SESSIONID=${app.gs()}&articleId=${that.data.info.id}&content=${that.data.reply}`,
        // data: {
        //   content: that.data.reply
        // },
        success (res) {
          wx.hideLoading()
          if (res.data.code === '200') {
            that.getCommentList(that.data.info.id)
            // that.data.commentArr.unshift({
            //   src: user.src,
            //   userid: user.id,
            //   commentId: 0, // 成功回调后的评论id
            //   time: '一分钟前',
            //   username: user.name,
            //   star: 0,
            //   zan: 0,
            //   content: that.data.reply
            // })
            that.setData({
              commentArr: that.data.commentArr,
              reply: '',
              replyText: '我也说一句',
              replyId: null
            })
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    }
  },
  // 点赞
  diazan (e) {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().isLike}?SESSIONID=${app.gs()}&type=2&id=${e.currentTarget.dataset.id}`,
        // data: {
        //   type: 2,
        //   id: e.currentTarget.dataset.id
        // },
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          that.data.commentArr[e.currentTarget.dataset.index].islike = that.data.commentArr[e.currentTarget.dataset.index].islike === '1' ? '2' : '1'
          if (that.data.commentArr[e.currentTarget.dataset.index].islike === '1') {
            // console.log(1)
            if (that.data.commentArr[e.currentTarget.dataset.index]['numberLike'] >= 1) that.data.commentArr[e.currentTarget.dataset.index].numberLike++
            else that.data.commentArr[e.currentTarget.dataset.index]['numberLike'] = 1
            // console.log(2)
          } else {
            // console.log(3)
            that.data.commentArr[e.currentTarget.dataset.index].numberLike--
          }
          that.setData({
            commentArr: that.data.commentArr
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
    // let that = this
    // if (this.data.commentArr[e.currentTarget.dataset.index].zan === 0) {
    //   this.data.commentArr[e.currentTarget.dataset.index].star = this.data.commentArr[e.currentTarget.dataset.index].star * 1 + 1
    // } else {
    //   this.data.commentArr[e.currentTarget.dataset.index].star -= 1
    // }
    // this.data.commentArr[e.currentTarget.dataset.index].zan = this.data.commentArr[e.currentTarget.dataset.index].zan === 1 ? 0 : 1
    // this.setData({
    //   commentArr: that.data.commentArr
    // })
  },
  // 投票
  userVote (e) {
    let that = this
    wx.showModal({
      title: e.currentTarget.dataset.show,
      success (res) {
        if (res.confirm) {
          app.wxrequest({
            url: `${app.getUrl().vote}?SESSIONID=${app.gs()}&articleId=${that.data.info.id}&voteOptionId=${e.currentTarget.dataset.id}`,
            success (res) {
              wx.hideLoading()
              if (res.data.code === '200') {
                if (e.currentTarget.dataset.type === 'agree') {
                  that.data.info.voteoptionList[0]['number']++
                } else if (e.currentTarget.dataset.type === 'oppose') {
                  that.data.info.voteoptionList[1]['number']++
                } else {
                  that.data.info.voteoptionList[2]['number']++
                }
                setTimeout(() => {
                  that.setData({
                    info: that.data.info
                  })
                }, 500)
              } else {
                app.setToast(that, {content: res.data.message})
              }
            }
          })
        }
      }
    })
  },
  // 获取意见详情
  getDetail (id) {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().details}?SESSIONID=${app.gs()}&id=${id}`,
      // data: {
      //   id
      // },
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          that.getCommentList(id)
          app.WP('wpContent', 'html', res.data.result.articlecontent, that, 5)
          that.setData({
            info: res.data.result
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取文章评论
  getCommentList (id) {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().findCommentList}?SESSIONID=${app.gs()}&articleId=${id}`,
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200' && res.data.result) {
          for (let [i, v] of res.data.result.entries()) {
            res.data.result[i]['time'] = app.moment(v.createDate)
          }
          that.setData({
            commentArr: res.data.result || []
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 删除评论
  delComment (e) {
    let that = this
    app.wxrequest({
      url: `${app.getUrl().delComment}?SESSIONID=${app.gs()}&articleId=${that.data.info.id}&id=${that.data.commentArr[e.currentTarget.dataset.index].id}`,
      success (res) {
        wx.hideLoading()
        if (res.data.code === '200') {
          that.getCommentList(that.data.info.id)
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
    this.setData({
      user: app.gs('userData')
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
    if (this.data.info.id) this.getDetail(this.data.info.id)
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
