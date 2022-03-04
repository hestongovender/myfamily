using System.ComponentModel.DataAnnotations.Schema;

namespace MyFamily.Api.Models
{
    [Table("users")]
    public class Login
    {
        [Column("user_id")]
        public int Id { get; set; }

        [Column("profile_id")]
        public int ProfileId { get; set; }

        public string Username { get; set; }

        [Column("display_name")]
        public string DisplayName { get; set; }
        
        public string Password { get; set; }
    }
}
