$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_change_student").click(function () {
            var id = document.change.idStudent_change;
            var name = document.change.name;
            var age = document.change.age;
            var grade = document.change.gradeLevel;
            var location = document.change.location;
            var parName = document.change.parentName;
            var studMob = document.change.studentMobile;
            var parMob = document.change.parentMobile;
            var token = $('input[name="__RequestVerificationToken"]', change).val();

            if (name.value.trim() == "" || name.value == null) {
                document.getElementById('err_change_student').innerHTML = "Введите корректно значение";
                name.focus();
            } else if (isNaN(parseInt(age.value)) || age.value < 0 || age.value.trim() == "") {
                document.getElementById('err_change_student').innerHTML = "Введите корректно значение";
                age.focus();
            }
            else if (isNaN(parseInt(grade.value)) || grade.value < 0 || grade.value.trim() == "") {
                document.getElementById('err_change_student').innerHTML = "Введите корректно значение";
                grade.focus();
            }
            else if (location.value.trim() == "" || location.value == null) {
                document.getElementById('err_change_student').innerHTML = "Введите корректно значение";
                location.focus();
            }
            else if (parName.value.trim() == "" || parName.value == null) {
                document.getElementById('err_change_student').innerHTML = "Введите корректно значение";
                parName.focus();
            }
            else if (studMob.value.trim() == "" || studMob.value == null) {
                document.getElementById('err_change_student').innerHTML = "Введите корректно значение";
                studMob.focus();
            }
            else if (parMob.value.trim() == "" || parMob.value == null) {
                document.getElementById('err_change_student').innerHTML = "Введите корректно значение";
                parMob.focus();
            }
            else {

                $.post("../Student/ChangeStudent",
                    {
                        id: id.value,
                        name: name.value,
                        age: age.value,
                        gradeLevel: grade.value,
                        location: location.value,
                        parentName: parName.value,
                        studentMobile: studMob.value,
                        parentMobile: parMob.value,
                        __RequestVerificationToken: token
                    },
                    function (status) {
                        if (status['status'] == 200) {
                            document.location.reload();
                        } else {
                            document.getElementById('err_change_student').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});