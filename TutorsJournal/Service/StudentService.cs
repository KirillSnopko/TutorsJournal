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

        public dynamic GetAllStudents()
        {
            return studentRepo.getStudents()
                .Select(i => new
                {
                    id = i.Id,
                    name = i.Name,
                    gradeLevel = i.GradeLevel,
                    age = i.Age,
                    location = i.Location,
                    parent = i.ParentName,
                    mob1 = i.StudentMobile,
                    mob2 = i.ParentsMobile
                }).ToList();
        }

        public Student GetStudent(int idStudent)
        {
            return studentRepo.get(idStudent);
        }

        public int GetStudentCount()
        {
            return studentRepo.getStudents().Count();
        }

        public void updateStudent(int id, string Name, int Age, int GradeLevel, string Location, string ParentName, string StudentMobile, string ParentsMobile)
        {
            Student student = new Student { Id = id, Name = Name, Age = Age, Location = Location, ParentName = ParentName, GradeLevel = GradeLevel, ParentsMobile = ParentsMobile, StudentMobile = StudentMobile };
            studentRepo.update(student);
        }
    }
}
