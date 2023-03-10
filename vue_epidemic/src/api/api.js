import axios from 'axios'
import {Message} from 'element-ui'
/**
 * 封装axios方法
 * @param options
 */
 export let futureAxios = (options)=>{
    options.data.token=window.localStorage.token;
    axios({
      url:options.url,
      method:options.method || 'POST',
      data:options.data,
      params:options.data,
    }).then(result=>{
      if(options.success){
        options.success(result.data)
      }
    }).catch(err=>{
        let msg = err.response ? err.response.data : '请求异常'
        if (options.error) {
            options.error(msg)
            Message.error({message: msg, offset: 150});
        } else {
            Message.error({message: msg, offset: 150});
        }
    })
}

/**
 * //封装axios方法,为不需要登录操作时使用
 * @param options 配置
 */
export let Axios= (options)=>{
    axios({
        url:options.url,
        method:options.method||'POST',
        data: options.data,
        params: options.data
    }).then(result=>{
        if (options.success)  options.success(result.data)
    }).catch(err=>{
        let msg = err.response ? err.response.data:'请求异常'
        if (options.error){
            options.error(msg)
            Message.error({message: msg, offset: 150});
        }else {
            Message.error({message: msg, offset: 150});
        }
    })
}
