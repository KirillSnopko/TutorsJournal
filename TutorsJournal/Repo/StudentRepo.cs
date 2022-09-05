using TutorsJournal.database;
using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;

namespace TutorsJournal.Repo
{
    public class StudentRepo : IStudentRepo
    {
        private ApplicationContext applicationContext;

        public StudentRepo(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        public void add(Student student)
        {
            applicationContext.students.Add(student);
            applicationContext.SaveChanges();
        }

        public void delete(int id)
        {
            applicationContext.students.Remove(applicationContext.students.First(i => i.Id == id));
        }

        public Student get(int id)
        {
            return applicationContext.students.First(i => i.Id == id);
        }

        public List<Student> getStudents()
        {
            return applicationContext.students.ToList();
        }

        public void update(Student student)
        {
            Student current = applicationContext.students.First(i => i.Id == student.Id);
            if (current != null)
            {
                current.Name = student.Name;
                current.Age = student.Age;
                current.GradeLevel = student.GradeLevel;
                current.ParentName = student.ParentName;
                current.ParentsMobile = student.ParentsMobile;
                current.StudentMobile = student.StudentMobile;
                current.Location = student.Location;
                applicationContext.SaveChanges();
            }
        }
    }
}
