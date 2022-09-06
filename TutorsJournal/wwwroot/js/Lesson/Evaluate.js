$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_evaluate").click(function () {
            var comment = document.evaluate.comment;
            var token = $('input[name="__RequestVerificationToken"]', evaluate).val();
            var id = document.evaluate.id;
            var rating = document.evaluate.rating;

            if (rating == null || isNaN(parseInt(rating.value)) || rating.value < 0 || rating.value > 100 || rating.value.trim() == "") {
                document.getElementById('err_evaluate').innerHTML = "Значение от 0 до 100";
                rating.focus();
            } else if (comment.value.trim() == "" || comment.value == null) {
                document.getElementById('err_evaluate').innerHTML = "Оставляем без комментария?";
                $('textarea[name="comment"]', evaluate).val("Без комментариев");
                comment.focus();
            } else {

                $.post("../Course/EvaluateLesson",
                    {
                        id: id.value,
                        comment: comment.value,
                        rating: rating.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            location.reload();
                        } else {
                            document.getElementById('err_evaluate').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});