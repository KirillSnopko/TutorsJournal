namespace TutorsJournal.entity
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public int GradeLevel { get; set; }
        public string Location { get; set; }
        public string ParentName { get; set; }
        public string StudentMobile { get; set; }
        public string ParentsMobile { get; set; }
        public List<Course> Courses { get; set; } = new();
    }
}
