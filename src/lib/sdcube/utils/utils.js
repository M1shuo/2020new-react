

import { hex_sha1 } from './sha1'

/**
 * 
 * @param {*} obj 
 * this function will transform an obj to a string,just like
 * {name:"Tom",age:12}
 * name=Tom&age=12
 * note: property datatype object and undefined will be ignore
 */
export const serializeForm = function (obj) {
    const params = []
    Object.keys(obj).forEach(ele => {
        if (typeof obj[ele] !== 'object')
            params.push(`${ele}=${obj[ele]}`)
    });
    return params.join('&')
}

export const loadScript = function (url, timeout, cb) {
    const document = window.document;
    const header = window.document.getElementsByTagName('head')[0];
    const scriptTag = document.createElement('script');
    header.appendChild(scriptTag);
    scriptTag.src = url;
    const timer = setTimeout(function () {
        throw new Error('loading script timeout')
    }, timeout * 1000)
    scriptTag.onload = function () {
        clearTimeout(timer);
        cb();
    }

}

export const sha1 = hex_sha1;



