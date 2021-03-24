using System;
using System.Collections.Generic;
using System.Text;
using EventApp.Entity;
using EventApp.Entity.ViewModel;
using EventApp.DataAccess;
using System.Threading.Tasks;

namespace EventApp.Business
{
    public class UserDomain
    {
        public UserRepository repository;

        public UserDomain()
        {
            this.repository = new UserRepository();
        }

        public async Task<int> Add(User user)
        {
            return await this.repository.Add(user);
        }
        public async Task<User> Authenticate(string username, string password)
        {
            return await this.repository.Authenticate(username, password);
        }
        public async Task<UserPagination> GetAll(string query, int page, int itemCount)
        {
            return await this.repository.GetAll(query, page, itemCount);
        }

        public async Task<User> Get(int id)
        {
            return await this.repository.Get(id);
        }

        public async Task<Boolean> CheckUser(string username)
        {
            return await this.repository.CheckUser(username);
        }

        public async Task<User> Update(User entity)
        {
            return await this.repository.Update(entity);
        }

        public void ChangePassword(int id, string oldPassword, string newPassword)
        {
            this.repository.ChangePassword(id, oldPassword, newPassword);
        } 
    }
}
