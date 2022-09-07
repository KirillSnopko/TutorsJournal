using TutorsJournal.entity;

namespace TutorsJournal.Service.iFace
{
    public interface ICourseService
    {
        void delete(int id);
        void create(int subjectId, int studentId, int gradeLevel, int initPrice, string goals);
        void edit(int id, int price, string goal);
        dynamic getCoursesByStudentId(int studentId);
        Course getById(int id);
        void createLesson(int courseId, string topic, int price, string task, string comment, DateTime date);
        void deleteLesson(int id);
        void closeLesson(int id);
        void cancelLesson(int id);
        void evaluateLesson(int id, int rating, string comment);
        void editLesson(int id, string task, string comment, DateTime date);
        dynamic plannedLessons();
    }
}
