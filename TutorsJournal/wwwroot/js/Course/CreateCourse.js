$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_create_course").click(function () {
            var studentId = document.create.id;
            var subjectId = $('#check_subject');
            var grade = $('#check_grade');
            var initPrice = document.create.initPrice;
            var goals = document.create.goals;
            var token = $('input[name="__RequestVerificationToken"]', create).val();

            console.log(subjectId.val());
            console.log(grade.val());


            if (subjectId == null || subjectId.val().trim() == "" || subjectId.val() == "undefined" || isNaN(subjectId.val())) {
                document.getElementById('err_create_course').innerHTML = "Выберите предмет либо создайте";
                subjectId.focus();
            } else if (grade == null || isNaN(parseInt(grade.val())) || grade.val() <= 0 || grade.val().trim() == "") {
                document.getElementById('err_create_course').innerHTML = "Выберите класс либо создайте";
                grade.focus();
            } else if (isNaN(parseInt(initPrice.value)) || initPrice.value < 0 || initPrice.value.trim() == "") {
                document.getElementById('err_create_course').innerHTML = "Введите корректное значение цены";
                initPrice.focus();
            } else if (goals.value.trim() == "" || goals.value == null) {
                document.getElementById('err_create_course').innerHTML = "Введите цель";
                goals.focus();
            } else {

                $.post("../Course/CreateCourse",
                    {
                        subjectId: subjectId.val(),
                        studentId: studentId.value,
                        gradeLevel: grade.val(),
                        initPrice: initPrice.value,
                        goals: goals.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            document.location.reload();
                        } else {
                            document.getElementById('err_create_course').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});