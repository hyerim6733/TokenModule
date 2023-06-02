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
});