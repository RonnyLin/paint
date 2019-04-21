import Vue from 'vue'
import axios from './http';
import router from '@/router'
import { Message } from 'element-ui';
import jsonParse from '@/jsonParse'

const apiURL = 'http://localhost:3000';

class api {
	    constructor() {}
		item_list(pid, key = '', ext = '') {
		    if (!pid) {
		        pid = '0';
		    }
		    return baseRequest('get', apiURL + `/v2/api/item?pid=${pid}&key=${encodeURI(key)}&ext=${ext}`);
		}
		page_list(pid, key = '', ext = '', limit = 100, page = 1) {
		    if (!pid) {
		        pid = '0';
		    }
		    return baseRequest('post', apiURL +`/v2/api/item_pagination?pid=${pid}&ext=${ext}&limit=${limit}&page=${page}`,{key:encodeURI(key)});
		}
		recycle() {
		    return baseRequest('get', apiURL + `/v2/api/item/recycle`);
		}
		recovery(_ids, same_files) {
		    return baseRequest('post', `${apiURL}/v2/api/item/recovery`, { item_ids: _ids, same_files: same_files });
		}
		check_recovery(_ids) {
		    return baseRequest('post', `${apiURL}/v2/api/item/check_recovery`, { item_ids: _ids });
		}
		add_item(d) {
		    return baseRequest('post', apiURL + '/v2/api/item', d);
		}
		update_item(d) {
		    return baseRequest('put', apiURL + '/v2/api/item', d);
		}
		rename(new_name, item_id) {
		    return baseRequest('post', apiURL + `/v2/api/item/rename`, { name: new_name, _id: item_id });
		}
		check_rename(item) {
		    return baseRequest('post', apiURL + `/v2/api/item/check_rename`, { new_name: item.name ,_id: item._id});
		}
		delete_item(_ids, is_remove = 1) { //is_remove 0 彻底删除 、1丢到垃圾桶
		    return baseRequest('post', `${apiURL}/v2/api/item/delete`, { item_ids: _ids, is_remove: is_remove });
		}
		folder(pid, _ids=[]) {
		    if (!pid) {
		        pid = '0';
		    }
		    return baseRequest('post', `${apiURL}/v2/api/item/${pid}/folder`, { item_ids: _ids });
		}
		branchs(pid = '83000001') {
		    return baseRequest('get', `${apiURL}/v2/api/branchs/${server_id}/${pid}`);
		}
		branchUser(branch_id) {
		    return baseRequest('get', `${apiURL}/v2/api/user/${server_id}/${branch_id}`);
		}
		share_file(files, users, depts) {
		    return baseRequest('post', `${apiURL}/v2/api/share`, {
		        share_file: files,
		        users: users,
		        depts: depts
		    });
		}
		share_package_files(share_id) {
		    return baseRequest('get', `${apiURL}/v2/api/share/package/${share_id}`);
		}
		cancel_share(share_id) {
		    return baseRequest('delete', `${apiURL}/v2/api/${share_id}/share`);
		}
		user_share_files() {
		    return baseRequest('get', `${apiURL}/v2/api/share`);
		}
		share_to_me(type = 'all',page = 1, limit = 100) {
		    return baseRequest('get', `${apiURL}/v2/api/share/to/me?type=${type}&page=${page}&limit=${limit}`);
		}
		move_file(file_ids, pid, is_copy = false) {
		    return baseRequest('post', !is_copy ? `${apiURL}/v2/api/item/move_file/to/${pid}` : `${apiURL}/v2/api/item/copy_file/to/${pid}`, { item_ids: file_ids, is_copy: is_copy });
		}
		analysis_add(share_file, item_id = '', type = 'down',userInfo) {
		    return baseRequest('post', `${apiURL}/v2/api/shareAnalysis`, {
		        file_name: share_file.name,
		        share_id: share_file._id,
		        share_user: share_file.user,
		        item_id: item_id,
		        type: type,
		        user: {
		            name: jsonParse.parse(sessionStorage.user).displayName,
		            id: jsonParse.parse(sessionStorage.user).id,
		            login_name: jsonParse.parse(sessionStorage.user).loginName
		        }
		    });
		}
		use_space() {
		    return baseRequest('get', `${apiURL}/v2/api/use_space`);
		}
		// login(params){
		// 	return baseRequest('post',`${apiURL}/v2/api/login`,params);
		// }
    login(params){
      return login(`${apiURL}/v2/api/login`,params);
    }


		// getBranchs(pid){
		// 	return baseRequest('post',`/api/Structure/Branchs?serverID=005056BF4D75&parentID=${pid}`);
		// }
		// getUsers(pid){
		// 	 return baseRequest('post',`/api/Structure/Users?serverID=005056BF4D75&branchID=${pid}`);
		// }

    /**
     *   龚 新写的接口
     *
     * **/

    recentPerson(num = 20){
      return baseRequest('get',`/v2/api/share/getUser?recent=${num }`)
    }

    group(flag){

      let sendOptions = {};
      switch (options.flag){
        case 1:
          sendOptions = {
            groupName:options.groupName,
            groupUsers:options.groupUsers
          }
          break;
        case 2:
          sendOptions = {
            group_ids:options.group_ids||'',
            key:options.key ||''
          }
          break;
        case 3:
          sendOptions = {
            group_ids:options.group_ids,
            groupName:options.groupName,
            groupUsers:options.groupUsers
          }
          break;
        case 4:
          sendOptions = {
            group_ids:options.group_ids,
          }
          break;
      }
      console.error(sendOptions)
      return baseRequest('post', `/v2/api/group?flag=${options.flag}`,sendOptions);

    }


}

let login = (url, params) =>{
  let base = axios ;

  let setData = {
    username: params.username,
    password: params.password,
    server_id: server_id
  }

  return base['post'](url, setData).then(success).catch(error);
}


let baseRequest = (method, url, data) => {
		const ifPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        let base = axios ;

        if (!data)  return  base[method](url).then(success).catch(error);

        return  base[method](url, data).then(success).catch(error);

}

function success(d) {
  // console.log(d)
  return d.data;
}

function error(d){
  console.log(d)
  if(d.status == 401){
    let loginUrl;
    ifPhone ? loginUrl = 'login' : loginUrl = 'loginFrom'
    router.replace({
      path: loginUrl
    });
    return{
      success: 0,
      message: '身份验证失败'
    }
  }
  if(d.status != 200){
    // router.replace({
    //     path: 'netError'
    // })
    Message({ message:'请求失败，内部服务器错误！', type: 'error', duration:2000});
    return({
      success: 0,
      message: d.statusText
    });
  }
  return d;
}

export default new api();
