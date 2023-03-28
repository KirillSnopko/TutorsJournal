using TutorsJournal.entity;

namespace TutorsJournal.Service.iFace
{
    public interface ICrudService<T>
    {
        void Add(T t);
        void Update(T t);
        void Delete(int id);
        T Get(int id);
        List<T> Get();
        int Count();
    }
}
