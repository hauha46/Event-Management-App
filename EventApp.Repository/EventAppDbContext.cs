using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using EventApp.Entity;
using Microsoft.Extensions.Configuration;

namespace EventApp.DataAccess
{
    class EventAppDbContext : DbContext
    {
        public EventAppDbContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnectionString"));
            //optionsBuilder.UseSqlServer("Server = MSI; Database = EventApp; Trusted_Connection = True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EnrolledEvent>().HasKey(e => new { e.UserId, e.EventId });
            modelBuilder.Entity<EnrolledEvent>().Property(x => x.Id).UseIdentityColumn(seed: 1, increment: 1);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EnrolledEvent> EnrolledEvents { get; set; }
    }
}
