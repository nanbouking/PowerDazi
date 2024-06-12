const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const behavior = require('../../admin/activity/list/admin_activity_list_bh.js');

Page({

	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'client',
		isLogin: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		ProjectBiz.initPage(this);
		if (!PassportBiz.loginMustBackWin(this)) return;

		this._getSearchMenu();
	},

	bindJoinMoreTap: async function (e) {
		let itemList = ['报名名单管理', '导出名单Excel表格', '核销报名码', '获取用户自助签到码', '清空报名数据'];

		let activityId = pageHelper.dataset(e, 'id');
		let title = encodeURIComponent(pageHelper.dataset(e, 'title'));

		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: {
						wx.navigateTo({
							url: '../join_list/activity_join_list?activityId=' + activityId + '&title=' + title,
						});
						break;
					}
					case 1: {
						wx.navigateTo({
							url: '../export/activity_export?activityId=' + activityId + '&title=' + title,
						});
						break;
					}
					case 2: {
						wx.navigateTo({
							url: '../scan/activity_scan?activityId=' + activityId + '&title=' + title,
						});
						break;
					}
					case 3: {
						wx.navigateTo({
							url: '../self/activity_self?activityId=' + activityId + '&title=' + title,
						});
						break;
					}
					case 4: {
						await this._clearJoin(e);
						break;
					}
				}
			},
			fail: function (res) { }
		})
	},

	bindMoreTap: async function (e) {
		let idx = pageHelper.dataset(e, 'idx');

		let itemList = ['预览', '生成专属二维码', '评论管理'];
		let id = pageHelper.dataset(e, 'id');

		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: { //预览 
						wx.navigateTo({
							url: '../../activity/detail/activity_detail?id=' + id,
						});
						break;
					}
					case 1: { //二维码 
						let title = encodeURIComponent(pageHelper.dataset(e, 'title'));
						let qr = encodeURIComponent(pageHelper.dataset(e, 'qr'));
						wx.navigateTo({
							url: `../qr/activity_qr?title=${title}&qr=${qr}`,
						})
						break;
					}
					case 2: { //评论管理  
						wx.navigateTo({
							url: '../../comment/list/comment_list?source=client&id=' + id,
						})
						break;
					}
				}


			},
			fail: function (res) { }
		})
	},

})