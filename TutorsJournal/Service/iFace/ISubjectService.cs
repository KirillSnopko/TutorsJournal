using TutorsJournal.entity;

namespace TutorsJournal.Service.iFace
{
    public interface ISubjectService
    {
        List<Subject> getSubjects();
        Subject getById(int id);
        void deleteSubject(int id);
        void addSubject(string name);
        void renameSubject(int id, string name);
        void deleteTopic(int id);
        void changeTopic(int id, int gradeLevel, string description);
        void createTopic(int idSubject, int gradeLevel, string description);
        dynamic getTopics(int subjectId, int gradeLevel);
    }
}
