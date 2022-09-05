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
    }
}
