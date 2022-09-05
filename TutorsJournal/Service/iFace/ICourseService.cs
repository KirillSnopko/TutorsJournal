namespace TutorsJournal.Service.iFace
{
    public interface ICourseService
    {
        void delete(int id);
        void create(int subjectId, int studentId, int gradeLevel, int initPrice, string goals);
        void edit(int id, int subjectId, int studentId, int gradeLevel, int initPrice, string goals);
        dynamic getCoursesByStudentId(int studentId);
    }
}
