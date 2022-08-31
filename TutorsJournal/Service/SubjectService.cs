using TutorsJournal.entity;
using TutorsJournal.Repo.iFace;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Service
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepo subjectRepo;
        private readonly ITopicRepo topicRepo;

        public SubjectService(ISubjectRepo subjectRepo, ITopicRepo topicRepo)
        {
            this.subjectRepo = subjectRepo;
            this.topicRepo = topicRepo;
        }

        public void addSubject(string name)
        {
            subjectRepo.create(new Subject { name = name, topics = new() });
        }

        public void changeTopic(int id, int gradeLevel, string description)
        {
            topicRepo.update(new Topic { Id = id, GradeLevel = gradeLevel, Description = description });
        }

        public void createTopic(int idSubject, int gradeLevel, string description)
        {
            topicRepo.add(new Topic { SubjectId = idSubject, GradeLevel = gradeLevel, Description = description });
        }

        public void deleteSubject(int id)
        {
            Subject subject = subjectRepo.getById(id);
            if (subject != null)
            {
                subjectRepo.delete(subject);
            }
        }

        public void deleteTopic(int id)
        {
            Topic topic = topicRepo.get(id);
            topicRepo.delete(topic);
        }

        public Subject getById(int id)
        {
            return subjectRepo.getById(id);
        }
        public List<Subject> getSubjects()
        {
            return subjectRepo.getAll();
        }

        public void renameSubject(int id, string name)
        {
            subjectRepo.rename(id, name);
        }
    }
}
