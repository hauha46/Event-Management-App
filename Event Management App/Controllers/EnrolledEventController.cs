using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EventApp.Business;
using EventApp.Entity;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace Event_Management_App.Controllers
{
    [Route("enroll")]
    [ApiController]
    public class EnrolledEventController : ControllerBase
    {
        private EnrolledEventDomain enrolledEventDomain;

        public EnrolledEventController()
        {
            this.enrolledEventDomain = new EnrolledEventDomain();
        }

        /// <summary>
        /// The endpoint add a new enrollment into the database based on the given information
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<int>> AddEnrollment(EnrolledEvent entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input");
            }
            var response = await this.enrolledEventDomain.Add(entity);
            if (response != 0)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest("Duplicate input");
            }
        }

        /// <summary>
        /// The endpoint finds the enrollment based on the given userId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Event>>> GetEnrollment(int id)
        {
            if (HttpContext.User.FindFirst("id").Value != id.ToString())
            {
                return Unauthorized();
            }
            var events = await this.enrolledEventDomain.Get(id);
            if (events == null)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

            return Ok(events);
        }

        /// <summary>
        /// The endpoint deletes the enrollment based on the given information
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="eventId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete]
        [Route("delete/{userId}/{eventId}")]
        public ActionResult DeleteEnrollment([FromRoute] int userId, [FromRoute] int eventId)
        {
            this.enrolledEventDomain.Delete(new EnrolledEvent() {UserId = userId, EventId = eventId});
            return Ok();
        }
    }
}
