using TutorsJournal.entity;

namespace TutorsJournal.Repo.iFace
{
    public interface ITopicRepo
    {
        void add(Topic topic);
        Topic get(int id);
        void update(Topic topic);
        void delete(Topic topic);
    }
}
