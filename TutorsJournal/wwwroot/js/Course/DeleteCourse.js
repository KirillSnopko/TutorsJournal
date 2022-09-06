$(document).ready(function () {
    $(window).on('load', function () {

        $("#form_delete_course").click(function () {
            var id = $('input[name="id"]', delete_course).val();
            var token = $('input[name="__RequestVerificationToken"]', delete_course).val();
            $.post("/Course/DeleteCourse",
                {
                    id: id,
                    __RequestVerificationToken: token,
                },
                function (status) {
                    if (status['status'] == 200) {
                        location.reload();
                    } else {
                        document.getElementById('err_delete_course').innerHTML = status['message'];
                    }
                });
        });
    });
});