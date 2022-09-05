using TutorsJournal.entity;

namespace TutorsJournal.Repo.iFace
{
    public interface ICourseRepo
    {
        List<Course> GetCourses(int idStudent);
        void edit(Course course);
        void delete(Course course);
        void create(Course course);
        Course get(int id);

    }
}
