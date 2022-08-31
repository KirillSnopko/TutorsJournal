using TutorsJournal.entity;

namespace TutorsJournal.Repo.iFace
{
    public interface IStudentRepo
    {
        void add(Student student);
        Student get(int id);
        List<Student> getStudents();
        void update(Student student);
        void delete(int id);
    }
}
