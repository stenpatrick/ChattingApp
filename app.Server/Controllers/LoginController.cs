using Microsoft.AspNetCore.Mvc;
using app.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace app.Controllers
{
    public class LoginController : Controller
    {
        // This is just a placeholder for authentication logic
        // In a real-world app, you would query the database or use Identity Framework.
        private bool ValidateUser(string username, string password)
        {
            // Dummy logic for illustration. Replace with your authentication logic.
            return username == "admin" && password == "password123";
        }

        // GET: Login
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        // POST: Login
        [HttpPost]
        public IActionResult Index(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (ValidateUser(model.Username, model.Password))
                {
                    return RedirectToAction("Welcome");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password.");
                }
            }

            return View(model);
        }

        public IActionResult Welcome()
        {
            return View();
        }
    }
}
