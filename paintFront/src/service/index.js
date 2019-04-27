import axios from './http';
import router from '@/router'

// import jsonParse from '@/jsonParse'
import { MessageBox } from 'mint-ui';

const apiURL = '';

class api {
	constructor() {}

	login( param ){
		return login(apiURL + `/users/login`, param);
	}

	item_list(pid, key = '', ext = '') {
		if (!pid) {
			pid = '0';
		}
		return baseRequest('get', apiURL + `/v2/api/item?pid=${pid}&key=${encodeURI(key)}&ext=${ext}`);
	}

	recovery(_ids, same_files) {
		return baseRequest('post', `${apiURL}/v2/api/item/recovery`, { item_ids: _ids, same_files: same_files });
	}

}

let login = (url, params) =>{
  let base = axios ;

  let setData = {
    username: params.username,
    password: params.password
  }

  return base['post'](url, setData).then(success).catch(error);
}


let baseRequest = (method, url, data) => {
        let base = axios ;
        if (!data)  return  base[method](url).then(success).catch(error);
        return  base[method](url, data).then(success).catch(error);
}

function success(d) {
  return d.data;
}

function error(d){
  console.log(d)
  if(d.status == 401){
    router.replace({
      path: login
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
      MessageBox ({ message:'请求失败，内部服务器错误！', type: 'error', duration:2000});
    return({
      success: 0,
      message: d.statusText
    });
  }
  return d;
}

export default new api();
