import utils from '@/utils'

import qs from 'qs';

const { isEmptyObject, serilizeParam } = utils

const rootPath='/newadmin'// 这里是后台接口的前边公共部分


export default function (that,url,method,params,cb){
    if(method=='POST'){
        that.$http.post(url,qs.stringify(params)).then(res=>{
            // if(res.code==100){//后台规定的用户验证状态码
            //     that.$router.push('/login')
            //     return;
            // }
            cb(res)
        })
        .catch((err)=>{
            console.log(err.status)
            new Error(err)
        })
    }
    if(method=='GET'){
        let URL=''
        if(!!params && isEmptyObject(params)){
            URL=url+'?'+serilizeParam(params)
        }else {
          URL=url
        }
        that.$http.get(URL).then(res=>{
            // if(res.code==100){//后台规定的用户验证状态码
            //     // that.$router.push('/wumiadmin/login')
            //     return;
            // }
            cb(res)
        })
        .catch((err)=>{
            console.log(err.status)
            new Error(err)
        })
    }
}
