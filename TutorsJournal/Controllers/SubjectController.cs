using Microsoft.AspNetCore.Mvc;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Controllers
{
    public class SubjectController : Controller
    {
        private readonly ISubjectService subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            this.subjectService = subjectService;
        }

        public IActionResult Index()
        {
            return View("Subjects");
        }

        [HttpGet]
        public IActionResult GetSubjects()
        {
            var subjects = subjectService.getSubjects();
            return Json(subjects);
        }

        [HttpGet]
        public IActionResult Count()
        {
            return Json(new { count = subjectService.getSubjectsCount() });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CreateSubject(string name)
        {
            subjectService.addSubject(name);
            return Json(new { status = "200" });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteSubject(int id)
        {
            subjectService.deleteSubject(id);
            return Json(new { status = 200 });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult RenameSubject(int id, string name)
        {
            subjectService.renameSubject(id, name);
            return Json(new { status = 200 });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CreateTopic(int idSubject, int gradeLevel, string description)
        {
            subjectService.createTopic(idSubject, gradeLevel, description);
            return Json(new { status = 200 });

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ChangeTopic(int id, int gradeLevel, string description)
        {
            subjectService.changeTopic(id, gradeLevel, description);
            return Json(new { status = 200 });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteTopic(int id)
        {
            subjectService.deleteTopic(id);
            return Json(new { status = 200 });
        }

        [HttpGet]
        public IActionResult GetTopics(int idSubject, int grade)
        {
            var result = subjectService.getTopics(idSubject, grade);
            return Json(result);
        }
    }
}
