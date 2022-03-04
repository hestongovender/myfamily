using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyFamily.Api.Managers;
using MyFamily.Api.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFamily.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IFamilyTreeManager _familyTreeManager;

        public ProfileController(IFamilyTreeManager familyTreeManager, ILogger<ProfileController> logger)
        {
            _familyTreeManager = familyTreeManager;
        }

        //POST api/profile
        /// <summary>
        /// Add an individual's personal profile data
        /// </summary>
        /// <param name="profile">The individual's personal profile data (see PersonalProfile)</param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<ActionResult<PersonalProfile>> CreateProfile(PersonalProfile profile)
        {
            await _familyTreeManager.AddPersonalProfile(profile);
            return CreatedAtAction(nameof(GetProfile), new { id = profile.Id }, profile);
        }

        //GET api/profile
        /// <summary>
        /// List personal profile data of all individuals
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<ActionResult<List<PersonalProfile>>> GetAllProfiles()
        {
            return await _familyTreeManager.GetAllProfiles();
        }

        //GET api/profile/{profile_id}
        /// <summary>
        /// Get an individual's personal profile data by profile id
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonalProfile>> GetProfile(int id)
        {
            return await _familyTreeManager.GetPersonalProfile(id);
        }

        //GET api/profile/{identityNumber}
        /// <summary>
        /// Get an individual's personal profile data by Identity number
        /// </summary>
        /// <param name="identityNumber">Identity number of the individual</param>
        /// <returns></returns>
        [HttpGet("identityNumber/{identityNumber}")]
        public ActionResult<PersonalProfile> GetProfileByIdentityNumber(string identityNumber)
        {
            return _familyTreeManager.GetPersonalProfileByIdentityNumber(identityNumber);
        }

        //PUT api/profile/{profile_id}
        /// <summary>
        /// Update an individual's personal profile data by profile id
        /// </summary>
        /// <param name="profile">The individual's updated personal profile data</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<PersonalProfile>> UpdateProfile(PersonalProfile profile)
        {
            await _familyTreeManager.UpdatePersonalProfile(profile);
            return CreatedAtAction(nameof(GetProfile), new { id = profile.Id }, profile);
        }

        //DELETE api/profile/{profile_id}
        /// <summary>
        /// Remove an individual's personal profile data by profile id
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task DeleteProfile(int id)
        {
            await _familyTreeManager.DeletePersonalProfile(id);
        }

        //POST api/profile/1/relative
        /// <summary>
        /// Add the personal profile data of an individual's relative
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <param name="relation">The relationship of the relative to the individual</param>
        /// <param name="relativeProfile">The relative's personal profile data</param>
        /// <returns></returns>
        [HttpPost("{id}/relative")]
        public async Task<ActionResult<PersonalProfile>> CreateMyFamilyRelative(int id, Relation relation, PersonalProfile relativeProfile)
        {
            await _familyTreeManager.AddRelative(id, relativeProfile, relation);
            return CreatedAtAction(nameof(GetMyFamilyRelative), new { id = relativeProfile.Id }, relativeProfile);
        }

        //GET api/profile/1/relative
        /// <summary>
        /// List the personal profile data of an individual's relatives
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <param name="relation">The relationship of the relatives to the individual</param>
        /// <returns></returns>
        [HttpGet("{id}/relative")]
        public async Task<ActionResult<List<PersonalProfile>>> GetMyFamilyRelative(int id, Relation relation)
        {
            var relatives = await _familyTreeManager.GetRelatives(id, relation);
            return relatives;
        }

        //DELETE api/profile/1/relative/{relativeId}
        /// <summary>
        /// Remove relative from an individual's relationships
        /// </summary>
        /// <param name="userId">The profile id of the individual</param>
        /// <param name="relativeId">The profile id of the relative</param>
        /// <returns></returns>
        [HttpDelete("{userId}/relative/{relativeId}")]
        public void DeleteRelationship(int userId, int relativeId)
        {
            _familyTreeManager.DeleteRelationship(userId, relativeId);
        }

        //POST api/profile/1/relative/parent
        /// <summary>
        /// Add the personal profile data of an individual's parents 
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <param name="personalProfile">The personal profile data of the individual's parents</param>
        /// <returns></returns>
        [HttpPost("{id}/relative/parent")]
        public async Task<ActionResult<PersonalProfile>> CreateParent(int id, PersonalProfile personalProfile)
        {
            return await CreateMyFamilyRelative(id, Relation.Parent, personalProfile);
        }

        //GET api/profile/1/relative/parent
        /// <summary>
        /// List the personal profile data of an individual's parents
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <returns></returns>
        [HttpGet("{id}/relative/parent")]
        public async Task<ActionResult<List<PersonalProfile>>> GetParents(int id)
        {
            return await GetMyFamilyRelative(id, Relation.Parent);
        }

        //POST api/profile/1/relative/sibling
        /// <summary>
        /// Add the personal profile data of an individual's siblings
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <param name="personalProfile">The personal profile data of the individual's siblings</param>
        /// <returns></returns>
        [HttpPost("{id}/relative/sibling")]
        public async Task<ActionResult<PersonalProfile>> CreateSibling(int id, PersonalProfile personalProfile)
        {
            return await CreateMyFamilyRelative(id, Relation.Sibling, personalProfile);
        }

        //GET api/profile/1/relative/sibling
        /// <summary>
        /// List the personal profile data of an individual's siblings
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <returns></returns>
        [HttpGet("{id}/relative/sibling")]
        public async Task<ActionResult<List<PersonalProfile>>> GetSiblings(int id)
        {
            return await GetMyFamilyRelative(id, Relation.Sibling);
        }

        //POST api/profile/1/relative/spouse
        /// <summary>
        /// Add the personal profile data of an individual's spouse
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <param name="personalProfile">The personal profile data of the individual's spouse</param>
        /// <returns></returns>
        [HttpPost("{id}/relative/spouse")]
        public async Task<ActionResult<PersonalProfile>> CreateSpouse(int id, PersonalProfile personalProfile)
        {
            return await CreateMyFamilyRelative(id, Relation.Spouse, personalProfile);
        }

        //GET api/profile/1/relative/spouse
        /// <summary>
        /// List the personal profile data of an individual's spouse
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <returns></returns>
        [HttpGet("{id}/relative/spouse")]
        public async Task<ActionResult<List<PersonalProfile>>> GetSpouse(int id)
        {
            return await GetMyFamilyRelative(id, Relation.Spouse);
        }

        //POST api/profile/1/relative/child
        /// <summary>
        /// Add the personal profile data of an individual's children
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <param name="personalProfile">The personal profile data of the individual's children</param>
        /// <returns></returns>
        [HttpPost("{id}/relative/child")]
        public async Task<ActionResult<PersonalProfile>> CreateChild(int id, PersonalProfile personalProfile)
        {
            return await CreateMyFamilyRelative(id, Relation.Child, personalProfile);
        }

        //GET api/profile/1/relative/child
        /// <summary>
        /// List the personal profile data of an individual's children
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <returns></returns>
        [HttpGet("{id}/relative/child")]
        public async Task<ActionResult<List<PersonalProfile>>> GetChild(int id)
        {
            return await GetMyFamilyRelative(id, Relation.Child);
        }
    }
}
