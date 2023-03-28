using Microsoft.AspNetCore.Mvc;
using TutorsJournal.entity;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Controllers
{
    public class StudentController : Controller
    {
        private readonly ICrudService<Student> service;

        public StudentController(ICrudService<Student> studentService)
        {
            this.service = studentService;
        }

        public IActionResult Index() => View("Students");

        [HttpGet]
        public IActionResult GetData() => Json(service.Get());

        [HttpGet]
        public IActionResult GetStudentById(int id)
        {
            Student student = service.Get(id);
            if (student == null)
            {
                return NotFound();
            }
            return Json(student);
        }

        [HttpGet]
        public IActionResult Count() => Json(new { count = service.Count() });

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CreateStudent(Student student)
        {
            service.Add(student);
            return Json(new { status = "200" });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ChangeStudent(Student student)
        {
            service.Update(student);
            return Json(new { status = "200" });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteStudent(int id)
        {
            service.Delete(id);
            return Json(new { status = "200" });
        }
    }
}
