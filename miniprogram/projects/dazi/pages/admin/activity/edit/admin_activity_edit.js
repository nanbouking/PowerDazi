const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const AdminActivityBiz = require('../../../../biz/admin_activity_biz.js');
const projectSetting = require('../../../../public/project_setting.js');
const behavior = require('admin_activity_edit_bh.js');

Page({
	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'admin', 
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.ACTIVITY_NAME + '-修改',
		});

		AdminActivityBiz.loadActivityDetail(this);
	},

})