$(document).ready(function () {
    $(window).on('load', function () {

        $("#form_delete_student").click(function () {
            var id = $('input[name="id"]', delete_student).val();
            var token = $('input[name="__RequestVerificationToken"]', delete_student).val();
            $.post("/Student/DeleteStudent",
                {
                    id: id,
                    __RequestVerificationToken: token,
                },
                function (status) {
                    if (status['status'] == 200) {
                        location.reload();
                    } else {
                        document.getElementById('err_delete_student').innerHTML = status['message'];
                    }
                });
        });
    });
});