using TutorsJournal.database;
using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;
using Microsoft.EntityFrameworkCore;

namespace TutorsJournal.Repo
{
    public class CourseRepo : ICourseRepo
    {
        private ApplicationContext applicationContext;

        public CourseRepo(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        public void create(Course course)
        {
            applicationContext.courses.Add(course);
            applicationContext.SaveChanges();
        }

        public void delete(Course course)
        {
            applicationContext.courses.Remove(course);
            applicationContext.SaveChanges();
        }

        public void edit(Course course)
        {
            Course current = applicationContext.courses.First(i => i.Id == course.Id);
            if (current != null)
            {
                current.InitPrice = course.InitPrice;
                current.Goals = course.Goals;
                applicationContext.SaveChanges();
            }
        }

        public Course get(int id)
        {
            return applicationContext.courses.First(i => i.Id == id);
        }

        public List<Course> GetCourses(int idStudent)
        {
            return applicationContext.courses.Where(i => i.StudentId == idStudent).Include(i => i.Subject).Include(i => i.Lessons).ToList();
        }
    }
}
