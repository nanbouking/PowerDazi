const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const behavior = require('../../admin/setup/qr/admin_setup_qr_bh.js');

Page({

	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'client',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		ProjectBiz.initPage(this);
		if (!PassportBiz.loginMustBackWin(this)) return;

		if (options && options.qr && options.title) {
			this.setData({
				qr: decodeURIComponent(options.qr),
				title: decodeURIComponent(options.title),
			}, () => {
				this._loadDetail();
			});
		}
		else
			this._loadDetail();
	},

})