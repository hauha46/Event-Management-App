using System;
using System.Collections.Generic;
using System.Text;

namespace EventApp.Entity.ViewModel
{
    public class Password
    {

        public int Id { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
