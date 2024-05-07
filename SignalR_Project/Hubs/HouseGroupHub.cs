using Microsoft.AspNetCore.SignalR;

namespace SignalR_Project.Hubs
{
    public class HouseGroupHub : Hub
    {
        public static List<string> GroupJoin { get; set; } = new List<string>();
        public async Task JoinGroup(string groupName)
        {
            if (!groupName.Contains(Context.ConnectionId + ":" + groupName))
            {
                GroupJoin.Add(Context.ConnectionId + ":" + groupName);
                string houseList = "";
                foreach (var item in GroupJoin)
                {
                    if (item.Contains(Context.ConnectionId))
                    {
                        houseList += item.Split(":")[1] + " ";
                    }
                }
                await Clients.Caller.SendAsync("substantiation", houseList, groupName.ToLower(), true);
                await Clients.Others.SendAsync("newMemberAddedToHouse", groupName);
                await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            }
        }


        public async Task LeaveGroup(string groupName)
        {
            if (groupName.Contains(Context.ConnectionId + ":" + groupName))
            {
                GroupJoin.Remove(Context.ConnectionId + ":" + groupName);
                string houseList = "";
                foreach (var item in GroupJoin)
                {
                    if (item.Contains(Context.ConnectionId))
                    {
                        houseList += item.Split(":")[1] + " ";
                    }
                }
                await Clients.Caller.SendAsync("subscriptionStatus", houseList, groupName.ToLower(), false);
                await Clients.Others.SendAsync("newMemberRemovedFromHouse", groupName);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            }
        }
    }
}
