using TutorsJournal.entity;

namespace TutorsJournal.Service.iFace
{
    public interface IStudentService
    {
        void createNewStudent(
            string Name,
            int Age,
            int GradeLevel,
            string Location,
            string ParentName,
            string StudentMobile,
            string ParentsMobile);
        void updateStudent(
            int id,
            string Name,
            int Age,
            int GradeLevel,
            string Location,
            string ParentName,
            string StudentMobile,
            string ParentsMobile);


        void deleteStudent(int idStudent);
        Student GetStudent(int idStudent);
        dynamic GetAllStudents();
        int GetStudentCount();
    }
}
