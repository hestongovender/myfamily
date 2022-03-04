using System.ComponentModel.DataAnnotations.Schema;

namespace MyFamily.Api.Models
{
    [Table("relationship")]
    public class Relationship
    {
        [Column("relationship_key")]
        public int Id { get; set; }
        
        [Column("user_id")]
        public int UserId { get; set; }
        
        [Column("relative_id")]
        public int RelativeId { get; set; }
        
        [Column("relation_key")]
        public Relation Relation { get; set; }
    }
}
