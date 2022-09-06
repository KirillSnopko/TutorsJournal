using TutorsJournal.database;
using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;

namespace TutorsJournal.Repo
{
    public class LessonRepo : ILessonRepo
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

        public void cancel(int id)
        {
            applicationContext.lessons.First(i => i.Id == id).isCanceled = true;
            applicationContext.SaveChanges();
        }

        public void close(int id)
        {
            applicationContext.lessons.First(i => i.Id == id).IsCompleted = true;
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

        public void EvaluateTask(int IdLesson, int PercentOfDecision, string comment)
        {
            Lesson lesson =  applicationContext.lessons.First(i => i.Id == IdLesson);
            lesson.PercentOfDecision = PercentOfDecision;
            lesson.Comment += "\nОценка: " + comment;
            applicationContext.SaveChanges();
        }

        public Lesson get(int LessonId)
        {
            return applicationContext.lessons.First(i => i.Id == LessonId);
        }

        public void update(Lesson lesson)
        {
            Lesson current = get(lesson.Id);
            if (lesson != null)
            {
                current.Comment = lesson.Comment;
                current.Task = lesson.Task;
                current.Date = lesson.Date;
            }
            applicationContext.SaveChanges();
        }
    }
}
