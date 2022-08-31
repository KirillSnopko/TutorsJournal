using TutorsJournal.database;
using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;

namespace TutorsJournal.Repo
{
    public class TopicRepo : ITopicRepo
    {
        private ApplicationContext applicationContext;

        public TopicRepo(ApplicationContext applicationContext)
        {
            this.applicationContext = applicationContext;
        }

        public void add(Topic topic)
        {
            applicationContext.topics.Add(topic);
            applicationContext.SaveChanges();
        }

        public void delete(Topic topic)
        {
            applicationContext.topics.Remove(topic);
            applicationContext.SaveChanges();
        }

        public Topic get(int id)
        {
            return applicationContext.topics.First(i => i.Id == id);
        }

        public void update(Topic topic)
        {
            Topic currentTopic = applicationContext.topics.First(i => i.Id == topic.Id);
            if (currentTopic != null)
            {
                currentTopic.GradeLevel = topic.GradeLevel;
                currentTopic.Description = topic.Description;
                applicationContext.topics.Update(currentTopic);
                applicationContext.SaveChanges();
            }
        }
    }
}
