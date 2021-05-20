$(function () {
    //reg_link 点击事件
    $('#reg_link').on('click', function () {
        $('#loginBox').hide();
        $('#regBox').show();
    })


    // login_link 点击事件
    $('#login_link').on('click', function () {
        console.log(1);
        $('#regBox').hide();
        $('#loginBox').show();
    })


    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('#regBox [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    $('#reg_form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: $('#reg_form').serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('账号注册成功! 请登录');
                $('#login_link').click();
            }
        });
    })
    

    $('#login_form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $('#login_form').serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message)
                location.href = '/index.html';
                localStorage.setItem('token', res.token)
            }
        });
    })



    $.ajaxPrefilter(function (options) {
        // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    })

})