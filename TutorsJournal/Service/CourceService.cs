using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Service
{
    public class CourceService : ICourseService
    {
        private readonly ICourseRepo courseRepo;
        private readonly ILessonRepo lessonRepo;

        public CourceService(ICourseRepo courseRepo, ILessonRepo lessonRepo)
        {
            this.courseRepo = courseRepo;
            this.lessonRepo = lessonRepo;
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

        public void edit(int id, int price, string goal)
        {
            Course course = new Course { Id = id, InitPrice = price, Goals = goal };
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
                    subjectId = i.SubjectId,
                    gradeLevel = i.GradeLevel,
                    lessons = i.Lessons,
                    initPrice = i.InitPrice,
                    goals = i.Goals
                });
        }

        public void createLesson(int courseId, string topic, int price, string task, string comment, DateTime date)
        {
            Lesson lesson = new Lesson
            {
                CourseId = courseId,
                Topic = topic,
                Price = price,
                Task = task,
                Comment = comment,
                Date = date
            };
            lessonRepo.create(lesson);
        }

        public void deleteLesson(int id)
        {
            Lesson lesson = lessonRepo.get(id);
            if (lesson != null)
            {
                lessonRepo.delete(lesson);
            }
        }

        public void closeLesson(int id)
        {
            lessonRepo.close(id);
        }

        public void cancelLesson(int id)
        {
            lessonRepo.cancel(id);
        }

        public void editLesson(int id, string task, string comment, DateTime date)
        {
            Lesson lesson = new Lesson
            {
                Id = id,
                Task = task,
                Comment = comment,
                Date = date
            };
            lessonRepo.update(lesson);
        }

        public void evaluateLesson(int id, int rating, string comment)
        {
            lessonRepo.EvaluateTask(id, rating, comment);
        }
    }
}
