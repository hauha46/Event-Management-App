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
    [Route("event")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private EventDomain eventDomain;
        public EventController()
        {
            this.eventDomain = new EventDomain();
        }

        /// <summary>
        /// The function finds all available events
        /// </summary>
        /// <returns>The function returns all available events</returns>
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<Event>>> GetAll()
        {
            var events = await this.eventDomain.GetAll();
            return Ok(events);
        }

        /// <summary>
        /// The endpoint finds all events specialize for a particular user based on the given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("all/{id}")]
        public async Task<ActionResult<List<Event>>> GetAllWithUser(int id)
        {
            var events = await this.eventDomain.GetAllWithUser(id);
            return Ok(events);
        }


        /// <summary>
        /// The endpoint finds the event based on the given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var item = await this.eventDomain.Get(id);
            if (item == null)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

            return Ok(item);
        }

        /// <summary>
        /// The endpoint saves a new registered event into the database based on the given information
        /// </summary>
        /// <param name="entity">Given a event</param>
        /// <returns>The function returns the id of saved event</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<int>> AddEvent(Event entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input");
            }
            var response = await this.eventDomain.Add(entity);

            return Ok(response);
        }

        /// <summary>
        /// The endpoint updates the information of an event based on the given information
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPatch]
        [Route("update")]
        public async Task<ActionResult<Event>> UpdateEvent(Event entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input");
            }
            var item = await this.eventDomain.Update(entity);

            return Ok(item);
        }

        /// <summary>
        /// The endpoint deletes an event based on the given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("{id}")]
        public ActionResult DeleteEvent(int id)
        {
            this.eventDomain.Delete(id);
            return Ok();
        }
    }
}
