namespace TutorsJournal.entity
{
    public class Course
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        public int GradeLevel { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public List<Lesson> Lessons { get; set; }
        public int InitPrice { get; set; }
        public string Goals { get; set; }

    }
}
