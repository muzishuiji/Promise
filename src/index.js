import { setTimeout } from "core-js/library/web/timers";

//定义一个基本的Promise类

function JPromise(fn) {
    //我们需要给这个Promise函数一个状态,且这个状态一旦改变,就不会再变
    let state = 'pending';
    let deferred = null;
    let value = null;

    //定义resolve函数,并在resolve函数里执行回调
    function resolve(newVal) {
        try {
            //用于保留传入的参数
            value = newVal;
            state = 'resolved';
            if(deferred) {
                handle(deferred);
            }
        } catch(err) {
            reject(err);
        }
    }

    //定义reject函数
    function reject(reason) {
        state = 'rejected';
        value = reason;
        if(deferred) {
            handle(deferred);
        }
    }

    function handle(handler) {
        if(state === "pending") {
            deferred = handler;
            return;
        }
        let handlerCallback;
        if(state === "resolved") {
            handlerCallback = handler.onResolved;
        } else {
            handlerCallback = handler.onRejected
        }
        if(!handlerCallback) {
            if(state === 'resolved') {
                handler.resolve(value)
            } else {
                handler.reject(value)
            }
            return;
        }

        setImmediate(() => {
            const ret = handlerCallback(value);
            handler.resolve(ret);
        });
    }
    
    //我们在调用then方法的时候,始终会创建一个Promise对象,那么第二个Promise调用的,实际上是第一个Promise返回的值
    this.then = function(onResolved, onRejected) {
        //构造.then方法,并在then方法中给回调函数赋值
        return new Promise((resolve, rejected) => {
            handle({
                onResolved,
                onRejected,
                resolve,
                rejected
            })
        })
    };
    

    fn(resolve, reject);
}


module.exports = JPromise;