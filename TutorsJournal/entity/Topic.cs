namespace TutorsJournal.entity
{
    public class Topic
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        public int GradeLevel { get; set; }
        public string Description { get; set; }
    }
}
