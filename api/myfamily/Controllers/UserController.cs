using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyFamily.Api.Managers;
using MyFamily.Api.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFamily.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IFamilyTreeManager _familyTreeManager;

        public UserController(IFamilyTreeManager familyTreeManager)
        {
            _familyTreeManager = familyTreeManager;
        }

        //POST api/user/register
        /// <summary>
        /// Add user login credentials
        /// </summary>
        /// <param name="loginCredentials">The user's login credentials (see Login)</param>
        /// <returns></returns>
        [HttpPost("register")]
        public async Task<ActionResult<PersonalProfile>> CreateLogin(Login loginCredentials)
        {
            await _familyTreeManager.AddLogin(loginCredentials);
            return CreatedAtAction(nameof(AuthenticateLoginCredentials), loginCredentials);
        }

        //POST api/user/login
        /// <summary>
        /// Authenticate the user details
        /// </summary>
        /// <param name="loginCredentials">Login model with the username and password to be validated</param>
        /// <returns>Null if the username and password do not exist, else returns the user's profile details</returns>
        [HttpPost("login")]
        public async Task<ActionResult<PersonalProfile>> AuthenticateLoginCredentials(Login loginCredentials)
        {
            var userProfile = await _familyTreeManager.AuthenticateLoginCredentials(loginCredentials);
            if (userProfile == null)
            {
                return Unauthorized();
            }
            return userProfile;
        }
    }
}
