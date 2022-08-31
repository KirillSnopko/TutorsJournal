$(document).ready(function () {
    $(window).on('load', function () {

        $("#form_rename_subject").click(function () {
            var name = document.rename_subject.name;
            var token = $('input[name="__RequestVerificationToken"]', rename_subject).val();
            var id = $('#idSubject_rename').val();


            if (name.value.trim() == "" || name.value == null) {
                document.getElementById('err_rename_subject').innerHTML = "Введите название";
                name.focus();
            } else {

                $.post("../Subject/RenameSubject",
                    {
                        id: id,
                        name: name.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            location.reload();
                        } else {
                            document.getElementById('err_rename_subject').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});