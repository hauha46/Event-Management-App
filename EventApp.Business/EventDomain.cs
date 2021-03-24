using System;
using System.Collections.Generic;
using System.Text;
using EventApp.Entity;
using EventApp.DataAccess;
using System.Threading.Tasks;

namespace EventApp.Business
{
    public class EventDomain
    {
        public EventRepository repository;

        public EventDomain()
        {
            this.repository = new EventRepository();
        }

        public async Task<int> Add(Event entity)
        {
            return await this.repository.Add(entity);
        }

        public async Task<List<Event>> GetAll()
        {
            return await this.repository.GetAll();
        }

        public async Task<List<Event>> GetAllWithUser(int userId)
        {
            return await this.repository.GetAllWithUser(userId);
        }

        public async Task<Event> Get(int id)
        {
            return await this.repository.Get(id);
        }

        public async Task<Event> Update(Event entity)
        {
            return await this.repository.Update(entity);
        }

        public void Delete(int id)
        {
            this.repository.Delete(id);
        }
    }
}
