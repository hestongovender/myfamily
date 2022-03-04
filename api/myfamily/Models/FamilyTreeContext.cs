using Microsoft.EntityFrameworkCore;

namespace MyFamily.Api.Models
{
    public class FamilyTreeContext : DbContext
    {
        public FamilyTreeContext(DbContextOptions<FamilyTreeContext> options) : base(options)
        {
            
        }

        public DbSet<PersonalProfile> PersonalProfiles { get; set; }
        public DbSet<Relationship> Relationships { get; set; }
        public DbSet<Login> LoginCredentials { get; set; }
    }
}
