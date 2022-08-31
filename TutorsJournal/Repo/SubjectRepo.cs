using TutorsJournal.database;
using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TutorsJournal.Repo
{
    public class SubjectRepo:ISubjectRepo
    {
        private ApplicationContext applicationContext;

        public SubjectRepo(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        public void create(Subject subject)
        {
            applicationContext.subjects.Add(subject);
            applicationContext.SaveChanges();
        }

        public void delete(Subject subject)
        {
            applicationContext.subjects.Remove(subject);
            applicationContext.SaveChanges();
        }

        public Subject getById(int id)
        {
            return applicationContext.subjects.Include(i=>i.topics).First(i=> i.id == id);
        }

        public List<Subject> getAll()
        {
            List<Subject> subjects = applicationContext.subjects.Include(i=>i.topics).ToList();
            return subjects;
        }

        public void rename(int id, string name)
        {
            applicationContext.subjects.First(i => i.id == id).name = name;
            applicationContext.SaveChanges();
        }
    }
}
