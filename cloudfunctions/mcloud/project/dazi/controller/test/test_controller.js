/**
 * Notes: 测试模块控制器
 * Date: 2021-03-15 19:20:00 
 */

const BaseController = require('../../controller/base_project_controller.js');
const fakerLib = require('../../../../framework/lib/faker_lib.js');
const dataUtil = require('../../../../framework/utils/data_util.js');

const UserModel = require('../../model/user_model.js');
const ActivityModel = require('../../model/activity_model.js');
const ActivityJoinModel = require('../../model/activity_join_model.js');
const CommentModel = require('../../model/comment_model.js');
const ActivityService = require('../../service/activity_service.js');

class TestController extends BaseController {

	async test() {
		console.log('TEST>>>>>>>');
		global.PID = 'dazi';

		//this.mockActivity();
		//this.mockUser();
		//this.mockActivityJoin();
		this.mockActivityComment();
	}


	async mockActivity() {
		console.log('mockActivity >>>>>>> Begin....');
 
		let list = await ActivityModel.getAll({});
		console.log('>>>>list=' + list.length);

		for (let k = 0; k <= list.length; k++) {
			let id = list[k]._id; 
			//console.log(id)

			ActivityModel.edit(id, { ACTIVITY_USER_ID: global.PID + '_' + fakerLib.getIntBetween(1, 48) });

		}
		console.log('mockActivity >>>>>>> END');

	}

	async mockUser() {
		console.log('mockUser >>>>>>> Begin....');

		console.log('>>>>delete');
		let delCnt = await UserModel.del({});
		console.log('>>>>delete=' + delCnt);

		for (let k = 1; k <= 50; k++) {
			console.log('>>>>insert >' + k);

			let user = {};
			user.USER_MINI_OPENID = global.PID + '_' + k;
			user.USER_NAME = fakerLib.getName();
			user.USER_MOBILE = fakerLib.getMobile();
			user.USER_PIC = fakerLib.getAvatar();
			user.USER_OBJ = { sex: fakerLib.getRdArr(['男', '女']) };
			await UserModel.insert(user);

		}

		console.log('mockUse <<<< END');
	}

	async mockActivityJoin() {
		console.log('mockActivityJoin >>>>>>> Begin....');

		let delCnt = await ActivityJoinModel.del({});
		console.log('>>>>delete mockActivityJoin =' + delCnt);

		let activityService = new ActivityService();

		let list = await ActivityModel.getAll({});
		for (let k in list) {
			let node = list[k];
			console.log('title=' + list[k].ACTIVITY_TITLE);

			let step = fakerLib.getIntBetween(10, 30);
			for (let j = 0; j < step; j++) {
				console.log('>>>>insert >' + j);

				let data = {};
				data.ACTIVITY_JOIN_ACTIVITY_ID = node._id;
				data.ACTIVITY_JOIN_USER_ID = global.PID + '_' + fakerLib.getIntBetween(1, 48);
				data.ACTIVITY_JOIN_CODE = fakerLib.getIntStr(10);
				data.ACTIVITY_JOIN_ADD_TIME = fakerLib.getAddTimestamp(-100, -1);

				data.ACTIVITY_JOIN_FORMS = [
					{ mark: 'name', title: '姓名', type: 'text', val: fakerLib.getName() },
					{ mark: 'phone', title: '手机', type: 'mobile', val: fakerLib.getMobile() }
				];
				data.ACTIVITY_JOIN_OBJ = dataUtil.dbForms2Obj(data.ACTIVITY_JOIN_FORMS);

				await ActivityJoinModel.insert(data);
			}

			// 统计
			await activityService.statActivityJoin(node._id);

		}

		console.log('mockActivityJoin >>>>>>> END');
	}

	async mockActivityComment() {
		console.log('mockActivityComment >>>>>>> Begin....');

		let delCnt = await CommentModel.del({});
		console.log('>>>>delete mockActivityComment =' + delCnt);

		let list = await ActivityModel.getAll({});
		for (let k in list) {
			let node = list[k];
			console.log('title=' + list[k].ACTIVITY_TITLE);

			let step = fakerLib.getIntBetween(8, 31);
			for (let j = 0; j < step; j++) {
				console.log('>>>>insert >' + j);

				let data = {};
				data.COMMENT_OID = node._id;
				data.COMMENT_TYPE = 'activity';
				data.COMMENT_USER_ID = global.PID + '_' + fakerLib.getIntBetween(1, 48);
				data.COMMENT_ADD_TIME = fakerLib.getAddTimestamp(-10, 1);

				data.COMMENT_FORMS = [
					{ mark: 'content', title: '评论内容', type: 'textarea', val: fakerLib.getComment() },
				];
				data.COMMENT_OBJ = dataUtil.dbForms2Obj(data.COMMENT_FORMS);

				await CommentModel.insert(data);
			}
			await ActivityModel.edit(node._id, { ACTIVITY_COMMENT_CNT: step });


		}

		console.log('mockActivityComment >>>>>>> END');
	}


}

module.exports = TestController;