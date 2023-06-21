using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public static class DbInitializer
    {
        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            // Get the required services
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

            // Seed roles
            await SeedRoles(roleManager);

            // Seed users
            await SeedUsers(userManager);

            // Seed About description
            await SeedAbout(context);
        }

        private static async Task SeedRoles(RoleManager<ApplicationRole> roleManager)
        {
            // Define roles to seed
            string[] roles = { "Admin", "User" };

            // Create roles if they don't exist
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new ApplicationRole(role));
                }
            }
        }

        private static async Task SeedUsers(UserManager<ApplicationUser> userManager)
        {
            // Define users to seed
            var users = new[]
            {
            new { Email = "admin@example.com", Password = "Admin@123", Roles = new[] { "Admin" } },
            new { Email = "user@example.com", Password = "User@123", Roles = new[] { "User" } }
        };

            // Create users if they don't exist
            foreach (var user in users)
            {
                var existingUser = await userManager.FindByEmailAsync(user.Email);
                if (existingUser == null)
                {
                    var newUser = new ApplicationUser
                    {
                        UserName = user.Email,
                        Email = user.Email
                    };

                    var result = await userManager.CreateAsync(newUser, user.Password);

                    if (result.Succeeded)
                    {
                        // Assign roles to the user
                        foreach (var role in user.Roles)
                        {
                            await userManager.AddToRoleAsync(newUser, role);
                        }
                    }
                }
            }
        }
        private static async Task SeedAbout(ApplicationDbContext context)
        {
            if (context.AboutDescriptions.Any()) return;
            var aboutDescription = new AboutDescription
            {
                Description = "Seeded description"
            };
            context.AboutDescriptions.Add(aboutDescription);
            await context.SaveChangesAsync();
        }
    }
}
