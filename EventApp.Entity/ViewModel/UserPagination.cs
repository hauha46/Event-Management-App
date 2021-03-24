using System;
using System.Collections.Generic;
using System.Text;

namespace EventApp.Entity.ViewModel
{
    public class UserPagination
    {
        public List<User> Users { get; set; }
        public int maxPage { get; set; }
        public int totalUsers { get; set; }
    }
}
