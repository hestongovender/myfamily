using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyFamily.Api.Managers;
using MyFamily.Api.Models;

namespace MyFamily.Controllers
{
    /// <summary>
    /// Family tree api
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TreeController : ControllerBase
    {
        private readonly IFamilyTreeManager _familyTreeManager;

        public TreeController(IFamilyTreeManager familyTreeManager)
        {
            _familyTreeManager = familyTreeManager;
        }

        // POST api/tree
        /// <summary>
        /// Add an individual's personal profile data and the profile data of the individual's family members
        /// </summary>
        /// <param name="familyTree">The individual's personal profile data and the profile data of the individual's family members (see FamilyTreeModel)</param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<ActionResult<FamilyTreeModel>> CreateMyFamilyTree(FamilyTreeModel familyTree)
        {
            await _familyTreeManager.CreateMyFamilyTree(familyTree);
            return CreatedAtAction(nameof(GetMyFamilyTree), new { id = familyTree.PersonalDetails.Id }, familyTree);
        }

        //GET: api/tree/1
        /// <summary>
        /// List all the family tree members by an individual's profile id
        /// </summary>
        /// <param name="id">The profile id of the individual</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<FamilyTreeModel>> GetMyFamilyTree(int id)
        {
            var myFamilyTree = await _familyTreeManager.GetFamilyTree(id);
            if (myFamilyTree == null)
            {
                return NotFound();
            }
            return myFamilyTree;
        }
    }
}
