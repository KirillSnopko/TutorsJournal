using Microsoft.AspNetCore.Mvc;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Controllers
{
    public class CourseController : Controller
    {
        private readonly ICourseService courseService;
        public CourseController(ICourseService courseService)
        {
            this.courseService = courseService;
        }
        public IActionResult Index()
        {
            return View("Course");
        }

        public IActionResult Courses(int id)
        {
            var courses = courseService.getCoursesByStudentId(id);
            return Json(courses);
        }

        public IActionResult CreateCourse(int subjectId, int studentId, int gradeLevel, int initPrice, string goals)
        {
            courseService.create(subjectId, studentId, gradeLevel, initPrice, goals);
            return Json(new { status = "200" });
        }

        public IActionResult CreateLesson(int courseId, string topic, int price, string task, string comment, string date, string time)
        {
            courseService.createLesson(courseId, topic, price, task, comment, convertTime(date, time));
            return Json(new { status = "200" });
        }

        public IActionResult DeleteCourse(int id)
        {
            courseService.delete(id);
            return Json(new { status = "200" });
        }

        public IActionResult DeleteLesson(int id)
        {
            courseService.deleteLesson(id);
            return Json(new { status = "200" });
        }

        public IActionResult CloseLesson(int id)
        {
            courseService.closeLesson(id);
            return Json(new { status = "200" });
        }

        public IActionResult CancelLesson(int id)
        {
            courseService.cancelLesson(id);
            return Json(new { status = "200" });
        }

        public IActionResult EditLesson(int id, string task, string comment, string date, string time)
        {
            courseService.editLesson(id, task, comment, convertTime(date, time));
            return Json(new { status = "200" });
        }

        public IActionResult EditCourse(int id, int price, string goal)
        {
            courseService.edit(id, price, goal);
            return Json(new { status = "200" });
        }

        public IActionResult EvaluateLesson(int id, int rating, string comment)
        {
            courseService.evaluateLesson(id, rating, comment);
            return Json(new { status = "200" });
        }

        private DateTime convertTime(string date, string time)
        {
            TimeOnly temp1 = TimeOnly.Parse(time);
            DateOnly temp2 = DateOnly.Parse(date);
            DateTime dateTime = new DateTime(temp2.Year, temp2.Month, temp2.Day, temp1.Hour, temp1.Minute, 0);
            return dateTime;
        }
    }
}
