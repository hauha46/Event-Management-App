using System;
using EventApp.Entity;
using EventApp.Entity.ViewModel;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventApp.DataAccess
{
    public class UserRepository
    {
        private readonly EventAppDbContext eventAppDbContext;

        public UserRepository()
        {
            this.eventAppDbContext = new EventAppDbContext();
        }

        public async Task<int> Add(User user)
        {
            this.eventAppDbContext.Users.Add(user);
            await this.eventAppDbContext.SaveChangesAsync();
            return user.Id;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            return await Task.FromResult(this.eventAppDbContext.Users.FirstOrDefault(u => u.Username == username && u.Password == password));
        }

        public async Task<UserPagination> GetAll(string query, int page, int itemCount)
        {
            var users = this.eventAppDbContext.Users.ToList();
            if (query == null)
            {
                if(users.Count < itemCount)
                {
                    UserPagination result = new UserPagination()
                    {
                        Users = users,
                        maxPage = (int)Math.Ceiling((double)users.Count / itemCount),
                        totalUsers = users.Count
                    };
                    return result;
                }
                else
                {
                    UserPagination result = new UserPagination()
                    {
                        Users = users.Skip((page - 1) * itemCount).Take(itemCount).ToList(),
                        maxPage = (int)Math.Ceiling((double)users.Count / itemCount),
                        totalUsers = users.Count
                    };
                    return result;
                }
                
            }
            else
            {
                List<User> foundUsers = new List<User>();
                foreach(var user in users)
                {
                    if(user.FirstName.ToLower().IndexOf(query.ToLower()) != -1)
                    {
                        foundUsers.Add(user);
                    }
                }

                if (foundUsers.Count < itemCount)
                {
                    UserPagination result = new UserPagination()
                    {
                        Users = foundUsers,
                        maxPage = 1,
                        totalUsers = foundUsers.Count
                    };
                    return result;
                }
                else
                {
                    UserPagination result = new UserPagination()
                    {
                        Users = foundUsers.Skip((page-1)*itemCount).Take(itemCount).ToList(),
                        maxPage = (int)Math.Ceiling((double)foundUsers.Count / itemCount),
                        totalUsers = foundUsers.Count
                    };
                    return result;
                }
            }
            
        }

        public async Task<User> Get(int id)
        {
            return await Task.FromResult(this.eventAppDbContext.Users.FirstOrDefault(c => c.Id == id));
        }

        public async Task<Boolean> CheckUser(string username)
        {
            if(this.eventAppDbContext.Users.FirstOrDefault(u => u.Username == username) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<User> Update(User entity)
        {
            User user = await this.Get(entity.Id);
            user.FirstName = entity.FirstName;
            user.LastName = entity.LastName;
            user.Email = entity.Email;
            user.Mobile = entity.Mobile;
            await this.eventAppDbContext.SaveChangesAsync();
            return user;
        }

        public async void ChangePassword(int id, string oldPassword, string newPassword)
        {
            User user = await this.Get(id);
            if (user.Password.Equals(oldPassword))
            {
                user.Password = newPassword;
            }
            await this.eventAppDbContext.SaveChangesAsync();
        }

    }
}
