using Microsoft.EntityFrameworkCore;
using TutorsJournal.entity;

namespace TutorsJournal.database
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Student> students { get; set; }
        public DbSet<Subject> subjects { get; set; }
        public DbSet<Topic> topics { get; set; }
        public DbSet<Course> courses { get; set; }
        public DbSet<Lesson> lessons { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Topic>()
                .HasOne(u => u.Subject)
                .WithMany(c => c.topics)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Lesson>()
                 .HasOne(i => i.Course)
                 .WithMany(i => i.Lessons)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Course>()
                .HasOne(i => i.Student)
                .WithMany(i => i.Courses)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
