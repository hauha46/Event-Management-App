using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventApp.Entity;

namespace EventApp.DataAccess
{
    public class EventRepository
    {
        private readonly EventAppDbContext eventAppDbContext;
        private EnrolledEventRepository enrolledEventRepository;
        public EventRepository()
        {
            this.eventAppDbContext = new EventAppDbContext();
            this.enrolledEventRepository = new EnrolledEventRepository();
        }

        public async Task<int> Add(Event entity)
        {
            entity.DateCreated = DateTime.Now;
            this.eventAppDbContext.Events.Add(entity);
            await this.eventAppDbContext.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<List<Event>> GetAll()
        {
            return await Task.FromResult(this.eventAppDbContext.Events.ToList());
        }

        public async Task<List<Event>> GetAllWithUser(int userId)
        {
            List<Event> enrolled = await enrolledEventRepository.Get(userId);
            List<Event> allEvents = this.eventAppDbContext.Events.ToList();
            List<Event> left = new List<Event>();
            foreach(var item in allEvents)
            {
                if (enrolled.FirstOrDefault(e => e.Id == item.Id) == null)
                {
                    left.Add(item);
                }
            }
            return left;
        }

        public async Task<Event> Get(int id)
        {
            return await Task.FromResult(this.eventAppDbContext.Events.FirstOrDefault(c => c.Id == id));
        }

        public async Task<Event> Update(Event entity)
        {
            Event item = await this.Get(entity.Id);
            item.Title = entity.Title;
            item.ShortDescription = entity.ShortDescription;
            item.LongDescription = entity.LongDescription;
            item.IsActive = entity.IsActive;
            item.PublishedDate = entity.PublishedDate;
            await this.eventAppDbContext.SaveChangesAsync();
            return item;
        }

        public async void Delete(int id)
        {
            this.eventAppDbContext.Events.Remove(await this.Get(id));
            await this.eventAppDbContext.SaveChangesAsync();
        }
    }
}
