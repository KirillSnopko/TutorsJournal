using TutorsJournal.entity;

namespace TutorsJournal.Repo.iFace
{
    public interface ISubjectRepo
    {
        void create(Subject subject);
        void delete(Subject subject);
        Subject getById(int id);
        List<Subject> getAll();
        void rename(int id, string name);
    }
}
