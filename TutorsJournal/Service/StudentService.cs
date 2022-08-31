using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Service
{
    public class StudentService : IStudentService
    {
        private IStudentRepo studentRepo;
        public StudentService(IStudentRepo studentRepo)
        {
            this.studentRepo = studentRepo;
        }
        public void createNewStudent(string Name, int Age, int GradeLevel, string Location, string ParentName, string StudentMobile, string ParentsMobile)
        {
            Student student = new Student { Name = Name, Age = Age, Location = Location, ParentName = ParentName, GradeLevel = GradeLevel, ParentsMobile = ParentsMobile, StudentMobile = StudentMobile };
            studentRepo.add(student);
        }

        public void deleteStudent(int idStudent)
        {
            studentRepo.delete(idStudent);
        }

        public List<Student> GetAllStudents()
        {
            return studentRepo.getStudents();
        }

        public Student GetStudent(int idStudent)
        {
            return studentRepo.get(idStudent);
        }

        public void updateStudent(string Name, int Age, int GradeLevel, string Location, string ParentName, string StudentMobile, string ParentsMobile)
        {
            Student student = new Student { Name = Name, Age = Age, Location = Location, ParentName = ParentName, GradeLevel = GradeLevel, ParentsMobile = ParentsMobile, StudentMobile = StudentMobile };
            studentRepo.update(student);
        }
    }
}
