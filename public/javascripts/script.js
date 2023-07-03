
$(function () {

    $("button").on("click", function () {

        //e.preventDefault();

        const form = document.getElementById("form1");
        const submitter = document.querySelector("button[value=save]");
        const formData = new FormData(form, submitter);
    
        const output = document.getElementById("output");
    
        for (const [key, value] of formData) {
            output.textContent += `${key}: ${value}\n`;
        }
        console.log(JSON.stringify(formData))

        /*
        $.ajax({
            type: 'POST',
            url: '/token',
            data: JSON.stringify(formData),
            success: function (order) {
                var html = '';
                for (var i = 0; i < order.length; i++) {
                    html += '<h2>' + order[i].name + ' ' + order[i].drink + '</h2>';
                }
                $('#target').html(html);
            }
        });*/
        return false
    });

    $("form").on("submit", function() {
        var id = $("#id").val();
        var nick = $("#nick").val();
        console.log(id, nick);

        let formData = new FormData(this);
        console.log(formData.getAll('info'))

        let obj = {
            'id': id,
            'nick': nick
        }

        //console.log('1',auth.findUsers('user01'));
        //console.log('2',auth.findUsers('user02'))

        console.log('obj:',obj)
        $.ajax({
            type: 'POST',
            url: '/token',
            data: obj,
            success: function (order) {
                console.log(order)
                // var html = '';
                // for (var i = 0; i < order.length; i++) {
                //     html += '<h2>' + order[i].name + ' ' + order[i].drink + '</h2>';
                // }
                $('#hiddenval').val(order.token);
                $('#output').html('토큰이 정상적으로 발행되었습니다.');
            },
            error: function (err) {
                console.log(err)
            }
        });

        return false;
    })

    $("#checkbtn").on("click", function() {
        console.log('히든밸류:',$('#hiddenval').val());
        $.ajax({
            type: 'GET',
            url: '/token/test',
            headers: {
                'Authorization': $('#hiddenval').val()
            },
            success: function (order) {
                console.log(order)
                // var html = '';
                // for (var i = 0; i < order.length; i++) {
                //     html += '<h2>' + order[i].name + ' ' + order[i].drink + '</h2>';
                // }
                $('#output2').html(order.message);
            },
            error: function (err) {
                $('#output2').html(err);
                //console.log(err)
                //console.log(err.status);
                //console.log(err.responseJSON)
                var res = err.responseJSON;
                console.log(res.code, res.message);
                alert(res.message)
            }
        });
    });
});