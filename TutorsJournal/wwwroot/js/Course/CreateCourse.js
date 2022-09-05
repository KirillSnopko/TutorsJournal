$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_create_course").click(function () {
            var studentId = document.create.id;
            var subjectId = document.querySelector('input[name="subject"]:checked');
            var grade = document.create.grade;
            var initPrice = document.create.initPrice;
            var goals = document.create.goals;
            var token = $('input[name="__RequestVerificationToken"]', create).val();

            if (subjectId == null || subjectId.value.trim() == "") {
                document.getElementById('err_create_course').innerHTML = "Выберите предмет либо создайте";
                subjectId.focus();
            } else if (grade == null || isNaN(parseInt(grade.value)) || grade.value <= 0 || grade.value.trim() == "") {
                document.getElementById('err_create_course').innerHTML = "Выберите класс либо создайте";
                grade.focus();
            } else if (isNaN(parseInt(initPrice.value)) || initPrice.value < 0 || initPrice.value.trim() == "") {
                document.getElementById('err_create_course').innerHTML = "Введите корректно значение цены";
                initPrice.focus();
            } else if (goals.value.trim() == "" || goals.value == null) {
                document.getElementById('err_create_course').innerHTML = "Введите цель";
                goals.focus();
            } else {

                $.post("../Course/CreateCourse",
                    {
                        subjectId: subjectId.value,
                        studentId: studentId.value,
                        gradeLevel: grade.value,
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