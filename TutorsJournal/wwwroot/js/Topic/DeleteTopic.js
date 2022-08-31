$(document).ready(function () {
    $(window).on('load', function () {

        $("#form_delete_topic").click(function () {
            var id = $('#idTopic_delete').val();
            var token = $('input[name="__RequestVerificationToken"]', delete_topic).val();
            $.post("/Subject/DeleteTopic",
                {
                    id: id,
                    __RequestVerificationToken: token,
                },
                function (status) {
                    if (status['status'] == 200) {
                        location.reload();
                        $('#idTopic_delete').val("");
                    } else {
                        document.getElementById('err_delete_topic').innerHTML = status['message'];
                    }
                });
        });
    });
});