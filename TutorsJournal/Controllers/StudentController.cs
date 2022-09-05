using Microsoft.AspNetCore.Mvc;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Controllers
{
    public class StudentController : Controller
    {
        private IStudentService studentService;

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

        [HttpPost]
        public IActionResult CreateStudent(string name, int age, int gradeLevel, string location, string parentName, string studentMobile, string parentMobile)
        {
            studentService.createNewStudent(name, age, gradeLevel, location, parentName, studentMobile, parentMobile);
            return Json(new { status = "200" });
        }

        [HttpPost]
        public IActionResult ChangeStudent(int id, string name, int age, int gradeLevel, string location, string parentName, string studentMobile, string parentMobile)
        {
            studentService.updateStudent(id, name, age, gradeLevel, location, parentName, studentMobile, parentMobile);
            return Json(new { status = "200" });
        }
    
    }
}
