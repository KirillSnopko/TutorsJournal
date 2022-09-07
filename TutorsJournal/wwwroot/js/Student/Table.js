$(document).ready(function () {

    $(window).on('load', function () {
        $.get("/Student/GetData", {},
            function (data) {
                var table = $('<table class="table table-striped"><tr><th>#</th><th>Имя</th><th>Возраст</th><th>Класс</th><th>Местоположение</th><th>Мобильный</th><th>Имя родителя</th><th>Мобильный родителя</th><th></th></tr>');
                var i = 1;
                var students = new Map();
                $(data).each(function (index, item) {
                    var id = item.id;
                    var name = item.name;
                    var age = item.age;
                    var grade = item.gradeLevel;
                    var location = item.location;
                    var mob1 = item.mob1;
                    var parname = item.parent;
                    var mob2 = item.mob2;
                    students.set(id, item);

                    table.append('<tr class="table-default"><td>' + i + '</td><td>' + name + '</td><td>' + age + '</td><td>' + grade + '</strong></td > <td>' + location + '</td><td>' + mob1 + '</td><td>' + parname + '</td><td>' + mob2 + '</td><td>' + button(id) + '</td></tr >');
                    i++;
                });
                table.append('</table>');
                $('#students').html(table);

                //change topic
                $(".change").click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    var student = students.get(b);
                    $('#idStudent_change').val(student.id);
                    $('#cur_name').val(student.name);
                    $('#cur_age').val(student.age);
                    $('#cur_grade').val(student.gradeLevel);
                    $('#cur_location').val(student.location);
                    $('#cur_parent').val(student.parent);
                    $('#cur_mob1').val(student.mob1);
                    $('#cur_mob2').val(student.mob2);
                });

                $(".delete").click(function (e) {
                    var b = e.target.getAttribute('data-value');
                    $('input[name="id"]', delete_student).val(b);
                });

            }
        );

        function button(id) {

            return '<div class="dropdown">' +
                '<button class="btn btn-outline-info dropdown-toggle" type="button" id="settings_student' + id + '" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Настройки' +
                '</button>' +
                '<ul class="dropdown-menu" aria-labelledby="settings_student' + id + '">' +
                '<li><a class="dropdown-item" href="/Course?idStudent=' + id + '">Курсы</a></li>' +
                ' <li><a class="dropdown-item change" href="#" data-bs-toggle="modal" data-bs-target="#change_student"  data-value = "' + id + '">Изменить</a></li>' +
                '<li><a class="dropdown-item delete" href="#" data-bs-toggle="modal" data-bs-target="#student_delete"  data-value = "' + id + '">Удалить</a></li>' +
                '</ul>' +
                '</div>';
        }

    });
});