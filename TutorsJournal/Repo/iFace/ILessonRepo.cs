using TutorsJournal.entity;

namespace TutorsJournal.Repo.iFace
{
    public interface ILessonRepo
    {
        void create(Lesson lesson);
        void delete(Lesson lesson);
        void update(Lesson lesson);
        Lesson get(int LessonId);
        List<Lesson> getByIdStudent(int StudentId);
        void addTask(int IdLesson, string Task);
        void EvaluateTask(int IdLesson, int PercentOfDecision);
    }
}
