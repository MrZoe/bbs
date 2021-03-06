/**
 * Created by Administrator on 2017/6/20.
 */

const ajax = function(method, path, data, reseponseCallback) {
    // 创建 ajax 对象
    const r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式( setRequestHeader 是套路函数)
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数(当服务器返回数据之后，执行 reseponseCallback 函数)
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    // 发送请求
    r.send(data)
}

const postReply = function () {
    // 获取文章数据
    const content = $('#id-new-reply').val()
    const path = location.pathname
    const topicId = path.split('/')[path.split('/').length - 1]
    let data = {}
    data.content = content
    data.topic_id = topicId
    data = JSON.stringify(data)
    // post 发送文章数据
    ajax('post', `/reply/${topicId}`, data, function (r) {
        const response = JSON.parse(r.response)
        // 根据后端返回的值来重定向 / 提示错误
        if(response === false) {
            // 如果返回 false， 则报错
            const errorMessege = $('.prompt')
            errorMessege.css('color', 'red')
            // 闪光结束后回调改变为初始颜色
            errorMessege.fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400, () => {
                errorMessege.css('color', '#8e8e8e')
            })
        } else if (response === true) {
            // 如果返回 true， 则刷新页面
            $('#id-span-post').text('发表成功')
            $('#id-a-post').css({
                color: '#fff',
                backgroundColor: '#00cc00',
            })
            setTimeout(function () {
                location.reload()
            }, 1)
        }
    })
}

const postReplyEvent = function () {
    // 绑定 post 事件
    const btn = $('#id-a-post')
    btn.click(function () {
        postReply()
    })
}

const __main =  function () {
    postReplyEvent()
}

__main()