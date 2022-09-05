using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Service
{
    public class CourceService : ICourseService
    {
        private ICourseRepo courseRepo;

        public CourceService(ICourseRepo courseRepo)
        {
            this.courseRepo = courseRepo;
        }

        public void create(int subjectId, int studentId, int gradeLevel, int initPrice, string goals)
        {
            Course course = new Course { SubjectId = subjectId, StudentId = studentId, GradeLevel = gradeLevel, InitPrice = initPrice, Goals = goals };
            courseRepo.create(course);
        }

        public void delete(int id)
        {
            Course course = courseRepo.get(id);
            courseRepo.delete(course);
        }

        public void edit(int id, int subjectId, int studentId, int gradeLevel, int initPrice, string goals)
        {
            Course course = new Course { Id = id, SubjectId = subjectId, StudentId = studentId, GradeLevel = gradeLevel, InitPrice = initPrice, Goals = goals };
            courseRepo.edit(course);
        }

        public dynamic getCoursesByStudentId(int studentId)
        {
            return courseRepo.GetCourses(studentId)
                .Select(i => new
                {
                    StudentId = i.StudentId,
                    id = i.Id,
                    subject = i.Subject.name,
                    gradeLevel = i.GradeLevel,
                    lessons = i.Lessons,
                    initPrice = i.InitPrice,
                    goals = i.Goals
                });
        }
    }
}
