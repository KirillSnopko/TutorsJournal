$(document).ready(function () {
    $(window).on('load', function () {

        $("#form_change_topic").click(function () {
            var id = $('#idTopic_change').val();
            var gradeLevel = document.change_topic.gradeLevel;
            var description = document.change_topic.description;
            var token = $('input[name="__RequestVerificationToken"]', change_topic).val();

            if (isNaN(parseInt(gradeLevel.value)) || gradeLevel.value < 0 || gradeLevel.value.trim() == "") {
                document.getElementById('err_change_topic').innerHTML = "Введите корректное значение";
                gradeLevel.focus();
            }
            else if (description.value.trim() == "" || description.value == null) {
                document.getElementById('err_change_topic').innerHTML = "Введите корректное описание";
                description.focus();
            } else {

                $.post("../Subject/ChangeTopic",
                    {
                        id: id,
                        gradeLevel: gradeLevel.value,
                        description: description.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            location.reload();
                        } else {
                            document.getElementById('err_change_topic').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});