/**
 * Created by Administrator on 2017/6/2.
 */
// let baseDomain = 'http://group.lanzhangxiu.cn'
let baseDomain = 'http://120.78.221.80:8082/jeesite-worker'
let serviceUrl = {
  login: baseDomain + '/rest/wechatUser/getSessionID',
  verifyLogin: baseDomain + '/rest/user/verifyLogin',
  userLogin: baseDomain + '/rest/user/login',
  registered: baseDomain + '/rest/user/registered',
  bannerList: baseDomain + '/rest/banner/banner_list',
  grouppurchaseList: baseDomain + '/rest/order/grouppurchase_list',
  commodityList: baseDomain + '/rest/order/commodity_list',
  opinionList: baseDomain + '/rest/opinion/opinion_list',
  opinionSave: baseDomain + '/rest/opinion/opinionSave',
  articleList: baseDomain + '/rest/article/article_list',
  details: baseDomain + '/rest/article/details',
  isLike: baseDomain + '/rest/article/isLike',
  vote: baseDomain + '/rest/article/vote',
  findCommentList: baseDomain + '/rest/article/findCommentList',
  addComment: baseDomain + '/rest/article/addComment',
  addReply: baseDomain + '/rest/article/addReply',
  mycommentList: baseDomain + '/rest/user/mycomment_list',
  myreply_list: baseDomain + '/rest/user/myreply_list',
  mygrouppurchase_list: baseDomain + '/rest/order/mygrouppurchase_list',
  send: baseDomain + '/rest/order/send',
  orderDetails: baseDomain + '/rest/order/details',
  addOrder: baseDomain + '/rest/order/addorder',
  getUser: baseDomain + '/rest/user/getUser',
  delComment: baseDomain + '/rest/article/delComment',
  delReply: baseDomain + '/rest/article/delReply'
}
module.exports = serviceUrl
