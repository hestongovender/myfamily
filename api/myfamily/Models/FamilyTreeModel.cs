using System.Collections.Generic;

namespace MyFamily.Api.Models
{
    public class FamilyTreeModel
    {
        public PersonalProfile PersonalDetails { get; set; }
        public List<PersonalProfile> Parents { get; set; }
        public List<PersonalProfile> Siblings { get; set; }
        public List<PersonalProfile> Spouse { get; set; }
        public List<PersonalProfile> Children { get; set; }

        public FamilyTreeModel(PersonalProfile personalDetails,
            List<PersonalProfile> parents,
            List<PersonalProfile> siblings,
            List<PersonalProfile> spouse,
            List<PersonalProfile> children)
        {
            PersonalDetails = personalDetails;
            Parents = parents;
            Siblings = siblings;
            Spouse = spouse;
            Children = children;
        }
    }
}
