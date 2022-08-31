namespace TutorsJournal.entity
{
    public class Subject
    {
        public int id { get; set; }
        public string name { get; set; }
        public List<Topic> topics { get; set; }
    }
}
