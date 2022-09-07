$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_create_lesson").click(function () {
            var courseId = document.create_lesson.id;
            var topic = document.create_lesson.topic;
            var price = $('#cur_price').val().split('BYN')[0];
            var task = document.create_lesson.task;
            var date = document.create_lesson.date;
            var time = document.create_lesson.time;
            var comment = document.create_lesson.comment;
            var token = $('input[name="__RequestVerificationToken"]', create_lesson).val();

            if (topic.value == null || topic.value.trim() == "") {
                document.getElementById('err_create_lesson').innerHTML = "Выберите или создайте тему";
                topic.focus();
            } else if (task.value == null || task.value.trim() == "") {
                document.getElementById('err_create_lesson').innerHTML = "Введите задание";
                task.focus();
            } else if (date.value == null || date.value.trim() == "") {
                document.getElementById('err_create_lesson').innerHTML = "Введите дату";
                date.focus();
            } else if (time.value == null || time.value.trim() == "") {
                document.getElementById('err_create_lesson').innerHTML = "Введите время";
                time.focus();
            } else if (comment.value == null || comment.value.trim() == "") {
                document.getElementById('err_create_lesson').innerHTML = "Оставляем без комментария?";
                $('textarea[name="comment"]', create_lesson).val("Без комментариев");
                comment.focus();
            } else {
                $.post("../Course/CreateLesson",
                    {
                        courseId: courseId.value,
                        topic: topic.value,
                        price: price,
                        date: date.value,
                        time:time.value,
                        task: task.value,
                        comment: comment.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            document.location.reload();
                        } else {
                            document.getElementById('err_create_lesson').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});