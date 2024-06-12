const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const behavior = require('admin_setup_qr_bh.js');

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