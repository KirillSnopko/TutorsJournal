namespace TutorsJournal.entity
{
    public class Lesson
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public int TopicId { get; set; }
        public DateTime DateTime { get; set; }
        public int Price { get; set; }
        public string Task { get; set; }
        public int PercentOfDecision { get; set; } = 0;
        public String Comment { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool isCanceled { get; set; } = false;
    }
}
