using Microsoft.AspNetCore.Mvc;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Controllers
{
    public class SubjectController : Controller
    {
        private ISubjectService subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            this.subjectService = subjectService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetSubjects()
        {
            return Json(subjectService.getSubjects());
        }

        [HttpPost]
        public IActionResult CreateSubject(string name)
        {
            subjectService.addSubject(name);
            return Json(new {status = "200" });
        }

        [HttpPost]
        public IActionResult DeleteSubject(int id)
        {
            subjectService.deleteSubject(id);
            return Json(new { status = 200 });
        }

        [HttpPost]
        public IActionResult RenameSubject(int id, string name)
        {
            subjectService.renameSubject(id, name);
            return Json(new { status = 200 });
        }

        [HttpPost]
        public IActionResult CreateTopic(int idSubject, int gradeLevel, string description)
        {
            subjectService.createTopic(idSubject, gradeLevel, description);
            return Json(new { status = 200 });

        }

        [HttpPost]
        public IActionResult ChangeTopic(int id, int gradeLevel, string description)
        {
            subjectService.changeTopic(id, gradeLevel, description);
            return Json(new { status = 200 });
        }

        [HttpPost]
        public IActionResult DeleteTopic(int id)
        {
            subjectService.deleteTopic(id);
            return Json(new { status = 200 });
        }
    }
}
