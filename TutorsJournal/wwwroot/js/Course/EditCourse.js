$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_edit_course").click(function () {
            var price = document.edit_course.price;
            var goal = document.edit_course.goal;
            var id = document.edit_course.id.value;
            var token = $('input[name="__RequestVerificationToken"]', create).val();

            if (isNaN(parseInt(price.value)) || price.value < 0 || price.value.trim() == "") {
                document.getElementById('err_edit_course').innerHTML = "Введите корректное значение цены";
                price.focus();
            } else if (goal.value.trim() == "" || goal.value == null) {
                document.getElementById('err_edit_course').innerHTML = "Введите цель";
                goal.focus();
            } else {

                $.post("../Course/EditCourse",
                    {
                        id: id,
                        price: price.value,
                        goal: goal.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            document.location.reload();
                        } else {
                            document.getElementById('err_edit_course').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});