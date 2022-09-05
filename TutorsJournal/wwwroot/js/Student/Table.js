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


                //$(".delete").click(function (e) {
                //    var b = e.target.getAttribute('data-value');
                //    $('#idCredit_delete').val(b);
                //});
                //$(".reduce").click(function (e) {
                //    var b = e.target.getAttribute('data-value');
                //    $('#idCredit_reduce').val(b);
                //});
                //$(".history").click(function (e) {
                //    var b = e.target.getAttribute('data-value');

                //    $.get("/Credit/HistoryById?id=" + b, {},
                //        function (history) {
                //            var table = $('<table class="table"><tr><th>Date</th><th>Info</th><th>Returned</th></tr>');
                //            $(history).each(function (index, item) {
                //                var date = item.date;
                //                var info = item.comment;
                //                var returned = item.value;
                //                table.append('<tr class="table-default"><td>' + date + '</td><td>' + info + '</td><td><strong>' + returned + '</strong></td ></tr >');

                //            });
                //            table.append('</table>');
                //            $('#credit_history').html(table);
                //        });

                //}
                //);
            }
        );

        function button(id) {
            return '<a href="/Course?idStudent=' + id + '" class = "btn btn-info" >Курсы</a>' +
                '<button type="button" class="btn btn-warning change" data-bs-toggle="modal" data-bs-target="#change_student" data-value = "' + id + '">Изменить</button>';
        }

    });
});