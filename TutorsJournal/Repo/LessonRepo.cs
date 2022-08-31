using TutorsJournal.database;
using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;

namespace TutorsJournal.Repo
{
    public class LessonRepo // : ILessonRepo
    {
        private ApplicationContext applicationContext;
        public LessonRepo(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        public void addTask(int IdLesson, string Task)
        {
            applicationContext.lessons.First(i => i.Id == IdLesson).Task = Task;
            applicationContext.SaveChanges();
        }

        public void create(Lesson lesson)
        {
            applicationContext.lessons.Add(lesson);
            applicationContext.SaveChanges();
        }

        public void delete(Lesson lesson)
        {
            applicationContext.lessons.Remove(lesson);
            applicationContext.SaveChanges();
        }

        public void EvaluateTask(int IdLesson, int PercentOfDecision)
        {
            applicationContext.lessons.First(i => i.Id == IdLesson).PercentOfDecision = PercentOfDecision;
            applicationContext.SaveChanges();
        }

        public Lesson get(int LessonId)
        {
            return applicationContext.lessons.First(i => i.Id == LessonId);
        }
/*
        public List<Lesson> getByIdStudent(int StudentId)
        {
            return applicationContext.lessons.Where(i=>i. .StudentId==StudentId).ToList();
        }
*/
        public void update(Lesson lesson)
        {
            applicationContext.lessons.Update(lesson);
            applicationContext.SaveChanges();
        }
    }
}
