const AdminActivityBiz = require('../../../biz/admin_activity_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const behavior = require('../../admin/activity/edit/admin_activity_edit_bh.js');

Page({
	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'client',
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		if (!pageHelper.getOptions(this, options)) return;

		if (!await PassportBiz.loginMustBackWin(this)) return;


		AdminActivityBiz.loadActivityDetail(this, 'client');
	},


})