using TutorsJournal.entity;

namespace TutorsJournal.Repo.iFace
{
    public interface ILessonRepo
    {
        void create(Lesson lesson);
        void delete(Lesson lesson);
        void update(Lesson lesson);
        Lesson get(int LessonId);
        void addTask(int IdLesson, string Task);
        void EvaluateTask(int IdLesson, int PercentOfDecision, string comment);
        void close(int id);
        void cancel(int id);
        List<Lesson> getPlannedLessons();
    }
}
