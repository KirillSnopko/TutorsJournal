using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.EntityFrameworkCore;
using TutorsJournal.database;
using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Service
{
    public class StudentService : ICrudService<Student>
    {
        private readonly ApplicationContext applicationContext;

        public StudentService(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        public void Add(Student student)
        {
            applicationContext.students.Add(student);
            applicationContext.SaveChanges();
        }

        public void Delete(int idStudent)
        {
            applicationContext.students.Remove(applicationContext.students.First(i => i.Id == idStudent));
            applicationContext.SaveChanges();
        }

        public List<Student> Get()
        {
            return applicationContext.students.AsNoTracking().ToList();
        }

        public Student Get(int idStudent)
        {
            return applicationContext.students.AsNoTracking().First(i => i.Id == idStudent);
        }

        public int Count()
        {
            return applicationContext.students.AsNoTracking().Count();
        }

        public void Update(Student student)
        {
            Student current = applicationContext.students.First(i => i.Id == student.Id);
            if (current != null)
            {
                current.Update(student);
                applicationContext.SaveChanges();
            }
        }
    }
}
