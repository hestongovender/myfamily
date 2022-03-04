using System.Collections.Generic;
using System.Threading.Tasks;
using MyFamily.Api.Models;

namespace MyFamily.Api.Managers
{
    public interface IFamilyTreeManager
    {
        #region Login
        Task AddLogin(Login loginCredentials);
        Task<Login> GetLoginCredentials(int id);
        Task<List<Login>> GetAllLoginCredentials();
        Task<PersonalProfile> AuthenticateLoginCredentials(Login loginDetails);
        #endregion //Login

        #region PersonalProfile
        Task AddPersonalProfile(PersonalProfile personalProfile);
        Task<List<PersonalProfile>> GetAllProfiles();
        Task<PersonalProfile> GetPersonalProfile(int id);
        PersonalProfile GetPersonalProfileByIdentityNumber(string identityNumber);
        Task UpdatePersonalProfile(PersonalProfile profile);
        Task DeletePersonalProfile(int id);
        #endregion //PersonalProfile

        #region Relationships
        //Task AddRelatives(int userId, List<PersonalProfile> relatives, Relation relation);
        Task AddRelative(int userId, PersonalProfile relativeProfile, Relation relation);
        //Task AddAssociatedRelationships(int userId, PersonalProfile relativeProfile, Relation relation);
        //Task AddInverseRelationship(int userId, Relation relation, PersonalProfile person);
        //Task AddSecondaryRelationships(int userId, Relation relation, PersonalProfile person);
        Task<List<PersonalProfile>> GetRelatives(int id, Relation relation);
        //Task AddRelationship(Relationship relationship);
        //Task<Relationship> GetRelationship(int id);
        //List<Relationship> GetRelationships(int id);
        //Task<List<Relationship>> GetAllRelationships();
        //Task<List<PersonalProfile>> GetParents(int id);
        void DeleteRelationship(int userId, int relativeId);
        //void DeleteAssociatedRelationships(int id);
        #endregion //Relationship

        #region Tree
        Task CreateMyFamilyTree(FamilyTreeModel familyTree);
        Task<FamilyTreeModel> GetFamilyTree(int id);
        #endregion //Tree
    }
}
