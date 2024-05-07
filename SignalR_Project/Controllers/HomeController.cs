using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR_Project.Hubs;
using SignalR_Project.Models;
using System.Diagnostics;

namespace SignalR_Project.Controllers
{
    public class HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> deathHub) : Controller
    {
        private readonly ILogger<HomeController> _logger = logger;

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (SD.DealthyHallowRace.ContainsKey(type))
            {
                SD.DealthyHallowRace[type]++;
            }
            await deathHub.Clients.All.SendAsync("updateDealthyHallowCount",
                SD.DealthyHallowRace[SD.Cloak],
                SD.DealthyHallowRace[SD.Stone],
                SD.DealthyHallowRace[SD.Wand]
                );
            return Accepted();
        }
        public IActionResult Group()
        {
            return View("HarryPotterHouse");
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
