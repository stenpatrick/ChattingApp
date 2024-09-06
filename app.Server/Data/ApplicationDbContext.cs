using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using app.Server.Models;

namespace app.Server.Data
{
		public class ApplicationDbContext : IdentityDbContext<User>
		{
				public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
		}
}
