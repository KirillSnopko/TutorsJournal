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
            Student temp = applicationContext.students.First(i => i.Id == student.Id);
            temp = student;
            applicationContext.SaveChanges();
        }
    }
}
