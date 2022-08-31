$(document).ready(function () {
    $(window).on('load', function () {

        $("#form_delete_subject").click(function () {
            var id = $('#idSubject_delete').val();
            var token = $('input[name="__RequestVerificationToken"]', delete_subject).val();
            $.post("/Subject/DeleteSubject",
                {
                    id: id,
                    __RequestVerificationToken: token,
                },
                function (status) {
                    if (status['status'] == 200) {
                        location.reload();
                        $('#idSubject_delete').val("");
                    } else {
                        document.getElementById('err_delete_subject').innerHTML = status['message'];
                    }
                });
        });
    });
});