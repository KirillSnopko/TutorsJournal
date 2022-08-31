$(document).ready(function () {
    $(window).on('load', function () {

        $("#form_create_topic").click(function () {
            var id = $('#idSubject_top').val();
            var gradeLevel = document.create_topic.gradeLevel;
            var description = document.create_topic.description;
            var token = $('input[name="__RequestVerificationToken"]', create_topic).val();

            if (isNaN(parseInt(gradeLevel.value)) || gradeLevel.value < 0 || gradeLevel.value.trim() == "") {
                document.getElementById('err_create_topic').innerHTML = "Введите корректное значение";
                gradeLevel.focus();
            } else if (description.value.trim() == "" || description.value == null) {
                document.getElementById('err_create_topic').innerHTML = "Введите корректное описание";
                description.focus();
            } else {

                $.post("../Subject/CreateTopic",
                    {
                        idSubject: id,
                        gradeLevel: gradeLevel.value,
                        description: description.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            location.reload();
                        } else {
                            document.getElementById('err_create_topic').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});