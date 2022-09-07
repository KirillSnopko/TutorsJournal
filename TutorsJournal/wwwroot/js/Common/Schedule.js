$(document).ready(function () {
    $(window).on('load', function () {

        $("#button_schedule").click(function (e) {

            $.get("/Course/Schedule", {},
                function (data) {
                    var table = $('<table class="table"><tr><th>Дата</th><th>Предмет</th><th>Ученик</th></tr>');
                    $(data).each(function (index, item) {
                        moment.locale('ru');
                        var date = moment(item.date);
                        var course = item.course;
                        var student = item.student;
                        var idStudent = item.idStudent;
                        table.append('<tr class="table-default"><td>' + date.calendar() + '</td><td>' + course + '</td><td><strong>' + button(idStudent, student) + '</strong></td ></tr >');

                    });
                    table.append('</table>');
                    $('#schedule').html(table);
                   

                });

            function button(id, student) {
                return '<a class="btn btn-outline-secondary" href="/Course?idStudent=' + id + '">' + student + '</a>';
            }
        });
    });
});
