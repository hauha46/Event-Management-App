using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventApp.Entity;
using Microsoft.EntityFrameworkCore;

namespace EventApp.DataAccess
{
    public class EnrolledEventRepository
    {
        private readonly EventAppDbContext eventAppDbContext;

        public EnrolledEventRepository()
        {
            this.eventAppDbContext = new EventAppDbContext();
        }
        public async Task<int> Add(EnrolledEvent entity)
        {
            var enrollment = this.eventAppDbContext.EnrolledEvents.Where(item => item.UserId == entity.UserId && item.EventId == entity.EventId).FirstOrDefault();
            if(enrollment != null)
            {
                return 0;
            }
            this.eventAppDbContext.EnrolledEvents.Add(entity);
            await this.eventAppDbContext.SaveChangesAsync();
            return entity.Id;
        }
        public async Task<List<Event>> Get(int userId)
        {
            List<Event> events = new List<Event>();
            var enrollmentList = this.eventAppDbContext.EnrolledEvents.Include(item => item.Event).Where(item => item.UserId == userId);
            foreach(var enrollment in enrollmentList)
            {
                if(enrollment.Event != null)
                {
                    events.Add(enrollment.Event);
                }
                else
                {
                    this.eventAppDbContext.EnrolledEvents.Remove(enrollment);
                }
            }
            await this.eventAppDbContext.SaveChangesAsync();
            return await Task.FromResult(events);
        }
        public async void Delete(EnrolledEvent entity)
        {
            this.eventAppDbContext.EnrolledEvents.Remove(entity);
            await this.eventAppDbContext.SaveChangesAsync();
        }
    }
}
