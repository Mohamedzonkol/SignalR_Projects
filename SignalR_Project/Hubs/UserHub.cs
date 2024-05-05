using Microsoft.AspNetCore.SignalR;

namespace SignalR_Project.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;

        public async Task NewWindowLoaded(string message)
        {
            TotalViews++;
            await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
        }
    }
}
