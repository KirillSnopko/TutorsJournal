$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_edit_lesson").click(function () {
            var id = document.edit_lesson.id;
            var task = document.edit_lesson.task;
            var comment = document.edit_lesson.comment;
            var date = document.edit_lesson.date;
            var time = document.edit_lesson.time;
            var token = $('input[name="__RequestVerificationToken"]', edit_lesson).val();

            if (task.value == null || task.value.trim() == "") {
                document.getElementById('err_edit_lesson').innerHTML = "Введите задание";
                task.focus();
            } else if (date.value == null || date.value.trim() == "") {
                document.getElementById('err_edit_lesson').innerHTML = "Введите дату";
                date.focus();
            } else if (time.value == null || time.value.trim() == "") {
                document.getElementById('err_edit_lesson').innerHTML = "Введите время";
                time.focus();
            } else if (comment.value == null || comment.value.trim() == "") {
                document.getElementById('err_edit_lesson').innerHTML = "Введите задание";
                comment.focus();
            } else {
                $.post("../Course/EditLesson",
                    {
                        id: id.value,
                        date: date.value,
                        time: time.value,
                        task: task.value,
                        comment: comment.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            document.location.reload();
                        } else {
                            document.getElementById('err_edit_lesson').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});