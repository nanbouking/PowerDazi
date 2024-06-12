const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const behavior = require('admin_activity_self_bh.js');

Page({
	behaviors: [behavior],
	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'admin'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options, 'activityId'));

		if (options && options.title) {
			let title = decodeURIComponent(options.title);
			this.setData({
				title
			});
		}

		await this._loadDetail();
	},

})