$(document).ready(function () {
    $(window).on('load', function () {


        //Create
        $("#button_create_subject").click(function () {
            var name = document.create.name;
            var token = $('input[name="__RequestVerificationToken"]', create).val();


            if (name.value.trim() == "" || name.value == null) {
                document.getElementById('err_create_subject').innerHTML = "Введите корректно значение";
                name.focus();
            } else {

                $.post("../Subject/CreateSubject",
                    {
                        name: name.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            location.reload();
                        } else {
                            document.getElementById('err_create_subject').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });


    });
});