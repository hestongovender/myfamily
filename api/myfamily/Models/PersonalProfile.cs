using System.ComponentModel.DataAnnotations.Schema;

namespace MyFamily.Api.Models
{
    [Table("personal_profile")]
    public class PersonalProfile
    {
        [Column("profile_id")]
        public int Id { get; set; }
        
        public string Firstname { get; set; }
        
        public string Surname { get; set; }
        
        [Column("maiden_name")]
        public string MaidenName { get; set; }
        
        [Column("identity_number")]
        public string IdentityNumber { get; set; }
        
        public string Gender { get; set; }
        
        [Column("email_address")]
        public string EmailAddress { get; set; }
        
        [Column("cellphone_number")]
        public string CellphoneNumber { get; set; }
        
        [Column("home_number")]
        public string HomeNumber { get; set; }
        
        [Column("work_number")]
        public string WorkNumber { get; set; }
    }
}
