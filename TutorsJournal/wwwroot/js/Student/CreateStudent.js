$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_create_student").click(function () {
            var name = document.create.name;
            var age = document.create.age;
            var grade = document.create.gradeLevel;
            var location = document.create.location;
            var parName = document.create.parentName;
            var studMob = document.create.studentMobile;
            var parMob = document.create.parentMobile;
            var token = $('input[name="__RequestVerificationToken"]', create).val();

            if (name.value.trim() == "" || name.value == null) {
                document.getElementById('err_create_student').innerHTML = "Введите корректно значение";
                name.focus();
            } else if (isNaN(parseInt(age.value)) || age.value < 0 || age.value.trim() == "") {
                document.getElementById('err_create_student').innerHTML = "Введите корректно значение";
                age.focus();
            }
            else if (isNaN(parseInt(grade.value)) || grade.value < 0 || grade.value.trim() == "") {
                document.getElementById('err_create_student').innerHTML = "Введите корректно значение";
                grade.focus();
            }
            else if (location.value.trim() == "" || location.value == null) {
                document.getElementById('err_create_student').innerHTML = "Введите корректно значение";
                location.focus();
            }
            else if (parName.value.trim() == "" || parName.value == null) {
                document.getElementById('err_create_student').innerHTML = "Введите корректно значение";
                parName.focus();
            }
            else if (studMob.value.trim() == "" || studMob.value == null) {
                document.getElementById('err_create_student').innerHTML = "Введите корректно значение";
                studMob.focus();
            }
            else if (parMob.value.trim() == "" || parMob.value == null) {
                document.getElementById('err_create_student').innerHTML = "Введите корректно значение";
                parMob.focus();
            }
            else {

                $.post("../Student/CreateStudent",
                    {
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
                            document.getElementById('err_create_student').innerHTML = "Server error" + "\nStatus: " + status['status'] + "\nMessage: " + status['message'];
                        }
                    }
                );
            }
        });
    });
});