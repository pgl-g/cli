



const ora = require('ora'); // 加载器

/**
 * 
 * @param {*} time 睡眠时间
 * @returns 
 */
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}



/**
 * 
 * @param {*} message 
 * @param {*} fn 
 * @param  {...any} args 
 * @returns 
 */
async function loading(message, fn, ...args ) {
    const spinner = ora(message);
    spinner.start(); // 开始加载
    try {
        let executeRes = await fn(...args);
        spinner.succeed();
        return executeRes;
    } catch (error) {
        console.log(error, 'error');
        spinner.fail("request fail, reTrying");
        await sleep(1000)
        return loading(message, fn, ...args);
    }
}

/**
 * 转换为promise
 * @param {*} originFn 
 * @returns 
 */
function promisify (originFn) {
    return function(...args) {
        return new Promise((resolve, reject) =>{
            let cb = (err, data) => err ? reject(err) : resolve(data);
            originFn.call(this, ...args, cb);
        })
    }
}



module.exports = {
    loading,
    promisify
}