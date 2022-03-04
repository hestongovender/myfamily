using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyFamily.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MyFamily.Api.Managers
{
    public class FamilyTreeManager : IFamilyTreeManager
    {
        private readonly FamilyTreeContext _context;
        private readonly ILogger<FamilyTreeManager> _logger;

        public FamilyTreeManager(FamilyTreeContext context, ILogger<FamilyTreeManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        #region Login
        public async Task AddLogin(Login loginCredentials)
        {
            _context.LoginCredentials.Add(loginCredentials);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Added new user login: '{loginCredentials.Username}'");
        }

        public async Task<Login> GetLoginCredentials(int id)
        {
            var loginCredentials = await _context.LoginCredentials.FindAsync(id);
            if (loginCredentials == null)
            {
                _logger.LogWarning($"No login credentials for id: {id}");
            }
            else
            {
                _logger.LogInformation($"Found login credentials for id: {id}");
            }
            return loginCredentials;
        }

        public async Task<List<Login>> GetAllLoginCredentials()
        {
            return await _context.LoginCredentials.ToListAsync();
        }
        
        public async Task<PersonalProfile> AuthenticateLoginCredentials(Login loginDetails)
        {
            var user = _context.LoginCredentials.FirstOrDefault(x => x.Username == loginDetails.Username && x.Password == loginDetails.Password);
            if (user == null)
            {
                _logger.LogWarning($"Failed login authentication for username: '{loginDetails.Username}'");
                return null;
            }
            else
            {
                _logger.LogInformation($"Successful login for username: '{loginDetails.Username}'");
            }
            return await GetPersonalProfile(user.ProfileId);
        }
        #endregion //Login

        #region PersonalProfile
        public async Task AddPersonalProfile(PersonalProfile personalProfile)
        {
            _context.PersonalProfiles.Add(personalProfile);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Added new profile with id: {personalProfile.Id}");
        }

        public async Task<List<PersonalProfile>> GetAllProfiles()
        {
            _logger.LogInformation($"Received Get request for All Profiles");
            return await _context.PersonalProfiles.ToListAsync();
        }

        public async Task<PersonalProfile> GetPersonalProfile(int id)
        {
            var personalProfile = await _context.PersonalProfiles.FindAsync(id);
            if (personalProfile == null)
            {
                _logger.LogError($"Profile does not exist for id: {id}");
            }
            return personalProfile;
        }

        public PersonalProfile GetPersonalProfileByIdentityNumber(string identityNumber)
        {
            return _context.PersonalProfiles.FirstOrDefault(x => x.IdentityNumber == identityNumber);
        }

        public async Task UpdatePersonalProfile(PersonalProfile profile)
        {
            _context.PersonalProfiles.Update(profile);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Updated profile with id: {profile.Id}");
        }

        public async Task DeletePersonalProfile(int id)
        {
            DeleteAssociatedRelationships(id);
            var personalProfile = await GetPersonalProfile(id);
            _context.PersonalProfiles.Remove(personalProfile);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Deleted profile and associated relationships for id: {id}");
        }
        #endregion //PersonalProfile

        #region Relationships
        private async Task AddRelatives(int userId, List<PersonalProfile> relatives, Relation relation)
        {
            foreach (var person in relatives)
            {
                await AddRelative(userId, person, relation);
            }
        }

        public async Task AddRelative(int userId, PersonalProfile relativeProfile, Relation relation)
        {
            var existingProfile = GetPersonalProfileByIdentityNumber(relativeProfile.IdentityNumber);
            if (existingProfile == null)
            {
                await AddPersonalProfile(relativeProfile);
            }
            else
            {
                relativeProfile.Id = existingProfile.Id;
            }
            
            var relative = new Relationship()
            {
                UserId = userId,
                RelativeId = relativeProfile.Id,
                Relation = relation
            };

            var existingRelative = _context.Relationships.FirstOrDefault(x => (x.UserId == relative.UserId)
                                                                           && (x.RelativeId == relative.RelativeId)
                                                                           && (x.Relation == relative.Relation));
            if (existingRelative == null)
            {
                await AddRelationship(relative);
                // await AddAssociatedRelationships(userId, relativeProfile, relation);
            }
        }

        private async Task AddAssociatedRelationships(int userId, PersonalProfile relativeProfile, Relation relation)
        {
            await AddInverseRelationship(userId, relation, relativeProfile);
            //await AddSecondaryRelationships(userId, relation, relativeProfile);
        }

        private async Task AddInverseRelationship(int userId, Relation relation, PersonalProfile person)
        {
            Relation inverseRelation;
            switch (relation)
            {
                case Relation.Parent:
                    {
                        inverseRelation = Relation.Child;
                        break;
                    }

                case Relation.Child:
                    {
                        inverseRelation = Relation.Parent;
                        break;
                    }

                default:
                    {
                        inverseRelation = relation;
                        break;
                    }
            }

            var inverseRelationship = new Relationship()
            {
                UserId = person.Id,
                RelativeId = userId,
                Relation = inverseRelation
            };
            await AddRelationship(inverseRelationship);
        }

        //private async Task AddSecondaryRelationships(int userId, Relation relation, PersonalProfile person)
        //{
        //    Relation inverseRelation;
        //    switch (relation)
        //    {
        //        case Relation.Parent:
        //            {
        //                inverseRelation = Relation.Child;
        //                break;
        //            }

        //        case Relation.Child:
        //            {
        //                inverseRelation = Relation.Parent;
        //                break;
        //            }

        //        default:
        //            {
        //                inverseRelation = relation;
        //                break;
        //            }
        //    }

        //    var inverseRelationship = new Relationship()
        //    {
        //        UserId = person.Id,
        //        RelativeId = userId,
        //        Relation = inverseRelation
        //    };
        //    await AddRelationship(inverseRelationship);
        //}

        public async Task<List<PersonalProfile>> GetRelatives(int id, Relation relation)
        {
            List<PersonalProfile> relatives = new List<PersonalProfile>();
            var userProfile = await GetPersonalProfile(id);
            var relationships = _context.Relationships.Where(x => ((x.UserId == userProfile.Id && x.Relation == relation))).ToList();
            foreach (var relationship in relationships)
            {
                var relativeProfile = _context.PersonalProfiles.FirstOrDefault(x => x.Id == relationship.RelativeId);
                relatives.Add(relativeProfile);
            }
            return relatives;
        }

        public async Task AddRelationship(Relationship relationship)
        {
            _context.Relationships.Add(relationship);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Added new relationship with id: {relationship.Id}");
        }

        private async Task<Relationship> GetRelationship(int id)
        {
            var relative = await _context.Relationships.FindAsync(id);
            return relative;
        }

        private List<Relationship> GetRelationships(int id)
        {
            return _context.Relationships.Where(x => (x.RelativeId == id || x.UserId == id)).ToList();
        }

        public async Task<List<Relationship>> GetAllRelationships()
        {
            return await _context.Relationships.ToListAsync();
        }

        private async Task<List<PersonalProfile>> GetParents(int id)
        {
            var parents = new List<PersonalProfile>();
            var relationships = GetRelationships(id);
            foreach (var relationship in relationships)
            {
                if (relationship.UserId == id && relationship.Relation == Relation.Parent)
                {
                    parents.Add(await GetPersonalProfile(relationship.RelativeId));
                }

                if (relationship.RelativeId == id && relationship.Relation == Relation.Child)
                {
                    parents.Add(await GetPersonalProfile(relationship.UserId));
                }
            }

            return parents;
        }

        public void DeleteRelationship(int userId, int relativeId)
        {
            var relationships = GetRelationships(userId);
            var relationship = relationships.First(x => x.RelativeId == relativeId);
            _context.Relationships.Remove(relationship);
            _context.SaveChanges();
            _logger.LogInformation($"Deleted relationship with id: {relationship.Id}");
        }

        private void DeleteAssociatedRelationships(int id)
        {
            var relationships = GetRelationships(id);
            foreach (var relationship in relationships)
            {
               _context.Relationships.Remove(relationship);
                _logger.LogInformation($"Deleted relationship with id: {relationship.Id}");
            }
            _context.SaveChanges();
        }
        #endregion //Relationship

        #region Tree
        public async Task CreateMyFamilyTree(FamilyTreeModel familyTree)
        {
            await AddPersonalProfile(familyTree.PersonalDetails);
            await AddRelatives(familyTree.PersonalDetails.Id, familyTree.Parents, Relation.Parent);
            await AddRelatives(familyTree.PersonalDetails.Id, familyTree.Siblings, Relation.Sibling);
            await AddRelatives(familyTree.PersonalDetails.Id, familyTree.Spouse, Relation.Spouse);
            await AddRelatives(familyTree.PersonalDetails.Id, familyTree.Children, Relation.Child);
            _logger.LogInformation($"Added new family tree for profile id: {familyTree.PersonalDetails.Id}");
        }

        public async Task<FamilyTreeModel> GetFamilyTree(int id)
        {
            var personalProfile = await GetPersonalProfile(id);
            //var parents = await GetParents(id);
            var parents = await GetRelatives(id, Relation.Parent);
            var siblings = await GetRelatives(id, Relation.Sibling);
            var spouse = await GetRelatives(id, Relation.Spouse);
            var children = await GetRelatives(id, Relation.Child);

            return new FamilyTreeModel(personalProfile,
                parents,
                siblings,
                spouse,
                children);
        }
        #endregion //Tree
    }
}
