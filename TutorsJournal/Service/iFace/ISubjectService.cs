using TutorsJournal.entity;

namespace TutorsJournal.Service.iFace
{
    public interface ISubjectService
    {
        List<Subject> getSubjects();
        public Subject getById(int id);
        public void deleteSubject(int id);
        public void addSubject(string name);
        public void renameSubject(int id, string name);

        public void deleteTopic(int id);
        public void changeTopic(int id, int gradeLevel, string description);
        public void createTopic(int idSubject, int gradeLevel, string description);
    }
}
