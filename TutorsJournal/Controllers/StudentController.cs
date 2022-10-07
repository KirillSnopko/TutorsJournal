using Microsoft.AspNetCore.Mvc;
using TutorsJournal.entity;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Controllers
{
    public class StudentController : Controller
    {
        private readonly IStudentService studentService;

        public StudentController(IStudentService studentService)
        {
            this.studentService = studentService;
        }

        public IActionResult Index()
        {
            return View("Students");
        }

        [HttpGet]
        public IActionResult GetData()
        {
            var data = studentService.GetAllStudents();
            return Json(data);
        }

        [HttpGet]
        public IActionResult GetStudentById(int id)
        {
            Student student = studentService.GetStudent(id);
            if (student == null)
            {
                return NotFound();
            }
            return Json(student);
        }

        [HttpGet]
        public IActionResult Count()
        {
            return Json(new { count = studentService.GetStudentCount() });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CreateStudent(string name, int age, int gradeLevel, string location, string parentName, string studentMobile, string parentMobile)
        {
            studentService.createNewStudent(name, age, gradeLevel, location, parentName, studentMobile, parentMobile);
            return Json(new { status = "200" });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ChangeStudent(int id, string name, int age, int gradeLevel, string location, string parentName, string studentMobile, string parentMobile)
        {
            studentService.updateStudent(id, name, age, gradeLevel, location, parentName, studentMobile, parentMobile);
            return Json(new { status = "200" });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteStudent(int id)
        {
            studentService.deleteStudent(id);
            return Json(new { status = "200" });
        }
    }
}
