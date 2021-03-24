using System;
using System.Collections.Generic;
using System.Text;
using EventApp.Entity;
using EventApp.DataAccess;
using System.Threading.Tasks;

namespace EventApp.Business
{
    public class EnrolledEventDomain
    {
        public EnrolledEventRepository repository;

        public EnrolledEventDomain()
        {
            this.repository = new EnrolledEventRepository();
        }

        public async Task<int> Add(EnrolledEvent entity)
        {
            return await this.repository.Add(entity);
        }

        public async Task<List<Event>> Get(int userId)
        {
            return await this.repository.Get(userId);
        }

        public void Delete(EnrolledEvent entity)
        {
            this.repository.Delete(entity);
        }
    }
}
