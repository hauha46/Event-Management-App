 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EventApp.Business;
using EventApp.Entity;
using EventApp.Entity.ViewModel;
using System.Net;
using eCommerceWeb.API.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace Event_Management_App.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserDomain userDomain;
        private readonly IUserService userService;
        public UserController(IUserService userService)
        {
            this.userDomain = new UserDomain();
            this.userService = userService;
        }

        /// <summary>
        /// The endpoint finds the list of users based on given search query, page and item count
        /// </summary>
        /// <param name="query"></param>
        /// <param name="page"></param>
        /// <param name="itemCount"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("all/{query}/{page}/{itemCount}")]
        public async Task<ActionResult<UserPagination>> GetAll([FromRoute] string query, [FromRoute] int page, [FromRoute] int itemCount)
        {
            var users = await this.userDomain.GetAll(query, page, itemCount);
            return Ok(users);
        }

        /// <summary>
        /// The endpoint finds the list of the users based on the given page and item count
        /// </summary>
        /// <param name="page"></param>
        /// <param name="itemCount"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("all/{page}/{itemCount}")]
        public async Task<ActionResult<UserPagination>> GetAllWithoutQuery([FromRoute] int page, [FromRoute] int itemCount)
        {
            var users = await this.userDomain.GetAll(null, page, itemCount);
            return Ok(users);
        }


        /// <summary>
        /// The endpoint finds the user based on the given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if(HttpContext.User.FindFirst("id").Value != id.ToString())
            {
                return Unauthorized();
            }
            var user = await this.userDomain.Get(id);
            if (user == null)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

            return Ok(user);
        }


        /// <summary>
        /// The endpoint checks whether the given username is existed or not
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("check/{username}")]
        public async Task<ActionResult<User>> CheckUser(string username)
        {
            var existed = await this.userDomain.CheckUser(username);
            return Ok(existed);
        }

        /// <summary>
        /// The endpoint saves a new registered user into the database based on the given information
        /// </summary>
        /// <param name="user">Given a user</param>
        /// <returns>The function returns the id of saved user</returns>
        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<int>> AddUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input");
            }
            var response = await this.userDomain.Add(user);

            return Ok(response);
        }

        /// <summary>
        /// The endpoint authenticates the credential of a user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("auth")]
        public async Task<ActionResult<AuthenticateResponse>> Authenticate([FromBody] AuthenticateRequest model)
        {
            var response = await userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        /// <summary>
        /// The endpoint updates password of a user based on the given information
        /// </summary>
        /// <param name="passwords"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch]
        [Route("change-password")]
        public ActionResult ChangePassword([FromBody] Password passwords)
        {
            if (!ModelState.IsValid || HttpContext.User.FindFirst("id").Value != passwords.Id.ToString())
            {
                return BadRequest("Invalid input");
            }
            userDomain.ChangePassword(passwords.Id, passwords.OldPassword, passwords.NewPassword);
            return Ok();
        }

        /// <summary>
        /// The endpoint updates info of a user based on the given information
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch]
        [Route("update")]
        public async Task<ActionResult<User>> UpdateUser([FromBody] User user)
        {
            if (HttpContext.User.FindFirst("id").Value != user.Id.ToString())
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input");
            }
            var updated = await this.userDomain.Update(user);

            return Ok(updated);
        }
    }
}
