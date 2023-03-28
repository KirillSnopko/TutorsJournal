
$(document).ready(function () {
    $(window).on('load', function () {

        var li = '<li class="list-group-item d-flex justify-content-between align-items-center">';
        var div2 = '</div>';
        var ul1 = '<ul class="list-group">';
        var ul2 = '</ul>';
        var current_id_student = window.location.href.split('Course?idStudent=')[1];
        mapCourses = new Map();
        mapSub = new Map();
        mapGrade = new Map();
        mapTopics = new Map();
        lessonsMap = new Map();

        info();

        $.get("Student/GetStudentById?id=" + current_id_student, {},
            function (data) {
                var name = data.name;
                var age = data.age;
                var location = data.location;
                var phoneNumber = data.studentMobile;
                var content = '<div class="position-absolute text-start" >';
                content += '<p> <img src="/image/student.png" height="30" width="30" alt="fail">' + name + ', ' + age + 'лет</p>';
                content += '<p> <img src="/image/location.png" height="30" width="30" alt="fail">' + location + '</p>';
                content += '<p> <img src="/image/phone.png" height="30" width="30" alt="fail">' + phoneNumber + '</p></div>';

                $('#left_content').html(content);
            });

        $.get("Course/Courses?id=" + current_id_student, {},
            function (data) {

                $(data).each(function (index, item) {
                    var content = '<div class="card text-center  text-white bg-dark border-primary">';
                    var id = item.id;
                    var subjectId = item.subjectId;
                    var subject = item.subject;
                    var grade = item.gradeLevel;
                    var lessons = item.lessons;
                    var initPrice = item.initPrice;
                    var goals = item.goals;

                    mapCourses.set(id, item);


                    content += '<div class="card-header">' +
                        '<ul class="nav nav-pills card-header-pills">' + courseSettings(id, subjectId) + ul2 + div2;
                    content += '<div class="card-body bg-secondary">' + '<h5 class="card-title fs-3 ">' + subject + '</h5>' + ' <span class="badge rounded-pill bg-danger">' + grade + 'класс</span>' + '<span class="badge rounded-pill bg-success">' + initPrice + 'BYN</span>';
                    var lessons_table = new String();
                    var result = 0;
                    mapLessons = new Map();
                    if (lessons != null && lessons.length > 0) {
                        for (let x of lessons) {
                            mapLessons.set(x.id, x);
                            lessonsMap.set(x.id, x);
                        }
                        console.log(mapLessons);
                        var size = 0;
                        var sum = 0;
                        mapLessons.forEach((value, key) => {
                            if (value.isEvaluated) {
                                sum += value.percentOfDecision;
                                size++;
                            }
                        });
                        result = Math.round(sum / size);

                        lessons_table = '<br/><button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#lessons' + id + '" aria-expanded="false" >Уроки<span class="badge bg-secondary">' + mapLessons.size + 'шт</span></button>';

                        lessons_table += '<div class="collapse" id="lessons' + id + '">';
                        //lessons_table += lessonsList(mapLessons) + div2;
                        lessons_table += lessonsList(mapLessons, id) + div2;
                    } else {
                        lessons_table += '<p> Список уроков пуст</p>';
                    }
                    content += '<span class="badge bg-black">' + result + '%</span><br/>';
                    content += '<p class="card-text bg-info float-start">Цель курса: ' + goals + '</p><br/>';
                    content += lessons_table;
                    content += div2 + div2;
                    var div = 'course' + id;
                    $('#courses').append('<div id="' + div + '"></div><br/><br/>');
                    $('#' + div).html(content);
                });
                console.log('Курсы:' + mapCourses);

                $(".create_course").click(function (e) {
                    $('#idStudent').val(current_id_student);
                });

                $(".add_lesson").click(function (e) {
                    var b = e.target.getAttribute('data-value').split('/');
                    var courseid = parseInt(b[0]);
                    var subjectId = parseInt(b[1]);
                    console.log(courseid + '/' + subjectId);


                    $('#idCourse').val(courseid);
                    $('#cur_price').val(mapCourses.get(courseid).initPrice + 'BYN');

                    var selectTopic = '<div class="input-group-text">Темы</div> ';

                    $.get("Subject/GetTopics?idSubject=" + subjectId + '&grade=' + mapCourses.get(courseid).gradeLevel, {}, function (date) {
                        var topics = date.topics;
                        console.log(date);
                        selectTopic += '<select class="select_topic form-select" name="topic" data-placeholder="Выбери тему" multiple>';

                        if (topics != null) {
                            for (let x of topics) {
                                console.log(x.description);
                                selectTopic += '<option value="' + x.description + '">' + x.description + '</option>';
                            }
                        }
                        selectTopic += '</select>';


                        $('#select_topic').html(selectTopic);

                        $('.select_topic').select2({
                            theme: 'bootstrap-5',
                            closeOnSelect: false,
                            selectionCssClass: "select2--small",
                            dropdownCssClass: "select2--small",
                            language: "ru"
                        });
                    });
                });

                //edit course
                $(".edit_course").click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    price = parseInt(mapCourses.get(b).initPrice);
                    goal = mapCourses.get(b).goals;

                    $('input[name="price"]', edit_course).val(price);
                    $('input[name="goal"]', edit_course).val(goal);
                    $('input[name="id"]', edit_course).val(b);
                });

                $('.del_course').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $('input[name="id"]', delete_course).val(b);
                });

                $('.evaluate').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $('input[name="id"]', evaluate).val(b);
                });

                $('.edit_lesson').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    var lesson = mapLessons.get(b);
                    var task = lesson.task;
                    var comment = lesson.comment;
                    var dateTime = moment(lesson.date);
                    var date = new String(dateTime.format("YYYY-MM-DD"));
                    console.log(date);
                    var time = dateTime.format("HH:mm")
                    $('input[name="id"]', edit_lesson).val(b);
                    $('textarea[name="task"]', edit_lesson).val(task);
                    $('textarea[name="comment"]', edit_lesson).val(comment);
                    $('input[name="date"]', edit_lesson).val(date);
                    $('input[name="time"]', edit_lesson).val(time);
                });

                $('.info_lesson').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    var lesson = lessonsMap.get(b);
                    var task = lesson.task;
                    var topic = lesson.topic;
                    var comment = lesson.comment;
                    var dateTime = moment(lesson.date);
                    var date = new String(dateTime.format("YYYY-MM-DD"));
                    console.log(date);
                    var time = dateTime.format("HH:mm")
                    $('textarea[name="topic"]', info_lesson).val(topic);
                    $('textarea[name="task"]', info_lesson).val(task);
                    $('textarea[name="comment"]', info_lesson).val(comment);
                    $('input[name="date"]', info_lesson).val(date);
                    $('input[name="time"]', info_lesson).val(time);
                    $('input[name="price"]', info_lesson).val(lesson.price + 'BYN');
                });

                $('.del_lesson').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $.post("/Course/DeleteLesson", { id: b },
                        function (status) {
                            if (status['status'] == 200) {
                                location.reload();
                            } else {
                                alert(status['message']);
                            }
                        });
                });

                $('.close').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $.post("/Course/CloseLesson", { id: b },
                        function (status) {
                            if (status['status'] == 200) {
                                location.reload();
                            } else {
                                alert(status['message']);
                            }
                        });
                });

                $('.cancel').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $.post("/Course/CancelLesson", { id: b },
                        function (status) {
                            if (status['status'] == 200) {
                                location.reload();
                            } else {
                                alert(status['message']);
                            }
                        });
                });

                $(".excel").click(function (e) {
                    var id = parseInt(e.target.getAttribute('data-value'));
                    window.open("/Export/Excel?idCourse=" + id);
                });

            });


        //create course
        $.get("Subject/GetSubjects", {}, function (date) {
            $(date).each(function (index, item) {
                var id = item.id;
                var name = item.name;
                var topics = item.topics;
                mapTopics.set(id, topics);
                if (topics != null) {
                    topics.reduce((group, topic) => {
                        const { subjectId } = topic;
                        group[subjectId] = group[subjectId] ?? [];

                        var flag = true;
                        group[subjectId].forEach(function (item, index, array) {
                            if (item == topic.gradeLevel) { flag = false; }
                        });

                        if (flag) {
                            group[subjectId].push(topic.gradeLevel);
                        }

                        mapGrade.set(subjectId, group[subjectId]);

                        return group;
                    }, {});
                }
                mapSub.set(id, name);
            });

            var subjectSelection = '<div class="input-group-text">Предметы</div> ';
            subjectSelection += '<select class="select_subject form-select" id="check_subject" name="subject" data-placeholder="Выбери предмет">';
            subjectSelection += ' <option selected>Выберите предмет</option>';

            mapSub.forEach((value, key) => {
                subjectSelection += '<option value="' + key + '">' + value + '</option>';
            });
            subjectSelection += '</select>';
            $('.select_subject').select2({
                theme: 'bootstrap-5',
                closeOnSelect: false,
                selectionCssClass: "select2--small",
                dropdownCssClass: "select2--small",
                language: "ru"
            });

            $('#select_subject').html(subjectSelection);

            $('#check_subject').change(function (e) {
                $('#select_grade').html('');

                var id = $(this).val();
                var arr = mapGrade.get(parseInt(id));
                if (arr != null) {

                    var selectGrade = '<div class="input-group-text">Класс</div> ';
                    selectGrade += '<select class= "form-select form-select-sm" aria - label=".form-select-lg example" id="check_grade" name="grade" >';
                    selectGrade += ' <option selected>Выберите класс</option>';
                    for (let x of arr) {
                        selectGrade += ' <option value="' + x + '">' + x + 'класс' + '</option>';
                    }
                    selectGrade += '</select >';
                    $('#select_grade').html(selectGrade);
                } else {
                    $('#select_grade').html('<span class="badge rounded-pill bg-warning text-dark">Список классов пустой</span>');
                }
            });


            $("[id^='myInput']").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                var id = this.id.split('myInput')[1];


                $("#table" + id + " tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });

        function courseSettings(id, subjectId) {
            return '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-success add_lesson" data-bs-toggle="modal" data-bs-target="#create_lesson"  data-value = "' + id + '/' + subjectId + '" >Добавить урок</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-warning edit_course" data-bs-toggle="modal" data-bs-target="#course_edit"  data-value = "' + id + '" >Редактировать</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-success excel"   data-value = "' + id + '" >Excel</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-danger del_course" data-bs-toggle="modal" data-bs-target="#course_delete"  data-value = "' + id + '" >Удалить</button>' +
                '</li>';
        }


        function lessonSettings(id, isCompleted, isCanceled, isEvaluated) {
            var divDrop = '<div class="dropdown">' +
                '<button class="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton' + id + ' " data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Настройки </button>';
            var but_del = '<a class="dropdown-item del_lesson"  data-value = "' + id + '">Удалить</a>';
            var but_evaluate = '<a class="dropdown-item evaluate" " data-bs-toggle="modal" data-bs-target="#evaluate_lesson" data-value = "' + id + '">Оценить</a>';
            var but_close = '<a class="dropdown-item close" data-value = "' + id + '">Закрыть</a>';
            var but_cancel = '<a class="dropdown-item cancel"  data-value = "' + id + '">Отменить</a>';
            var but_edit = '<a class="dropdown-item edit_lesson"  data-bs-toggle="modal" data-bs-target="#edit_lesson" data-value = "' + id + '" >Редактировать</a>';
            var but_info = '<a class="dropdown-item info_lesson"  data-bs-toggle="modal" data-bs-target="#info_lesson" data-value = "' + id + '" >Дополнительно</a>';
            var ul_1 = ' <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + id + '">';
            var ul_2 = '</ul>';

            if (isCanceled || isEvaluated) {
                return divDrop + ul_1 + but_info + but_del + ul_2 + div2;
            }
            if (isCompleted) {
                return divDrop + ul_1 + but_info + but_evaluate + but_del + ul_2 + div2;
            } else {
                return divDrop + ul_1 + but_info + but_del + but_close + but_cancel + but_edit + ul_2 + div2;
            }
        }

        function search(idCourse) {
            return str = '<input id="myInput' + idCourse + '" type="text" placeholder="Поиск.." class="form-control">';
        }

        function lessonsList(lessons, id) {
            var str = search(id);
            str += '<table class="table" id = "table' + id + '">' +
                '<thead>' +
                '<tr>' +
                '<th scope="col">#</th>' +
                '<th scope="col">Дата</th>' +
                '<th scope="col">Тема</th>' +
                '<th scope="col">Результат</th>' +
                '<th scope="col">Настройки</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            var x = 0;

            lessons.forEach((value, key) => {
                console.log('lessons: ' + key + ' --' + value);
                var buttons;
                if (value.isCompleted && !value.isCanceled) {
                    str += '<tr class="table-success">';
                } else if (value.isCanceled) {
                    str += '<tr class="table-danger">';
                }
                else {
                    str += '<tr class="table-primary">';
                }
                console.log("isCompleted: " + value.isCompleted, 'isCanceled: ' + value.isCanceled + 'isEvaluated: ' + value.isEvaluated);
                buttons = lessonSettings(key, value.isCompleted, value.isCanceled, value.isEvaluated)

                var date = moment(value.date);
                moment.locale('ru');
                str += '<th scope="row">' + x++ + '</th>' +
                    '<td scope="col">' + date.format('DD.MM.YY HH-mm') + '</td>' +
                    '<td scope="col">' + value.topic + '</td>';
                if (value.isCompleted && !value.isEvaluated) {
                    str += '<td scope="col"><img src="/image/timer.png" alt="pending review" height="40" width="40"></td>';
                } else if (value.isCanceled) {
                    str += '<td scope="col"><img src="/image/fail.png" height="40" width="40" alt="fail"></td>';
                }
                else if (!value.isCanceled && !value.isCompleted) {
                    str += '<td scope="col"><img src="/image/planned.png" height="40" width="40" alt="fail"></td>';
                }
                else {
                    str += '<td scope="col">' + value.percentOfDecision + '%</td>';
                }
                str += '<td scope="col">' + buttons + '</td>' + '</tr >';
            });

            str += '</tbody>' + '</table>';
            return str;
        }

        function info() {
            var content = '<div class="position-absolute text-start" >';
            content += '<p class="text-white"> <img src="/image/timer.png" alt="pending review" height="30" width="30"> - Ожидает оценки </p>';
            content += '<p class="text-white"> <img src="/image/fail.png" alt="pending review" height="30" width="30"> - Занятие отменено </p>';
            content += '<p class="text-white"> <img src="/image/planned.png" alt="pending review" height="30" width="30"> - Запланированное занятие </p></div>';

            $('#right_content').html(content);
        }
    });
});
